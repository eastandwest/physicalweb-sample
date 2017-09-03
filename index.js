const ip = require('ip')
const https = require('https')
const fs = require('fs')
const path = require('path')
const eddystoneBeacon = require('eddystone-beacon')
const express = require('express')

const key = fs.readFileSync(path.join( __dirname + "/self-signed/server.key"))
const cert = fs.readFileSync(path.join( __dirname + "/self-signed/server.crt"))

const app = express()
app.get('/', (req, res) => {
  res.send('it works!!')
})

const port = process.env.PORT || 3000
const httpsServer = https.createServer({key, cert}, app)
httpsServer.listen(port, () => {
  try {
    console.log(`express server started on port ${port}`)

    const url = `https://${ip.address()}:${port}`
    eddystoneBeacon.advertiseUrl(url)
    console.log(`start broadcasting url : ${url} on physical web`)
  } catch(err) {
    console.warn(err.message)
  }
})
