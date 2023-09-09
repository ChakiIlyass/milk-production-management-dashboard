const express = require('express');
const router = express.Router();
const indexScript = require('../scripts/index');

// Route to display the 'index' page
router.get('/', async (req, res) => {
  try {
    // Retrieve various data points using functions from indexScript

    const holsteinNbr = indexScript.getHolsteinData();
    const montNbr = indexScript.getMontData();
    const days = indexScript.getDays();
    const quantity = indexScript.getQuantity();
    const cowNbr = indexScript.cowNbr();
    const birthNbr = indexScript.getBirthData();

    // Render the 'index' page with the retrieved data and page title
    res.render('index', {
      "holstein": holsteinNbr,
      "montpeliard": montNbr,
      "birthNbr": birthNbr,
      "cowNbr": cowNbr,
      "days": days,
      "quantity": quantity,
      title: 'data'
    });
  } catch (err) {

    console.error('Error in / route:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
