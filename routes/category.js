var express = require('express');
var router = express.Router();
const multer  = require('multer')
const categoryController = require('../controller/category')
const userController = require('../controller/user')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/category')
    },
    filename: function (req, file, cb) {
        // console.log(file);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })
  
//======================Add Category======================
router.post('/add',upload.single('image'),categoryController.addCategory);

//======================All Category======================
router.get('/all',userController.CHECKJWT,categoryController.allCategory);

//======================Update Category======================
router.patch('/update/:id',upload.single('image'),categoryController.updateCategory);

//======================Delete Category======================
router.delete('/delete/:id',categoryController.deletCategory);

module.exports = router;
