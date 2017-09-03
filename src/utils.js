/*global app */
(function(){
    function _qs(selector, scope) {
        return (scope || document).querySelector(selector);
    }

    function _shuffle(list) {
        var temp = [],
            number;

        while (list.length) {
            number = _random(0, list.length);
            temp.push(list.splice(number, 1)[0]);
        }

        return temp;
    }

    function _getKey(list) {
        var temp = [];

        for (var key in list) {
            temp.push(key);
        }

        return temp;
    }

    function _random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function _extend() {
        var obj = {};
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            for (var key in arg) {
                if (arg.hasOwnProperty(key)) {
                    obj[key] = arg[key];
                }
            }
        }
        return obj;
    }

    function _addClass(el, className) {
        if (el.className.indexOf(className) > -1) {
            return;
        }
        
        el.className += ' ' + className;
    }

    function _removeClass(el, className) {
        var name = el.className.split(' ');

        for (var i = 0, len = name.length; i < len; i++) {
            if (name[i] === className) {
                name.splice(i, 1);
            }
        }

        el.className = name.join('');
    }

    window.app = window.app || {};
    window.app.utils = {
        qs: _qs,
        shuffle: _shuffle,
        getKey: _getKey,
        random: _random,
        extend: _extend,
        addClass: _addClass,
        removeClass: _removeClass
    };
})()