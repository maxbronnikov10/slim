const menuItem = document.querySelectorAll(".menu__link"),
    activeMenuLink = document.querySelector(".menu__link-active"),
    hamburger = document.querySelector(".hamburger"),
    info = document.querySelector(".header__info"),
    infoClose = info.querySelector(".header__info-cross"),
    overlay = document.querySelector(".overlay");

menuItem.forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.nextElementSibling.classList.add("menu__item-list-hidden");
        setTimeout(() => {

            item.classList.add("menu__link-active");
            item.nextElementSibling.classList.add("menu__item-list-active");
        }, 5);
    });
    item.addEventListener("mouseleave", () => {
        if (item != activeMenuLink) {
            item.classList.remove("menu__link-active");

        }

        item.nextElementSibling.classList.remove("menu__item-list-active");
        setTimeout(() => {

            item.nextElementSibling.classList.remove("menu__item-list-hidden");
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