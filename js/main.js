document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      ImageTobase64(inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      ImageTobase64(e.dataTransfer.files);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

// get base 64 data of uploded image
function ImageTobase64(file) {
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log(reader.result);
      document.querySelector('.drop-zone__prompt').remove();
      var preview = document.getElementById("preview");
      preview.setAttribute('src',reader.result);

      document.getElementById('details').style.visibility ='visible';
      window.scrollBy({ 
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
    };
  }
}
