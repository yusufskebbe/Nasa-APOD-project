const resultsNav = document.getElementById('resultsNav')
const favoritesNav = document.getElementById('favoriteNav')
const imagesContainer = document.querySelector('.images-container')
const savedConfirmed = document.querySelector('.save-confirmed')
const loader = document.querySelector('.loader')





const apiCount = 10;
const apiKey = "DEMO_KEY"
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${apiCount}`


let resultsArray = [];

let favorites = {}

//update DOM

function updateDom() {

  resultsArray.forEach((result) => {
    //card
    const card = document.createElement('div')
    card.classList.add('card')
    //link
    const link = document.createElement('a')
    link.href = result.hdurl;
    link.title = 'View Ful Image'
    link.target = '_blank'

    // Images
    const image = document.createElement('img')
    image.src = result.url
    image.alt = 'Nasa picture of the day'
    image.loading = 'lazy'
    image.classList.add('card-image-top')

    // Card Body
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    // Card Title
    const cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-title')
    cardTitle.textContent = result.title

    //Save text

    const saveText = document.createElement('p')
    saveText.classList.add('clickable')
    saveText.textContent = 'Add to favorites'

    saveText.setAttribute('onclick', `saveFavorite('${result.url}')`)

    // Card Text
    const cardText = document.createElement('p')
    cardText.textContent = result.explanation

    // Footer container 

    const footer = document.createElement('small')
    footer.classList.add('text-muted')

    // DATE

    const date = document.createElement('strong')
    date.textContent = result.date

    // Copyright

    const copyright = document.createElement('span')
    const copyRightResult = result.copyright === undefined ? '' : result.copyright

    copyright.textContent = copyRightResult


    // APPEND

    footer.append(date, copyright)

    cardBody.append(cardTitle, saveText, cardText, footer)

    link.appendChild(image)

    card.append(link, cardBody)

    imagesContainer.appendChild(card)

  })

}

// saveFavorite 

function saveFavorite(itemUrl) {

  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      console.log(favorites);
      savedConfirmed.hidden = false;
      setTimeout(() => {
        savedConfirmed.hidden = true
      }, 2000)
      // save to local storage
      localStorage.setItem('nasaFavorite', JSON.stringify(favorites))
    }
  })

}


// GET 10 IMAGES

async function getNasaPictures() {
  try {

    const response = await fetch(apiUrl)

    resultsArray = await response.json();

    console.log(resultsArray);

    updateDom();
  } catch (error) {

  }
}

getNasaPictures()