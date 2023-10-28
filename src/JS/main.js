import { fetchData } from "./api";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";




const form = document.querySelector('.search-form');
const cardDiv = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');

btn.style.visibility = 'hidden';

// btn.addEventListener('click', loadMore);

// async function loadMore() {
    
// }

// function servisPages(pages) {
    
// }


form.addEventListener('submit', searchPhoto);

async function searchPhoto(event) {
    event.preventDefault();
   
    const searchQuery = event.target.elements.searchQuery.value;
 
    const cardData = await fetchData(searchQuery);
    
   
    const cards = cardData.hits;
 

    if (!cards.length) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    
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
                return `
                     <div class="photo-card">
                     <a class = "gallery__link" href="${largeImageURL}">
                     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                     <div class="info">
                     <p class="info-item">
                     <b>Likes</b>
                      ${likes}
                      </p>
                     <p class="info-item">
                     <b>Views</b>
                     ${views}
                      </p>
                     <p class="info-item">
                     <b>Comments</b>
                     ${comments}
                     </p>
                     <p class="info-item">
                     <b>Downloads</b>
                     ${downloads}
                     </p>
                     </div>
                     </a>
                  </div>
                  `
                
        })
            .join('');
      cardDiv.innerHTML = result;
      lightbox.refresh();
      
     

}

const lightbox = new SimpleLightbox('.gallery a');