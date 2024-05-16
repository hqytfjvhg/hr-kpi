import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export function downPdf(downId, title) {
  html2Canvas(downId, {
    allowTaint: true,
    scale: 2,
  }).then(function (canvas) {
    let contentWidth = canvas.width - 20;
    let contentHeight = canvas.height - 20;

    let pageHeight = (contentWidth / 572.28) * 821.89;
    let leftHeight = contentHeight;
    let position = 10;
    let imgWidth = 575.28;

    let imgHeight = (572.28 / contentWidth) * contentHeight;
    let pageData = canvas.toDataURL("image/jpeg", 1.0);

    let PDF = new JsPDF("", "pt", "a4");
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, "JPEG", 10, 10, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, "JPEG", 10, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        if (leftHeight > 0) {
          PDF.addPage();
        }
      }
    }
    PDF.save(title + ".pdf");
  });
}
