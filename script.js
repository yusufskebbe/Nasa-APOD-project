
const apiCount = 10;
const apiKey = "DEMO_KEY"
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${apiCount}`


let resultsArray = [];


// GET 10 IMAGES

async function getNasaPictures() {
  try {

    const response = await fetch(apiUrl)

    resultsArray = await response.json();

    console.log(resultsArray);

  } catch (error) {

  }
}

getNasaPictures()