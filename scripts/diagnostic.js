const fs = require('fs');
const path = require('path');

// Define the path to the diagnostic data JSON file
const diagnosticFilePath = path.join(__dirname, '../data/diagnostic.json');

/**
 * Function to get all diagnostic records from the JSON file.
 * @returns {Array} An array of diagnostic records.
 */
function getAllDiagnostic() {
    try {
        // Read the JSON file and parse its contents
        const diagnosticData = fs.readFileSync(diagnosticFilePath, 'utf-8');
        return JSON.parse(diagnosticData);
    } catch (error) {
        // Handle file read or parse errors
        console.error('Error in getAllDiagnostic:', error);
        return { diagnostic: [] }; // Return an empty array if there is an error
    }
}

/**
 * Function to update the diagnostic data JSON file with a new list of diagnostic records.
 * @param {Array} diagnostic - The list of diagnostic records to update the file with.
 */
function updateDiagnosticFile(diagnostic) {
    try {
        const data = { diagnostic };
        // Write the updated data to the JSON file, formatting with 2-space indentation
        fs.writeFileSync(diagnosticFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        // Handle file write errors
        console.error('Error in updateDiagnosticFile:', error);
    }
}

/**
 * Function to add a new diagnostic record to the JSON file.
 * @param {Object} newDiagnostic - The new diagnostic record to add.
 */
function addDiagnostic(newDiagnostic) {
    try {
        const data = getAllDiagnostic();
        // Push the new diagnostic record to the existing list of diagnostic records
        data.diagnostic.push(newDiagnostic);
        // Convert the updated data back to JSON and write it to the file
        updateDiagnosticFile(data.diagnostic);
    } catch (error) {
        // Handle errors when adding a diagnostic record
        console.error('Error in addDiagnostic:', error);
    }
}

function editDiagnostic(updateDiagnostic) {
  try {
    // Retrieve the current diagnostic data from the file.
    const data = getAllDiagnostic();

    // Get the ID of the diagnostic record to update.
    const idToUpdate = updateDiagnostic.id;

    // Create a new list of diagnostic records by updating the specified record.
    const newDiagnosticList = data.diagnostic.map((diagnostic) => {
      if (diagnostic.id === idToUpdate) {
        const { id, breed, illness, diagnosticdate } = updateDiagnostic;
        return { id, breed, illness, diagnosticdate };
      } else {
        return diagnostic;
      }
    });

    // Update the diagnostic data with the new list.
    const newData = { diagnostic: newDiagnosticList };

    // Write the updated data back to the file.
    fs.writeFileSync(diagnosticFilePath, JSON.stringify(newData));
  } catch (error) {
    console.error("Error editing diagnostic:", error);
    
    // throw error;
  }
}

/**
 * Function to delete a diagnostic record by ID from the JSON file.
 * @param {string} idtoDelete - The ID of the diagnostic record to delete.
 */
function deleteDiagnostic(idtoDelete) {
    try {
        const data = getAllDiagnostic();
        // Filter out the diagnostic record with the specified ID from the list
        const newList = data.diagnostic.filter((diagnostic) => diagnostic.id !== idtoDelete);
        // Create new data object with the filtered list of diagnostic records
        const newData = { diagnostic: newList };
        // Update the JSON file with the new data
        updateDiagnosticFile(newData.diagnostic);
    } catch (error) {
        // Handle errors when deleting a diagnostic record
        console.error('Error in deleteDiagnostic:', error);
    }
}

module.exports = {
    editDiagnostic,
    getAllDiagnostic,
    addDiagnostic,
    deleteDiagnostic
};
