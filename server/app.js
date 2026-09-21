const express = require("express")

const app = express()

app.get("/welcome", (req, res)=>{
    res.send("welcome back")
})

app.listen(3000, ()=>{
    console.log("listening to the port")
})