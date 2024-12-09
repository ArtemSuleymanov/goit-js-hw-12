import { fetchImg } from './js/pixabay-api.js';
import { changeGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(`.form`);
const input = document.querySelector(`.input`);

form.addEventListener(`submit`, onSearch);

function onSearch(event) {
    event.preventDefault();

    const query = input.value.trim();
    if (query === "") {
        iziToast.error({ title: 'Error', message: 'Please enter a search query' });
    return;
    }

    clearGallery();
    showLoader();

    fetchImg(query)
    .then(data => {
    if (data.hits.length === 0) {
        iziToast.info({ title: 'Info', message: 'Sorry, there are no images matching your search query.' });
        return;
    }
    changeGallery(data.hits);
    })
    .catch(error => {
        iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later.' });
        console.error(error);
    })
    .finally(() => hideLoader());
}