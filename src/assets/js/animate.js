import { animations } from './percentAnimation';

function animateOnIntersection(selector, animationClass) {
  const elements = document.querySelectorAll(selector);
  const resultEl = document.querySelectorAll('.result-card');

  const options = {
    rootMargin: '0px',
    threshold: 0,
  };

  const callback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (animationClass) {
          entry.target.classList.add(animationClass);
        }
        if (entry.target.classList.contains('numberPercent')) {
          animations();
        }

        if (entry.target.classList.contains('result-list')) {
          resultEl.forEach(el => el.classList.add('result-card-animate'));
        }
      } else {
        if (animationClass) {
          entry.target.classList.remove(animationClass);
        }
        if (entry.target.classList.contains('result-list')) {
          resultEl.forEach(el => el.classList.remove('result-card-animate'));
        }
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  elements.forEach(element => {
    observer.observe(element);
  });
}

animateOnIntersection('.programming-card', 'programming-animate');
animateOnIntersection('.cardCompany', 'animatedCard');
animateOnIntersection('.cardChoose', 'animatedCard');
animateOnIntersection('.numberPercent', '');
animateOnIntersection('.result-list', '');
