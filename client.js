const net = require('net');

const client = new net.Socket();

client.connect({port: 6969}, (() => {
  console.log('connected to server');
  process.stdout.on('data', (data) => {
    client.write(data);
    // process.stdin.write(data.toString());
  });
  client.on('data', (data) => {
    process.stdout.write(data);
  });
}));


