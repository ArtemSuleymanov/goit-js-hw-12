import { fetchImg } from './js/pixabay-api.js';
import { changeGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(`.form`);
const input = document.querySelector(`.input`);
const loadMoreBtn = document.querySelector(`.load-more-btn`);
const gallery = document.querySelector(`.gallery`);
const loader = document.querySelector(`.loader`);

let totalImages = 0;
let hasImages = true;
let searchImg = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener(`submit`, onSearch);
loadMoreBtn.addEventListener(`click`, loadMoreImages);

function onSearch(event) {
    event.preventDefault();
    const query = input.value.trim();
    if (query === "") {
        iziToast.error({ title: 'Error', message: 'Please enter a search query' });
        return;
    }

    searchImg = query;
    clearGallery();
    currentPage = 1;
    loadingImg();
}

async function loadingImg() {
    try {
        showLoader();
        const data = await fetchImg(searchImg, currentPage); 
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.info({
                title: 'Info',
                message: `Sorry, we couldn't find the image.`
            });
            return;
        }
        changeGallery(data.hits);

        if (data.hits.length < 15 || currentPage * 15 >= totalHits) {
            hasImages = false;
            loadMoreBtn.style.display = `none`;
            iziToast.info({
                title: `End`,
                message: `We're sorry, but you've reached the end of search results.`
            });
        } else {
            hasImages = true;
            loadMoreBtn.style.display = `block`;
        }
    } catch (error) {
        iziToast.error({
            title: `Error`,
            message: 'An error occurred. Try again!'
        });
    } finally {
        hideLoader();
    }
}

async function loadMoreImages() {
    if (!hasImages) {
        return;
    }

    currentPage += 1;
    await loadingImg();

    const imgElement = gallery.querySelector(`.gallery-item`);
    if (imgElement) {
        const lastImgHeight = imgElement.getBoundingClientRect().height;
        window.scrollBy({
            top: lastImgHeight * 2,
            behavior: 'smooth'
        });
    }
}






// function onSearch(event) {
//     event.preventDefault();

//     const query = input.value.trim();
//     if (query === "") {
//         iziToast.error({ title: 'Error', message: 'Please enter a search query' });
//     return;
//     }

//     clearGallery();
//     showLoader();

//     fetchImg(query)
//     .then(data => {
//     if (data.hits.length === 0) {
//         iziToast.info({ title: 'Info', message: 'Sorry, there are no images matching your search query.' });
//         return;
//     }
//     changeGallery(data.hits);
//     })
//     .catch(error => {
//         iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later.' });
//         console.error(error);
//     })
//     .finally(() => hideLoader());
// }