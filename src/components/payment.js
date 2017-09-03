/*global app */
(function(){
    var Model = app.Model,
        template = app.template,
        product = app.product,
        payInfo = app.payInfo,
        point = app.point,
        cart = app.cart,
        message = app.message,
        utils = app.utils;
    
    var _el = {
            payment: utils.qs('#payment'),
            storage: utils.qs('#payment .total'),
            list: utils.qs('#pocket .list'),
            total: utils.qs('#pocket .total'),
            payback: utils.qs('#payment .payback'),
        },
        _status = {
            onDragStart: false,
            node: null
        };

    function _initialize() {
        payInfo.initialize(_el);
        point.initialize(_el);

        _setEvent();
    }

    function _setEvent() {
        _el.payment.addEventListener('mousedown', _onDragStart);
        _el.payment.addEventListener('mousemove', _onDrag);
        _el.payment.addEventListener('mouseup', _onDragEnd);
        _el.payback.addEventListener('click', _handlePayback);
    }

    function _onDragStart(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var target = e.target;

        if (target.tagName === 'A') {
            _status.onDragStart = true;
            _status.node = target;
        }
    }

    function _onDrag(e) {
        e.preventDefault();
        e.stopPropagation();

        var target = e.target;

        if (_status.onDragStart) {
            if (payInfo.inBox(e.pageX, e.pageY)) {
                utils.addClass(_el.storage, 'on');
            } else {
                utils.removeClass(_el.storage, 'on');
            }
        }
    }

    function _onDragEnd(e) {
        e.preventDefault();
        e.stopPropagation();

        var price,
            number,
            temp,
            pageX = e.pageX || e.clientX,
            pageY = e.pageY || e.clientY;

        if (_status.onDragStart) {
            price = parseInt(_status.node.getAttribute('data-price'), 10);
            number = parseInt(_status.node.getAttribute('data-number'), 10);
            temp = {};
            temp[price] = { number: 1 };

            if (payInfo.inBox(pageX, pageY)) {
                if (number === 0) {
                    message.add('돈이 없습니다.');
                    return;
                }

                if (!payInfo.isValid(price)) {
                    message.add('3000원을 초과할 수 없습니다.');
                    return;
                }

                point.remove(temp);
                payInfo.add(temp);

                if (payInfo.getTotal() >= cart.getTotal() && cart.getTotal() !== 0) {
                    product.remove(cart.get());
                    payInfo.update(cart.get());
                    cart.empty();
                    message.add('구매되었습니다.');
                }
            } else {
                message.add('돈을 떨어뜨렸습니다.');
                point.remove(temp);
            }
        }

        _status.onDragStart = false;
        _status.node = null;
    }

    function _handlePayback(e) {
        if (payInfo.getTotal() === 0) {
            return;
        }

        point.update(payInfo.get());
        cart.empty();
        payInfo.empty();
        message.add('환불되었습니다.');
    }

    window.app = window.app || {};
    window.app.payment = {
        initialize: _initialize
    };
})();