const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;


const categorySchema = new Schema({
  name : {
    type : String,
    unique : true
  },
  image : String
})

const CATEGORY = mongoose.model('category', categorySchema);

module.exports = CATEGORY
