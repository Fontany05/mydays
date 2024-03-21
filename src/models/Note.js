const mongoose = require('mongoose')
const {Schema} = mongoose;

const NoteSchema = new Schema({
    title: { type: String, require: true},
    task: { type: String, require: true},
    date: { type: Date, default: Date.now},
    user: { type: String, require}
})

module.exports = mongoose.model('Note', NoteSchema)