const net = require('net');

const client = new net.Socket();

client.connect({port: 6969}, (() => {
  console.log('Connected to server!');
  console.log('Please enter a username:');
  process.stdin.on('data', (data) => {
    client.write(data);
  });
  client.on('data', (data) => {
    process.stdout.write(data);
  });
}));


