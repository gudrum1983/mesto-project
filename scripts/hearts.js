let iconsHeart = document.querySelectorAll('.icon-heart');
for (let i = 0; i < iconsHeart.length; i++) {
    iconsHeart[i].addEventListener('click', openHeart)
};

function openHeart() {
    this.classList.toggle('icon-heart_active');
};