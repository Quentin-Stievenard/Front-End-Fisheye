function photographerFactory(data) {
  const { name, portrait, city, country, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.onclick = function () {
      return (window.location.href = `http://127.0.0.1:5500/photographer.html?id=${data.id}`);
    };
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const location = document.createElement("p");
    location.textContent = city + ", " + country;
    location.className = "location";
    const slogan = document.createElement("p");
    slogan.textContent = tagline;
    slogan.className = "slogan";
    const prices = document.createElement("p");
    prices.textContent = price + "/jour";
    prices.className = "prices";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(slogan);
    article.appendChild(prices);
    return article;
  }
  return { name, picture, city, country, price, tagline, getUserCardDOM };
}

function photographerDetails(data) {
  const { name, portrait, city, country, price, tagline } = data;
  const urlSearchId = window.location.search.split("=")[1];

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const location = document.createElement("p");
    location.textContent = city + ", " + country;
    location.className = "location";
    const slogan = document.createElement("p");
    slogan.textContent = tagline;
    slogan.className = "slogan";

    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(slogan);

    return article;
  }
  return { name, picture, city, country, price, tagline, getUserCardDOM };
}

function photographerMedia(data) {
  const { date, image, likes, price, title, video } = data;
  getPhotographerName(data.photographerId).then((photographerName) => {
    const picture = `assets/photographers/media/${photographerName
      .split(" ")
      .join("_")}/${image ? image : video}`;
    const photographMedias = document.querySelector(".photograph-media");
    const media = document.createElement("div");
    const mediaInfo = document.createElement("div");

    mediaInfo.className = "media-info";
    media.className = "media-container";

    const img = document.createElement("img");
    img.setAttribute("src", picture);

    const name = document.createElement("h4");
    name.textContent = title;
    const like = document.createElement("p");
    like.textContent = likes;
    const heart = document.createElement("i");
    heart.className = "fa fa-heart";

    media.appendChild(img);
    like.appendChild(heart);

    mediaInfo.appendChild(name);
    mediaInfo.appendChild(like);

    media.appendChild(mediaInfo);

    photographMedias.appendChild(media);
  });

  function getUserCardDOM() {
    const article = document.createElement("article");

    return article;
  }
  return { date, image, likes, price, title, getUserCardDOM };
}
