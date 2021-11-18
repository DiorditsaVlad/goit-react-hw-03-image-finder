/////////////////////////////////////////
export default function fetchImage(searchName, pages) {
  const key = `23634410-bd912d8d36772bd1c0bd0325c`;
  return fetch(
    `https://pixabay.com/api/?q=${searchName}&page=${pages}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`no images on request`));
  });
}

///////////////////////////////////////////
