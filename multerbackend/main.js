import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";
import v2 from "cloudinary";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Now we have the __dirname equivalent

const app = express();
app.use(cors());

v2.config({
  cloud_name: 'div73bxig',
  api_key: '934178561787478',
  api_secret: 's6RYiLHbAaMlM5N2EBYByjDtIJo'
});

const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Retain file extension
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 30 * 1024 * 1024 }, // Limit file size to 30MB
  fileFilter: (req, file, cb) => {
    cb(null, true); // Allow all file types for now
  }
});

app.post("/upload", upload.single("fileupload"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const uploadedFile = await v2.uploader.upload(req.file.path, {
      resource_type: "auto" // Auto detect file type (images, videos, documents, etc.)
    });
    fs.unlinkSync(req.file.path); // Clean up the local file after uploading to Cloudinary
    return res.json({
      message: "File uploaded successfully",
      fileUrl: uploadedFile.secure_url
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: "File upload failed", details: error.message });
  }
});

app.listen(2001, () => {
  console.log("Server started at port 2001");
});
