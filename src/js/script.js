const menuItem = document.querySelectorAll(".menu__item"),
    activeMenuLink = document.querySelector(".menu__link-active"),
    pageup = document.querySelector(".pageup"),
    linkToForm = document.querySelector("#toForm");

menuItem.forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.children[0].classList.add("menu__link-active");
        item.children[1].classList.add("menu__item-list-hidden");
        setTimeout(() => {
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

pageup.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

if (linkToForm) {
    linkToForm.addEventListener('click', (e) => {
        e.preventDefault();
        const blockID = linkToForm.getAttribute("href");
        document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('scroll', function () {
        if (window.scrollY > 600 && pageup.classList.contains('pageup-none')) {
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
    const videos = ["videos/video1.mp4", "videos/video2.mp4", "videos/video3.mp4", "videos/video4.mp4", "videos/video5.mp4", "videos/video6.mp4"];
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

        }, 0);
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

        }, 0);
    });
}

//форма
function CustomValidation() {

}

CustomValidation.prototype = {
    invalidities: [],
    validityChecks: [],
    addInvalidity: function (message) {
        this.invalidities.push(message);
    },
    getInvalidities: function () {
        return this.invalidities.join('. \n');
    },
    checkValidity: function (input) {
        for (var i = 0; i < this.validityChecks.length; i++) {
            let isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }

            let requirementElement = this.validityChecks[i].element;
            let list = requirementElement.parentElement.children[2];

            if (requirementElement) {
                if (isInvalid) {
                    list.childNodes.forEach(e => {
                        if (this.validityChecks[i].invalidityMessage === e.textContent.slice(1)) {

                            e.classList.add('invalid');
                            e.classList.remove('valid');
                        }
                    });

                } else {
                    list.childNodes.forEach(e => {
                        if (this.validityChecks[i].invalidityMessage === e.textContent.slice(1)) {
                            e.classList.remove('invalid');
                            e.classList.add('valid');
                        }
                    });
                }

            }
        }
    }
};

const callName = document.querySelector("#name"),
    callPhone = document.querySelector("#phone"),
    callEmail = document.querySelector("#email"),
    submit = document.querySelector("#submit");
callPhone.addEventListener("input", mask, false);
callPhone.addEventListener("focus", mask, false);
callPhone.addEventListener("blur", mask, false);
let inputs;
if (callEmail) {
    inputs = [callName, callPhone, callEmail];
} else {
    inputs = [callName, callPhone];
}
var nameValidityChecks = [
    {
        isInvalid: function (input) {
            return input.value.length < 2;
        },
        invalidityMessage: 'Не менее двух символов',
        element: callName
    },
    {
        isInvalid: function (input) {
            var illegalCharacters = input.value.match(/[0-9]/g);
            return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Должны быть только буквы',
        element: callName
    }
];

var phoneValidityChecks = [
    {
        isInvalid: function (input) {
            let value = input.value;
            value = value.replaceAll("+", "");
            value = value.replaceAll("-", "");
            value = value.replaceAll("(", "");
            value = value.replaceAll(")", "");
            value = value.replaceAll(" ", "");
            return value.length < 11;
        },
        invalidityMessage: 'Не менее одиннадцати символов',
        element: callPhone
    },
    {
        isInvalid: function (input) {
            var illegalCharacters = input.value.match(/[a-zA-Z]/g);
            return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Должны быть только цифры',
        element: callPhone
    }
];

var emailValidityChecks = [
    {
        isInvalid: function (input) {
            return input.value.length < 5;
        },
        invalidityMessage: 'Не менее пяти символов',
        element: callEmail
    },
    {
        isInvalid: function (input) {
            var illegalCharacters = input.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            return illegalCharacters ? false : true;
        },
        invalidityMessage: `Email должен соответствовать шаблону-*@*.*`,
        element: callEmail
    }
];

callName.CustomValidation = new CustomValidation();
callName.CustomValidation.validityChecks = nameValidityChecks;

callPhone.CustomValidation = new CustomValidation();
callPhone.CustomValidation.validityChecks = phoneValidityChecks;

if (callEmail) {
    callEmail.CustomValidation = new CustomValidation();
    callEmail.CustomValidation.validityChecks = emailValidityChecks;
}

inputs.forEach((e) => {
    if (e) {
        e.addEventListener('keyup', function () {
            checkInput(e);
        });
        e.addEventListener('focus', function () {
            toggleRequirements(e);
            checkInput(e);
        });
        e.addEventListener('blur', function () {
            toggleRequirements(e);
        });
    }
});
submit.addEventListener('click', function () {
    for (var i = 0; i < inputs.length; i++) {

        if (inputs[i]) {
            checkInput(inputs[i]);
        }
    }
});




function toggleRequirements(e) {
    let s = "bid__label";
    e.parentNode.classList.toggle(`${s}-active`);
    e.parentNode.children[2].classList.toggle("input-requirements-active");
}


function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
    }
}

function mask(event) {
    var matrix = "+7 (___)-___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) {
        val = def;
    }
    this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
    if (event.type == "blur") {
        if (this.value.length == 2) {
            this.value = "";
        }
    } else {
        setCursorPosition(this.value.length, this);
    }
}

function checkInput(input) {

    input.CustomValidation.invalidities = [];
    input.CustomValidation.checkValidity(input);

    if (input.CustomValidation.invalidities.length == 0 && input.value != '') {
        input.setCustomValidity('');
    } else {
        var message = input.CustomValidation.getInvalidities();
        input.setCustomValidity(message);
    }
}

