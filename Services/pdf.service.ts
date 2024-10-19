import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import jsPDF from 'jspdf';
import { ProductQuantity } from '../product-quantity';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePdf(orderInvoice: any) {
    const doc = new jsPDF();
    let ypos = 20;

    // Header information
    doc.text(`Order ID: ${orderInvoice.oid}`, 10, ypos);
    ypos += 10;
    doc.text(`Name: ${orderInvoice.firstName} ${orderInvoice.lastName}`, 10, ypos);
    ypos += 10;
    doc.text(`Paid Amount: ${orderInvoice.paidAmount}`, 10, ypos);
    ypos += 10;
    doc.text(`Payment Mode: ${orderInvoice.paymentMode}`, 10, ypos);
    ypos += 10;
    doc.text(`Date: ${orderInvoice.date}`, 10, ypos);
    ypos += 10;
    doc.text(`Contact: ${orderInvoice.contact}`, 10, ypos);
    ypos += 10;
    doc.text(`Address: ${orderInvoice.address}, ${orderInvoice.district}, ${orderInvoice.state}, ${orderInvoice.pinCode}`, 10, ypos);
    ypos += 10;

    // Products
    doc.text('Products:', 10, ypos);
    ypos += 10;

    orderInvoice.products.forEach((prod: { product: { name: any; brand: any; category: any; description: any; }; quantity: any; }) => {
        const productInfo = `- ${prod.product.name} (Brand: ${prod.product.brand}, Category: ${prod.product.category}, \n Description: ${prod.product.description}) - Quantity: ${prod.quantity}`;
        doc.text(productInfo, 10, ypos);
        ypos += 10;
    });

    const pdfOutput = doc.output('blob');
    saveAs(pdfOutput, 'order-details.pdf');
}

}
