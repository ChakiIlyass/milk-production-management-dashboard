const express = require('express');
const diagnosticScript = require('../scripts/diagnostic');
const router = express.Router();

// Route to display the 'diagnostic' page
router.get('/diagnostic', async (req, res) => {
  try {
    // Get all diagnostic data
    const data = diagnosticScript.getAllDiagnostic();

    // Render the 'diagnostic' page with the diagnostic data and page title
    res.render('diagnostic', { diagnostics: data.diagnostic, title: 'Diagnostics List' });
  } catch (err) {
    console.error('Error in /diagnostic route:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new diagnostic record
router.post('/addDiagnostic', async (req, res) => {
  try {
    // Extract diagnostic data from the request body
    const { id, breed, illness, diagnosticdate } = req.body;

    // Create a new diagnostic record object
    const newDiagnostic = { id, breed, illness, diagnosticdate };

    // Add the new diagnostic record
    diagnosticScript.addDiagnostic(newDiagnostic);

    // Redirect back to the 'diagnostic' page
    res.redirect('/diagnostic');
  } catch (err) {
    console.error('Error in /addDiagnostic route:', err);
    res.status(500).send('Internal Server Error');
  }
});


router.post("/updateDiagnostic", (req, res) => {
  try {
    // Extract the data from the request body
    const { id, breed, illness, diagnosticdate } = req.body;

    // Create a new diagnostic object with the updated data
    const newDiagnostic = { id, breed, illness, diagnosticdate };

    // Call the editDiagnostic function to update the data
    diagnosticScript.editDiagnostic(newDiagnostic);

    // Redirect back to the diagnostic page 
    res.redirect("/diagnostic");
  } catch (error) {
    console.error("Error updating diagnostic data:", error);
    res.status(500).send("Internal Server Error");
    
  }
});


// Route to delete a diagnostic record
router.post('/deletediagnostic', async (req, res) => {
  try {
    // Extract the ID of the diagnostic record to be deleted from the request body
    const id = req.body.id;

    // Delete the diagnostic record with the specified ID
    diagnosticScript.deleteDiagnostic(id);

    // Redirect back to the 'diagnostic' page
    res.redirect('/diagnostic');
  } catch (err) {
    console.error('Error in /deletediagnostic route:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
