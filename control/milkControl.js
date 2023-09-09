const express = require('express');
const milkScript = require('../scripts/milk');
const router = express.Router();

// Route to display the 'milk-production' page
router.get('/milk-production', async (req, res) => {
  try {
    // Get all milk production data
    const data = milkScript.getAllMilks();

    // Render the 'milk-production' page with the milk production data and page title
    res.render('milk-production', { milks: data.milk, title: 'Milk Production List' });
  } catch (err) {
    // Handle errors gracefully
    console.error('Error in /milk-production route:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new milk production record
router.post('/addMilk', async (req, res) => {
  try {
    // Extract milk production data from the request body
    const { id, date, quantity } = req.body;

    // Create a new milk production record object
    const newMilk = { id, date, quantity };

    // Add the new milk production record
    milkScript.addMilk(newMilk);

    // Redirect back to the 'milk-production' page
    res.redirect('/milk-production');
  } catch (err) {
    // Handle errors gracefully
    console.error('Error in /addMilk route:', err);
    res.status(500).send('Internal Server Error');
  }
});
router.post("/updateMilk", (req, res) => {
  try {
    // Extract the data from the request body
    const { id, date, quantity } = req.body;

    // Create a new milk object with the updated data
    const newMilk = { id, date, quantity };

    // Call the updateMilk function to update the data
    milkScript.updateMilk(newMilk);

    // Redirect back to the milk production page 
    res.redirect("/milk-production");
  } catch (error) {
    console.error("Error updating milk data:", error);
    res.status(500).send("Internal Server Error");
    
   
  }
});

// Route to delete a milk production record
router.post('/deletemilk', async (req, res) => {
  try {
    // Extract the ID of the milk production record to be deleted from the request body
    const idtoDelete = req.body.id;

    // Delete the milk production record with the specified ID
    milkScript.deleteMilk(idtoDelete);

    // Redirect back to the 'milk-production' page
    res.redirect('/milk-production');
  } catch (err) {
    // Handle errors gracefully
    console.error('Error in /deletemilk route:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
