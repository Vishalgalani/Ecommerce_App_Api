const PRODUCT = require('../model/product')
const CATEGORY = require('../model/category')


//======================Add Product======================
exports.addProduct = async function (req, res, next) {
    try {
        // console.log(req.body);
        // console.log('file',req.file);`
        console.log('files', req.files);
        var thumbnail = req.files.thumbnail
        // console.log(thumbnail);
        thumbnail.map((el) => {
            console.log(el.filename);
            req.body.thumbnail = el.filename
        })
        // console.log(req.files.thumbnail.filename);
        req.body.images = []
        // console.log(req.files);
        var file = req.files.images
        file.map((el) => {
            // console.log(el.filename);
            req.body.images.push(el.filename)
        })
        if (!req.body.title || !req.body.description || !req.body.price || !req.body.discountPercentage || !req.body.rating || !req.body.stock || !req.body.brand || !req.body.category || !req.body.thumbnail || !req.body.images || !req.body.images.length) {
            throw new Error("please enter valid field")
        }
        const checkCat = await CATEGORY.findById(req.body.category)
        if (!checkCat) {
            throw new Error("category in not allow")
        }
        const data = await PRODUCT.create(req.body)
        res.status(201).json({
            status: "successfully",
            message: "product is created",
            data

        })

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

//======================All Product======================
exports.allProduct = async function (req, res, next) {
    try {
        const data = await PRODUCT.find()
        res.status(200).json({
            status: "sucessfully",
            message: "data is found",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })

    }
};


//======================Update Product======================
exports.updateProduct = async function (req, res, next) {
    try {
        // console.log(req.body);
        const getdata = await PRODUCT.findById(req.params.id)
        const data = { ...getdata._doc, ...req.body }
        // console.log(data);

        if (req.files.thumbnail) {
            var thumbnail = req.files.thumbnail
            // console.log(thumbnail);
            thumbnail.map((el) => {
                console.log(el.filename);
                data.thumbnail = el.filename
            })
        }
        // console.log(req.files.thumbnail.filename);
        if (req.files.images) {
            data.images = []
            // console.log(req.files);
            var file = req.files.images
            file.map((el) => {
                console.log(el.filename);
                data.images.push(el.filename)
            })
        }
        const checkCat = await CATEGORY.findById(data.category)
        if (!checkCat) {
            throw new Error("category in not allow")
        }
        await PRODUCT.findByIdAndUpdate(req.params.id, data)
        res.status(200).json({
            status: "successfully",
            message: "product is updated",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

//======================Delete Product======================
exports.deleteProduct = async function (req, res, next) {
    try {
        await PRODUCT.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "successfully",
            message: "product is deleted",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

//======================All Data======================
exports.alldataProduct = async function (req, res, next) {
    try {
        const data = await PRODUCT.find().populate('category')
        res.status(200).json({
            status: "sucessfully",
            message: "data is found",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })

    }
};

//======================Serachbycategory Product======================
exports.searchbyCategory = async function (req, res, next) {
    try {

        const data = await PRODUCT.find({ category: { $eq: req.params.id } })
        // console.log(data);
        res.status(200).json({
            status: "sucessfully",
            message: "Data is found",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};

//======================Searchbyname Product======================
exports.searchProduct = async function (req, res, next) {
    try {
        const data = await PRODUCT.find({ title: { "$regex": req.query.q, '$options': 'i' } })
        console.log(data)

        res.status(200).json({
            status: "sucessfully",
            message: "data is found",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};


//======================Pagination======================
exports.allPage = async function (req, res, next) {
    try {
        let page = req.query.page || 0
        let productPerPage = 2

        const data = await PRODUCT.find().skip(page * productPerPage).limit(productPerPage)
        // console.log(data)

        res.status(200).json({
            status: "sucessfully",
            message: "page is found",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};
