# SP Games

|                   |   |                       |
|-------------------|---|-----------------------|
|   Author          | : |   Ethan Tan Wee En    |
|   Admin No.       | : |   p2012085            |
|   Class           | : |   DAAA/1B/03          |
|   Languages       | : |   JS, HTML, (CSS)     |
|   Date            | : |   February 2021       |

## Front-End

### Setup

1.  Install NodeJS locally (at least v14.0) (run `node --version` to check)
2.  Ensure npm is installed                 (run `npm --version` to check)
3.  Navigate to `SP Games II/front-end` directory through command line
4.  Run `npm install`
5.  Configure Express Server ([front](#front-end)) settings in the following file:
    -   `app/config/server.conf.js`
6.  Configure Express Server ([back](#back-end)) settings in the following file:
    -   `public/assets/js/global-variables.js`
7.  Run `npm start` to start the front-end server

### File Structure

    front-end ---- app ---- config ---- server.conf.js
               |        |
               |        |-- controllers ---- routes ---- index.js
               |        |                |           `-- other.js
               |        |                |
               |        |                `-- app.js
               |        |
               |        `-- server.js
               |
               |-- public ---- assets ---- css ---- theme ---- sb-admin-2.css
               |           |           |        |
               |           |           |        `-- custom.css
               |           |           |
               |           |           |-- img ---- game-wallpapers
               |           |           |        |
               |           |           |        `-- generic ---- blank.jpg
               |           |           |                     |-- favicon.png
               |           |           |                     |-- logo.png
               |           |           |                     |-- not-found.jpg
               |           |           |                     `-- online-games.jpg
               |           |           |
               |           |           |-- js ---- content ---- admin ---- categories.js
               |           |           |       |            |          |-- games.js
               |           |           |       |            |          `-- platforms.js
               |           |           |       |            |
               |           |           |       |            |-- game.js
               |           |           |       |            |-- games.js
               |           |           |       |            `-- profile.js
               |           |           |       |
               |           |           |       |-- theme ---- sb-admin-2.min.js
               |           |           |       |
               |           |           |       |-- content.js
               |           |           |       |-- global-variables.js
               |           |           |       |-- session.js
               |           |           |       |-- startup.js
               |           |           |       |-- templates.js
               |           |           |       `-- utils.js
               |           |           |
               |           |           `-- vendor ---- bootstrap
               |           |                       |-- fontawesome-free
               |           |                       |-- jquery
               |           |                       `-- jquery-easing
               |           |
               |           `-- index.html
               |
               |-- jsconfig.json
               |-- nodemon.json
               |-- package.json
               `-- package-lock.json

### URLs Supported

|   Route           |   Overview                                    |   Permissions         |
|-------------------|-----------------------------------------------|-----------------------|
|   /               |   Welcome message and background on SP Games  |   none                |
|   /home           |   Welcome message and background on SP Games  |   none                |
|   /games          |   Browse, search and filter games available   |   none                |
|   /game/:id       |   Inspect individual game details and reviews |   member (new review) |
|   /profile        |   View and edit personal user profile         |   member              |
|   /categories     |   Create, edit, and delete game categories    |   admin               |
|   /platforms      |   Create, edit, and delete game platforms     |   admin               |
|   /games-admin    |   Create, edit, and delete games              |   admin               |
|   /login          |   Login to SP Games to gain more access       |   none                |

### Extra Features (front-end)

1.  Website is a Single-Page Application (SPA), using JQuery to load and unload content dynamically
2.  Filter games by these additional conditions:
    1.  Category
    2.  Minimum Price
3.  Games are sorted and displayed alphabetically (ascending)
4.  Reviews can be sorted by these conditions (both ascending and descending):
    1.  Date Created
    2.  Rating
    3.  User
5.  Members can edit and update their profiles, and upload profile images
6.  Administrators have these additional privileges:
    1.  Update and delete existing categories
    2.  Create new platforms
    3.  Update and delete existing platforms
    4.  Update and delete existing games

_[Click Here](#extra-features-back-end)_ to see extra features for the back-end

## Back-End

### Setup

1.  Install NodeJS locally (at least v14.0) (run `node --version` to check)
2.  Ensure npm is installed                 (run `npm --version` to check)
3.  Install MySQL Server locally
4.  Configure MySQL Server `root` account
5.  Start local MySQL Server
6.  Run the following SQL Scripts (either 1 or 2) in MySQL Server:
    1.  init.sql & data.sql  (as root user using `spgames` database)
    2.  dump.sql             (as root user)
7.  Navigate to `SP Games II/back-end` directory through command line
8.  Run `npm install`
9.  Configure MySQL `root` configurations in the following files:
    -   `app/config/database.config.js`
    -   `app/tests/reset-database.js`
10. Configure Express Servers ([front](#front-end) & [back](#back-end)) settings in the following file:
    -   `app/config/server.config.js`
11. Run `npm test` to test the API endpoints or
12. Run `npm start` to start the back-end server

### File Structure

    back-end ---- app ---- config ---- database.config.js
              |        |           |-- secret-key.js
              |        |           `-- server.config.js
              |        |
              |        |-- controllers ---- routes ---- categories.js
              |        |                |           |-- games.js
              |        |                |           |-- platforms.js
              |        |                |           |-- reviews.js
              |        |                |           `-- users.js
              |        |                |
              |        |                |-- app.js
              |        |                `-- restricted.js
              |        |
              |        |-- middleware ---- auth ---- verify-admin.js
              |        |               |         |-- verify-login.js
              |        |               |         |-- verify-token.js
              |        |               |         `-- verify-user.js
              |        |               |
              |        |               |-- verify-data.js
              |        |               `-- verify-id.js
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
              |        |          |-- compare-object-to-signature.js
              |        |          |-- custom-error.js
              |        |          |-- get-current-date-and-time.js
              |        |          |-- image-upload-utilities
              |        |          |-- logs.js
              |        |          `-- query.js
              |        |
              |        `-- server.js
              |
              |-- assets ---- game-images
              |           `-- user-images
              |
              |-- doc ---- table-schema.docx
              |
              |-- logs ---- error
              |         `-- history
              |
              |-- sql ---- data.sql
              |        |-- dump.sql
              |        |-- init.sql
              |        `-- reset.sql
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
              |          |-- sample-token.js
              |          `-- test.spec.js
              |
              |-- jsconfig.json
              |-- nodemon.json
              |-- package.json
              `-- package-lock.json

### Endpoints Supported:

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

### Extra Features (back-end)

1.  Game-Category many-to-many relationship
2.  Game-Platform many-to-many relationship
3.  Upload and retrieval of game images
4.  Upload and retrieval of user images
5.  Additional endpoints to manage categories and platforms

_[Click Here](#extra-features-front-end)_ to see extra features for the front-end

### Modifications (from CA1)

1.  Added one column (`password`) to `users` table
2.  Added `user-images` folder under `assets` to store profile images
3.  Added and mounted middleware to evaluate ids, data bodies, login status, current user and admin permissions
4.  Added endpoints for category and platform management
5.  Removed excess API endpoints (`/`, `/game/:gid/image/info`, and `*`)
6.  Removed unnecessary API endpoints (`GET /users`, `GET /games/:platform`)
7.  Removed html templates
8.  Renamed `src` directory to `app`

## See Also

    docs ---- CA1 Brief.docx        (CA1 assignment brief)
          `-- CA2 Brief.docx        (CA2 assignment brief)

    back-end / docs / table-schema.docx     (MySQL table schema)
