var express = require('express');
var router = express.Router();
const multer  = require('multer')
const productController = require('../controller/product');
const userController = require('../controller/user')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/product')
    },
    filename: function (req, file, cb) {
        // console.log(file);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })

  const cpUpload = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }])


//======================Add Product======================
router.post('/add',cpUpload,productController.addProduct);

//======================All Product======================
router.get('/all',userController.CHECKJWT,productController.allProduct);

//======================Update Product======================
router.patch('/update/:id',cpUpload,productController.updateProduct);

//======================Delete Product======================
router.delete('/delete/:id',productController.deleteProduct);

//======================All Data======================
router.get('/alldata',productController.alldataProduct);

//======================Serachbycategory Product======================
router.get('/search/:id', productController.searchbyCategory);

//======================searchbyname Product======================
router.get('/search', productController.searchProduct);

//======================Pagination======================
router.get('/page',productController.allPage)

//======================Group======================
router.get('/products',productController.Group)


module.exports = router;