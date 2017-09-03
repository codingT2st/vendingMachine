/*global app */
(function() {
    function _product(list) {
        var template = [],
            source;

        for (var i = 0, len = list.length; i < len; i++) {
            source = '<li><a href="#" data-serial="' + list[i].serial + '" data-name="' + list[i].name + '" data-price="' + list[i].price + '" data-stock="'+ list[i].stock +'">'+ list[i].name +' '+ list[i].price +'원</a></li>';
            template.push(source);
        }

        return template.join('');
    }

    function _point(list) {
        var template = [],
            source;

        for (var key in list) {
            source = '<li><a href="#" data-price="' + key + '" data-number="'+ list[key].number +'">'+ key +'원 - '+ list[key].number +'개</a></li>';
            template.push(source);
        }

        return template.join('');
    }

    function _totalPrice(value) {
        return '<strong>'+ value +'원</strong>';
    }

    function _payInfo(value) {
        return '<strong>'+ value +'원</strong>';
    }

    function _message(list) {
        var template = [],
            source;

        for (var i = 0, len = list.length; i < len; i++) {
            source = '<p><i>'+ list[i] +'</i></p>';
            template.push(source);
        }

        return template.join('');
    }

    window.app = window.app || {},
    window.app.template = {
        product: _product,
        point: _point,
        totalPrice: _totalPrice,
        payInfo: _payInfo,
        message: _message
    };
})();