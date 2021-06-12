const mongoose= require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/calorie_tracker", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify:false
}, () => console.log('Connected to MongoDB.'))
