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
    const isObject = (obj) => obj && (Object.getPrototypeOf(obj) === Object.prototype)

    if (!isObject(obj)) {
        throw new TypeError('obj is not an object');
    }
    if (!path || typeof(path) !== 'string') {
        throw new TypeError('path is not a string');
    }
    if (path[0] !== '.') {
        throw new Error('incorrect path');
    }

    // all keys as an array of string
    let keys = path.split('.');
    keys.shift();

    // changing/creating value by specified path
    let prev_obj = obj;
    keys.forEach((key, i, a) => {
        if (i == (a.length - 1)) {
            prev_obj[key] = value;
        } else {
            if (!prev_obj.hasOwnProperty(key)) {
                prev_obj[key] = {};
            }
            prev_obj = prev_obj[key];
        }
    }, obj);

    return obj;
}
