import type { GoldPrice } from "@/types/gold-price";
import type { RefObject } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export function getTodayAndYesterday(data: GoldPrice[]) {
  if (data.length < 2) return null;

  // clone + sort theo date tăng dần
  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const today = sorted[sorted.length - 1];
  const yesterday = sorted[sorted.length - 2];

  return { today, yesterday };
}

export const getYesterday = (date: string) => {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

export const handleDownload = async (
  type: "png" | "jpeg" | "pdf" | "svg",
  brand: string,
  chartRef: RefObject<HTMLDivElement | null> | null
) => {
  if (!chartRef?.current) return;

  if (type === "svg") {
    const svgElement = chartRef.current.querySelector("svg");
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gold-price-chart-${brand}.svg`;
    link.click();
    return;
  }

  const canvas = await html2canvas(chartRef.current, { useCORS: true });
  const image = canvas.toDataURL(`image/${type}`, 1.0);

  if (type === "pdf") {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(image, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`gold-price-chart-${brand}.pdf`);
  } else {
    const link = document.createElement("a");
    link.href = image;
    link.download = `gold-price-chart-${brand}.${type}`;
    link.click();
  }
};

export const handlePrint = async (
  chartRef: RefObject<HTMLDivElement | null> | null
) => {
  if (!chartRef?.current) return;

  // Open window immediately to avoid popup blocker
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Vui lòng cho phép popup để in biểu đồ.");
    return;
  }

  printWindow.document.write("<div>Đang xử lý biểu đồ...</div>");

  try {
    const canvas = await html2canvas(chartRef.current, { useCORS: true });
    const image = canvas.toDataURL("image/png");

    printWindow.document.open();
    printWindow.document.write(`
        <html>
          <head>
            <title>Biểu đồ giá vàng</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 100%; max-height: 100%; object-fit: contain; }
            </style>
          </head>
          <body>
            <img src="${image}" onload="setTimeout(() => { window.print(); window.close(); }, 500);" />
          </body>
        </html>
      `);
    printWindow.document.close();
  } catch (error) {
    console.error("Print failed", error);
    printWindow.close();
  }
};
