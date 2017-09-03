/*global app */
(function(){
    var Model = app.Model,
        template = app.template,
        utils = app.utils;

    var _el;

    function _initialize(el) {
        _el = el;
        _model = new Model('point', {
            50: { number: 4 },
            100: { number: 8 },
            500: { number: 10 },
            1000: { number: 4 }
        });
        _model.on(_render);
        _render();
    }

    function _render() {
        var list = _model.get();

        _el.list.innerHTML = template.point(list);
        _el.total.innerHTML = template.totalPrice(_getTotal());
    }

    function _getTotal() {
        var list = _model.get(),
            total = 0;

        for (var key in list) {
            if (list.hasOwnProperty(key)) {
                total += parseInt(key, 10) * parseInt(list[key].number, 10);
            }
        }

        return total;
    }

    function _remove(data) {
        var list = _model.get();

        for (var key in data) {
            if (data.hasOwnProperty(key) && list[key]) {
                --list[key].number;
            }
        }

        _model.set(list);
    }

    function _update(data) {
        var list = _model.get(),
        temp = {};

        for (var key in data) {
            if (data.hasOwnProperty(key) && list[key]) {
                list[key].number += data[key].number;
            } else {
                temp[key] = { number: 1 };
                list = utils.extend(list, temp);
            }
        }
        _model.set(list);
    }

    window.app = window.app || {};
    window.app.point = {
        initialize: _initialize,
        remove: _remove,
        update: _update
    };
})();