let images = [...document.querySelectorAll('.img')];
let images2 = [...document.querySelectorAll('.img2')];
let slider = document.querySelector('.slider-exposicao-empresa');
let slider2 = document.querySelector('.slider-exposicao-empresa-2');

let sliderWidth;
let sliderWidth2;
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

images2.forEach((img2, index) => {
    img2.style.backgroundImage = `url(./images/second-parallax-${index+1}.jpg)`
})

function lerp(start, end, t) {
    return start * (1-t) + end * t;
}

function setTransform(element, transform) {
    element.style.transform = transform;
}

function init() {
    sliderWidth = slider.getBoundingClientRect().width;
    sliderWidth2 = slider2.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    imageWidth2 = sliderWidth2 / images2.length;
    // document.body.style.height = `${sliderWidth - (3*(window.innerWidth) - window.innerHeight)}px`s
}

function animate() {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(slider, `translateX(-${current}px)`)
    setTransform(slider2, `translateX(${current}px)`)
    animateImages();
    requestAnimationFrame(animate);
}

function animateImages() {
    let ratio = current / imageWidth;
    let ratio2 = current / imageWidth2;
    let intersectionRatioValue;
    let intersectionRatioValue2;

    images.forEach((image, index) => {
        intersectionRatioValue = ratio - (index * 0.8);
        setTransform(image, `translateX(${intersectionRatioValue * 80}px)`)
    })

    images2.forEach((image, index) => {
      intersectionRatioValue2 = ratio2 - (index * 0.8);
      setTransform(image, `translateX(${intersectionRatioValue2 * 80}px)`)
    })
}

init();
animate();