import { fetchData } from "./api";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";




const form = document.querySelector('.search-form');
const cardDiv = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');

let page = 1;
let searchQuery = '';

btn.style.visibility = 'hidden';

btn.addEventListener('click', loadMore);

async function loadMore() {

    page += 1;
    const data = await fetchData(searchQuery, page);
    const cards = data.hits;
    const createMarkup = markup(cards);
     cardDiv.insertAdjacentHTML('beforeend', createMarkup);
    lightbox.refresh();
    console.log(cards.length);
    console.log(data.totalHits);
    
    if (page * 40 >= data.totalHits) {
       
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        btn.style.visibility = 'hidden';
    }

    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
    
}




form.addEventListener('submit', searchPhoto);

async function searchPhoto(event) {
    event.preventDefault();
    cardDiv.innerHTML = '';
    page = 1;
   
     searchQuery = event.target.elements.searchQuery.value;
    
 
    const cardData = await fetchData(searchQuery, page);
    console.log(cardData.hits.length);
    console.log(cardData.totalHits);
    
    if (cardData.total > 0) {
        Notiflix.Notify.success(`Hooray! We found ${cardData.total} images.`);
        
    }

    if (cardData.hits.length < cardData.totalHits) {
        btn.style.visibility = 'visible';
    }
   
    const cards = cardData.hits;
     const createMarkup = markup(cards);
     
    

    
    if (!cards.length) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
        
    } else {
        cardDiv.insertAdjacentHTML('beforeend', createMarkup);
     lightbox.refresh();
    }
    
    
    
}




function markup(cards) {
    

        return cards
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
      
    //   lightbox.refresh();
      
}

const lightbox = new SimpleLightbox('.gallery a');




// function handleScroll() {
//     const windowHeight = window.innerHeight;
//     const documentHeight = document.documentElement.scrollHeight;
//     const scrollPosition = window.scrollY;
 
//     if (documentHeight - (windowHeight + scrollPosition) ) {
//         loadMore();
//     }
// }
 
// window.addEventListener('scroll', handleScroll);
