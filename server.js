const { urlencoded } = require('express');
const express = require('express');
const auth = require('./app/routers/auth');
const routes = require('./app/routers/routes')
require('dotenv').config();
const db = require('./db/models/index');


const app = express();
const port = process.env.PORT || 3045;


(async () => {
    await db.sequelize.sync();
    app.listen(port, () => {
        console.log(`Running on http://localhost::${port}`);
      });
})();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.use('/laundry', auth)
app.use('/laundry', routes)