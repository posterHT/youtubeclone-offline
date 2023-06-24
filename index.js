var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");


menuIcon.onclick = function () {
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");

}

function showScrollbar() {
    sidebar.style.overflowY = 'scroll';
}
function hideScrollbar() {
    sidebar.style.overflowY = 'hidden';
}

var showMoreBtn = document.getElementById('showMoreBtn');
var hiddenChannels = document.querySelector('.hidden-channels');
var isMoreShown = false;

showMoreBtn.addEventListener('click', function () {
    if (!isMoreShown) {
        hiddenChannels.style.display = 'block';
        showMoreBtn.textContent = 'Daha Az Göster';
        isMoreShown = true;
    } else {
        hiddenChannels.style.display = 'none';
        showMoreBtn.textContent = 'Daha Fazla Göster';
        isMoreShown = false;
    }
});

