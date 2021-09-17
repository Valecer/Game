const Router = require("express")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const {check,validationResult} = require("express-validator")
const router = new Router()

router.post('/signup',
  [
    check('email',"Неправильный email").isEmail(),
    check('password',"Пароль должен быть длиннее 3 символов и короче 12 символов").isLength({min:3, max:12})
  ],
  async (req, res)=>{
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message:"Неправильный запрос", errors})
    }

    const{email,password,username} = req.body

    const candidate = await User.findOne({email})
    const candidate1 = await User.findOne({username})

    if(candidate) {
      return res.status(400).json({message: 'Пользователь с такой почтой ${email} уже существует'})
    }
    if(candidate1) {
      return res.status(400).json({message: 'Пользователь с таким никнеймом ${username} уже существует'})
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = new User({email, password: hashPassword,username})
    await user.save()
    return res.json({message:"Пользователь создан"})

  } catch (e) {
      console.log(e)
      res.send({message:"Server error"})
  }
})


router.post('/signin',
  async (req, res)=>{
  try {
    const {username, password} = req.body
    const user = await User.findOne({username})
    if (!user){
      return res.status(404).json({message: "Пользователь не найден"})
    }
    const isPassValid = bcrypt.compareSync(password, user.password)
    if(!isPassValid) {
        return res.status(400).json({message: "Неправильный пароль"})
    }
    const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn:"2h"})
    return res.json({
      token,
      user:{
        id: user.id,
        email: user.email,
        username: user.username,
        group: user.group
      }
    })

  } catch (e) {
      console.log(e)
      res.send({message:"Server error"})
  }
})

module.exports = router
