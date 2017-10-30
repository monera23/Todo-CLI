#!/usr/bin/env node


const yargs = require('yargs');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./db/models/todo');
const { ObjectID } = require('mongodb');
const Table = require('cli-table');
const chalk = require('chalk');

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose connection error: ' + err);
}); 

const argv =  yargs
	.usage('Usage $0 <command> [arguments]')
	.command('add', 'Add a todo with priority between 1(low) and 5(high)', function(yargs){
		const argv = yargs
			.usage('Usage: $0 add <to-do> <priority>')
			.demandCommand(2,'You need to provide todo and priority')
			.example('$0 add "make cli" 5')
			.help()
			.argv

			// console.log("Got arguments");
			// console.log(argv);

			var todo = new Todo({
				text: argv._[1],
				priority: argv._[2]
			});

			todo.save().then((inTodo) => {
				console.log("Created todo ", inTodo);
				process.exit(-1);
			}, (err) => {
				console.log(err);
				process.exit(-1);
			});
	})
	.command('show', 'Shows all todos', function(yargs){
		const argv = yargs
			.usage('Usage: $0 show')
			.example('$0 show')
			.help()
			.argv

			// console.log("Got arguments");
			// console.log(argv);

			var todoTable = new Table({
          		head: ['ObjectID', 'Text', 'Priority'],
	          	colWidths: [28, 15, 15],
		        style: {
		          head: ['cyan']
		        }
	        });

			Todo.find({})
				.then((todos) => {
					if(todos.length) {
						for (td of todos) {
							todoTable.push([td._id, td.text, td.priority]);
						}
						console.log(todoTable.toString());
					} else {
						console.log(chalk.yellow.bold('Nothing Here. Add a todo'));
						console.log(chalk.yellow(' Example: todo add "make cli" 5'));
					}
					process.exit(-1);
				}, (err) => {
					console.log(err);
					process.exit(-1);
				})

	})
	.command('remove', 'Remove a todo', function(yargs){
		const argv = yargs
			.usage('Usage: $0 remove <_id>')
			.example('$0 remove "id"')
			.help()
			.argv

			console.log("Got arguments");
			console.log(argv);
			Todo.remove({"_id": ObjectID(argv._[1])})
				.then((todo) => {
					process.exit(-1);
				}, (err) => {
					console.log(err);
					process.exit(-1);
				})

	}).argv;