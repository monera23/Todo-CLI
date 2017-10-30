const mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	priority: {
		type: Number,
		required: true,
	}
});

module.exports = { Todo };