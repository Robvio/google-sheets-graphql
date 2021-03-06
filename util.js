require('dotenv').config();
const { google } = require('googleapis');
const range = 'Response!A1:Z1000';

async function getValues({ auth }) {
  const sheets = google.sheets('v4');
  try {
    const response = await sheets.spreadsheets.values.get({
      // eslint-disable-next-line no-undef
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
      auth,
    });
    const { data } = response;
    return singleArrayToJSON(data.values);
  } catch (err) {
    return err;
  }
}

async function addRow({ auth }, values) {
  // const fields = Object.keys(values);
  const arrayValues = Object.keys(values).map((key) => JSON.stringify(values[key]));
  const sheets = google.sheets('v4');
  try {
    // const response =
    await sheets.spreadsheets.values.append({
      auth,
      // eslint-disable-next-line no-undef
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [arrayValues],
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}

function singleArrayToJSON(array) {
  const responses = [];
  const fields = array[0];
  for (let i = 1; i < array.length; i++) {
    const response = {};
    fields.forEach((field, index) => {
      const value = array[i][index];
      if (value) {
        response[field] = value;
      } else {
        response[field] = null;
      }
    });
    responses.push(response);
  }
  return responses;
}

module.exports = {
  getValues,
  addRow,
};
