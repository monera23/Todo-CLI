# Todo-CLI

A node.js Todo-CLI that has 3 operations: add, remove and show todos. It uses mongodb to store the todos. You can use this to save your todos with a priority value using the terminal.

## Usage

### Commands available
```
$ todo <command> [arguments]

Commands:
  add  Add a new todo with priority
  show  Fetch all todos
  remove Remove a particular todo

Options:
 --help  Show help                             [boolean]
  
```

#### Command `add`
```
$ todo add <text> <priority>

Options:
  --help  Show help                             [boolean]

Examples:
  $ todo add "make-cli" 5

```

#### Command `show`
```
$ todo show

Options:
  --help  Show help                             [boolean]

Examples:
  $ todo show

```

#### Command `remove`
```
$ todo remove <id>

Options:
  --help  Show help                             [boolean]

Examples:
  $ todo remove "id"

```