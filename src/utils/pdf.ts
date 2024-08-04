import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export class PDFUtils {
  static dowloadPdf = async (element: HTMLElement): Promise<void> => {
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("statement.pdf");
    });
  };
}
