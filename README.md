# SP Games

|                   |   |                       |
|-------------------|---|-----------------------|
|   Author          | : |   Ethan Tan Wee En    |
|   Admin No.       | : |   p2012085            |
|   Class           | : |   DAAA/1B/03          |
|   Languages       | : |   JS, HTML, (CSS)     |
|   Date            | : |   December 2020       |

## Front-End

### Setup

1.  Install NodeJS locally (at least v14.0) (run `node --version` to check)
2.  Ensure npm is installed (run `npm --version` to check)
3.  Navigate to `SP Games II/front-end` directory through command line
4.  Run `npm install`
5.  Configure Express Server (front) settings in the following file:
    -   `app/config/server.conf.js`
6.  Run `npm start` to start the front-end server

### File Structure

### URLs

/
/home
/games
/game-:id
/profile
/categories
/platforms
/games-admin

### Extra Features


## Back-End

### Setup

1.  Install NodeJS locally (at least v14.0) (run `node --version` to check)
2.  Ensure npm is installed (run `npm --version` to check)
3.  Install MySQL Server locally
4.  Configure MySQL Server `root` account
5.  Start local MySQL Server
6.  Run the following SQL Scripts (either 1 or 2) in MySQL Server:
    1.  init.sql & data.sql  (as root user)
    2.  dump.sql             (as root user using spgames database)
7.  Navigate to `SP Games II/back-end` directory through command line
8.  Run `npm install`
9.  Configure MySQL `root` configurations in the following files:
    -   `app/config/database.config.js`
    -   `app/tests/reset-database.js`
10. Configure Express Server (back) settings in the following file:
    -   `app/config/server.config.js`
11. Run `npm test` to test the API endpoints or
12. Run `npm start` to start the back-end server

### File Structure

    SP Games ---- assets ---- game-images
              |           |-- endpoints-supported.html
              |           `-- game-image-info.html
              |
              |-- docs ---- CA1 Brief.docx
              |         `-- table-schema.docx
              |
              |-- logs ---- error
              |         `-- history
              |
              |-- sql ---- data.sql
              |        |-- dump.sql
              |        |-- init.sql
              |        `-- reset.sql
              |
              |-- src ---- config ---- database.config.js
              |        |           `-- server.config.js
              |        |
              |        |-- controllers ---- routes ---- categories.js
              |        |                |           |-- games.js
              |        |                |           |-- other.js
              |        |                |           |-- reviews.js
              |        |                |           |-- root.js
              |        |                |           `-- users.js
              |        |                |
              |        |                `-- app.js
              |        |
              |        |-- models ---- associative ---- G_C.js
              |        |           |                `-- G_P.js
              |        |           |
              |        |           |-- Categories.js
              |        |           |-- Games.js
              |        |           |-- Platforms.js
              |        |           |-- Reviews.js
              |        |           `-- Users.js
              |        |
              |        |-- utils ---- callbacks.js
              |        |          |-- common-errors.js
              |        |          |-- compare-object-to-signature.js
              |        |          |-- get-current-date-and-time.js
              |        |          |-- image-upload-utilities
              |        |          |-- logs.js
              |        |          `-- query.js
              |        |
              |        `-- server.js
              |
              |-- tests ---- endpoints ---- 1.spec.js
              |          |              |-- 2.spec.js
              |          |              |-- 3.spec.js
              |          |              |-- 4.spec.js
              |          |              |-- 5.spec.js
              |          |              |-- 6.spec.js
              |          |              |-- 7.spec.js
              |          |              |-- 8.spec.js
              |          |              |-- 9.spec.js
              |          |              |-- 10.spec.js
              |          |              `-- 11.spec.js
              |          |
              |          |-- reset-database.js
              |          `-- test.spec.js
              |
              |-- jsconfig.json
              |-- nodemon.json
              |-- package.json
              |-- package-lock.json
              `-- README.md

### Endpoints supported:

|   No. |   Method  |   Route                                       |   Body?   |   Code    |
|-------|-----------|-----------------------------------------------|-----------|-----------|
|   1   |   GET     |   /users                                      |   NO      |   200     |
|   2   |   POST    |   /users                                      |   YES     |   201     |
|   3   |   GET     |   /users/:id/                                 |   NO      |   200     |
|   4   |   POST    |   /category                                   |   YES     |   204     |
|   5   |   PUT     |   /category/:id/                              |   YES     |   204     |
|   6   |   POST    |   /game                                       |   YES     |   201     |
|   7   |   GET     |   /games/:platform                            |   NO      |   200     |
|   8   |   DELETE  |   /game/:id                                   |   NO      |   204     |
|   9   |   PUT     |   /game/:id                                   |   YES     |   204     |
|   10  |   POST    |   /user/:uid/game/:gid/review/                |   YES     |   201     |
|   11  |   GET     |   /game/:id/review                            |   NO      |   200     |
|   12  |   POST    |   <a id='post-img'></a>/game/:gid/image       |   YES     |   204     |
|   13  |   GET     |   <a id='get-img'></a>/game/:gid/image        |   NO      |   200     |
|   14  |   GET     |   <a id='get-info'></a>/game/:gid/image/info  |   NO      |   200     |

## Extra Features

1.  [Endpoint for upload of game images](#post-img)
2.  [Endpoint for retrieval of game images](#get-img)
3.  [Endpoint for detailed retrieval of game images](#get-info)
4.  Error logging { logs/error }
5.  Query logging { logs/history }
6.  Game-Category many-to-many relationship
7.  Game-Platform many-to-many relationship
8.  Program testing
9.  More specific error response codes (404, 415, 422, etc.)
10. ES6 Import/Export Syntax
11. JSDoc annotations

### Modifications (from CA1)

1.  Added and mounted middleware to evaluate ids, data bodies, login status, current user and admin permissions
2.  Added endpoints for category and platform management
3.  Removed excess API endpoints (`/`, `/game/:gid/image/info`, and `*`)
4.  Removed html templates
5.  Renamed `src` directory to `app`

## See Also

    docs ---- CA1 Brief.docx        (CA1 assignment brief)
          `-- CA2 Brief.docx        (CA2 assignment brief)

    back-end / docs / table-schema.docx     (MySQL table schema)
