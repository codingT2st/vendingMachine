/*global app */
(function(){
    var Model = app.Model,
        utils = app.utils;
    
    var _model;

    function _initialize() {
        _model = new Model('cart', []);
        // _model.on(_log);
    }

    function _add(item) {
        _model.set(_model.get().concat(item));
    }

    // function _log() {
    //     message.add(name+'을 선택 하셨습니다.');
    // }

    function _hasItem(serial) {
        var list = _model.get();

        for (var i = 0, len = list.length; i < len; i++ ) {
            if (list[i].serial === serial) {
                return true;
            }
        }

        return false;
    }

    function _getTotal() {
        var list = _model.get(),
            total = 0;

        for (var i = 0, len = list.length; i < len; i++) {
            total += parseInt(list[i].price, 10) * parseInt(list[i].stock, 10);
        }

        return total;
    }

    function _get() {
        return _model.get();
    }

    function _isEmpty() {
        var list = _model.get();
        return list.length === 0;
    }

    function _empty() {
        _model.set([]);
    }
   
    window.app = window.app || {};
    window.app.cart = {
        initialize: _initialize,
        add: _add,
        hasItem: _hasItem,
        getTotal: _getTotal,
        get: _get,
        isEmpty: _isEmpty,
        empty: _empty
    };
})();