const dotenv = require('dotenv').config()
const PORT = 8000
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const { v1: uuidv1 } = require("uuid")
const { connect } = require("getstream")
const StreamChat = require('stream-chat').StreamChat

const app = express()

app.use(cors())
app.use(express.json())

//Sign up
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body

        const userId = uuidv1()
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const client = connect(process.env.API_KEY, process.env.API_SECRET, process.env.APP_ID)
        const token = client.createUserToken(userId)
        
        res.status(200).json({ username, userId, hashedPassword, token})
    } catch(err) {
        console.log(err)

        res.status(500).json({message: err})
    }
})

//Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(password)
        const client = connect(process.env.API_KEY, process.env.API_SECRET, process.env.APP_ID)
        const chatClient = StreamChat.getInstance(process.env.API_KEY, process.env.API_SECRET)
        
        const {users} = await chatClient.queryUsers({name: username})

        if(!users.length) return res.status(400).json({message: 'User not found'}) 
        console.log(users[0])
        const success = await bcrypt.compare(password, users[0].hashedPassword)
        console.log(success)
        const token = client.createUserToken(users[0].id)
        const confirmedName = users[0].name
        const userId = users[0].id
        const hashedPassword = users[0].hashedPassword

        if (success) {
            res.status(200).json({ 
                token, 
                username: confirmedName,
                hashedPassword, 
                userId 
            })
        } else {
            res.status(500).json({ message: 'Login failed'})
        }
    } catch(err) {
        console.log(err)

        res.status(500).json({message: err})
    }
})
app.listen(PORT, () => console.log("Server running on port " + PORT))