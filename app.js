let images = [...document.querySelectorAll('.img')];
let slider = document.querySelector('.slider-exposicao-empresa');
let innerSlider = document.querySelector('.slider-inner');

let sliderWidth;
let imageHeight;
let current = 0;
let target = 0;
let ease = .05;

window.addEventListener('resize', init);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

images.forEach((img, index) => {
    img.style.backgroundImage = `url(./images/parallax-${index+1}.jpg)`
})

function lerp(start, end, t) {
    return start * (1-t) + end * t;
}

function setTransform(element, transform) {
    element.style.transform = transform;
}

function init() {
    sliderWidth = slider.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    // document.body.style.height = `${sliderWidth - (3*(window.innerWidth) - window.innerHeight)}px`
}

function animate() {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(slider, `translateX(-${current}px)`)
    animateImages();
    requestAnimationFrame(animate);
}

function animateImages() {
    let ratio = current / imageWidth;
    let intersectionRatioValue;

    images.forEach((image, index) => {
        intersectionRatioValue = ratio - (index * 0.5);
        setTransform(image, `translateX(${intersectionRatioValue * 80}px)`)
    })
}

init();
animate();