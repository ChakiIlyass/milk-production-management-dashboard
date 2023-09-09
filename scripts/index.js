const fs = require('fs');
const path = require('path');

// Define paths to data JSON files
const cowPath = path.join(__dirname, '../data/cows.json');
const milkPath = path.join(__dirname, '../data/milk.json');
const birthPath = path.join(__dirname, '../data/birth.json');

/**
 * Function to read a JSON file and parse its contents.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Object} Parsed JSON data.
 */
function readJsonFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Handle file read or parse errors
        console.error(`Error in readJsonFile (${filePath}):`, error);
        return {};
    }
}

/**
 * Function to get the number of cows with illness from the JSON file.
 * @returns {number} The count of cows with illness.
 */

/**
 * Function to get the number of Holstein cows from the JSON file.
 * @returns {number} The count of Holstein cows.
 */
function getHolsteinData() {
    const jsondata = readJsonFile(cowPath);
    const holsteinArray = jsondata.cows.filter((cow) => cow.breed === "Holstein");
    return holsteinArray.length;
}

/**
 * Function to get the number of Montpliard cows from the JSON file.
 * @returns {number} The count of Montpliard cows.
 */
function getMontData() {
    const jsondata = readJsonFile(cowPath);
    const montArray = jsondata.cows.filter((cow) => cow.breed === "Montpliard");
    return montArray.length;
}

/**
 * Function to get an array of days from the milk data JSON file.
 * @returns {Array} An array of days.
 */
function getDays() {
    const jsondata = readJsonFile(milkPath);
    return jsondata.milk.map((m) => m.id);
}

/**
 * Function to get an array of quantities from the milk data JSON file.
 * @returns {Array} An array of quantities.
 */
function getQuantity() {
    const jsondata = readJsonFile(milkPath);
    return jsondata.milk.map((m) => m.quantity);
}

/**
 * Function to calculate the total number of cows (Holstein + Montpliard).
 * @returns {number} The total number of cows.
 */
function cowNbr() {
    return getHolsteinData() + getMontData();
}

/**
 * Function to get the number of births from the birth data JSON file.
 * @returns {number} The count of births.
 */
function getBirthData() {
    const jsonData = readJsonFile(birthPath);
    return jsonData.births.length;
}

module.exports = {
    getBirthData,
    cowNbr,
    getHolsteinData,
    getMontData,
    getDays,
    getQuantity
};
