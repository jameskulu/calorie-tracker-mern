const mongoose = require('mongoose')

const Food = mongoose.model('Food', {
    food_image: {
      type: String,
      default:'images\\no-image.jpg'
    },
    food_name: {
      type: String,
      required: true,
      unique: true,
    },
    food_calories: {
      type: Number,
      required: true,
    },
    food_description:{
      type: String,
    },
    category:{
      type: String,
    }
  })

  module.exports=Food;