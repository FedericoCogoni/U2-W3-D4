//creo una funzione che mi aiuta a modificare la mia query. prendo soltato 9 immagini
//(dalla documentazione) ho letto che ne passa 15. usando ${search} posso sfruttarlo come
//proprietà, questo mi permetterà di creare le ricerche col form.
//sembra che sia obbligato ad aggiungere le linee dello style qua, durante la creazione degli elementi
//probabilmente ho sbagliato qualcosa, per mancanza di tempo sfrutto questo metodo ma
//andrò a indagare stanotte.

function funcLoadImages(search) {
  fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=9`, {
    method: "GET",
    headers: {
      Authorization: "kPOYf5LvWiioFVjk16THdyuzWMqIjA5TTW2Ug08uva3cqtTQJhq0jOzT",
    },
  })
    .then(response => response.json())
    .then(data => {
      const photos = data.photos
      console.log("arrayOfPhotos:", photos)

      photos.forEach(photo => {
        //creo la card per ogni data.photos
        const col = document.createElement("div")
        col.className = "col-md-4 col-lg-3"
        row.appendChild(col)

        const card = document.createElement("div")
        card.className = "card m-1"
        col.appendChild(card)

        const imgContainer = document.createElement("div")

        const img = document.createElement("img")
        img.className = "card-img-top"
        img.alt = photo.alt
        img.style.height = "400px"
        img.style.width = "100%"
        img.style.objectFit = "cover"
        img.src = photo.src.original

        imgContainer.appendChild(img)

        const cardBody = document.createElement("div")
        cardBody.className = "card-body"

        if (photo.alt) {
          const title = document.createElement("h6")
          title.className = "card-title my-1"
          title.textContent = photo.alt
          title.style.whiteSpace = "nowrap"
          title.style.fontSize = "1rem"
          title.style.overflow = "hidden"
          cardBody.appendChild(title)
        }

        if (photo.photographer) {
          const photographer = document.createElement("p")
          photographer.className = "img-photographer p-0 mt-3"
          photographer.textContent = `📸👨 ${photo.photographer}`
          photographer.style.fontSize = "0.6rem"
          cardBody.appendChild(photographer)
        }

        const cardFooter = document.createElement("div")
        cardFooter.className = "d-flex align-items-end justify-content-between"
        cardBody.appendChild(cardFooter)

        const button = document.createElement("button")
        button.className = "btn btn-secondary hide-button mt-1"
        button.innerText = "Hide"
        button.addEventListener("click", () => hideCard(card)) //aggiungo l'addeventlistener durante la creazione del bottone hide
        cardFooter.appendChild(button)

        if (photo.id) {
          const photoId = document.createElement("div")
          photoId.textContent = photo.id
          photoId.style.fontSize = "0.5rem"
          cardFooter.appendChild(photoId)
        }

        card.appendChild(imgContainer)
        card.appendChild(cardBody)
      })
    })
    .catch(error => {
      console.error("Si è verificato un errore:", error)
    })
}

function hideCard(card) {
  card.style.display = "none"
}

//pulsanti pre impostati su "f1" e "wrc"
const loadImages = document.getElementById("firstLoad")
loadImages.addEventListener("click", () => {
  funcLoadImages("f1")
})
const loadImages2 = document.getElementById("secondLoad")
loadImages2.addEventListener("click", () => {
  funcLoadImages("wrc")
})

//ricerca form
document.getElementById("search-form").addEventListener("submit", function (i) {
  i.preventDefault()

  const searchInput = document.getElementById("search-input")
  const searchKeyword = searchInput.value

  funcLoadImages(searchKeyword)
})
