'use strict';

/**
 * changes value of an object's value located by the specified path
 * @example
 * // returns { k1: { k2: 'wolf' }}
 * set({ k1: { k2: 'lion' }}, '.k1.k2', 'wolf')
 * @param {Object} obj object to be changed
 * @param {string} path path to value in format '.key1.key2.key3'
 * @param {*} value value to set in the specified path
 * @returns {*} changed object
 */
let set = (obj, path, value) => {
    if (!obj || typeof(obj) !== 'object') {
        throw new Error('not an object');
    }
    if (!path || typeof(path) !== 'string' || path[0] !== '.') {
        throw new Error('incorrect path');
    }

    // all keys as an array of string
    let keys = path.split('.');
    keys.shift();

    // last key
    const last_key = keys.pop();
    // all keys except last
    const nested_keys = keys;

    // changing/creating value by specified path
    nested_keys.reduce(function (prev_obj, key) {
        if (prev_obj[key] === undefined) {
            prev_obj[key] = {};
        }
        return prev_obj[key];
    }, obj)[last_key] = value;

    return obj;
}
