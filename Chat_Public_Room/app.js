//require express module

//enabling CORS functionality (cross-origin resource sharing)
var cors = require('cors');

//setting the variable for the path
var path = require('path');



var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    //creating the socket funcionality
        //socket.io listens to any http server object
    io = require('socket.io').listen(server),
    //add mongoose to the server
    mongoose = require('mongoose'),
    //object to handle the users
    users = {};




//here we add to the path of all the static content
app.use(express.static(path.join(__dirname, '/public')));

server.listen(3000);

 app.use(cors());   //tell the app to use CORS

//here we make the connection to the mongoDB (note: the chat DB don't exist for the first time, mongoDB will create theBD chat)
mongoose.connect('mongodb://localhost/chat', function(err){
   if(err){
       console.log(err);
   } else {
       console.log("Connection to MongoDB OK!");
   }
});

//we must create a schema just like JSON style
var chatSchema = mongoose.Schema({
    nick: String,
    msg: String,
    //I have configured the messages to be deleted 8h (28800s) after being created
    created: {type: Date, expires: 28800, default: Date.now}
});

//we must create a model
var Chat = mongoose.model('Message', chatSchema);


var u;
//create a route
    //parameters req -> request, res -> response
app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
    u = req.query.u;
});

//to receive the event on the server side
//place the socket funcionality in the server side

io.sockets.on('connection', function(socket){
    console.log(u);
    //every time a new user connects we must show the messages already typed
    var query = Chat.find({});
    //limit the amount of messages by 15 and sorted the messages by the time created in a descending possition
    query.sort('-created').limit(15).exec(function(err, docs){
        if(err) throw err;
        console.log('sending old messages');
        socket.emit('load old msgs', docs);
    });

    //callback is used because we are sending data back to the client throug this function
    socket.on('new user', function(data, callback){
       //checking if the new username is already in our array
        if(data in users){
            callback(false); //this means that the username is in the array
        } else {
            callback(true);
            socket.nickname = data; //storing the nickname in the socket
            users[socket.nickname] = socket;
            updatesNicknames();
        }
    });

    function updatesNicknames(){
        io.sockets.emit('usernames', Object.keys(users));//for all the users update their list of nicknames
    }

    //send message function
    socket.on('send message', function(data, callback){
        var msg = data.trim(); //in case of empty spaces before de signal for private message and this becomes the message
        if(msg.substr(0,3) === '/p '){ //if the user types "/w "
            msg = msg.substr(3);
            var ind = msg.indexOf(' ');
            if(ind !== -1){
                var name = msg.substring(0, ind);//the name where the whisper goes to
                var msg = msg.substring(ind +1);//the message of the whisper
                if(name in users){
                    users[name].emit('whisper', {msg: msg, nick: socket.nickname});
                    console.log('Whisper!');
                } else{
                    callback("Error! Enter a valid user!");
                }

            } else {
               callback("Error! Please enter a message for you to whisper!")
            }

        } else {
            //WARNING: private messages will not be store in DB
            var newMsg = new Chat({msg: msg, nick: socket.nickname});
            newMsg.save(function(err){
                if(err) throw err;
                //the message should go to all the users
                io.sockets.emit('new message', {msg: msg, nick: socket.nickname});//by adding the nickname variable to the socket makes it easy to call it if necessary
                //sends the message to all the users beside the one who send it
                //socket.broadcast.emit('new message', data);
            });
        }
   });


    //eliminate users when they leave the chat
    socket.on('disconnect', function(data){
        if(!socket.nickname) return; //if the user goes to the login page and leaves without entering an username
        delete users[socket.nickname]; //removes user
        updatesNicknames(); //function to update nicknames
    });
});
