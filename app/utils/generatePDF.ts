import { jsPDF } from "jspdf";
import { JobLetterData, BillData, BillDetails } from "../types";
import { numberToWords, formatCurrency } from "./numberToWords";

export function generateBillPDF(data: BillData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;

  const drawBill = (yOffset: number, billData: BillDetails) => {
    const isEcommerce = data.settings.template === "ecommerce";
    const primaryColor = isEcommerce ? [15, 23, 42] : [200, 0, 0];

    // Border
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    const billHeight = (pageHeight - 20) / (data.settings.twoInOne ? 2 : 1);
    doc.rect(margin, yOffset, pageWidth - 2 * margin, billHeight);

    if (isEcommerce) {
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", margin + 10, yOffset + 15);
      doc.setFontSize(10);
      doc.text(`#${billData.billNo}`, margin + 10, yOffset + 22);

      doc.setFontSize(12);
      doc.text(data.shopDetails.name, pageWidth - margin - 10, yOffset + 15, {
        align: "right",
      });
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(
        data.shopDetails.address,
        pageWidth - margin - 10,
        yOffset + 20,
        { align: "right" }
      );
      doc.text(
        data.shopDetails.phones.join(", "),
        pageWidth - margin - 10,
        yOffset + 24,
        { align: "right" }
      );

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("BILL TO:", margin + 10, yOffset + 40);
      doc.setFont("helvetica", "normal");
      doc.text(
        billData.customerName || "Customer Name",
        margin + 10,
        yOffset + 45
      );
      doc.text(billData.customerAddress || "", margin + 10, yOffset + 50);
      doc.text(billData.customerPhone || "", margin + 10, yOffset + 55);

      // Items Table
      doc.setFont("helvetica", "bold");
      doc.text("Product", margin + 10, yOffset + 70);
      doc.text("Qty", margin + 100, yOffset + 70);
      doc.text("Price", margin + 130, yOffset + 70);
      doc.text("Total", margin + 160, yOffset + 70);
      doc.line(margin + 5, yOffset + 72, pageWidth - margin - 5, yOffset + 72);

      doc.setFont("helvetica", "normal");
      let itemY = yOffset + 80;
      billData.items.forEach((item) => {
        doc.text(item.productName || "", margin + 10, itemY);
        doc.text(item.quantity.toString(), margin + 100, itemY);
        doc.text(`Rs. ${item.price}`, margin + 130, itemY);
        doc.text(`Rs. ${item.quantity * item.price}`, margin + 160, itemY);
        itemY += 8;
      });

      const grandTotal = billData.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(
        `Total: Rs. ${grandTotal}`,
        pageWidth - margin - 10,
        itemY + 10,
        { align: "right" }
      );
    } else {
      // Classic Jewellery
      doc.setTextColor(200, 0, 0);
      doc.setFontSize(10);
      doc.text(`Mo. ${data.shopDetails.phones[0]}`, margin + 5, yOffset + 10);
      doc.text(
        `Mo. ${data.shopDetails.phones[1]}`,
        pageWidth - margin - 35,
        yOffset + 10
      );

      doc.setFontSize(8);
      doc.text("JAI SHREE SHYAM", pageWidth / 2, yOffset + 8, {
        align: "center",
      });

      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text(data.shopDetails.name, pageWidth / 2, yOffset + 20, {
        align: "center",
      });

      doc.setFontSize(10);
      doc.setFillColor(200, 0, 0);
      doc.setTextColor(255, 255, 255);
      doc.rect(pageWidth / 2 - 35, yOffset + 22, 70, 5, "F");
      doc.text(
        "All Type Gold & Silver Jewellery Seller",
        pageWidth / 2,
        yOffset + 26,
        { align: "center" }
      );

      doc.setTextColor(200, 0, 0);
      doc.setFontSize(12);
      doc.text(
        `Add: ${data.shopDetails.address}`,
        pageWidth / 2,
        yOffset + 32,
        { align: "center" }
      );
      doc.line(margin + 2, yOffset + 34, pageWidth - margin - 2, yOffset + 34);

      doc.setFontSize(14);
      doc.text(`Bill No. ${billData.billNo}`, margin + 5, yOffset + 42);
      doc.text(`Date: ${billData.date}`, pageWidth - margin - 50, yOffset + 42);

      doc.setFontSize(12);
      doc.text(
        `Mr./Ms. ${
          billData.customerName ||
          "..........................................................."
        }`,
        margin + 5,
        yOffset + 50
      );
      doc.text(
        `Add. ${
          billData.customerAddress ||
          ".............................................................."
        }`,
        margin + 5,
        yOffset + 58
      );
      if (billData.customerPhone) {
        doc.text(`Ph. ${billData.customerPhone}`, margin + 5, yOffset + 66);
      }

      // Items Table for Classic
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Description", margin + 10, yOffset + 70);
      doc.text("Qty", margin + 100, yOffset + 70);
      doc.text("Price", margin + 130, yOffset + 70);
      doc.text("Total", margin + 160, yOffset + 70);
      doc.line(margin + 5, yOffset + 72, pageWidth - margin - 5, yOffset + 72);

      doc.setFont("helvetica", "normal");
      let itemY = yOffset + 80;
      billData.items.forEach((item) => {
        doc.setFont("helvetica", "bold");
        doc.text(item.productName || "", margin + 10, itemY);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(item.description || "", margin + 10, itemY + 4);
        doc.setFontSize(10); // Reset font size

        doc.text(item.quantity.toString(), margin + 100, itemY);
        doc.text(`Rs. ${item.price}`, margin + 130, itemY);
        doc.text(`Rs. ${item.quantity * item.price}`, margin + 160, itemY);
        itemY += 10; // Increased spacing for double line
      });

      const grandTotal = billData.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      doc.setFont("helvetica", "bold");
      doc.text(
        `Grand Total: Rs. ${grandTotal}`,
        pageWidth - margin - 10,
        itemY + 10,
        { align: "right" }
      );

      // Watermark
      doc.setTextColor(240, 240, 240);
      doc.setFontSize(60);
      doc.text("JW", pageWidth / 2, yOffset + billHeight / 2, {
        align: "center",
      });

      doc.setTextColor(200, 0, 0);
      doc.setFontSize(12);
      doc.text(
        data.shopDetails.name,
        pageWidth - margin - 40,
        yOffset + billHeight - 15
      );
      doc.text("Signature", pageWidth - margin - 35, yOffset + billHeight - 10);
    }
  };

  if (data.settings.twoInOne) {
    drawBill(margin, data);
    if (data.settings.mode === "distinct" && data.secondBill) {
      drawBill(pageHeight / 2 + 5, data.secondBill);
    } else {
      drawBill(pageHeight / 2 + 5, data);
    }
  } else {
    drawBill(margin, data);
  }

  doc.save(`Bill_${data.billNo}.pdf`);
}

export function generateJobLetterPDF(data: JobLetterData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  drawDecorativeBorder(doc, pageWidth, pageHeight, margin);

  const headerY = 35;
  doc.setFont("times", "normal");
  doc.setFontSize(28);
  doc.setTextColor(139, 119, 42);
  doc.text(data.companyName, pageWidth / 2, headerY, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(data.companyAddress, pageWidth / 2, headerY + 8, {
    align: "center",
  });
  doc.text(`Email: ${data.companyEmail}`, pageWidth / 2, headerY + 14, {
    align: "center",
  });

  doc.setDrawColor(139, 119, 42);
  doc.setLineWidth(0.5);
  doc.line(margin + 10, headerY + 20, pageWidth - margin - 10, headerY + 20);

  let currentY = headerY + 40;
  const leftMargin = margin + 15;
  const lineHeight = 7;

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(12);
  doc.setFont("times", "normal");

  doc.text("To,", leftMargin, currentY);
  currentY += lineHeight;
  doc.text(
    `Name of Employee: ${data.employeeName || "_____________________"}`,
    leftMargin,
    currentY
  );
  currentY += lineHeight;
  doc.text(
    `Address: ${data.employeeAddress || "_____________________________"}`,
    leftMargin,
    currentY
  );
  currentY += lineHeight * 2;

  doc.setFontSize(14);
  doc.setFont("times", "bold");
  doc.setTextColor(139, 119, 42);
  doc.text(
    "Subject: Appointment & Joining Confirmation Letter",
    leftMargin,
    currentY
  );
  currentY += lineHeight * 2;

  doc.setFontSize(11);
  doc.setFont("times", "normal");
  doc.setTextColor(40, 40, 40);

  doc.text(
    `Dear Mr/Ms: ${data.employeeName || "_______________"}`,
    leftMargin,
    currentY
  );
  currentY += lineHeight * 1.5;

  doc.text(
    `We are pleased to offer the position of ${
      data.position || "____________"
    } at`,
    leftMargin,
    currentY
  );
  currentY += lineHeight;
  doc.text(
    `at ${data.companyName}. You are required to join on`,
    leftMargin,
    currentY
  );
  currentY += lineHeight;

  const joiningDateObj = data.joiningDate ? new Date(data.joiningDate) : null;
  const joiningText =
    joiningDateObj && !isNaN(joiningDateObj.getTime())
      ? joiningDateObj.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "_________ (Joining Date)";
  doc.text(joiningText + ".", leftMargin, currentY);
  currentY += lineHeight;

  if (data.additionalTasks) {
    doc.text(
      `Any additional tasks: ${data.additionalTasks}`,
      leftMargin,
      currentY
    );
    currentY += lineHeight;
  }

  currentY += lineHeight * 0.5;

  const salaryInWords =
    data.monthlySalary > 0 ? numberToWords(data.monthlySalary) : "____________";
  const salaryFormatted =
    data.monthlySalary > 0 ? formatCurrency(data.monthlySalary) : "________";
  doc.text(
    `Your monthly salary will be Rs. ${salaryFormatted} (in words: ${salaryInWords})`,
    leftMargin,
    currentY
  );
  currentY += lineHeight;

  if (data.workingHoursDescription) {
    doc.text(
      `Your working hours will (in words: ${data.workingHoursDescription}).`,
      leftMargin,
      currentY
    );
    currentY += lineHeight;
  }

  doc.text(
    `Your working hours will: From: ${
      data.workingHoursFrom || "_________"
    } to ${data.workingHoursTo || "_________"}`,
    leftMargin,
    currentY
  );
  currentY += lineHeight;

  doc.text(
    `Weekly Off: ${
      data.weeklyOff1 || "____________"
    }              Weekly Off: ${data.weeklyOff2 || "____________"}`,
    leftMargin,
    currentY
  );
  currentY += lineHeight * 1.5;

  doc.text(
    `You will be under your probation period of ${
      data.probationMonths > 0 ? data.probationMonths.toString() : "_"
    } months from date of joining.`,
    leftMargin,
    currentY
  );
  currentY += lineHeight * 2;

  doc.text("Sincerely,", leftMargin, currentY);
  currentY += lineHeight;
  doc.text("Authorized Signatory", leftMargin, currentY);
  currentY += lineHeight;
  doc.text(`${data.companyName} _______________`, leftMargin, currentY);

  doc.save(
    data.employeeName
      ? `Job_Letter_${data.employeeName.replace(/\s+/g, "_")}.pdf`
      : "Job_Letter.pdf"
  );
}

function drawDecorativeBorder(
  doc: jsPDF,
  pageWidth: number,
  pageHeight: number,
  margin: number
): void {
  doc.setDrawColor(180, 160, 100);
  doc.setLineWidth(2);
  doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

  doc.setDrawColor(200, 180, 120);
  doc.setLineWidth(0.5);
  doc.rect(
    margin + 3,
    margin + 3,
    pageWidth - 2 * margin - 6,
    pageHeight - 2 * margin - 6
  );

  const cornerSize = 12;
  doc.setDrawColor(180, 160, 100);
  doc.setLineWidth(1);
  doc.line(margin + 5, margin + cornerSize, margin + 5, margin + 5);
  doc.line(margin + 5, margin + 5, margin + cornerSize, margin + 5);
  doc.line(
    pageWidth - margin - 5,
    margin + cornerSize,
    pageWidth - margin - 5,
    margin + 5
  );
  doc.line(
    pageWidth - margin - cornerSize,
    margin + 5,
    pageWidth - margin - 5,
    margin + 5
  );
  doc.line(
    margin + 5,
    pageHeight - margin - cornerSize,
    margin + 5,
    pageHeight - margin - 5
  );
  doc.line(
    margin + 5,
    pageHeight - margin - 5,
    margin + cornerSize,
    pageHeight - margin - 5
  );
  doc.line(
    pageWidth - margin - 5,
    pageHeight - margin - cornerSize,
    pageWidth - margin - 5,
    pageHeight - margin - 5
  );
  doc.line(
    pageWidth - margin - cornerSize,
    pageHeight - margin - 5,
    pageWidth - margin - 5,
    pageHeight - margin - 5
  );
}
