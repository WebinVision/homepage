let images = [...document.querySelectorAll('.img')];
let slider = document.querySelector('.slider-exposicao-empresa');
let sliderWidth;
let imageHeight;
let current = 0;
let target = 0;
let ease = .05;
var header = document.getElementById("header-sticky");
window.onscroll = header.classList.add("sticky");

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
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`
}

function animate() {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(slider, `translateX(-${current}px)`)
    requestAnimationFrame(animate);
}

// stickyHeader();
init();
animate();