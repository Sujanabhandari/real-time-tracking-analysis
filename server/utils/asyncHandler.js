/**
 * Wrapper function
 *
 * @param {function} fn
 * @returns function
 */
export default function asyncHandler(fn) {
    return function (req, res, next) {
        // Returns resolved promise
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
}
