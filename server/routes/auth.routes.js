const Router = require("express")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
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

    const hashPassword = await bcrypt.hash(password, 15)
    const user = new User({email, password: hashPassword})
    await user.save()
    return res.json({message:"Пользователь создан"})

  } catch (e) {
      console.log(e)
      res.send({message:"Server error"})
  }
})

module.exports = router
