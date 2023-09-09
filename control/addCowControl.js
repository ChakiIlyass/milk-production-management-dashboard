const express = require('express');
const cowScript = require('../scripts/cow');
const router = express.Router();

// Route to display the 'addcow' page
router.get('/addcow', async (req, res) => {
  try {
    // Get all cow data
    const data = await cowScript.getAllCows();

    // Render the 'addcow' page with the cow data and page title
    res.render('addcow', { cows: data.cows, title: 'Cows List' });
  } catch (err) {
    console.error('Error in /addcow route:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new cow
router.post('/addCow', async (req, res) => {
  try {
    // Extract cow data from the request body
    const { id, entrydate, breed, illness, diagnosticdate } = req.body;

    // Create a new cow object
    const newCow = { id, entrydate, breed, illness, diagnosticdate };

    // Add the new cow to the data
    await cowScript.addCow(newCow);

    // Redirect back to the 'addcow' page
    res.redirect('/addcow');
  } catch (err) {
    console.error('Error in /addCow route:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post("/updateCow", (req, res) => {
  try {
    // Extract the data from the request body
    const { id, entrydate, breed, illness } = req.body;

    // Create a new cow object with the updated data
    const updatedCow = { id, entrydate, breed, illness };

    // Call the editCow function to update the data
    cowScript.editCow(updatedCow);

    // Redirect back to the add cow page 
    res.redirect("/addcow");
  } catch (error) {
    console.error("Error updating cow data:", error);
  
    res.status(500).send("Internal Server Error");
   
  }
});

// Route to delete a cow
router.post('/deletecow', async (req, res) => {
  try {
    // Extract the ID of the cow to be deleted from the request body
    const id = req.body.id;

    // Delete the cow with the specified ID
    await cowScript.deleteCow(id);

    // Redirect back to the 'addcow' page
    res.redirect('/addcow');
  } catch (err) {
    
    console.error('Error in /deletecow route:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
