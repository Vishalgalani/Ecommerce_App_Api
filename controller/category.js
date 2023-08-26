const CATEGORY = require('../model/category')


//======================Add Category======================
exports.addCategory = async function(req, res, next) {
    try {
        // console.log(req.body);
        // console.log("file",req.file);
        req.body.image = req.file.filename
        if(!req.body.name || !req.body.image){
            throw new Error("please enter valid field")
        }
        const data = await CATEGORY.create(req.body)
        res.status(201).json({
            status : "successfully",
            message : "Category is created",
            data
        })
        
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
  }

//======================All Category======================
  exports.allCategory = async function(req, res, next) {
    try {
        // console.log(req.body);
        const data = await CATEGORY.find()
        res.status(200).json({
            status : "successfully",
            message : "all data found",
            data
        })       
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
  }


//======================Update Category======================
  exports.updateCategory = async function(req, res, next) {
    try {
        if(req.file){
            req.body.image = req.file.filename
            } 
            await CATEGORY.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({
            status : "successfully",
            message : "category is updated",
        })       
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
  }

//======================Delete Category======================
  exports.deletCategory = async function(req, res, next) {
    try {
            await CATEGORY.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status : "successfully",
            message : "category is deleted",
        })       
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
        })
    }
  }