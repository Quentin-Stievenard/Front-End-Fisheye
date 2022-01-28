class ImageFactory {
  static render(picture, title, media) {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", title);
    img.onclick = () => {
      lightbox.style.display = "block";
      mediaContainer.innerHTML = `<img class="lightbox_media" src="${picture}">`;
      localStorage.setItem("current-media", picture.split("/").slice(-1)[0]);
    };
    media.appendChild(img);
  }
}

class VideoFactory {
  static render(picture, media) {
    const vid = document.createElement("video");
    vid.setAttribute("src", picture);
    vid.setAttribute("controls", true);
    vid.onclick = () => {
      lightbox.style.display = "block";
      mediaContainer.innerHTML = `<video src="${picture}" controls></video>`;
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
