const express = require('express');


// Import controllers
const addCowControl = require('./control/addCowControl');
const diagnosticControl = require('./control/diagnosticControl');
const birthControl = require('./control/birthControl');
const milkControl = require('./control/milkControl');
const indexControl = require('./control/indexControl');

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Attach controllers to routes
app.use(indexControl);
app.use(addCowControl);
app.use(milkControl);
app.use(birthControl);
app.use(diagnosticControl);

// Error handling for 404 Not Found
app.use((req, res) => {
  res.render('404', { title: 'Not Found' });
});

// Starting server and listening
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
