'use strict';
(function () {
    function yinYang (el) {
        const parent = el;
        const control = parent.querySelector('.yin-yang__control');
        const innerImg = control.closest('.yin-yang__photo-top');

        parent.ondragstart = function() {
            return false;
        };

        const handlerMousemove = function (e) {
            const offsetLeft = parent.getBoundingClientRect().x;
            const width = parent.offsetWidth;
            const x = e.clientX - offsetLeft || (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX);

            if (width - x < 0) {
                innerImg.style.width = 0 + 'px';
                return;
            } else if (width <= width - x) {
                innerImg.style.width = width + 'px';
                return;
            }
            innerImg.style.width = width - x + 'px';
        }

        if ('ontouchstart' in window) {
            control.addEventListener('touchstart', function (e) {
                console.log(1);
                window.addEventListener('touchmove', handlerMousemove);
            });
            window.addEventListener('touchend', function () {
                console.log(2);
                window.removeEventListener('touchmove', handlerMousemove);
            });
        } else {
            control.addEventListener('mousedown', function (e) {
                window.addEventListener('mousemove', handlerMousemove);
            });
            window.addEventListener('mouseup', function () {
                window.removeEventListener('mousemove', handlerMousemove);
            });
        }
    }
    Array.from(document.querySelectorAll('.yin-yang')).forEach(el => yinYang(el));
})();