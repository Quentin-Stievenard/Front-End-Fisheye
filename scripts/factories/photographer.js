function photographerFactory(data) {
  const { name, portrait, city, country, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
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
  const { date, image, likes, price, title } = data;

  const picture = `assets/photographers/${image}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
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

    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(slogan);

    return article;
  }
  return { name, picture, city, country, price, tagline, getUserCardDOM };
}
