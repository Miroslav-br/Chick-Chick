import { addPreload, removePreload } from "./Preload.js";

const startSlider = (slider) => {
  removePreload(slider);
  
  const sliderItems = document.querySelectorAll('.slider__item');
  const sliderList = document.querySelector('.slider__list');
  const btnNextSlide = document.querySelector('.slider__arrow-right');
  const btnPrevSlide = document.querySelector('.slider__arrow-left');
  
  let activeSlide = 1;
  let position = 0;
  
  const checkSlider = () => {
    if(activeSlide + 2 === sliderItems.length && document.documentElement.offsetWidth > 560 || activeSlide === sliderItems.length){
      btnNextSlide.style.visibility = 'hidden';
    } else if (activeSlide === 1){
      btnPrevSlide.style.visibility = 'hidden';
    }
    else {
      btnNextSlide.style.visibility = '';
      btnPrevSlide.style.visibility = '';
    }
  }
  checkSlider();
  
  const nextSlide = () => {
    sliderItems[activeSlide]?.classList.remove('slider__item_active');
    position = -sliderItems[0].clientWidth * activeSlide;
    sliderList.style.transform = `translateX(${position}px)`;
    sliderItems[++activeSlide]?.classList.add('slider__item_active');
    checkSlider();
  }

  const prevSlide = () => {
    sliderItems[activeSlide]?.classList.remove('slider__item_active');
    position = -sliderItems[0].clientWidth * (activeSlide - 2);
    sliderList.style.transform = `translateX(${position}px)`;
    sliderItems[--activeSlide]?.classList.add('slider__item_active');
    checkSlider();
  }
  
  btnNextSlide.addEventListener('click', nextSlide);
  btnPrevSlide.addEventListener('click', prevSlide);

  window.addEventListener('resize', () => {
    position = -sliderItems[0].clientWidth * (activeSlide - 1);
    sliderList.style.transform = `translateX(${position}px)`;
  })
}


export const initSlider = () => {
  const slider = document.querySelector('.slider');
  const sliderContainer = document.querySelector('.slider__container');
  sliderContainer.style.display = 'none';


  addPreload(slider);
  window.addEventListener('load', () => {
    sliderContainer.style.display = '';
    startSlider(slider);
  });
}