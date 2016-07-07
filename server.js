const net = require('net');
const fs = require('fs');
const chatLog = fs.createWriteStream('chatLog.Log');
let users = [];

const server = net.createServer((socket) => {
  console.log('Client connected!');
  users.push(socket);
  socket.on('data', (data) => {
    process.stdout.write(data.toString());
      if(socket.name === undefined){
        socket.name = data.toString().replace(/(\r\n|\n|\r)/gm,"");
        console.log(socket.name);
        return;
      }
    for(var i = 0; i < users.length; i++){
    //if sender is same as receiver don't send anything
    if(users[i] !== socket){
      users[i].write(socket.name + ': ' + data);
      }
    }
    process.stdout.write(socket.name + ': ' + data);
  });
});
process.stdin.on('data', (data) => {
  //if the data input has '//kick'
  if(data.indexOf('//kick') >= 0){

    //take out the '//kick' leaving only the name
    let tempArr = data.toString().split('');
    for(var i = 0; i < 7; i++){
      tempArr.shift();
    }

    //.pop to remove the stupid \n
    tempArr.pop();

    //this is the name
    let nameToClose = tempArr.join('');
    console.log('the username we want to kick is: ' + nameToClose);
    //find the user with the matching .name property and close the socket
    for(let i = 0; i < users.length; i++){
      if(users[i].name === nameToClose){
        // console.log(users[i]);
        users[i].destroy();
        users.splice(i, 1);
      }
    }

  }
  // server.write(data);
  for(var i = 0; i < users.length; i++){
    users[i].write('[ADMIN]: '  + data);
  }
});

server.listen('6969');