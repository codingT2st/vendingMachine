/*global app */
(function(){
    var Model = app.Model,
        template = app.template,
        cart = app.cart,
        payInfo = app.payInfo,
        message = app.message,
        utils = app.utils;
    
    var _model,
        _el = utils.qs('#product .list'),
        _keys;

    function _initialize(model) {
        _model = new Model('product', {
            900101: { name: '펩시', price: 300, stock: utils.random(1, 4) },
            900102: { name: 'V10', price: 200, stock: utils.random(1, 4) },
            900103: { name: '거름', price: 700, stock: utils.random(1, 4) },
            900104: { name: '맹물', price: 500, stock: utils.random(1, 4) },
            900105: { name: '환타', price: 800, stock: utils.random(1, 4) },
            900106: { name: '식혜', price: 100, stock: utils.random(1, 4) },
            900107: { name: '국물', price: 400, stock: utils.random(1, 4) },
            900108: { name: '박카스', price: 600, stock: utils.random(1, 4) }
        });

        _model.on(_render);
        _setEvent();
        _setKeys();
        _render();
    }
    
    function _setEvent() {
        _el.addEventListener('click', _handleClick);
    }

    function _setKeys() {
        var list = _model.get(),
            temp = [];
        _keys = utils.shuffle(utils.getKey(list));
    }

    function _render() {
        var list = _model.get(),
            temp = [];

        for (var i = 0, len = _keys.length; i < len; i++) {
            temp.push(utils.extend(list[_keys[i]], {
                serial: _keys[i]
            }));
        }
        
        _el.innerHTML = template.product(temp);
    }

    function _handleClick(e) {
        var target = e.target,
            serial = target.getAttribute('data-serial'),
            name = target.getAttribute('data-name'),
            price = target.getAttribute('data-price'),
            stock = target.getAttribute('data-stock');

        if (target.tagName !== 'A') {
            return;
        }
        
        if (stock === '0') {
            message.add('재고가 없습니다.');
            return;
        }

        if (cart.hasItem(serial)) {
            message.add('이미 담겨있습니다.');
            return;
        }

        cart.add({
            serial: serial,
            name: name,
            price: price,
            stock: 1
        });

        message.add(name+'을 선택 하셨습니다.');

        if (payInfo.getTotal() >= cart.getTotal()) {
            _remove(cart.get());
            payInfo.update(cart.get());
            cart.empty();
            message.add('구매 되었습니다.'); 
        }
    }

    function _getItem(serial) {
        var list = _model.get().list,
            item = [];

        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i].serial === serial) {
                item.push(list[i]);
            }
        }

        return item;
    }

    function _remove(data) {
        var list = _model.get();

        for (var i = 0, len = data.length; i < len; i++) {
            if (list[data[i].serial]) {
                --list[data[i].serial].stock;
            }
        }

        _model.set(list);
    }

    window.app = window.app || {};
    window.app.product = {
        initialize: _initialize,
        render: _render,
        remove: _remove
    };
})();