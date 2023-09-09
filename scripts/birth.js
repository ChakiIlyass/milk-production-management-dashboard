const fs = require('fs');
const path = require('path');

// Define the path to the birth data JSON file
const birthPath = path.join(__dirname, '../data/birth.json');

/**
 * Function to get all birth records from the JSON file.
 * @returns {Array} An array of birth records.
 */
function getAllBirths() {
    try {
        // Read the JSON file and parse its contents
        const data = fs.readFileSync(birthPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Handle file read or parse errors
        console.error('Error in getAllBirths:', error);
        return { births: [] }; 
    }
}

/**
 * Function to update the birth data JSON file with a new list of birth records.
 * @param {Array} births - The list of birth records to update the file with.
 */
function updateBirthsFile(births) {
    try {
        const data = { births };
        // Write the updated data to the JSON file, formatting with 2-space indentation
        fs.writeFileSync(birthPath, JSON.stringify(data, null, 2));
    } catch (error) {
        // Handle file write errors
        console.error('Error in updateBirthsFile:', error);
    }
}

/**
 * Function to add a new birth record to the JSON file.
 * @param {Object} newBirth - The new birth record to add.
 */
function addBirth(newBirth) {
    try {
        const data = getAllBirths();
        // Push the new birth record to the existing list of births
        data.births.push(newBirth);
        // Convert the updated data back to JSON and write it to the file
        updateBirthsFile(data.births);
    } catch (error) {
        // Handle errors when adding a birth record
        console.error('Error in addBirth:', error);
    }
}

/**
 * Edits a birth record in the birth data.
 * @param {Object} updateBirth - The updated birth data including id, mother id, and birth date.
 */
function editBirth(updateBirth) {
    try {
        // Retrieve the current birth data from the file.
        const data = getAllBirths();

        // Get the ID of the birth record to update.
        const idToUpdate = updateBirth.id;

        // Create a new list of birth records by updating the specified record.
        const newBirthList = data.births.map((birth) => {
            if (idToUpdate == birth.id) {
                const { id, motherid, birthdate } = updateBirth;
                return { id, motherid, birthdate };
            } else {
                return birth;
            }
        });

        // Update the birth data with the new list.
        const newData = { "births": newBirthList };

        // Write the updated data back to the file.
        fs.writeFileSync(birthPath, JSON.stringify(newData));
    } catch (error) {
        console.error('Error editing birth:', error);
       
        // throw error;
    }
}


/**
 * Function to delete a birth record by ID from the JSON file.
 * @param {string} idtoDelete - The ID of the birth record to delete.
 */
function deleteBirth(idtoDelete) {
    try {
        const data = getAllBirths();
        // Filter out the birth record with the specified ID from the list
        const newList = data.births.filter((birth) => birth.id !== idtoDelete);
        // Create new data object with the filtered list of births
        const newData = { births: newList };
        // Update the JSON file with the new data
        updateBirthsFile(newData.births);
    } catch (error) {
        // Handle errors when deleting a birth record
        console.error('Error in deleteBirth:', error);
    }
}

module.exports = {
    editBirth,
    getAllBirths,
    addBirth,
    deleteBirth
};
