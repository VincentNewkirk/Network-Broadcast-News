const net = require('net');
const fs = require('fs');
const chatLog = fs.createWriteStream('chatLog.Log');
let users = [];

const server = net.createServer((socket) => {
  console.log('Client connected!');
  users.push(socket);
  socket.on('data', (data) => {
    process.stdout.write(data.toString());
    for(var i = 0; i < users.length; i++){
    //if sender is same as receiver don't send anything
    if(users[i] !== socket){
      users[i].write(data);
      }
    }
  });
});
process.stdin.on('data', (data) => {
  // server.write(data);
  for(var i = 0; i < users.length; i++){
    users[i].write('[ADMIN]: '  + data);
  }
});

server.listen('6969');