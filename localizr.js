localizr = function () {

    var self = this;
    self.dict = null;

    var printf = function (str, args) {
        if (!args) return str;

        var result = '';
        var search = /%(\d+)\$s/g;

        var matches = search.exec(str);

        while (matches) {
            var index = parseInt(matches[1], 10) - 1;
            str = str.replace('%' + matches[1] + '\$s', (args[index]));
            matches = search.exec(str);
        }

        var parts = str.split('%s');

        if (parts.length > 1) {
            for (var i = 0; i < args.length; i++) {
                if (parts[i].length > 0 && parts[i].lastIndexOf('%') == (parts[i].length - 1)) {
                    parts[i] += 's' + parts.splice(i + 1, 1)[0];
                }

                result += parts[i] + args[i];
            }
        }

        return result + parts[parts.length - 1];
    };

    var executeCallback = function (callback) {
        if (callback != null && typeof callback !== "undefined")
            callback();
    };

    return {
        init: function (path, lang, callback) {
            self.langId = lang;
            self.path = path;
            var url = path + "/" + self.langId + ".js";
            $.getJSON(url, function (data) {
                self.dict = data;
                executeCallback(callback);
            });
        },

        dict: function () {
            return self.dict;
        },

        get: function (key, params) {
            var result = key;
            if (self.dict && self.dict[key]) {
                result = self.dict[key];
            }

            return printf(result, params);
        }
    };
}();
