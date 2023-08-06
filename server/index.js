const express = require('express');
const path = require('path');

const app = express();

require('dotenv').config();

const port = process.env.STATUS === 'production' ? process.env.PROD_PORT : process.env.DEV_PORT;

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Memorize listening on ${port}!`));