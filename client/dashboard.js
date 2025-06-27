require('dotenv').config()
const express = require('express')
const path = require('path')
const https = require('https');
const fs = require('fs');

const PORT = process.env.REACT_APP_PORT || 3000

const app = express()
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))
app.use((req, res, next) => {
    if (req.protocol === 'http') {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }

    next();
});

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const httpsServer = https.createServer(credentials, app);

const start = async () => {
    try {       
        httpsServer.listen(PORT, () => {
            console.log('HTTPS Server AdminClient running on port ' + PORT);
        });

    } catch (error) {
        console.log(error)
    }
}

start()

