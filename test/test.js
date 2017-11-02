process.env.NODE_ENV = 'test';

var shell = require('shelljs');
const { mongoose } = require('../db/mongoose');
const { Todo } = require('../db/models/todo');
const { ObjectID } = require('mongodb');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var Promise = require("bluebird");


describe('cli test', function() {
	before( async function() {
    	// runs before all tests in this block
    	Todo.remove({}).then((docs) => {
    	}, (err) => {
    		console.log(err);
    	})
  	});

	after( async function() {
    	// runs after all tests in this block
    	Todo.remove({}).then((docs) => {
    	}, (err) => {
    		console.log(err);
    	})
  	});

	it('should add a new todo', async function(){
		shell.exec('todo add "New todo 1" 2');
		const ct1 = await Todo.count({});
		expect(ct1).to.equal(1);

		shell.exec('todo add "New todo 2" 3');
		const ct2 = await Todo.count({});

		expect(ct2).to.equal(2);
	});

	it('should remove a todo', async function(){
		let todo = new Todo({
			'text': "To be removed todo",
			'priority': 5
		})

		let todo_obj = await todo.save();

		shell.exec(`todo remove "${todo_obj._id}"`);
		let ct = await Todo.count({});
		expect(ct).to.equal(2);
	})
});