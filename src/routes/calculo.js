//express import`
const express = require("express");
const calculo = express.Router();


//fork
const { fork } = require('child_process');

calculo.get('/info', (_req, res) => {
    const processInfo = {
        platform: process.platform,
        version: process.version,
        title: process.title,
        execPath: process.execPath,
        processId: process.pid,
        rss: process.memoryUsage().rss,
        fyh: Date.now()
    }; 
    
    res.send(`<span>${processInfo}</span>`); 
})

const randomNumbersFork = fork('./src/randomNumber/randomN.js')

calculo.get('/randoms', (req, res) => {
    const cantidad =  5000;
    
    randomNumbersFork.send(cantidad)

    randomNumbersFork.on('message', (resultado) => {
        res.json({resultado});
    })
     
    
})

module.exports = calculo