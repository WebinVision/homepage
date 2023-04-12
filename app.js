let images = [...document.querySelectorAll('.img')];
let slider = document.querySelector('.slider-exposicao-empresa');
let innerSlider = document.querySelector('.slider-inner');

let sliderWidth;
let imageHeight;
let current = 0;
let target = 0;
let ease = .05;

let pressed = false
let startx;
let x;

window.addEventListener('resize', init);

images.forEach((img, index) => {
    img.style.backgroundImage = `url(./images/parallax-${index+1}.jpg)`
})

// slider.addEventListener('mousedown', (e) => {
//     pressed = true;
//     startx = e.offsetX - innerSlider.offsetLeft;
//     innerSlider.style.cursor = 'grabbing'
// })

// slider.addEventListener('mouseenter', () => {
//     innerSlider.style.cursor = 'grab'
// })

// slider.addEventListener('mouseup', () => {
//     innerSlider.style.cursor = 'grab'
// })

// slider.addEventListener('mouseup', () => {
//     pressed = false;
// })

// slider.addEventListener('mousemove', (e) => {
//     if(!pressed) return;
//     e.preventDefault();

//     x = e.offsetX

//     innerSlider.style.left = `${x - startx}px`;

//     checkBoundary();
// })

// function checkBoundary() {
//     let outer = slider.getBoundingClientRect();
//     let inner = innerSlider.getBoundingClientRect();

//     if (parseInt(innerSlider.style.left) > 0){
//         innerSlider.style.left = '0px';
//     } else if (inner.right < outer.right) [
//         innerSlider.style.left = `${inner.width - outer.width}px`
//     ]
// }

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
    animateImages();
    requestAnimationFrame(animate);
}

function animateImages() {
    let ratio = current / imageWidth;
    let intersectionRatioValue;

    images.forEach((image, index) => {
        intersectionRatioValue = ratio - (index * 0.7);
        setTransform(image, `translateX(${intersectionRatioValue * 70}px)`)
    })
}

innerSlider.addEventListener('mouseenter', () => {
    init();
    animate();
})

// init();
// animate();