const menuItem = document.querySelectorAll(".menu__item"),
    activeMenuLink = document.querySelector(".menu__link-active"),
    hamburger = document.querySelector(".hamburger"),
    info = document.querySelector(".header__info"),
    infoClose = info.querySelector(".header__info-cross"),
    overlay = document.querySelector(".overlay"),
    pageup = document.querySelector(".pageup");

menuItem.forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.children[1].classList.add("menu__item-list-hidden");
        setTimeout(() => {

            item.children[0].classList.add("menu__link-active");
            item.children[1].classList.add("menu__item-list-active");
        }, 5);
    });
    item.addEventListener("mouseleave", () => {

        if (item.children[0] != activeMenuLink) {
            item.children[0].classList.remove("menu__link-active");

        }

        item.children[1].classList.remove("menu__item-list-active");
        setTimeout(() => {

            item.children[1].classList.remove("menu__item-list-hidden");
        }, 500);

    });
});

hamburger.addEventListener("click", () => {
    overlay.classList.add("overlay-hidden");
    setTimeout(() => {

        overlay.classList.add("overlay-active");
    }, 5);
    info.classList.add("header__info-active");
});
infoClose.addEventListener("click", () => {
    overlay.classList.remove("overlay-active");
    setTimeout(() => {

        overlay.classList.remove("overlay-hidden");
    }, 500);
    info.classList.remove("header__info-active");
});

pageup.addEventListener('click', (e) => {
    e.preventDefault();
    const blockID = pageup.getAttribute('href');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('scroll', function () {
        if (window.scrollY > window.innerHeight / 3 && info.classList.contains("header__info-active")) {
            overlay.classList.remove("overlay-active");
            setTimeout(() => {

                overlay.classList.remove("overlay-hidden");
            }, 500);
            info.classList.remove("header__info-active");
        }
        else if (window.scrollY > 600 && pageup.classList.contains('pageup-none')) {
            pageup.classList.remove('pageup-none');
            pageup.classList.add('pageup-active');
            setTimeout(function () {
                pageup.classList.remove('pageup-hidden');
            }, 5);
        }
        else if (window.scrollY < 600 && pageup.classList.contains('pageup-active')) {
            pageup.classList.add('pageup-hidden');
            pageup.addEventListener('transitionend', function (e) {
                pageup.classList.add('pageup-none');
                pageup.classList.remove('pageup-active');
            });
        }
    });

});
if (document.body.dataset.id === "main") {
    const videos = ["videos/video1.mp4", "videos/video2.mp4", "videos/video1.mp4"]
    const carouselWrapper = document.querySelector(".carousel__wrapper"),
        carouselArrowLeft = document.querySelector(".carousel__arrow-left"),
        carouselArrowRight = document.querySelector(".carousel__arrow-right");
    let index = 0;
    carouselArrowLeft.addEventListener("click", () => {
        const temp = index;
        if (index - 1 < 0) {
            index = 2;
        } else {
            index -= 1;
        }
        carouselWrapper.innerHTML = `<video src="${videos[temp]}" autoplay=true loop=true muted=true class="carousel__video"></video><video src="${videos[index]}" autoplay=true loop=true muted=true class="carousel__video"></video>`;
        setTimeout(() => {
            carouselWrapper.children[0].classList.add("carousel__video-left");
            carouselWrapper.children[1].classList.add("carousel__video-left");

        }, 10);
    });
    carouselArrowRight.addEventListener("click", () => {

        const temp = index;
        if (index + 1 === videos.length) {
            index = 0;
        } else {
            index += 1;
        }
        carouselWrapper.innerHTML = `<video src="${videos[temp]}" autoplay=true loop=true muted=true class="carousel__video"></video><video src="${videos[index]}" autoplay=true loop=true muted=true class="carousel__video carousel__video-order"></video>`;
        setTimeout(() => {
            carouselWrapper.children[0].classList.add("carousel__video-right");
            carouselWrapper.children[1].classList.add("carousel__video-fromLeft");

        }, 10);
    });

}