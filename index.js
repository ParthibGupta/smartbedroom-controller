const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// Replace with the correct serial port name (e.g., '/dev/ttyUSB0' on Linux, 'COM3' on Windows)
const portName = '/dev/ttyUSB0';  // Update with your Arduino port

// Create a new SerialPort instance
const port = new SerialPort(portName, {
  baudRate: 9600,
});

// Create a parser for reading lines from the serial port
const parser = port.pipe(new Readline({ delimiter: '\n' }));


parser.on('data', (data) => {
  console.log(`Received from Arduino: ${data}`);
});

function sendCommand(command) {
  port.write(command, (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log(`Sent to Arduino: ${command}`);
  });
}

setTimeout(() => {
  sendCommand('T'); 
}, 3000);

port.on('error', (err) => {
  console.log('Error: ', err.message);
});
