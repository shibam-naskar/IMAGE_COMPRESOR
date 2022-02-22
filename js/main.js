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

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
});

["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
    });
});

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      ImageTobase64(e.dataTransfer.files[0]);
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
      //similarly add image to #output-file
      document.getElementById('input-file').style.backgroundImage="url("+reader.result+")";
      window.scrollBy({ 
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })

      
    };
  }
}

let inputFile = document.getElementById('inputFile');
let selectTag = document.getElementById('selectTag');
let outputImage = document.getElementById('outputImage');
let compressBtn = document.getElementById('compressBtn');
let downloadBtn = document.getElementById('downloadBtn');
let srcEncoded;

function compress() {
    let file = inputFile.files[0];
    if (!file) return;

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function (event) {

        let imgElement = document.createElement('img');
        imgElement.src = event.target.result;

        imgElement.onload = function (e) {
            let canvas = document.createElement('canvas');
            let scaleSize = selectTag.value;

            canvas.width = scaleSize * e.target.width;
            canvas.height = scaleSize * e.target.height;

            let ctx = canvas.getContext('2d');
            ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

            srcEncoded = ctx.canvas.toDataURL(e.target);
            outputImage.src = srcEncoded;
        }

    }
}

compressBtn.addEventListener('click', () => {
    compress();
})

downloadBtn.addEventListener('click', () => {
    let a = document.createElement('a');
    a.href = srcEncoded;
    a.download = "pConvert.png";
    a.click();
})