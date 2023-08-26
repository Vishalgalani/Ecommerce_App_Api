const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;


const productSchema = new Schema({
    title : {
    type : String,
    unique : true
  },
  description : String,
  price : String,
  discountPercentage : String,
  rating : Number,
  stock : String,
  brand : String,
  category : { type: Schema.Types.ObjectId, ref: 'category' },
  thumbnail : String,
  images  : [String]

})

const PRODUCT = mongoose.model('product', productSchema);

module.exports = PRODUCT
