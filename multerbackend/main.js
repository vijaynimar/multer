import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import cors from "cors"
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // Now we have the __dirname equivalent


const app=express()
app.use(cors())
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
    console.log("Received file:", req.file);  // Log the file object
    if (!req.file) {
        console.log("No file uploaded");
        return res.status(400).json({ error: "No file uploaded" });
    }
    return res.json({ message: "File uploaded successfully", file: req.file });
});


app.listen(2001,()=>{
    console.log(`server started at port 2001`);
})