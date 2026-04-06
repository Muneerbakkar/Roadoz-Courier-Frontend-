import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateInvoicePDF = (order) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text("INVOICE", 14, 22);
  
  doc.setFontSize(10);
  doc.text("Roadoz Logi-Tech", 140, 20);
  doc.text("Samshtech Technologies", 140, 25);
  doc.text("GSTIN: 10ABCDE1234F1Z5", 140, 30);

  doc.setLineWidth(0.5);
  doc.line(14, 35, 195, 35);

  doc.setFontSize(10);
  doc.text(`Order ID: ${order.id}`, 14, 45);
  doc.text(`Date: ${order.created}`, 14, 50);
  doc.text(`Payment Status: ${order.payment.method}`, 14, 55);

  doc.setFontSize(11);
  doc.text("Bill To:", 14, 70);
  doc.setFontSize(10);
  doc.text(order.customer.name, 14, 75);
  doc.text(order.customer.phone, 14, 80);
  doc.text(`${order.route.to} (${order.route.toPin})`, 14, 85);

  const tableColumn = ["Description", "Weight", "Dimensions", "Total Amount"];
  const tableRows = [
    [
      `Shipping Charges (${order.shipment.courier})`,
      order.weight,
      order.dims || "N/A",
      order.payment.total
    ]
  ];

  doc.autoTable({
    startY: 95,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [255, 184, 0], textColor: [0, 0, 0] }
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.text("Thank you for choosing Roadoz!", 14, finalY + 10);

  doc.save(`Invoice_${order.id}.pdf`);
};