const fs = require('fs');

// Function to generate a random alphanumeric string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

// Generate the random string
const jwtSecret = generateRandomString(32);

// Create the .env file content
const envContent = `\nJWT_SECRET="${jwtSecret}"\n`;

// Append the .env file
fs.appendFile('.env', envContent, err => {
  if (err) {
    console.error('Error appending to .env file:', err);
  } else {
    console.log('JWT_SECRET successfully appended to .env file.');
  }
});