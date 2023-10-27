import { fetchData } from "./api";
import Notiflix from "notiflix";



const form = document.querySelector('.search-form');
const cardDiv = document.querySelector('.gallery');

form.addEventListener('submit', searchPhoto);

async function searchPhoto(event) {
    event.preventDefault();
   
    const searchQuery = event.target.elements.searchQuery.value;
  
    const cardData = await fetchData(searchQuery);
    // console.log(cardData.hits);
    const cards = cardData.hits;
    
    markup(cards);
    
    
}

  function markup(cards) {

        const result = cards
            .map(card => {
                const {
                    webformatURL,
                    largeImageURL,
                    tags,
                    likes,
                    views,
                    comments,
                    downloads
                } = card;
            return `<div class="photo-card">
                     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                     <div class="info">
                     <p class="info-item">
                     <b>${likes}</b>
                     </p>
                     <p class="info-item">
                     <b>${views}</b>
                     </p>
                     <p class="info-item">
                     <b>${comments}</b>
                     </p>
                     <p class="info-item">
                     <b>${downloads}</b>
                     </p>
                     </div>
                  </div>`
        })
            .join('');
      cardDiv.innerHTML = result;
     

}
