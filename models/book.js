const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : 'hi',
    authors : [
        'PL',
        'seonghun120614@gmail.com'
    ],
    publishedDate : Date.now(),
    tags : ['Computer'],
});

// Create new book document
bookSchema.statics.create = function(payload){
    const book = new this(payload);
    return book.save();
};

//Find All
bookSchema.statics.findAll = function (){
    return this.find({});
};

//Find One by book
bookSchema.statics.findOneByToBook = function(book){
    return this.findOne({book});
};

//Update
bookSchema.statics.updateByBook = function(book, payload){
    return this.findOneAndUpdate({ book }, payload, { new: true });
};

//Delte
bookSchema.statics.deltedByTodoid = function(book){
    return this.remove({ book });
};

// Delete by book
bookSchema.statics.deleteByBook = function(book){
    return this.remove({ book });
};

// create model & export
module.exports = mongoose.model('Book', bookSchema);