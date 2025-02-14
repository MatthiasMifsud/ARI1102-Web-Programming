document.querySelectorAll('.slider-container').forEach(sliderContainer => {
    let currentSlide = 0;
    const slides = sliderContainer.querySelectorAll('.slider img');
    const prevButton = sliderContainer.querySelector('.prev');
    const nextButton = sliderContainer.querySelector('.next');

    function showSlide(index) {
        for(let i = 0; i<slides.length; i++){
            if(i === index){
                slides[i].style.display =  "block";
            }
            else{
                slides[i].style.display =  "none";
            }
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    showSlide(currentSlide);
});

