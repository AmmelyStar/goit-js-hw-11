
import axios from "axios";
import Notiflix from "notiflix";

const API_KEY = '40268074-5c3ececf222fa6778734cace7';
const URL = 'https://pixabay.com/api/';


export async function fetchData(searchQuery, page) {
   
  try {
    const resp = await axios.get(
      `${URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );

    

    return resp.data;
    
  } catch (error) {
    Notiflix.Notify.failure('Sorry error');
  }
}


