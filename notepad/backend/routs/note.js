const express = require('express');
const route = express.Router();
const Note  = require('../modules/Note');
const { check, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser');
const { findById, findByIdAndUpdate } = require('../modules/User');
////ROUTE 1: //////////ROUTE TO MAKE NOTES/////////AUTHENTICATION REQIRED//////////
route.post('/addnote',fetchuser,
  [
    check("title")
      .isLength({ min: 3 })

      .withMessage("the name must have minimum length of 3...1")

      .trim(),
    check("tag")
      .isLength({ min: 3 })

      .withMessage("the name must have minimum length of 3...2")

      .trim(),
    check("description")
      .isLength({ min: 3})

      .withMessage("the name must have minimum length of 3...3"),
]
  , async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();
    if (hasError) {
      res.status(400).json({ error: error.array() });
     }
     else {
        try {
        const note = await Note.create({
            username : req.user,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
        })
        res.json(note);
    } catch (error) {
        console.log(error)
        res.status(400).json( error )
    }
    }
}
)
/////ROUTE 2 : ///////ROUTE TO GET NOTES////////AUTHENTICATION REQIRED//////
route.get('/getnotes',fetchuser, async (req,res)=>{
    const id = req.user;
    const notes = await Note.find({ username: id});
    res.json(notes);
})
////ROUTE : 3///////ROUTE TOO UPDATE NOTE//////AUTHENTICATION REQIRED//////
route.put('/update/:id',fetchuser,async (req,res)=>{
  var newNote = {};
  const title  = req.body.title;
  const description  = req.body.description;
  const tag  = req.body.tag;
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};
  console.log(newNote);
  ///////////cheaking note exist or not for given id ////////////
    console.log(req.params.id)
    const id =  req.params.id;
    var note = await Note.findById(id);
    if(!note){
      res.status(404).send("not found");
    }
    ////////cheaking that user's id maching with database id ////////////
    if(note.username.toString() !== req.user){
      res.status(401).send("not authorised");
    }
    else{
      note = await Note.findByIdAndUpdate(req.params.id, newNote, { new: true })
      res.json(note);
    }
  })
  
  ////ROUTE : 3///////ROUTE TOO UPDATE NOTE//////AUTHENTICATION REQIRED//////
    route.post('/delete/:id',fetchuser,async (req,res)=>{
      ///////////cheaking note exist or not for given id ////////////
      const id =  req.params.id;
      var note = await Note.findById(id);
      if(!note){
        res.status(404).send("not found");
      }
      ////////cheaking that user's id maching with database id ////////////
      if(note.username.toString() !== req.user){
        res.status(401).send("not authorised");
      }
      else{
        note = await Note.findByIdAndDelete(req.params.id);
        res.json(note);
      }
    })
    
    module.exports = route;