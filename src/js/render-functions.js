// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(`.gallery`);

let lightbox;

export function changeGallery(images){
    const markup = images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
        `<a href="${largeImageURL}" class="gallery-item">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
    </div>
    </a>`
    ).join("");

gallery.innerHTML = markup;

if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
} else {
    lightbox.refresh();
}
}

export function clearGallery(){
    gallery.innerHTML = " ";
}
export function showLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.remove('hidden');
    }
}

export function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('hidden');
    }
}
