const request = require('request');
const fs = require('fs');

const arg = process.argv.slice(2);

let url = arg[0];
let filePath = arg[1];

request(url, (error, response, body) => {
  /*
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  */

  if (error) {
    console.log(`${url} is invalid or does not exist.`);
    return;
  }

  if (!filePath) {
    console.log(`The file path provided (${filePath}) is invalid.`);
    return;
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFile(filePath, body, err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${filePath}.`);
      }
    });
  } else {
    console.log(`${filePath} already exists.`);
  }
});