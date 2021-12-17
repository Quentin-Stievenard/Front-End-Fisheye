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

function onSubmit() {
  const prenom = document.getElementById("prenom");
  const nom = document.getElementById("nom");
  const mail = document.getElementById("mail");
  const message = document.getElementById("message");

  console.log(prenom.innerHTML);
}
