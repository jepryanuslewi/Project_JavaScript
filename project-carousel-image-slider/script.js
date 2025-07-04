const carouselSlider = document.querySelector('.carousel-slider');
const imgSlider = document.querySelectorAll('.carousel-slider img');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;
let imageLength = imgSlider.length;
let autoSliderActive;

function updateSlide() {
    carouselSlider.style.transform = `translateX(-${currentIndex*100}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    })
}

function autoSlide() {
    clearInterval(autoSliderActive);
    autoSliderActive = setInterval(currentIndex, 3000);
}

function prev() {   
    currentIndex = (currentIndex -1 + imageLength) % imageLength;
    updateSlide();
}

function next() {
    currentIndex = (currentIndex + 1) % imageLength;
    updateSlide();
}

nextButton.addEventListener('click', next);
prevButton.addEventListener('click', prev);

indicators.forEach((indocator, index)=>{
    indocator.addEventListener('click', ()=>{
        currentIndex = index
        updateSlide()
    });
});

autoSliderActive = setInterval(next, 3000);