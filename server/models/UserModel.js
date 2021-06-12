const mongoose = require('mongoose')

const User = mongoose.model('User', {
    fname: {
      type: String},
    lname: {
      type: String},
    username: {
      type: String,
      required: true},
    email: {
      type: String,
      required: true,
      unique: true},//validating in database},
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    user_image:{
      type:String,
      default:'images\\no-image.jpg'
    },
    diary_food:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],

  })

  module.exports=User;