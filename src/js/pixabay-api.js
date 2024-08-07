import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '38315380-10eeb0cf3b6e9a9ad49e9c507';

export async function searchGalleryQuery(query, page = 1) {
  const perPage = 15;

  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data from Pixabay API', error);
    throw error;
  }
}
