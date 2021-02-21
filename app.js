const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];



const KEY = '20354620-ab107c15b9b90a6efbf1b2782&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div);

    toggleSpinner(false); 

  })

}



const getImages = (query) => {

  toggleSpinner(true)

  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}


//one click added, secend click remove


let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  let item = sliders.indexOf(img);
  // add and remove selection by toggle
  if (item >= 0)
    sliders.splice(item, 1);
  else {
    sliders.push(img);
  }
  
  workToggle(element);
}

const workToggle = image => {
  image.classList.toggle('added');
}


var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  let duration = document.getElementById('doration').value|| 3000;
  //do that willingly
  if (duration <= 0) {
    return 0;
    
  }

  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';

  
  
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
}


// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})


//trigger button click on enter


var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
  if (event.key === `Enter`) {
   event.preventDefault();
   document.getElementById("search-btn").click();
  }
});


//spinner

const toggleSpinner =(show) =>{

  let spinner = document.getElementById("spinner")


  if(show){

    spinner.classList.remove(`d-none`)

  }
  else {

    spinner.classList.add(`d-none`)

  }

}


document.getElementById('back_btn').addEventListener('click', function(){

imagesArea.style.display = 'block';

document.getElementById("slider_page").style.display ="none"

})