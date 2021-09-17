const {Schema,model} = require("mongoose")

const User = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  username: {type: String, required: true},
  group: {type: String, required: false}
})

module.exports = model('User',User)
