'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var useDebounce = function (_a) {
    var value = _a.value, delay = _a.delay;
    var _b = React.useState(value), debouncedValue = _b[0], setDebouncedValue = _b[1];
    React.useEffect(function () {
        var handler = setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value]);
    return debouncedValue;
};
var getDebounceInput = function (setValue) { return React.memo(function (_a) {
    var onChange = _a.onChange, props = __rest(_a, ["onChange"]);
    var onChangeWarped = function (_a) {
        var target = _a.target;
        var value = target.value;
        setValue(value);
        if (onChange) {
            onChange(value);
        }
    };
    return React.createElement('input', __assign({ onChange: onChangeWarped, type: "text" }, props));
}); };
var defaultFilter = function (debounceValue, items, filterByColumns) { return items.filter(function (item) {
    return filterByColumns
        .find(function (column) { return String(item[column])
        .toLowerCase().includes(debounceValue.toLowerCase()); });
}); };
var index = (function (_a) {
    var delay = _a.delay, items = _a.items, filterByColumns = _a.filterByColumns, _b = _a.filter, filter = _b === void 0 ? defaultFilter : _b;
    var _c = React.useState(items), filteredItems = _c[0], setFilterItems = _c[1];
    var _d = React.useState(), value = _d[0], setValue = _d[1];
    var debounceValue = useDebounce({
        value: value,
        delay: delay,
    });
    var DebounceInput = React.useMemo(function () { return getDebounceInput(setValue); }, []);
    React.useEffect(function () {
        var search = function (currentItems) {
            if (!debounceValue) {
                return currentItems;
            }
            return filter(debounceValue, currentItems, filterByColumns);
        };
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!items) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, search(items)];
                    case 1:
                        results = _a.sent();
                        setFilterItems(results);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [debounceValue, items]);
    return {
        DebounceInput: DebounceInput,
        value: value,
        debounceValue: debounceValue,
        filteredItems: React.useMemo(function () { return filteredItems; }, [filteredItems]),
        setInputValue: React.useCallback(setValue, []),
    };
});

exports.default = index;
exports.useDebounce = useDebounce;
//# sourceMappingURL=index.js.map
