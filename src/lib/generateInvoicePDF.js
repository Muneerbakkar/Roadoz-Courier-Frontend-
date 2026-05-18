import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (order) => {
  try {
    const doc = new jsPDF();

    // -----------------------------
    // COLORS & CONSTANTS
    // -----------------------------
    const primary = [0, 0, 0];
    const lightGray = [240, 240, 240];
    const PAGE_LEFT = 14;
    const PAGE_RIGHT = 196; // 210mm - 14mm margin

    // ─────────────────────────────────────────────────────────
    // HEADER  (company info LEFT | invoice meta RIGHT)
    // Both columns share the same y-range so they never collide
    // ─────────────────────────────────────────────────────────

    // --- Company name ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Roadoz Logistics Pvt Ltd", PAGE_LEFT, 20);

    // --- TAX INVOICE label — right-aligned so it never overlaps the company name ---
    doc.setFontSize(18);
    doc.text("TAX INVOICE", PAGE_RIGHT, 20, { align: "right" });

    // --- Company sub-details (left column, y = 27 … 47) ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const companyLines = [
      "MG Road, Kochi, Kerala - 682016",
      "GSTIN: 32ABCDE1234F1Z9",
      "Phone: +91 484 400 1234",
      "Email: billing@roadozlogistics.in",
    ];
    companyLines.forEach((line, i) => doc.text(line, PAGE_LEFT, 27 + i * 5));

    // --- Invoice meta (right column, same y-range = 27 … 47) ---
    // Render label left-of-center and value right-aligned for clean layout
    const META_LABEL_X = 125;
    const metaRows = [
      ["Invoice No", order.invoiceNo || "N/A"],
      ["Invoice Date", order.created || "N/A"],
      ["AWB Number", order.awb || "N/A"],
      ["Order Number", order.id || "N/A"],
    ];
    metaRows.forEach(([label, value], i) => {
      const y = 27 + i * 5;
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, META_LABEL_X, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, PAGE_RIGHT, y, { align: "right" });
    });

    // -----------------------------
    // DIVIDER
    // -----------------------------
    doc.setDrawColor(180);
    doc.line(PAGE_LEFT, 52, PAGE_RIGHT, 52);

    // ─────────────────────────────────────────────────────────
    // PICKUP  &  DELIVERY  ADDRESSES
    // Split at midpoint (x = 105); right column starts at 108
    // ─────────────────────────────────────────────────────────
    const ADDR_Y_TITLE = 61;
    const ADDR_Y_START = 67;
    const ADDR_LEFT_X = PAGE_LEFT;
    const ADDR_RIGHT_X = 108;

    // Section titles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Pickup Address", ADDR_LEFT_X, ADDR_Y_TITLE);
    doc.text("Delivery Address", ADDR_RIGHT_X, ADDR_Y_TITLE);

    // Vertical separator between the two address blocks
    doc.setDrawColor(200);
    doc.line(105, 55, 105, 102);

    // Address content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    const pickupLines = [
      order.pickup?.name || "",
      order.pickup?.address1 || "",
      order.pickup?.address2 || "",
      order.pickup?.city || "",
      `Phone: ${order.pickup?.phone || ""}`,
    ];
    const deliveryLines = [
      order.customer?.name || "",
      order.customer?.address1 || "",
      order.customer?.address2 || "",
      order.customer?.city || "",
      `Phone: ${order.customer?.phone || ""}`,
    ];

    pickupLines.forEach((line, i) =>
      doc.text(line, ADDR_LEFT_X, ADDR_Y_START + i * 5),
    );
    deliveryLines.forEach((line, i) =>
      doc.text(line, ADDR_RIGHT_X, ADDR_Y_START + i * 5),
    );

    // -----------------------------
    // SHIPMENT DETAILS TABLE
    // -----------------------------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Shipment Details", PAGE_LEFT, 108);

    autoTable(doc, {
      startY: 112,
      head: [
        ["Product", "SKU", "Qty", "Weight", "Dimensions", "Declared Value"],
      ],
      body: [
        [
          order.product?.name || "N/A",
          order.product?.sku || "N/A",
          order.product?.qty || 0,
          order.weight || "0 KG",
          order.dims || "0 x 0 x 0",
          `Rs. ${order.product?.value || 0}`,
        ],
      ],
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: {
        fillColor: lightGray,
        textColor: primary,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 25 },
        2: { cellWidth: 12, halign: "center" },
        3: { cellWidth: 22, halign: "center" },
        4: { cellWidth: 38, halign: "center" },
        5: { cellWidth: 30, halign: "right" },
      },
      theme: "grid",
      margin: { left: PAGE_LEFT, right: 14 },
    });

    // -----------------------------
    // CHARGES BREAKDOWN TABLE
    // -----------------------------
    const chargeY = doc.lastAutoTable.finalY + 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Charges Breakdown", PAGE_LEFT, chargeY);

    autoTable(doc, {
      startY: chargeY + 4,
      head: [["Description", "Amount"]],
      body: [
        ["Freight Charges", `Rs. ${order.charges?.freight || 0}`],
        ["Fuel Surcharge", `Rs. ${order.charges?.fuel || 0}`],
        ["Handling Charges", `Rs. ${order.charges?.handling || 0}`],
        ["Insurance Charges", `Rs. ${order.charges?.insurance || 0}`],
        ["Subtotal", `Rs. ${order.charges?.subtotal || 0}`],
        ["GST @ 18%", `Rs. ${order.charges?.gst || 0}`],
        ["Grand Total", `Rs. ${order.payment?.total || 0}`],
      ],
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: {
        fillColor: lightGray,
        textColor: primary,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 62, halign: "right" },
      },
      // Bold the summary rows
      didParseCell: (data) => {
        if (data.section === "body" && data.row.index >= 4) {
          data.cell.styles.fontStyle = "bold";
        }
      },
      theme: "grid",
      margin: { left: PAGE_LEFT, right: 14 },
    });

    // ─────────────────────────────────────────────────────────
    // EXTRA DETAILS  — light shaded info bar
    // ─────────────────────────────────────────────────────────
    const PAGE_H = 297; // A4 height in mm
    const SIG_H = 16; // space needed for sig line + label
    const BOTTOM_MARGIN = 10;
    const SAFE_BOTTOM = PAGE_H - BOTTOM_MARGIN; // 287mm — last safe y

    const extraY = doc.lastAutoTable.finalY + 6;
    const INFO_BAR_H = 10; // compact bar height

    // Shaded background
    doc.setFillColor(245, 245, 245);
    doc.rect(PAGE_LEFT, extraY, PAGE_RIGHT - PAGE_LEFT, INFO_BAR_H, "F");
    doc.setDrawColor(200);
    doc.rect(PAGE_LEFT, extraY, PAGE_RIGHT - PAGE_LEFT, INFO_BAR_H, "S");

    // Three columns inside the bar
    const barTextY = extraY + 6.5;
    doc.setFontSize(9);

    doc.setFont("helvetica", "bold");
    doc.text("Payment Method:", PAGE_LEFT + 3, barTextY);
    doc.setFont("helvetica", "normal");
    doc.text(order.payment?.method || "N/A", PAGE_LEFT + 33, barTextY);

    doc.setFont("helvetica", "bold");
    doc.text("Shipment Type:", 82, barTextY);
    doc.setFont("helvetica", "normal");
    doc.text(order.shipmentType || "N/A", 110, barTextY);

    doc.setFont("helvetica", "bold");
    doc.text("Risk Type:", 148, barTextY);
    doc.setFont("helvetica", "normal");
    doc.text(order.riskType || "N/A", 168, barTextY);

    // Total Boxes row
    const boxesY = extraY + INFO_BAR_H + 5;
    doc.setFont("helvetica", "bold");
    doc.text("Total Boxes:", PAGE_LEFT, boxesY);
    doc.setFont("helvetica", "normal");
    doc.text(String(order.totalBoxes || 1), PAGE_LEFT + 24, boxesY);

    // ─────────────────────────────────────────────────────────
    // TERMS & CONDITIONS
    // termsY = Math.max(termsFromTop, termsFromBot) ensures:
    //   • always at least 8mm below "Total Boxes" (no collision)
    //   • always leaves sigSpace room above signatures (no overflow)
    // ─────────────────────────────────────────────────────────
    const terms = [
      "1. Goods are carried at owner's risk unless insured.",
      "2. Claims for damages must be reported within 48 hours.",
      "3. This is a computer-generated invoice and does not require a signature.",
      "4. GST charged as per applicable Indian taxation laws.",
    ];
    const LINE_H = 4.5;
    const TERMS_BLOCK_H = 6 + (terms.length - 1) * LINE_H + LINE_H;

    const sigY = SAFE_BOTTOM - 5; // 282mm — always on-page
    const sigSpace = 10; // gap between last term and sig line
    const termsFromTop = boxesY + 8; // at least 8mm below "Total Boxes"
    const termsFromBot = sigY - sigSpace - TERMS_BLOCK_H; // must leave room for signature
    const termsY = Math.max(termsFromTop, termsFromBot);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Terms & Conditions:", PAGE_LEFT, termsY);

    doc.setFont("helvetica", "normal");
    terms.forEach((line, i) =>
      doc.text(line, PAGE_LEFT, termsY + 6 + i * LINE_H),
    );

    // ─────────────────────────────────────────────────────────
    // SIGNATURES  — pinned to bottom of page, always visible
    // ─────────────────────────────────────────────────────────
    doc.setDrawColor(100);
    doc.line(PAGE_LEFT, sigY, 80, sigY); // customer line
    doc.line(130, sigY, PAGE_RIGHT, sigY); // authorized line

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Customer Signature", PAGE_LEFT, sigY + 5);
    doc.text("Authorized Signatory", 130, sigY + 5);

    // -----------------------------
    // SAVE PDF
    // -----------------------------
    doc.save(`Invoice_${order.id || "invoice"}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
  }
};
