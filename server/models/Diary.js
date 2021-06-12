const mongoose = require('mongoose')

const Diary = mongoose.model('Diary', {
    food_image: {
     type: String,
     default:"images\\no-image.jpg" 
    },

    food_name: {
      type: String,
      required: true,
    },

    food_calories: {
      type: Number,
      required: true,
    },

    food_quantity:{
        type: Number
      },

    food_description:{
      type: String
    },

    food_total_calories:{
      type: Number
    },

    category:{
      type: String 
    },
    
    userId:{
        type:String }
  })

  module.exports = Diary;