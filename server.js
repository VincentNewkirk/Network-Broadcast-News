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
      if(socket.name === undefined){
        socket.name = data.toString().replace(/(\r\n|\n|\r)/gm,"");
        console.log(socket.name);
        return;
      }
    //if sender is same as receiver don't send anything
     else if(users[i] !== socket){
      users[i].write(socket.name + ': ' + data);
      }
    }
    process.stdout.write(socket.name + ': ' + data);
  });
});
process.stdin.on('data', (data) => {
  if(data.indexOf('//kick') >= 0){
    let tempArr = data.toString().split('');
    for(var i = 0; i < 7; i++){
      tempArr.shift();
    }
    tempArr.pop();
    let nameToClose = tempArr.join('');
    for(let i = 0; i < users.length; i++){
      if(users[i].name === nameToClose){
        users[i].destroy();
      }
    }

  }
  // server.write(data);
  for(var i = 0; i < users.length; i++){
    users[i].write('[ADMIN]: '  + data);
  }
});

server.listen('6969');