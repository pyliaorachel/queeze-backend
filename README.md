# queeze-backend

Backend for the Queeze app built on Node.js and MongoDB.

## Usage

### Express App

```bash
# Follow the steps in the `DB` section to setup a database server
...

# Install dependencies
$ npm install

# Add a secret key
# See `config/keys.template.js` and insert your key, and change the name to `config/keys.js`

# Run app
$ npm start
```

### DB

###### Create a Database, Connect to Server

[MongoDB Setup](https://docs.mongodb.com/manual/tutorial/getting-started/)
[Mongo Shell](https://docs.mongodb.com/manual/mongo/)

```bash
# Create directory to store data
$ mkdir -p <path-to-data-directory>

# Run DB server, default port 27017
$ mongod --dbpath <path-to-data-directory)

# Start mongo shell
$ mongo --host 127.0.0.1:27017
```

###### Mongo Shell

Optional, used to see if data exists or not in the database.

- Basic operations
    - `use <db-name>`: create/switch to database
    - `show collections`
- CRUD operations
    - `db.collection.insertOne()`, `db.collection.insertMany()`
    - `db.collection.find()`
    - `db.collection.updateOne()`, `db.collection.updateMany()`, `db.collection.replaceOne()`
    - `db.collection.deleteOne()`, `db.collection.deleteMany() `

## API

### User

###### `/login`
###### `/register`

### Quiz

###### `/quiz`
###### `/quiz/create`
###### `/quiz/:quizName`
###### `/quiz/:quizName/edit`
###### `/quiz/:quizName/delete`
