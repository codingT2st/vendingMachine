/*global app */
(function(){
    function Model(key, data) {
        this.key = key;
        this.data = data || [];
        this.onChanges = [];
    }

    Model.prototype.on = function(onChange) {
        this.onChanges.push(onChange);
    };

    Model.prototype.emit = function() {
        for (var i = 0, len = this.onChanges.length; i < len; i++) {
            if (typeof this.onChanges[i] === 'function') {
                this.onChanges[i]();
            }
        }
    };

    Model.prototype.set = function(data) {
        this.data = data;
        this.emit();
    };

    Model.prototype.get = function() {
        return this.data;
    };

    window.app = window.app || {};
    window.app.Model = Model;
})();