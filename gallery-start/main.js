const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
for (var i = 0; i < 5; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic' + (i + 1) + '.jpg');
    thumbBar.appendChild(newImage);
    newImage.onclick = function () {
        displayedImage.src = newImage.src;
    }
}
/* Wiring up the Darken/Lighten button */
btn.onclick = function () {
    if (btn.getAttribute('class') == 'dark') {
        console.log(btn.getAttribute('class'));
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }
    else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
}