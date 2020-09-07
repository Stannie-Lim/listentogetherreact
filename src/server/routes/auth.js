const qs = require('qs')
const axios = require('axios');
const router = require('express').Router();
require('dotenv').config();

module.exports = router;

// root route is /api/auth

router.get('/', async(req, res, next) => {
    const scopes = ["streaming", "user-read-email", "user-read-private", "user-modify-playback-state", "user-read-playback-state"].join('%20');
    try {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${ process.env.CLIENT_ID }&response_type=code&scope=${ scopes }&redirect_uri=${ encodeURIComponent(process.env.REDIRECT_URI) }`;
        res.redirect(authUrl);
    } catch(err) {
        next(err);
    }
});

router.get('/callback', async(req, res, next) => {
    const { code } = req.query;
    const body = {
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    };
    try {
        const { access_token, refresh_token } = (await axios.post(`https://accounts.spotify.com/api/token`, qs.stringify(body), { 
            headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        }})).data;
        res.redirect(`http://localhost:3000/#/${qs.stringify({ access_token, refresh_token })}`);
    } catch(err) {
        next(err);
    }
});

router.post('/login', async(req, res, next) => {
    const { code, url } = req.body;
    const body = {
        code,
        grant_type: "authorization_code",
        redirect_uri: url,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    };
    try {
        const token = (await axios.post(`https://accounts.spotify.com/api/token`, qs.stringify(body), { 
            headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        }})).data;
        res.send(token);
    } catch(err) {
        next(err);
    }
});

router.get('/me', async(req, res, next) => {
    const { authorization } = req.headers;
    try {
        const { data } = (await axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': `${authorization}` } }));
        res.send(data);
    } catch(err) {
        next(err);
    }
});