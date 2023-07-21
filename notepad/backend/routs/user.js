const express = require('express');
const route = express.Router();
const User = require('../modules/User')
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
//////ROUTE : 1/////////singup end point////////////////
/////////////// checking validation ///////////// 
route.post('/singup',
  [
    check("username")
      .isLength({ min: 3 })

      .withMessage("the name must have minimum length of 3")

      .trim(),
    check("password")
      .isLength({ min: 8, max: 15 })

      .withMessage("your password should have min and max length between 8-15")

      .matches(/\d/)

      .withMessage("your password should have at least one number")

      .matches(/[!@#$%^&*(),.?":{}|<>]/)

      .withMessage("your password should have at least one sepcial character"),
  ]
  , async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();
    if (hasError) {
      res.status(400).json({ error: error.array() });
    }
    else {
      ////////////////////if already user exist/////////////////////////////
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        res.json({ err: "this user exist alrady" });
      }
      /////////////////////creating a user in DB //////////////////////////////// 
      else {
        //////////////////////hashing password///////////////////////////////
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const user = await User.create({
          username: req.body.username,
          password: hash,
        })
        var token = jwt.sign(user.id, 'babin');
        res.json({ token });
      }
    }
  })
//////////////////////////////////////////////////////////////////////////

///ROUT : 2/////////////////login end point///////////////////////////////
route.post('/login',
  [
    check("username")
      .isLength({ min: 3 })

      .withMessage("the name must have minimum length of 3")

      .trim(),
    check("password")
      .isLength({ min: 8, max: 15 })

      .withMessage("your password should have min and max length between 8-15")

      .matches(/\d/)

      .withMessage("your password should have at least one number")

      .matches(/[!@#$%^&*(),.?":{}|<>]/)

      .withMessage("your password should have at least one sepcial character"),


  ]
  , async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(400).json({ error: error.array() });
     
    }
    else{

      
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(400).json({ "err": "this user not exist" });
      }
      // res.send(user);
      else {
        const passmach = await bcrypt.compare(req.body.password, user.password);
        if (!passmach) {
          res.status(400).json({ err: "wrong password" });
        }
        
        
        /////////////////////sending token for authentication///////////////////////////
        var token = jwt.sign(user.id, 'babin');
        res.json({token});
      }

    }
  })
  
  /////ROUT : 3///////////////getuser end point//////////////////////////////
  route.get('/getuser',fetchuser, async (req, res) => {
    try {
          const id = req.user;
          const user = await User.findById(id).select("-password");
                res.json(user);
        } catch (error) {
          res.status(400).json( error );
        }
  })
module.exports = route;