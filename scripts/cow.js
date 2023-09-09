const fs = require('fs');
const path = require('path');

// Define the path to the cow data JSON file
const cowPath = path.join(__dirname, '../data/cows.json');

/**
 * Function to get all cow records from the JSON file.
 * @returns {Array} An array of cow records.
 */
function getAllCows() {
    try {
        // Read the JSON file and parse its contents
        const cowData = fs.readFileSync(cowPath, 'utf-8');
        return JSON.parse(cowData);
    } catch (error) {
        // Handle file read or parse errors
        console.error('Error in getAllCows:', error);
        return { cows: [] }; // Return an empty array if there is an error
    }
}

/**
 * Function to add a new cow record to the JSON file.
 * @param {Object} newCow - The new cow record to add.
 */
function addCow(newCow) {
    try {
        const data = getAllCows();
        // Push the new cow record to the existing list of cows
        data.cows.push(newCow);
        // Convert the updated data back to JSON and write it to the file
        const updatedData = JSON.stringify(data);
        fs.writeFileSync(cowPath, updatedData);
    } catch (error) {
        // Handle errors when adding a cow record
        console.error('Error in addCow:', error);
    }
}


function editCow(updateCow) {
  try {
    // Retrieve the current cow data from the file.
    const data = getAllCows();

    // Get the ID of the cow record to update.
    const idToUpdate = updateCow.id;

    // Create a new list of cow records by updating the specified record.
    const newCowList = data.cows.map((cow) => {
      if (cow.id === idToUpdate) {
        const { id, entrydate, breed, illness, diagnosticdate } = updateCow;
        return { id, entrydate, breed, illness, diagnosticdate };
      } else {
        return cow;
      }
    });

    // Update the cow data with the new list.
    const newData = { cows: newCowList };

    // Write the updated data back to the file.
    fs.writeFileSync(cowPath, JSON.stringify(newData));
  } catch (error) {
    console.error("Error editing cow:", error);
    // throw error;
  }
}




/**
 * Function to update the cow data JSON file with a new list of cow records.
 * @param {Array} cows - The list of cow records to update the file with.
 */
function updateCowsFile(cows) {
    try {
        const data = { cows };
        // Write the updated data to the JSON file, formatting with 2-space indentation
        fs.writeFileSync(cowPath, JSON.stringify(data, null, 2));
    } catch (error) {
        // Handle file write errors
        console.error('Error in updateCowsFile:', error);
    }
}

/**
 * Function to delete a cow record by ID from the JSON file.
 * @param {string} idtoDelete - The ID of the cow record to delete.
 */
function deleteCow(idtoDelete) {
    try {
        const data = getAllCows();
        // Filter out the cow record with the specified ID from the list
        const newList = data.cows.filter((cow) => cow.id !== idtoDelete);
        // Create new data object with the filtered list of cows
        const newData = { cows: newList };
        // Update the JSON file with the new data
        updateCowsFile(newData.cows);
    } catch (error) {
        // Handle errors when deleting a cow record
        console.error('Error in deleteCow:', error);
    }
}

module.exports = {
    editCow,
    getAllCows,
    addCow,
    deleteCow
};
