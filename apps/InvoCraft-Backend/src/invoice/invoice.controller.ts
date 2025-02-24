import { Body, Controller, Post, Get, Param, Delete, Res, Request, UseGuards, Put, NotFoundException } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Response } from 'express';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './schemas/invoice.schema';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';


@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto, @Request() req): Promise<Invoice> {
    console.log(req.user._id)
    const userId = req.user._id;
    return this.invoiceService.createInvoice(createInvoiceDto, userId);
  }

  @Get(':id')
  async getInvoice(@Param('id') id: string, @Request() req): Promise<Invoice> {
    const userId = req.user._id;
    return this.invoiceService.getInvoiceById(id, userId);
  }

  @Get()
  async getAllInvoices(@Request() req): Promise<Invoice[]> {
    const userId = req.user._id;
    return this.invoiceService.getAllInvoices(userId);
  }


  @Delete(':id')
  async deleteInvoice(@Param('id') id: string, @Request() req): Promise<void> {
    const userId = req.user._id;
    return this.invoiceService.deleteInvoice(id, userId);
  }


  @Put(':id')
  async updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceDto: Partial<CreateInvoiceDto>,
  ): Promise<Invoice> {
    return this.invoiceService.updateInvoiceById(id, updateInvoiceDto);
  }


  @Get('generate-pdf/:id')
  async generatePdf(@Param('id') id: string, @Res() res: Response): Promise<void> {
    await this.invoiceService.generateInvoicePdf(id, res);
  }

  @Get('stats/:customerId')
  async getCustomerInvoiceStats(@Param('customerId') customerId: string) {
    return this.invoiceService.getInvoiceStatsByCustomer(customerId);
  }
  

} 