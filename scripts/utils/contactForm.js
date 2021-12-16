function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  const lightbox = document.getElementById("lightbox_modal");
  lightbox.style.display = "none";
}
