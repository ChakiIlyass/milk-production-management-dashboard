const express = require('express');
const birthScript = require('../scripts/birth');
const router = express.Router();

// Route to display the 'birth' page
router.get('/birth', async (req, res) => {
  try {
    // Get all birth data
    const data = birthScript.getAllBirths();

    // Render the 'birth' page with the birth data
    res.render('birth', { births: data.births });
  } catch (err) {
    console.error('Error in /birth route:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new birth record
router.post('/addBirth', async (req, res) => {
  try {
    // Extract birth data from the request body
    const { id, motherid, birthdate } = req.body;

    // Create a new birth record object
    const newBirth = { id, motherid, birthdate };

    // Add the new birth record
    birthScript.addBirth(newBirth);

    // Redirect back to the 'birth' page
    res.redirect('/birth');
  } catch (err) {
    // Handle errors gracefully
    console.error('Error in /addBirth route:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post("/updateBirth", (req, res) => {
  try {
    // Extract the data from the request body
    const { id, motherid, birthdate } = req.body;

    // Create a new birth object with the updated data
    const newBirth = { id, motherid, birthdate };

    // Call the editBirth function to update the data
    birthScript.editBirth(newBirth);

    // Redirect back to the birth page 
    res.redirect("/birth");
  } catch (error) {
    console.error("Error updating birth data:", error);
    res.status(500).send("Internal Server Error");

  }
});

// Route to delete a birth record
router.post('/deletebirth', async (req, res) => {
  try {
    // Extract the ID of the birth record to be deleted from the request body
    const id = req.body.id;

    // Delete the birth record with the specified ID
    birthScript.deleteBirth(id);

    // Redirect back to the 'birth' page
    res.redirect('/birth');
  } catch (err) {
    console.error('Error in /deletebirth route:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
