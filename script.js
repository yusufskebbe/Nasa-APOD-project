const resultsNav = document.getElementById('resultsNav')
const favoritesNav = document.getElementById('favoritesNav')
const imagesContainer = document.querySelector('.images-container')
const savedConfirmed = document.querySelector('.save-confirmed')
const loader = document.querySelector('.loader')





const apiCount = 10;
const apiKey = "DEMO_KEY"
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${apiCount}`


let resultsArray = [];

let favorites = {}

//show content 

function showContent(page) {

  if (page === 'results') {
    resultsNav.classList.remove('hidden')
    favoritesNav.classList.add('hidden')
  } else {
    resultsNav.classList.add('hidden')
    favoritesNav.classList.remove('hidden')
  }

  window.scrollTo({ top: 0, behavior: 'instant' })
  loader.classList.add('hidden')
}

//update DOM


function createDOMNodes(page) {

  let currentArray = page === 'results' ? resultsArray : Object.values(favorites)

  currentArray.forEach((result) => {
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
    if (page === 'favorites') {
      saveText.textContent = "Delete Item"
      saveText.setAttribute('onclick', `deleteFavorite('${result.url}')`)
    } else {
      saveText.textContent = 'Add to favorites'

      saveText.setAttribute('onclick', `saveFavorite('${result.url}')`)

    }


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

function deleteFavorite(url) {

  if (favorites[url]) {
    delete favorites[url];
    localStorage.setItem('nasafavorites', JSON.stringify(favorites))
  }
  updateDom('favorites')

}

function updateDom(page) {
  // GET favorites from localstorage

  if (localStorage.getItem('nasafavorites')) {
    favorites = JSON.parse(localStorage.getItem('nasafavorites'));
    console.log('favorites from local storage', favorites);
  }
  imagesContainer.textContent = ''
  createDOMNodes(page)
  showContent(page)

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
      localStorage.setItem('nasafavorites', JSON.stringify(favorites))
    }
  })

}


// GET 10 IMAGES

async function getNasaPictures() {


  //Show loader
  loader.classList.remove('hidden')

  try {

    const response = await fetch(apiUrl)

    resultsArray = await response.json();

    updateDom("results");
  } catch (error) {

  }
}

getNasaPictures()