const express =require('express');
const { signPlaybackUrl, createChannel, verifyStreamKey, verifyPlaybackUrl } = require('../controllers/streamController');

const streamRouter=express.Router();

streamRouter
.get('/signed-url',signPlaybackUrl)
.post('/create-channel',createChannel)
.get('/verify-streamkey',verifyStreamKey)
.get('/verify-playbackurl',verifyPlaybackUrl)

module.exports=streamRouter;