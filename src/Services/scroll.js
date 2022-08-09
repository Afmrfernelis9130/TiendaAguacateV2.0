let mainLocation = window.pageYOffset
let $nav = document.querySelector('.ul-menu');

window.addEventListener('scroll', scrolling);

function scrolling() {
    let locationGet = window.pageYOffset;
    console.log(locationGet);

    if (mainLocation >= locationGet) {
        $nav.style.top = "0px";

    } else {
        $nav.style.top = "-80px";
    }

    mainLocation = locationGet;
}