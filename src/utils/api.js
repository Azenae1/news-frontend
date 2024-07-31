export const baseUrl = "http://localhost:3001";
export const headers = {
  "Content-Type": "application/json",
};

export const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getSavedNews = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return [];
  }

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
    return [];
  }
};

export const addSavedNews = async (newsData, keyword, token) => {
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

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    // console.log("Article saved response:", data);
    return data;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};

export const removeSavedNews = async (cardId, token) => {
  try {
    // console.log(`Removing article with ID: ${cardId}`);
    const response = await fetch(`${baseUrl}/articles/${cardId}`, {
      method: "DELETE",
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    // console.log("Article removed response:", data);
    return data;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
};

//Simulation
// export const addSavedNews = (newsData, keyword) => {
//   return new Promise((resolve, reject) => {
//     resolve({
//       data: {
//         id: "65f7371e7bce9e7d331b11a0",
//         title: newsData.title,
//         text: newsData.description,
//         date: newsData.publishedAt,
//         source: newsData.source.name,
//         link: newsData.url,
//         image: newsData.urlToImage,
//         keyword: keyword,
//       },
//     });
//   });
// };

// export function getSavedNews() {
//   return new Promise((resolve, reject) =>
//     resolve([
//       {
//         id: "65f7368dfb74bd6a92114c85",
//         source: "Wired",
//         title: "‘SimCity’ Isn’t a Model of Reality. It’s a Libertarian Toy...",
//         description:
//           "Beneath its playful exterior, the beloved game that inspired a generation of real-world urban designers betrays a partisan view of social planning.",
//         link: "https://apnews.com/arthttps://www.wired.com/story/simcity-libertarian-toy-land/#:~:text=Model%20of%20Reality.-,It's%20a%20Libertarian%20Toy%20Land,partisan%20view%20of%20social%20planning.icle/pga-championship-glance-valhalla-cf9331b47d0320a02bc92e67fbf26e6f",
//         urlToImage:
//           "https://media.wired.com/photos/667c76c517180f5bf41ab863/191:100/w_1280,c_limit/062624-excerpt-simcity-kelly-clancy.jpg",
//         publishedAt: "Updated 9:23 PM EDT, June 27, 2024",
//         content:
//           "Beneath its playful exterior, the beloved game that inspired a generation of real-world urban designers betrays a partisan view of social planning.",
//         keyword: "giraffe",
//       },
//       {
//         id: "65f7368dfb74bd6a92114c85",
//         source: "Wired",
//         title: "‘SimCity’ Isn’t a Model of Reality. It’s a Libertarian Toy...",
//         description:
//           "Beneath its playful exterior, the beloved game that inspired a generation of real-world urban designers betrays a partisan view of social planning.",
//         link: "https://www.bbc.com/news/world-us-canada-67285325",
//         urlToImage:
//           "https://ichef.bbci.co.uk/news/1024/cpsprodpb/10FE7/production/_133470696_us-elec-guide-976-header-nc-1.png.webp",
//         publishedAt: "Updated 9:23 PM EDT, June 27, 2024",
//         content:
//           "Beneath its playful exterior, the beloved game that inspired a generation of real-world urban designers betrays a partisan view of social planning.",
//         keyword: "cat",
//       },
//       {
//         id: "65f7368dfb74bd6a92114c85",
//         source: "Wired",
//         title: "‘SimCity’ Isn’t a Model of Reality. It’s a Libertarian Toy...",
//         description:
//           "Beneath its playful exterior, the beloved game that inspired a generation of real-world urban designers betrays a partisan view of social planning.",
//         link: "https://www.bbc.com/news/articles/c16j896003xo",
//         urlToImage:
//           "https://ichef.bbci.co.uk/news/1024/cpsprodpb/f49d/live/1c4a9520-4396-11ef-9b44-55b14f49e9b4.jpg.webp",
//         publishedAt: "Updated 9:23 PM EDT, June 27, 2024",
//         content:
//           "Beneath its playful exterior, the beloved game that inspired a generation of real-world urban designers betrays a partisan view of social planning.",
//         keyword: "raccoon",
//       },
//     ])
//   );
// }

// export const removeSavedNews = (card) => {
//   return new Promise((resolve) => {
//     resolve();
//   });
// };
