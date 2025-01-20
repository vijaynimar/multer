import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import cors from "cors"
import v2 from "cloudinary"
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // Now we have the __dirname equivalent
const app=express()
app.use(cors())
v2.config({
    cloud_name: 'div73bxig',
    api_key: '934178561787478',
    api_secret: 's6RYiLHbAaMlM5N2EBYByjDtIJo'
  });
// CLOUDINARY_CLOUD_NAME=div73bxig
// CLOUDINARY_API_KEY=934178561787478
// CLOUDINARY_API_SECRET=s6RYiLHbAaMlM5N2EBYByjDtIJo
const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})
const upload=multer({storage:storage})

app.post("/upload", upload.single("fileupload"), async (req, res) => {
    // console.log("Received file:", req.file);  // Log the file object
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const x=await v2.uploader.upload(req.file.path)
    fs.unlinkSync(req.file.path)
    return res.json({ message: "File uploaded successfully", file: x.secure_url });
});


app.listen(2001,()=>{
    console.log(`server started at port 2001`);
})