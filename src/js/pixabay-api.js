import axios from 'axios';

const API_KEY = "47430297-39549c12782b3a6dbb0b94f2b";
const API_URL = "https://pixabay.com/api/";

// export function fetchImg(query, page = 1, perPage = 12) {
//     const urlImg = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    
//     return fetch(urlImg)
//         .then(response => {
//         if (!response.ok) {
//             throw new Error('Error fetching images');
//         }
//         return response.json();
// });
// }

export let initialPage = 1;

export async function fetchImg(query, page) {
    try {
        const response = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                q: query,
                page: page,
                per_page: 15,
                image_type: 'photo',
                orientation: 'horizontal',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error not found images: ', error);
        throw error;
    }
}