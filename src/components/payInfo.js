/*global app */
(function(){
    var Model = app.Model,
        template = app.template,
        utils = app.utils;

    var _model,
        _el,
        _MAX_PRICE = 3000;

    function _initialize(el) {
        _el = el;

        _model = new Model('payInfo', {});
        _model.on(_render);
    }

    function _render() {
        _el.storage.innerHTML = template.payInfo(_getTotal());
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

    function _inBox(x, y) {
        return x > _el.storage.offsetLeft && y < _el.storage.offsetTop + _el.storage.offsetHeight;
    }

    function _add(data) {
        var list = _model.get(),
            temp = {};

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (list[key]) {
                    ++list[key].number;
                } else {
                    list = utils.extend(list, data);
                }
            }
        }

        _model.set(list);
    }

    function _isValid(price) {
        return _MAX_PRICE >= _getTotal() + price;
    }

    function _get() {
        return _model.get();
    }

    function _update(data) {
        var list = _model.get(),
            total = 0,
            temp = {},
            change;


        for (var i = 0, len = data.length; i < len; i++) {
            total += parseInt(data[i].price, 10);
        }

        change = _getTotal() - total;
        temp[change] = { number : 1 };
        _model.set(temp);

    }

    function _empty() {
        _model.set({});
    }

    window.app = window.app || {};
    window.app.payInfo = {
        initialize: _initialize,
        inBox: _inBox,
        add: _add,
        isValid: _isValid,
        get: _get,
        update: _update,
        getTotal: _getTotal,
        empty: _empty
    };
})();