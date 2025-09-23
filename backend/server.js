import express from "express";
import multer from "multer";
import { PDFDocument } from "pdf-lib";
import cors from "cors";

const app = express();
const upload = multer(); // memory storage

// Enable CORS for frontend*
app.use(cors());
app.use(express.json());

// POST /split endpoint
app.post("/split", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No PDF uploaded");

    const { pages } = req.body; // e.g. "1,3,5"
    if (!pages) return res.status(400).send("No pages specified");

    const selectedPages = pages
      .split(",")
      .map((p) => parseInt(p.trim(), 10))
      .filter((p) => !isNaN(p));

    // Load uploaded PDF
    const pdfDoc = await PDFDocument.load(req.file.buffer);

    // Create new PDF
    const newPdf = await PDFDocument.create();
    for (const pageNum of selectedPages) {
      if (pageNum >= 1 && pageNum <= pdfDoc.getPageCount()) {
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1]);
        newPdf.addPage(copiedPage);
      }
    }

    const pdfBytes = await newPdf.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=split.pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error("Error splitting PDF:", err);
    res.status(500).send("Error processing PDF");
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
