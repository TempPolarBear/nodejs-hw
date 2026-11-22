# 01-express

A small Express.js API for the GoIT Node.js coursework project.

## Requirements

- Node.js and npm

## Install

```sh
npm install
```

## Run

```sh
npm start
```

For development with automatic restarts:

```sh
npm run dev
```

The server listens on `PORT` when it is set, or port `3000` otherwise.

## API

| Method | Path             | Response                                        |
| ------ | ---------------- | ----------------------------------------------- |
| `GET`  | `/notes`         | `{"message":"Retrieved all notes"}`             |
| `GET`  | `/notes/:noteId` | `{"message":"Retrieved note with ID: 42"}`      |
| `GET`  | `/test-error`    | `500` with `{"message":"Something went wrong"}` |

Unknown routes return `404` with `{"message":"Route not found"}`. The `/test-error`
route intentionally forwards an error to the error-handling middleware.

The server enables CORS, parses JSON request bodies, loads local environment
variables through dotenv, and logs HTTP requests with Pino.

## Checks

```sh
npm run lint
npx prettier --check .
```

## Deploy on Render

Create a Node.js Web Service connected to `TempPolarBear/nodejs-hw` and the
`01-express` branch. Use `npm ci` as the build command and `npm start` as the
start command. Render provides the `PORT` environment variable; the server binds
to `0.0.0.0`.
