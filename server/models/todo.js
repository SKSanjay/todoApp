var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: {
        type: String
    },
    tags:{
        type: Array,
        default: [1, '2', '3']
    },
    difficulty:{
        type: Number,
        default: 2
    },
    dateInformation:{
        dateCreated: { type: Date, default: Date.now}
    }
});