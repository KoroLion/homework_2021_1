'use strict';

/**
 * changes value of an object's value located by the specified path
 * @example
 * // returns { k1: { k2: 'wolf' }}
 * set({ k1: { k2: 'lion' }}, '.k1.k2', 'wolf')
 * @example
 * // returns { wolf: [1, 2, 3] }
 * set({ wolf: [1, 2, 4] }, '.wolf.2', 3)
 * @param {Object} obj object to be changed
 * @param {String} path path to value in format '.key1.key2.key3'
 * @param {*} value value to set in the specified path
 * @returns {Object} changed object
 */
const set = (obj, path, value) => {
    if (!obj || typeof(obj) !== 'object') {
        throw new TypeError('obj is not an object');
    }
    if (!path || typeof(path) !== 'string') {
        throw new TypeError('path is not a string');
    }
    if (path[0] !== '.') {
        throw new Error('incorrect path')
    }

    // all keys as an array of string
    let keys = path.split('.');
    keys.shift();

    // last key
    const last_key = keys.pop();

    // changing/creating value by specified path
    keys.reduce((prev_obj, key) => {
        if (!prev_obj.hasOwnProperty(key)) {
            prev_obj[key] = {};
        }
        return prev_obj[key];
    }, obj)[last_key] = value;

    return obj;
}
