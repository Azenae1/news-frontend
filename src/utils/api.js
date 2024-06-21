export const baseUrl = process.env.NODE_ENV === "http://localhost:3001";

export const headers = {
  "Content-Type": "application/json",
};

export const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export function request(baseUrl, options) {
  return fetch(baseUrl, options).then(handleResponse);
}

export const getSavedNews = () => {
  const token = localStorage.getItem("token");

  return request(`${baseUrl}/articles`, {
    method: "GET",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
};

export const addSavedNews = (newsData, keyword) => {
  const token = localStorage.getItem("token");

  return request(`${baseUrl}/articles`, {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: newsData.title,
      text: newsData.description,
      date: newsData.publishedAt,
      source: newsData.source.name,
      link: newsData.url,
      image: newsData.urlToImage,
      keyword: keyword,
    }),
  });
};

export const removeSavedNews = (card) => {
  const token = localStorage.getItem("token");

  return request(`${baseUrl}/articles/${card._id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
};
