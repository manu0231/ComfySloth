const path = require('path')
const fs = require('fs')
const multer = require('multer')


// console.log(path.join(__dirname, '../public/uploads'))
// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.join(__dirname,"../public/uploads")
    cb(null, filePath) // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `file_${Date.now()}${ext}`) // File naming scheme
  },
})
const upload = multer({ storage: storage })



module.exports ={
    uploadSingleFile: upload.single('file')
}