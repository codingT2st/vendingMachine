/*global app */
(function(){
    var Model = app.Model,
        template = app.template,
        utils = app.utils;

    var _model,
        _el = utils.qs('#message');
    
    function _initialize() {
        _model = new Model('message', ['메세지출력창']);
        _model.on(_render);
        _model.on(_setScroll);

        _render();
    }

    function _render() {
        var list = _model.get();
        _el.innerHTML = template.message(list);
    }

    function _setScroll() {
        _el.scrollTop = _el.scrollHeight - _el.clientHeight;
    }

    function _add(data) {
        var list = _model.get();
        list.push(data);
        _model.set(list);
    }

    window.app = window.app || {};
    window.app.message = {
        initialize: _initialize,
        add: _add
    };
})();