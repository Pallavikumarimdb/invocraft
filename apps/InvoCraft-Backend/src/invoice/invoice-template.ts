import PDFDocument from 'pdfkit';
import { Invoice } from './schemas/invoice.schema';

export const createInvoiceTemplate = (doc: PDFKit.PDFDocument, invoice: Invoice) => {
  // Constants for consistent styling
  const PAGE_WIDTH = 612; // Letter size width
  const MARGIN = 50;
  const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);
  
  // Colors
  const PRIMARY_COLOR = '#1a237e'; // Deep blue
  const TEXT_COLOR = '#2d3748'; // Dark gray
  const SECONDARY_TEXT = '#4a5568'; // Medium gray
  const ACCENT_COLOR = '#e2e8f0'; // Light gray
  const SUCCESS_COLOR = '#065f46'; // Deep green

  // Fonts and Sizes
  const HEADING_SIZE = 28;
  const SUBHEADING_SIZE = 14;
  const NORMAL_SIZE = 10;

  // Header Section with modern design
  doc
    .font('Helvetica-Bold')
    .fontSize(HEADING_SIZE)
    .fillColor(PRIMARY_COLOR)
    .text('INVOICE', MARGIN, MARGIN)
    .fontSize(NORMAL_SIZE)
    .fillColor(SECONDARY_TEXT)
    .text(invoice.invoiceNumber, MARGIN, MARGIN + 35)
    .moveDown(0.2);

  // Format dates to DD/MM/YYYY
  const formatDate = (dateString: string | Date): string => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Date Information (side by side)
  const dateY = MARGIN + 35;
  const dateColumnWidth = 150;
  doc
    .fontSize(NORMAL_SIZE)
    .font('Helvetica')
    .text('Date Issued:', PAGE_WIDTH - MARGIN - (2 * dateColumnWidth), dateY)
    .font('Helvetica-Bold')
    .text(formatDate(String(invoice.dateIssued)), PAGE_WIDTH - MARGIN - (2 * dateColumnWidth) + 70, dateY)
    .font('Helvetica')
    .text('Due Date:', PAGE_WIDTH - MARGIN - dateColumnWidth, dateY)
    .font('Helvetica-Bold')
    .text(formatDate(String(invoice.dueDate)), PAGE_WIDTH - MARGIN - dateColumnWidth + 60, dateY);

  // Divider
  doc
    .moveTo(MARGIN, doc.y + 20)
    .lineTo(PAGE_WIDTH - MARGIN, doc.y + 20)
    .strokeColor(ACCENT_COLOR)
    .lineWidth(1)
    .stroke();

  // Company and Customer Information with increased gap
  const infoStartY = doc.y + 40;
  const columnWidth = (CONTENT_WIDTH - 60) / 2; // Increased gap between columns

  // From Section
  doc
    .font('Helvetica-Bold')
    .fontSize(SUBHEADING_SIZE)
    .fillColor(PRIMARY_COLOR)
    .text('From:', MARGIN, infoStartY)
    .moveDown(0.5)
    .font('Helvetica')
    .fontSize(NORMAL_SIZE)
    .fillColor(TEXT_COLOR);

  const companyDetails = [
    invoice.companyName,
    invoice.companyAddress,
    `Phone: ${invoice.companyPhone}`,
    `Email: ${invoice.companyEmail}`,
    `Tax ID: ${invoice.companyTaxId}`
  ];

  companyDetails.forEach(detail => {
    doc.text(detail, { width: columnWidth });
  });

  // To Section (moved further right)
  const toX = MARGIN + columnWidth + 60; // Increased gap
  doc
    .font('Helvetica-Bold')
    .fontSize(SUBHEADING_SIZE)
    .fillColor(PRIMARY_COLOR)
    .text('To:', toX, infoStartY)
    .moveDown(0.5)
    .font('Helvetica')
    .fontSize(NORMAL_SIZE)
    .fillColor(TEXT_COLOR);

  const customerDetails = [
    invoice.customerName,
    invoice.customerAddress,
    `Phone: ${invoice.customerPhone}`,
    `Email: ${invoice.customerEmail}`
  ];

  customerDetails.forEach(detail => {
    doc.text(detail, toX, doc.y, { width: columnWidth });
  });

  // Items Table
  doc.moveDown(6);
  const tableTop = doc.y;

  // Table Headers with adjusted column widths
  const tableHeaders = ['Description', 'Qty', 'Unit Price', 'Tax %', 'Total'];
  const columnWidths = [200, 60, 90, 70, 90]; // Adjusted widths to prevent overflow
  
  doc
    .font('Helvetica-Bold')
    .fontSize(SUBHEADING_SIZE)
    .fillColor(PRIMARY_COLOR);

  let xPosition = MARGIN;
  tableHeaders.forEach((header, i) => {
    doc.text(header, xPosition, tableTop, { width: columnWidths[i], align: i > 0 ? 'right' : 'left' });
    xPosition += columnWidths[i];
  });

  // Table Rows
  doc
    .moveTo(MARGIN, tableTop + 20)
    .lineTo(PAGE_WIDTH - MARGIN, tableTop + 20)
    .strokeColor(ACCENT_COLOR)
    .lineWidth(1)
    .stroke();

  let currentY = tableTop + 30;
  doc.font('Helvetica').fontSize(NORMAL_SIZE).fillColor(TEXT_COLOR);

  invoice.items?.forEach((item) => {
    xPosition = MARGIN;
    const lineTotal = item.quantity * item.unitPrice * (1 + (item.tax || 0));

    doc
      .text(item.description, xPosition, currentY, { width: columnWidths[0] })
      .text(item.quantity.toString(), xPosition += columnWidths[0], currentY, { width: columnWidths[1], align: 'right' })
      .text(`$${item.unitPrice.toFixed(2)}`, xPosition += columnWidths[1], currentY, { width: columnWidths[2], align: 'right' })
      .text(`${((item.tax || 0) * 100).toFixed(0)}%`, xPosition += columnWidths[2], currentY, { width: columnWidths[3], align: 'right' })
      .text(`$${lineTotal.toFixed(2)}`, xPosition += columnWidths[3], currentY, { width: columnWidths[4], align: 'right' });

    currentY += 20;
  });

  // Totals Section
  doc.moveDown(4);
  const totalsX = PAGE_WIDTH - MARGIN - 200;
  const subtotal = calculateSubtotal(invoice);
  const tax = calculateTax(invoice);
  const total = calculateTotal(invoice);

  doc
    .font('Helvetica')
    .fontSize(NORMAL_SIZE)
    .text('Subtotal:', totalsX, doc.y, { width: 100, align: 'right' })
    .font('Helvetica-Bold')
    .text(`$${subtotal.toFixed(2)}`, totalsX + 100, doc.y - doc.currentLineHeight(), { width: 100, align: 'right' })
    .moveDown(0.5)
    .font('Helvetica')
    .text('Tax:', totalsX, doc.y, { width: 100, align: 'right' })
    .font('Helvetica-Bold')
    .text(`$${tax.toFixed(2)}`, totalsX + 100, doc.y - doc.currentLineHeight(), { width: 100, align: 'right' })
    .moveDown(0.5)
    .font('Helvetica-Bold')
    .fontSize(SUBHEADING_SIZE)
    .fillColor(PRIMARY_COLOR)
    .text('Total:', totalsX, doc.y, { width: 100, align: 'right' })
    .text(`$${total.toFixed(2)}`, totalsX + 100, doc.y - doc.currentLineHeight(), { width: 100, align: 'right' });

  // Payment Information (left-aligned)
  doc
    .moveDown(2)
    .fontSize(SUBHEADING_SIZE)
    .font('Helvetica-Bold')
    .fillColor(PRIMARY_COLOR)
    .text('Payment Information', MARGIN)
    .moveDown(0.5)
    .fontSize(NORMAL_SIZE)
    .font('Helvetica')
    .fillColor(TEXT_COLOR);

  const paymentDetails = [
    `Payment Terms: ${invoice.paymentTerms || 'N/A'}`,
    `Payment Instructions: ${invoice.paymentInstructions || 'N/A'}`,
    `Bank Details: ${invoice.bankDetails || 'N/A'}`
  ];

  paymentDetails.forEach(detail => {
    doc.text(detail, { continued: false });
  });

  // Ensure Notes and Terms are on the same page
  const remainingSpace = doc.page.height - doc.y;
  if (remainingSpace < 150) {
    doc.addPage();
  }

  // Notes and Terms Section
  doc
    .moveDown(2)
    .fontSize(NORMAL_SIZE)
    .font('Helvetica')
    .fillColor(TEXT_COLOR);

  if (invoice.notes) {
    doc
      .font('Helvetica-Bold')
      .fillColor(PRIMARY_COLOR)
      .text('Notes:')
      .moveDown(0.5)
      .font('Helvetica')
      .fillColor(TEXT_COLOR)
      .text(invoice.notes)
      .moveDown(1);
  }

  if (invoice.terms) {
    doc
      .font('Helvetica-Bold')
      .fillColor(PRIMARY_COLOR)
      .text('Terms:')
      .moveDown(0.5)
      .font('Helvetica')
      .fillColor(TEXT_COLOR)
      .text(invoice.terms)
      .moveDown(1);
  }

  // Thank You Message
  doc
    .moveDown(1)
    .fontSize(SUBHEADING_SIZE)
    .font('Helvetica-Bold')
    .fillColor(SUCCESS_COLOR)
    .text('Thank you for your business!', { align: 'center' });
};

const calculateSubtotal = (invoice: Invoice) => {
  return invoice.items?.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0) || 0;
};

const calculateTax = (invoice: Invoice) => {
  return invoice.items?.reduce((acc, item) => {
    const itemTotal = item.quantity * item.unitPrice;
    return acc + itemTotal * (item.tax || 0);
  }, 0) || 0;
};

const calculateTotal = (invoice: Invoice) => calculateSubtotal(invoice) + calculateTax(invoice);
