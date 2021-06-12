const mongoose = require('mongoose')

const Category = mongoose.model('Category', {
    category_name: {
      type: String,
      required: true,
    },
    category_image:{
      type: String,
      default:'images\\no-image.jpg'
    }
  })

  module.exports=Category;