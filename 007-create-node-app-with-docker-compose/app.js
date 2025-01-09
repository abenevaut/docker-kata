const express = require('express')
const app = express()
const port = 3000

const Redis = require('ioredis');
const redis = new Redis({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || "localhost",
    username: "default",
    password: "",
    db: 0,
})

// add the demo-key for the first run
redis.set("demo-key", Math.floor(Math.random() * 1000))

app.get('/', (req, res, next) => {
    redis.get("demo-key", (err, result) => {
        if (err) {
            return next('Error when retrieving key from redis')
        }
        
        // update the demo-key on each request
        redis.set("demo-key", parseInt(result, 10) + 1)
        
        return res.send(
            `<p>Number: ${result}<p>`
            + `<a href="/" style="padding: 1em 2em;margin-right:.5em;background-color: lightsteelblue;color: black;">+1</a>`
            + `<a href="/reset" style="padding: 1em 2em;background-color: lightsteelblue;color: black;">reset</a>`
        )
    })
})

app.get('/reset', (req, res, next) => {
    redis.set("demo-key", 0)
    
    return res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
