let express = require('express');
let socket = require('socket.io')

//App setup
let app = express();

const PORT = process.env.PORT || 4000;
let server = app.listen(PORT, function() {
    console.log('listening to requests on prt ', PORT);
});

//Static file
app.use(express.static('public'));

//Socket setup
let io = socket(server);

io.on('connection', function(socket) {
   console.log('made socket connection', socket.id);

   //Handle chat event
   socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
   });

   socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
   });
});