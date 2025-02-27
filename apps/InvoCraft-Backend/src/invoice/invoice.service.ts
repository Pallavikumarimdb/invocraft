import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice, InvoiceDocument } from './schemas/invoice.schema';
import PDFDocument from 'pdfkit';
import { Response } from 'express';
import { createInvoiceTemplate } from './invoice-template';
@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
  ) { }

  // Utility function to calculate the invoice amounts
  private calculateInvoiceAmounts(items: any[]): { subtotal: number, taxAmount: number, totalAmount: number } {
    let subtotal = 0;
    let taxAmount = 0;

    items.forEach(item => {
      const itemSubtotal = item.unitPrice * item.quantity;
      const itemTax = itemSubtotal * item.tax;  // Calculate tax for this item
      subtotal += itemSubtotal;
      taxAmount += itemTax;
    });

    const totalAmount = subtotal + taxAmount;  // Calculate the total amount including tax

    return { subtotal, taxAmount, totalAmount };
  }

  async createInvoice(createInvoiceDto: CreateInvoiceDto, userId: string): Promise<Invoice> {
    const { items = [] } = createInvoiceDto;
    const { subtotal, taxAmount, totalAmount } = this.calculateInvoiceAmounts(items);

    // Create and save the invoice with calculated amounts
    const invoice = new this.invoiceModel({
      ...createInvoiceDto,
      userId,
      subtotal,
      taxAmount,
      amount: totalAmount,  // The total amount is calculated here
    });

    return invoice.save();
  }

  async getAllInvoices(userId: string): Promise<Invoice[]> {
    return this.invoiceModel.find({ userId });
  }

  async getInvoiceById(id: string, userId: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findOne({ _id: id, userId });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }


  async deleteInvoice(id: string, userId: string): Promise<void> {
    const result = await this.invoiceModel.deleteOne({ _id: id, userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
  }

  async updateInvoiceById(id: string, updateInvoiceDto: Partial<CreateInvoiceDto>): Promise<Invoice> {
    if (updateInvoiceDto.items) {
      const { subtotal, taxAmount, totalAmount } = this.calculateInvoiceAmounts(updateInvoiceDto.items);

      // Update the DTO with calculated amounts
      updateInvoiceDto = {
        ...updateInvoiceDto,
        subtotal,
        taxAmount,
        amount: totalAmount,
      } as Partial<CreateInvoiceDto>;
    }

    const updatedInvoice = await this.invoiceModel
      .findByIdAndUpdate(id, updateInvoiceDto, { new: true })
      .exec();

    if (!updatedInvoice) {
      throw new NotFoundException(`Invoice with ID "${id}" not found`);
    }
    return updatedInvoice;
  }



  async generateInvoicePdf(invoiceId: string, res: Response) {
    const invoiceData = await this.invoiceModel.findById(invoiceId).exec();
    if (!invoiceData) {
      throw new NotFoundException(`Invoice with ID ${invoiceId} not found.`);
    }

    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      console.log('Response Type:', res.constructor.name);
      console.log('Available Methods:', Object.keys(res));
      const pdfBuffer = Buffer.concat(buffers);
      (res as Response).setHeader('Content-Type', 'application/pdf');
      (res as Response).setHeader(
        'Content-Disposition',
        `attachment; filename=invoice_${invoiceData.invoiceNumber}.pdf`
      );
      res.send(pdfBuffer);
    });

    createInvoiceTemplate(doc, invoiceData);
    doc.end();
  }


  async getInvoiceStatsByCustomer(customerId: string) {
    const result = await this.invoiceModel.aggregate([
      { $match: { customerId } }, // Match the invoices for the specified customer
      {
        $group: {
          _id: '$customerId',
          totalInvoices: { $sum: 1 }, // Count the total number of invoices
          paidInvoices: {
            $sum: {
              $cond: [{ $eq: ['$status', 'paid'] }, 1, 0], // Count only paid invoices
            },
          },
          totalPaidAmount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'paid'] }, '$amount', 0], // Sum the amount for paid invoices
            },
          },
        },
      },
      {
        $addFields: {
          paidPercentage: {
            $cond: [
              { $eq: ['$totalInvoices', 0] },
              0,
              { $multiply: [{ $divide: ['$paidInvoices', '$totalInvoices'] }, 100] },
            ],
          },
        },
      },
    ]);

    return result.length > 0
      ? result[0]
      : { totalInvoices: 0, paidInvoices: 0, paidPercentage: 0, totalPaidAmount: 0 };
  }


} 