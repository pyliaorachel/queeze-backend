# queeze-backend

Backend for the Queeze app built on Node.js and MongoDB.

## Usage

### Express App

```bash
# Follow the steps in the `DB` section to setup a database server
...

# Install dependencies
$ npm install

# Export a secret key to environment variable
$ export SECRET=<secret-key>

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

- POST request
    - `body`: `{ username: <username>, password: <password> }`
- Return plain text or error
    - `<token>`

###### `/register`

- POST request
    - `body`: `{ username: <username>, password: <password> }`
- Return plain text or error
    - `<token>`

### Quiz

###### `/quiz`

- GET request
    - `header`: `{ Authorization: 'Bearer <token>' }`
- Return json or error

_Returns_
```json
[
    {
        "questions": [
            "5bbab09a91e40f69b4312f7f"
        ],
        "_id": "5bbab09a91e40f69b4312f7e",
        "name": "Quiz2",
        "user": "rachel",
        "createdAt": "2018-10-08T01:19:22.326Z",
        "updatedAt": "2018-10-08T01:19:22.326Z",
        "__v": 0
    }
]
```

###### `/quiz/create`

- POST request
    - `header`: `{ Authorization: 'Bearer <token>' }`
    - `body`: json
- Return plain text or error
    - `<quizId>`

_Body_
```
{
	"name": "Quiz2",
	"questions": [
		{
			"text": "Who is the GOAT of tennis?",
			"choices": [
				"Rafael Nadel",
				"Roger Federer",
				"Novak Djokovic"
			],
			"answer": 1
		}
	]
}
```

###### `/quiz/:quizName`

- GET request
    - `header`: `{ Authorization: 'Bearer <token>' }`
- Return json or error

_Returns_
```json
[
    {
        "choices": [
            "Rafael Nadel",
            "Roger Federer",
            "Novak Djokovic"
        ],
        "_id": "5bbab09a91e40f69b4312f7f",
        "text": "Who is the GOAT of tennis?",
        "answer": 1,
        "user": "rachel",
        "quizName": "Quiz2",
        "__v": 0
    }
]
```

###### `/quiz/:quizName/edit`

- POST request
    - `header`: `{ Authorization: 'Bearer <token>' }`
    - `body`: json
- Return plain text or error
    - `<quizId>`

_Body_
```
{
	"name": "Quiz2_new",
	"questions": [
		{
			"text": "Who is the GOAT of tennis?",
			"choices": [
				"Rafael Nadel",
				"Roger Federer",
				"Novak Djokovic",
				"Pete Sampras",
                "Andre Agassi"
			],
			"answer": 1
		}
	]
}
```

###### `/quiz/:quizName/delete`

- GET request
    - `header`: `{ Authorization: 'Bearer <token>' }`
- Return plain text or error
    - `<quizName>`
