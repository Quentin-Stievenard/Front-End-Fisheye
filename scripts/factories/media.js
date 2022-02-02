class ImageFactory {
  static render(picture, title, media) {
    const img = document.createElement("img");
    setAttributes(img, { src: picture, alt: "", "aria-label": title });

    img.onclick = () => {
      lightbox.style.display = "block";
      mediaContainer.innerHTML = `<img class="lightbox_media" src="${picture}">`;
      labelLightbox.innerHTML = `<p>${title}</p>`;
      localStorage.setItem("current-media", picture.split("/").slice(-1)[0]);
    };
    media.appendChild(img);
  }
}

class VideoFactory {
  static render(picture, media) {
    const vid = document.createElement("video");
    vid.setAttribute("src", picture);
    vid.onclick = () => {
      lightbox.style.display = "block";
      mediaContainer.innerHTML = `<video src="${picture}" ></video>`;
      localStorage.setItem("current-media", picture.split("/").slice(-1)[0]);
    };
    media.appendChild(vid);
  }
}

class MediaFactory {
  static render(data, picture, title, media) {
    if (data.video == undefined) {
      return ImageFactory.render(picture, title, media);
    } else {
      return VideoFactory.render(picture, media);
    }
  }
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
