const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');

const cwd = process.cwd();

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const thoughts = cwd.includes('Module-18-Challenge')
    ? cwd.split('Module-18-Challenge')[1]
    : cwd;
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for ${thoughts} running on port ${PORT}!`);
    });
});