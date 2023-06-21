// Autofocus for Modal 
var myModal = document.getElementById('joker-modal')
var myInput = document.getElementById('joker-modal')

myModal.addEventListener('shown.bs.modal', function () {
  console.log("Error will occure here, fix");
  // myInput.focus()
})


// Get the image and overlay elements
const image = document.querySelector('.dev_modal-card img');
const overlay = document.querySelectorAll('.dev_modal-card .overlay');

// Get the header and buttom elements
const header = document.querySelector('.dev_modal-header');
const button = document.querySelector('.dev_modal-button');

// Add a click event listener to the header and button to remove overlay
header.addEventListener('click', () => {
    image.classList.remove('dev_modal-card');
    overlay.forEach(o => o.classList.remove('d-flex'));
})

button.addEventListener('click', () => {
  image.classList.remove('dev_modal-card');
  overlay.forEach(o => o.classList.remove('d-flex'));
});


