export const baseUrl = "http://localhost:3000";
console.log("Base URL:", baseUrl);
export const headers = {
  "Content-Type": "application/json",
};

export const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getSavedNews = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${baseUrl}/articles`, {
      method: "GET",
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("There was an error!", error);
  }
};

export const addSavedNews = async (newsData, keyword) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${baseUrl}/articles`, {
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

    return handleResponse(response);
  } catch (error) {
    console.error("There was an error!", error);
  }
};

export const removeSavedNews = async (card) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${baseUrl}/articles/${card._id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("There was an error!", error);
  }
};
