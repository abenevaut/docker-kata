const express = require('express')
const app = express()
const port = 3000

const Redis = require('ioredis');
const redis = new Redis({
    port: 6379,
    host: "redis",
    username: "default",
    password: "",
    db: 0,
})

const date = new Date()

// add the demo-key for the first time
redis.set("demo-key", `First date is: ${date.toISOString()}`)

app.get('/', (req, res, next) => {
    redis.get("demo-key", (err, result) => {
        if (err) {
            return next('Error when retrieving key from redis')
        }

        const date = new Date()
        
        // update the demo-key on each request
        redis.set("demo-key", `Latest date is: ${date.toISOString()}`)
        
        return res.send(result)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
