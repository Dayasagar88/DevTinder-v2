import multer from "multer"
import path from "path"

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "uploads/")

  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9)

    cb(null, uniqueName + path.extname(file.originalname))

  }

})

const fileFilter = (req, file, cb) => {

  const allowed = ["image/png","image/jpg","image/jpeg","image/webp"]

  if(allowed.includes(file.mimetype)){
    cb(null,true)
  } else {
    cb(new Error("Only image files allowed"),false)
  }

}

export const upload = multer({
  storage,
  fileFilter
})