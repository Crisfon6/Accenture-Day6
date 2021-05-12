const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const request = require('request');
const path = require('path');


const app = express();

dotenv.config();
const port = process.env.PORT || 3000;


app.use(express.static('views'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/spotify/', (req, resp) => {
    let client_id = process.env.CLIENT_ID;
    let client_secret = process.env.CLIENT_SECRET;
    console.log(client_id, client_secret);
    let spotifyUrl = 'https://accounts.spotify.com/api/token';

    var authOptions = {
        url: spotifyUrl,
        headers: {
            Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };


    request.post(authOptions, (err, httpResponse, body) => {

        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'No se pudo obtener el token',
                err
            })
        }
        resp.json(body);
    });
});
app.listen(port, () => {
    console.log(`Runing on port ${port}`);
})