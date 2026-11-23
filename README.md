# Notes API

A REST API for creating, reading, updating, and deleting notes. This project is
part of the GoIT Node.js course, Module 2.

## Technologies

- Node.js and Express
- MongoDB with Mongoose
- dotenv for environment variables
- pino-http for HTTP request logging

## Requirements

- Node.js and npm
- A reachable MongoDB instance and its connection string

## Installation

Install the project dependencies:

```sh
npm install
```

Create a `.env` file in the project root and configure the environment
variables:

| Variable    | Required | Description                                      |
| ----------- | -------- | ------------------------------------------------ |
| `MONGO_URL` | Yes      | MongoDB connection string                        |
| `PORT`      | No       | HTTP port; defaults to `3000` when not specified |

Keep the connection string private. The `.env` file is ignored by Git and
should not be committed.

## Run

Start the server with automatic restarts during development:

```sh
npm run dev
```

Start the server normally:

```sh
npm start
```

The API starts listening only after a successful MongoDB connection.

## API

All note routes are prefixed with `/notes` and accept and return JSON.

| Method   | Path             | Description      | Success |
| -------- | ---------------- | ---------------- | ------- |
| `GET`    | `/notes`         | Get all notes    | `200`   |
| `GET`    | `/notes/:noteId` | Get a note by ID | `200`   |
| `POST`   | `/notes`         | Create a note    | `201`   |
| `PATCH`  | `/notes/:noteId` | Update a note    | `200`   |
| `DELETE` | `/notes/:noteId` | Delete a note    | `200`   |

### Note fields

- `title` — required string.
- `content` — optional string; defaults to an empty string.
- `tag` — optional string; defaults to `Todo`. Allowed values: `Work`,
  `Personal`, `Meeting`, `Shopping`, `Ideas`, `Travel`, `Finance`, `Health`,
  `Important`, and `Todo`.
- `createdAt` and `updatedAt` are added automatically.

For example, a request to create a note can use this JSON body:

```json
{
  "title": "Project notes",
  "content": "Review the API",
  "tag": "Work"
}
```

Invalid input or an invalid note ID returns `400`. A missing note or unknown
route returns `404`; unexpected server errors return `500`.

## Checks

```sh
npm run lint
```
