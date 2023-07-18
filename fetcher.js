const cmdLineArguments = process.argv;
const fs = require('fs');
const url = cmdLineArguments[2];
const fileName = cmdLineArguments[3];
const request = require('request');
// Check if the local file already exists
if (fs.existsSync(fileName)) {
  console.log('The file already exists. Please give a different file name.');
  return;
}
request(url, (error, response, body) => {
  // Print the error if one occurred
  if (error) {
    console.log('Error:', error);
    return;
  }
  if (response.statusCode === 200) {
    // Successful HTTP request
    console.log('Received data from the HTTP request.');
    // Write received data to a file
    fs.writeFile(fileName, body, (err) => {
      if (err) {
        console.log('Error writing to file:', err);
      } else {
        const byteCount = Buffer.byteLength(body);
        console.log(`Downloaded and saved ${byteCount} bytes to file.`);
      }
    });
  } else {
    console.log('Invalid response:', response && response.statusCode);
  }
});
