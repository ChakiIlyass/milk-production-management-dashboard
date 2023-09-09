const fs = require('fs');
const path = require('path');

// Define the path to the milk data JSON file
const milkPath = path.join(__dirname, '../data/milk.json');

/**
 * Function to read the milk data JSON file and parse its contents.
 * @returns {Object} Parsed JSON data.
 */
function getAllMilks() {
    try {
        // Read the JSON file and parse its contents
        const data = fs.readFileSync(milkPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Handle file read or parse errors
        console.error('Error in getAllMilks:', error);
        return { milk: [] }; // Return an empty array if there is an error
    }
}

/**
 * Function to add a new milk production record to the JSON file.
 * @param {Object} newMilk - The new milk production record to add.
 */
function addMilk(newMilk) {
    try {
        const data = getAllMilks();
        // Push the new milk production record to the existing list of milk records
        data.milk.push(newMilk);
        // Write the updated data back to the JSON file
        fs.writeFileSync(milkPath, JSON.stringify(data));
    } catch (error) {
        // Handle errors when adding a milk production record
        console.error('Error in addMilk:', error);
    }
}

function updateMilk(newMilk){
    const idtoUpdate = newMilk.id;
    const data = getAllMilks();
    
    const newList = data.milk.map((m)=>{
        if(m.id === idtoUpdate){
            const {id, date, quantity} = newMilk;
            return {id, date, quantity};
        }
        else{
            return m;
        }
    })

    const newData = {"milk": newList};
    fs.writeFileSync(milkPath, JSON.stringify(newData));
}


/**
 * Function to delete a milk production record by ID from the JSON file.
 * @param {string} idtoDelete - The ID of the milk production record to delete.
 */
function deleteMilk(idtoDelete) {
    try {
        const data = getAllMilks();
        // Filter out the milk production record with the specified ID from the list
        const newList = data.milk.filter((m) => m.id !== idtoDelete);
        // Create new data object with the filtered list of milk production records
        const newData = { milk: newList };
        // Update the JSON file with the new data
        fs.writeFileSync(milkPath, JSON.stringify(newData));
    } catch (error) {
        // Handle errors when deleting a milk production record
        console.error('Error in deleteMilk:', error);
    }
}

module.exports = {
    updateMilk,
    getAllMilks,
    addMilk,
    deleteMilk
};
