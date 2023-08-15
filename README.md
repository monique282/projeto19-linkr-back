# projeto19-linkr-back

This is a template for a back-end restful API
It contains the following libraries as default dependencies:

    mongodb
    dotenv
    joi
    express
    cors
    uuid

Requirements

    mongodb version 6.0 or later
    node.js

Usage

    Development mode -> auto-reloads when a file in the app is modified.

npm run dev

    Non development mode -> need to re-run after modify a script.

npm start

!Attention!

This template comes with a .env file that normally you do not want to commit case it usually is a file that you store API keys and or other sensitive information.

You probally want to add a line to the .gitinore file with the text below so it wont be pushed to your repository on the next commit.

.env
