'use strict';

/**
 * changes value of an object's value located by the specified path
 * @param {Object} obj object to be changed
 * @param {string} path path to value in format '.key1.key2.key3'
 * @param {*} value value to set in the specified path
 * @returns {*} changed object
 */
function set(obj, path, value) {
    if (typeof(obj) !== 'object') {
        throw new Error('not an object');
    }
    if (path[0] !== '.') {
        throw new Error('incorrect path');
    }

    // all keys as an array of string
    let keys = path.split('.').slice(1);
    // all keys except last
    let nested_keys = keys.slice(0, keys.length - 1);
    // last key
    let last_key = keys[keys.length - 1];
    // copy of an original "pointer" to the set
    let temp_obj = obj;

    // changing/creating value by specified path
    for (let key of nested_keys) {
        if (temp_obj[key] === undefined) {
            temp_obj[key] = {};
        }
        temp_obj = temp_obj[key];
    }
    temp_obj[last_key] = value;

    return obj;
}
