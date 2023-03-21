/*
    Student: Peiyi Li
    Instructor's name: Benjamin Dicken
    Date: 2023/3/20
    Course: CSC 337
    Project Name: Chatty
    File Name: server.js
    Description:
        PA #8 Chatty
        In this assignment, the task is to write a chat application called "Chatty". From this page, 
        the user should be able to specify an alias (username) and then start sending messages using 
        other text fields and the "Send Message" button.
*/

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const hostname = 'localhost';
const port = 80;

const mongoDBURL = 'mongodb+srv://peiyili:jnATybkPC3zDSfaN@cluster0.tjoxhul.mongodb.net/?retryWrites=true&w=majority';

var Schema = mongoose.Schema;
var ChatMessageSchema = new Schema({
    alias: String,
    message: String
});
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

ChatMessage.deleteMany({})
    .then(() => {
        console.log('Database Has Been Refreshed');
    })
    .catch((error) => {
        console.error(error);
    });

app.use(express.json());
app.use(express.static('public_html'));

app.get('/chats', function (req, res) {
    ChatMessage.find({})
        .sort({ "time": 1 })
        .exec()
        .then((chats) => {
            var DOMstr = '';
            for (i in chats) {
                chat = chats[i];
                DOMstr += '<div> <strong>' + chat.alias + ':</strong>' + " " + chat.message + '</div>';
            }
            res.end(DOMstr);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error');
        });
});


app.post('/chats/:alias/:message', (req, res) => {
    var newMessage = new ChatMessage({
        alias: req.params.alias,
        message: req.params.message
    });
    console.log(req.params.message);
    newMessage.save()
        .then((chatMessage) => {
            console.log(chatMessage);
            res.status(200).send('OK');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error');
        });
});


app.listen(port, function () {
    console.log(`App listening at http://${hostname}:${port}`);
});

