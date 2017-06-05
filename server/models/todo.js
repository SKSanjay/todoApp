var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: {
        type: String
    },
    tags:{
        type: Array,
        default: []
    },
    difficulty:{
        type: Number,
        default: 3
    },
    dateInformation:{
        dateCreated: { type: Date, default: Date.now},
        dateModified: { type: Date, default: null},
        dateCompleted: { type: Date, default: null}
    },
    completed:{
        type: Boolean,
        default: false
    },
    editing:{
        type: Boolean,
        default: false
    }
});