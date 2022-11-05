/** @format */

const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post('/submit', (req, res) => {
  // Add your code here
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  const userName = `Name: ${req.body.userName}\n`;
  const email = `Name: ${req.body.email}`;
  let message = req.body.message;
  if (message) {
    message = `Comments: ${message}`;
  } else {
    message = `Comments: n/a`;
  }
  let signUp = req.body.signUp;
  if (signUp) {
    signUp = `Newsletter: Yes, sign me up for the newsletter.`;
  } else {
    signUp = `Newsletter: No, thank you.`;
  }
  const output = `
      <p>
        ${userName}<br>
        ${email}<br>
        ${message}<br>
        ${signUp}
      </p>
    `;
  res.send(output);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
