import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    if (!username || !email || !password
        || username === '' || email === '' || password === '') {
        //    return res.status(400).json({message:"All Fields are requried "})
        next(errorHandler(400, "All Fields are required!"))
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
    })
    try {
        await newUser.save();
        res.json({ message: "Sign up Sucessfully" })
    } catch (error) {
        next(error)
    }
}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, "all fields are required"))
    }
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, "User not Found"))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        console.log("hero nawaz");
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid Password'))
        }
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET,
        )
        const { password: pass, ...rest } = validUser._doc

        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest)



    } catch (error) {
        next(error)
    }
}


export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    console.log("photo"+googlePhotoUrl);
    console.log(name);
    try {
      const user = await User.findOne({ email });
      console.log(user);
      // If the user already has an account
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password, ...rest } = user._doc;
  
        res.status(200).cookie('access_token', token, {
          httpOnly: true,
        }).json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
  
        const newUser = new User({
          username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(3),
          email,
          profilePicture: googlePhotoUrl,
          password: hashedPassword, // Don't forget to set the password
        });
  
        await newUser.save();
  
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password, ...rest } = newUser._doc;
  
        res.status(200).cookie('access_token', token, {
          httpOnly: true,
        }).json(rest);
      }
    } catch (error) {
      next(error);
    }
  };