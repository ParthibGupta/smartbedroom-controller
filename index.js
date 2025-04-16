const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline'); // Correct import

const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 115200 });

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' })); // Use ReadlineParser

parser.on('data', (line) => {
  if (line.startsWith('SENSOR:')) {
    const data = line.replace('SENSOR:', '').split(',');
    const sensorData = {
      humidity: parseFloat(data[0]),
      temperature: parseFloat(data[1]),
      pressure1: parseInt(data[2]),
      pressure2: parseInt(data[3]),
      light3: parseInt(data[4]),
      light4: parseInt(data[5]),
      frontDistance: parseFloat(data[6]),
      backDistance: parseFloat(data[7]),
    };
    console.log('Sensor Data:', sensorData);
    //Send to DB
  }
  console.log('Data:', line);
});
