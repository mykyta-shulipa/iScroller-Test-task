function iScroller(paramsObject) {
    'use strict';
    // paramsObject contains following properties:
    // resultSelector, containerSelector, elementListSelector, placeholderSelector, classNameToFix, classNameToHide
    var result = document.querySelector(paramsObject.resultSelector);
    var stickyList = result.querySelectorAll(paramsObject.elementListSelector),
        container = result.querySelector(paramsObject.containerSelector),
        placeholder = result.querySelector(paramsObject.placeholderSelector),
        previousElement = null,
        currentElement = null,
        onScroll = function () {
            var input = [], index, maxOffsetElement, currentOffsetTop;
            for (index = 0; index < stickyList.length; index++) {
                currentOffsetTop = $(stickyList[index]).offset().top;
                if (currentOffsetTop <= 0) {
                    input.push({index: index, offsetTop: currentOffsetTop});
                }
            }

            if (input && input.length) {
                maxOffsetElement = input[0];
                for (index = 0; index < input.length; index++) {
                    if (-input[index].offsetTop > maxOffsetElement.offsetTop) {
                        maxOffsetElement = input[index];
                    }
                }
                currentElement = stickyList[maxOffsetElement.index];
                if (previousElement !== currentElement) {
                    if (placeholder.classList.contains(paramsObject.classNameToHide)) {
                        placeholder.classList.remove(paramsObject.classNameToHide);
                    }
                    if (!placeholder.classList.contains(paramsObject.classNameToFix)) {
                        placeholder.classList.add(paramsObject.classNameToFix);
                    }
                    previousElement = currentElement;
                    placeholder.innerHTML = currentElement.innerHTML;
                }
            }
        };

    $(container).on('scroll', onScroll);
}