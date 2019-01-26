const request = require("request");

// Function to compute number of pirates faces in array of string.
const catchPiratesFaces = piratesFaces => {
  // I: array of string reprsent pirates faces.
  // O: number of Pirates.
  // C: pirate face must contain  eyes (marked with either ";" or  "8" ) 
  //and mouth (marked with either ")" or  "|" ).
  // E:
  // declar count variable to count the number.
  let count = 0;
  // iterative over array of string.
  for (let i = 0; i < piratesFaces.length; i++) {
    // declare object to store each char for each Pirate.
    let obj = {};
    // iterative over the stirng that represent the Pirates.
    for (let j = 0; j < piratesFaces[i].length; j++) {
      // store each char with true value in obj.
      obj[piratesFaces[i][j]] = true;
    }
    // condition to check if the eyes and mouth exist insid obj.
    if ((obj[";"] || obj["8"]) && (obj[")"] || obj["|"])) {
      // increase count.
      count++;
    }
  }
  // return count.
  return count;
};

// function to make request for eila-pirate-api and get data for Pirates.
const getPiratesFacesFromApi = callback => {
  request.get(
    "https://eila-pirate-api.herokuapp.com/pirates/prison",
    { json: true },
    (err, res, body) => {
      if (err) {
        console.log("Error during get data from API \n" + err);
        callback(err, null);
      } else {
        callback(null, body.faces);
      }
    }
  );
};

exports.catchPiratesFaces = catchPiratesFaces;
exports.getPiratesFacesFromApi = getPiratesFacesFromApi;
