//express import`
const express = require("express");
const calculo = express.Router();
const os = require('os')

const numCPUs = os.cpus().length
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
        fyh: new Date().toLocaleString,
        numeroDeNucleos: numCPUs

    }; 
    
    res.send(`<h1>${JSON.stringify(processInfo,null,2)}</h1>`); 
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