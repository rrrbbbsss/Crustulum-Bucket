# Crustulum Bucket

## Table of Contents

1. [Description](#Description)
1. [Technologies Used](#Technologies-Used)
1. [Installation](#Installation)
1. [Deployed Instance](#Deployed-Instance)
1. [Questions](#Questions)

## Description

The best paste bin site ever made.
![img](.)

## Technologies Used

- [Express](https://expressjs.com/) Web framework
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) Password hashing
- [Apollo-server-express](https://www.npmjs.com/package/apollo-server-express) Server framework
- [Dotenv](https://www.npmjs.com/package/dotenv) Loads environment variables
- [Graphql](https://www.npmjs.com/package/graphql) Query Language
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) Token implementation
- [Mongoose](https://github.com/Automattic/mongoose) MongoDB ODM
- [UUID](https://www.npmjs.com/package/uuid) RFC4122 UUIDs
- [React](https://reactjs.org/) Front-end framework
- [Bootstrap](https://getbootstrap.com/) CSS Variables

## Installation

install root dependencies, then install client/server dependencies:

```sh
$ npm install
$ npm run install
```

setup the following env vars in `./server/.env`:

```
JWT_SECRET='<string: your super secret for your tokens>'
PASTE_PER_USER='<integer: maximum number of pastes a user can have>'
PASTE_PERIOD='<integer: lifetime of a paste in seconds before it is deleted>'
```

seed the database:

```sh
$ npm run seed
```

run the development setup:

```sh
$ npm run develop
```

## Deployed Instance

This [link]() will take you to a deployed instance of the app.

## Questions

- [swvmpdad](https://github.com/swvmpdad)
- [t-Rummy](https://github.com/T-rummy)
- [coleyrockin](https://github.com/coleyrockin)
- [rrrbbbsss](https://github.com/rrrbbbsss)
