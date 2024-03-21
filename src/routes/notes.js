const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const { isAuthenticated } = require("../helpers/auth");

router.get("/notes/add", isAuthenticated, (req, res) => {
  res.render("notes/new-note");
});

router.post("/notes/new-note", async (req, res) => {
  const { title, task } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "por favor ingrese un titulo" });
  }
  if (!task) {
    errors.push({ text: "por favor ingrese su tarea" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      task,
    });
  } else {
    const newNote = new Note({ title, task});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "nota agregada con exito");
    res.redirect("/notes");
  }
});


router.get("/notes", isAuthenticated, async (req, res) => {
  const notes = await Note.find({user: req.user.id}).lean().sort({ date: "desc" });
  res.render("./notes/new-note", { notes });
});

router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if(note.user != req.user.id){
    req.flash('sucess_msg', 'no autorizado');
    return res.redirect('/notes');    
  }
  res.render("notes/edit-note", { note });
});

router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
  const { title, task } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, task });
  req.flash("success_msg", "nota actualizada con exito");
  res.redirect("/notes");
});

router.delete("/notes/delete/:id", isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  if(Note.user != req.user.id){
    req.flash('error_msg', 'no autorizado');
    res.redirect("/notes");
  }else{      
  req.flash("success_msg", "nota eliminada con exito");
  res.redirect("/notes");
  }
});

module.exports = router;
