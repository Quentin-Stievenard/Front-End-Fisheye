function photographerFactory(data) {
  const { name, portrait, city, country, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.onclick = function () {
      return (window.location.href = `http://127.0.0.1:5500/photographer.html?id=${data.id}`);
    };
    article.setAttribute("tabindex", 1);
    article.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        window.location.href = `http://127.0.0.1:5500/photographer.html?id=${data.id}`;
      }
    });

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
  const { name, portrait, city, country, price, tagline } = data || {};

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.setAttribute("tabindex", 0);
    h2.setAttribute("aria-label", name);
    const location = document.createElement("p");
    location.textContent = city + ", " + country;
    location.className = "location";
    location.setAttribute("tabindex", 0);
    location.setAttribute("aria-label", city + ", " + country);
    const slogan = document.createElement("p");
    slogan.textContent = tagline;
    slogan.className = "slogan";
    slogan.setAttribute("tabindex", 0);
    slogan.setAttribute("aria-label", tagline);

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
    const picture = `assets/photographers/media/${image ? image : video}`;

    const photographMedias = document.querySelector(".photograph-media");
    const media = document.createElement("div");
    const mediaInfo = document.createElement("div");
    const lightbox = document.querySelector(".lightbox_modal");
    const mediaContainer = document.getElementById("media-container");
    const mediaLightbox = document.querySelector(".lightbox_media");

    media.tabIndex = 0;
    media.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        lightbox.style.display = "block";
        mediaContainer.innerHTML = `<img class="lightbox_media" src="${picture}">`;
        labelLightbox.innerHTML = `<p>${title}</p>`;
        localStorage.setItem("current-media", picture.split("/").slice(-1)[0]);
      }
    });

    mediaInfo.className = "media-info";
    media.className = "media-container";

    MediaFactory.render(data, picture, title, media);

    let mediaLike = likes;

    const name = document.createElement("h4");
    name.textContent = title;
    const like = document.createElement("div");
    const number = document.createElement("p");

    const heart = document.createElement("i");
    heart.className = "fa fa-heart";
    heart.tabIndex = 0;
    heart.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.stopPropagation();
        mediaLike += 1;
        number.innerText = mediaLike;
        increaseTotalLikes();
      }
    });
    heart.addEventListener(
      "click",
      () => {
        mediaLike += 1;
        number.innerText = mediaLike;
        increaseTotalLikes();
      },
      { once: true }
    );

    number.innerText = mediaLike;

    like.style.display = "flex";
    like.style.alignItems = "center";

    like.appendChild(number);
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

function increaseTotalLikes() {
  const likes = document.getElementById("totalLikes");
  likes.innerText = Number(likes.innerHTML) + 1;
}
