/**
 * @fileoverview added by tsickle
 * Generated from: packages/animations/browser/src/util.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { sequence } from '@angular/animations';
import { computeStyle, isNode } from './render/shared';
/** @type {?} */
export const ONE_SECOND = 1000;
/** @type {?} */
export const SUBSTITUTION_EXPR_START = '{{';
/** @type {?} */
export const SUBSTITUTION_EXPR_END = '}}';
/** @type {?} */
export const ENTER_CLASSNAME = 'ng-enter';
/** @type {?} */
export const LEAVE_CLASSNAME = 'ng-leave';
/** @type {?} */
export const ENTER_SELECTOR = '.ng-enter';
/** @type {?} */
export const LEAVE_SELECTOR = '.ng-leave';
/** @type {?} */
export const NG_TRIGGER_CLASSNAME = 'ng-trigger';
/** @type {?} */
export const NG_TRIGGER_SELECTOR = '.ng-trigger';
/** @type {?} */
export const NG_ANIMATING_CLASSNAME = 'ng-animating';
/** @type {?} */
export const NG_ANIMATING_SELECTOR = '.ng-animating';
/**
 * @param {?} value
 * @return {?}
 */
export function resolveTimingValue(value) {
    if (typeof value == 'number')
        return value;
    /** @type {?} */
    const matches = value.match(/^(-?[\.\d]+)(m?s)/);
    if (!matches || matches.length < 2)
        return 0;
    return _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
}
/**
 * @param {?} value
 * @param {?} unit
 * @return {?}
 */
function _convertTimeValueToMS(value, unit) {
    switch (unit) {
        case 's':
            return value * ONE_SECOND;
        default: // ms or something else
            return value;
    }
}
/**
 * @param {?} timings
 * @param {?} errors
 * @param {?=} allowNegativeValues
 * @return {?}
 */
export function resolveTiming(timings, errors, allowNegativeValues) {
    return timings.hasOwnProperty('duration') ?
        (/** @type {?} */ (timings)) :
        parseTimeExpression((/** @type {?} */ (timings)), errors, allowNegativeValues);
}
/**
 * @param {?} exp
 * @param {?} errors
 * @param {?=} allowNegativeValues
 * @return {?}
 */
function parseTimeExpression(exp, errors, allowNegativeValues) {
    /** @type {?} */
    const regex = /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;
    /** @type {?} */
    let duration;
    /** @type {?} */
    let delay = 0;
    /** @type {?} */
    let easing = '';
    if (typeof exp === 'string') {
        /** @type {?} */
        const matches = exp.match(regex);
        if (matches === null) {
            errors.push(`The provided timing value "${exp}" is invalid.`);
            return { duration: 0, delay: 0, easing: '' };
        }
        duration = _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
        /** @type {?} */
        const delayMatch = matches[3];
        if (delayMatch != null) {
            delay = _convertTimeValueToMS(parseFloat(delayMatch), matches[4]);
        }
        /** @type {?} */
        const easingVal = matches[5];
        if (easingVal) {
            easing = easingVal;
        }
    }
    else {
        duration = exp;
    }
    if (!allowNegativeValues) {
        /** @type {?} */
        let containsErrors = false;
        /** @type {?} */
        let startIndex = errors.length;
        if (duration < 0) {
            errors.push(`Duration values below 0 are not allowed for this animation step.`);
            containsErrors = true;
        }
        if (delay < 0) {
            errors.push(`Delay values below 0 are not allowed for this animation step.`);
            containsErrors = true;
        }
        if (containsErrors) {
            errors.splice(startIndex, 0, `The provided timing value "${exp}" is invalid.`);
        }
    }
    return { duration, delay, easing };
}
/**
 * @param {?} obj
 * @param {?=} destination
 * @return {?}
 */
export function copyObj(obj, destination = {}) {
    Object.keys(obj).forEach((/**
     * @param {?} prop
     * @return {?}
     */
    prop => { destination[prop] = obj[prop]; }));
    return destination;
}
/**
 * @param {?} styles
 * @return {?}
 */
export function normalizeStyles(styles) {
    /** @type {?} */
    const normalizedStyles = {};
    if (Array.isArray(styles)) {
        styles.forEach((/**
         * @param {?} data
         * @return {?}
         */
        data => copyStyles(data, false, normalizedStyles)));
    }
    else {
        copyStyles(styles, false, normalizedStyles);
    }
    return normalizedStyles;
}
/**
 * @param {?} styles
 * @param {?} readPrototype
 * @param {?=} destination
 * @return {?}
 */
export function copyStyles(styles, readPrototype, destination = {}) {
    if (readPrototype) {
        // we make use of a for-in loop so that the
        // prototypically inherited properties are
        // revealed from the backFill map
        for (let prop in styles) {
            destination[prop] = styles[prop];
        }
    }
    else {
        copyObj(styles, destination);
    }
    return destination;
}
/**
 * @param {?} element
 * @param {?} key
 * @param {?} value
 * @return {?}
 */
function getStyleAttributeString(element, key, value) {
    // Return the key-value pair string to be added to the style attribute for the
    // given CSS style key.
    if (value) {
        return key + ':' + value + ';';
    }
    else {
        return '';
    }
}
/**
 * @param {?} element
 * @return {?}
 */
function writeStyleAttribute(element) {
    // Read the style property of the element and manually reflect it to the
    // style attribute. This is needed because Domino on platform-server doesn't
    // understand the full set of allowed CSS properties and doesn't reflect some
    // of them automatically.
    /** @type {?} */
    let styleAttrValue = '';
    for (let i = 0; i < element.style.length; i++) {
        /** @type {?} */
        const key = element.style.item(i);
        styleAttrValue += getStyleAttributeString(element, key, element.style.getPropertyValue(key));
    }
    for (const key in element.style) {
        // Skip internal Domino properties that don't need to be reflected.
        if (!element.style.hasOwnProperty(key) || key.startsWith('_')) {
            continue;
        }
        /** @type {?} */
        const dashKey = camelCaseToDashCase(key);
        styleAttrValue += getStyleAttributeString(element, dashKey, element.style[key]);
    }
    element.setAttribute('style', styleAttrValue);
}
/**
 * @param {?} element
 * @param {?} styles
 * @param {?=} formerStyles
 * @return {?}
 */
export function setStyles(element, styles, formerStyles) {
    if (element['style']) {
        Object.keys(styles).forEach((/**
         * @param {?} prop
         * @return {?}
         */
        prop => {
            /** @type {?} */
            const camelProp = dashCaseToCamelCase(prop);
            if (formerStyles && !formerStyles.hasOwnProperty(prop)) {
                formerStyles[prop] = element.style[camelProp];
            }
            element.style[camelProp] = styles[prop];
        }));
        // On the server set the 'style' attribute since it's not automatically reflected.
        if (isNode()) {
            writeStyleAttribute(element);
        }
    }
}
/**
 * @param {?} element
 * @param {?} styles
 * @return {?}
 */
export function eraseStyles(element, styles) {
    if (element['style']) {
        Object.keys(styles).forEach((/**
         * @param {?} prop
         * @return {?}
         */
        prop => {
            /** @type {?} */
            const camelProp = dashCaseToCamelCase(prop);
            element.style[camelProp] = '';
        }));
        // On the server set the 'style' attribute since it's not automatically reflected.
        if (isNode()) {
            writeStyleAttribute(element);
        }
    }
}
/**
 * @param {?} steps
 * @return {?}
 */
export function normalizeAnimationEntry(steps) {
    if (Array.isArray(steps)) {
        if (steps.length == 1)
            return steps[0];
        return sequence(steps);
    }
    return (/** @type {?} */ (steps));
}
/**
 * @param {?} value
 * @param {?} options
 * @param {?} errors
 * @return {?}
 */
export function validateStyleParams(value, options, errors) {
    /** @type {?} */
    const params = options.params || {};
    /** @type {?} */
    const matches = extractStyleParams(value);
    if (matches.length) {
        matches.forEach((/**
         * @param {?} varName
         * @return {?}
         */
        varName => {
            if (!params.hasOwnProperty(varName)) {
                errors.push(`Unable to resolve the local animation param ${varName} in the given list of values`);
            }
        }));
    }
}
/** @type {?} */
const PARAM_REGEX = new RegExp(`${SUBSTITUTION_EXPR_START}\\s*(.+?)\\s*${SUBSTITUTION_EXPR_END}`, 'g');
/**
 * @param {?} value
 * @return {?}
 */
export function extractStyleParams(value) {
    /** @type {?} */
    let params = [];
    if (typeof value === 'string') {
        /** @type {?} */
        let match;
        while (match = PARAM_REGEX.exec(value)) {
            params.push((/** @type {?} */ (match[1])));
        }
        PARAM_REGEX.lastIndex = 0;
    }
    return params;
}
/**
 * @param {?} value
 * @param {?} params
 * @param {?} errors
 * @return {?}
 */
export function interpolateParams(value, params, errors) {
    /** @type {?} */
    const original = value.toString();
    /** @type {?} */
    const str = original.replace(PARAM_REGEX, (/**
     * @param {?} _
     * @param {?} varName
     * @return {?}
     */
    (_, varName) => {
        /** @type {?} */
        let localVal = params[varName];
        // this means that the value was never overridden by the data passed in by the user
        if (!params.hasOwnProperty(varName)) {
            errors.push(`Please provide a value for the animation param ${varName}`);
            localVal = '';
        }
        return localVal.toString();
    }));
    // we do this to assert that numeric values stay as they are
    return str == original ? value : str;
}
/**
 * @param {?} iterator
 * @return {?}
 */
export function iteratorToArray(iterator) {
    /** @type {?} */
    const arr = [];
    /** @type {?} */
    let item = iterator.next();
    while (!item.done) {
        arr.push(item.value);
        item = iterator.next();
    }
    return arr;
}
/**
 * @param {?} source
 * @param {?} destination
 * @return {?}
 */
export function mergeAnimationOptions(source, destination) {
    if (source.params) {
        /** @type {?} */
        const p0 = source.params;
        if (!destination.params) {
            destination.params = {};
        }
        /** @type {?} */
        const p1 = destination.params;
        Object.keys(p0).forEach((/**
         * @param {?} param
         * @return {?}
         */
        param => {
            if (!p1.hasOwnProperty(param)) {
                p1[param] = p0[param];
            }
        }));
    }
    return destination;
}
/** @type {?} */
const DASH_CASE_REGEXP = /-+([a-z0-9])/g;
/**
 * @param {?} input
 * @return {?}
 */
export function dashCaseToCamelCase(input) {
    return input.replace(DASH_CASE_REGEXP, (/**
     * @param {...?} m
     * @return {?}
     */
    (...m) => m[1].toUpperCase()));
}
/**
 * @param {?} input
 * @return {?}
 */
function camelCaseToDashCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
/**
 * @param {?} duration
 * @param {?} delay
 * @return {?}
 */
export function allowPreviousPlayerStylesMerge(duration, delay) {
    return duration === 0 || delay === 0;
}
/**
 * @param {?} element
 * @param {?} keyframes
 * @param {?} previousStyles
 * @return {?}
 */
export function balancePreviousStylesIntoKeyframes(element, keyframes, previousStyles) {
    /** @type {?} */
    const previousStyleProps = Object.keys(previousStyles);
    if (previousStyleProps.length && keyframes.length) {
        /** @type {?} */
        let startingKeyframe = keyframes[0];
        /** @type {?} */
        let missingStyleProps = [];
        previousStyleProps.forEach((/**
         * @param {?} prop
         * @return {?}
         */
        prop => {
            if (!startingKeyframe.hasOwnProperty(prop)) {
                missingStyleProps.push(prop);
            }
            startingKeyframe[prop] = previousStyles[prop];
        }));
        if (missingStyleProps.length) {
            // tslint:disable-next-line
            for (var i = 1; i < keyframes.length; i++) {
                /** @type {?} */
                let kf = keyframes[i];
                missingStyleProps.forEach((/**
                 * @param {?} prop
                 * @return {?}
                 */
                function (prop) { kf[prop] = computeStyle(element, prop); }));
            }
        }
    }
    return keyframes;
}
/**
 * @param {?} visitor
 * @param {?} node
 * @param {?} context
 * @return {?}
 */
export function visitDslNode(visitor, node, context) {
    switch (node.type) {
        case 7 /* Trigger */:
            return visitor.visitTrigger(node, context);
        case 0 /* State */:
            return visitor.visitState(node, context);
        case 1 /* Transition */:
            return visitor.visitTransition(node, context);
        case 2 /* Sequence */:
            return visitor.visitSequence(node, context);
        case 3 /* Group */:
            return visitor.visitGroup(node, context);
        case 4 /* Animate */:
            return visitor.visitAnimate(node, context);
        case 5 /* Keyframes */:
            return visitor.visitKeyframes(node, context);
        case 6 /* Style */:
            return visitor.visitStyle(node, context);
        case 8 /* Reference */:
            return visitor.visitReference(node, context);
        case 9 /* AnimateChild */:
            return visitor.visitAnimateChild(node, context);
        case 10 /* AnimateRef */:
            return visitor.visitAnimateRef(node, context);
        case 11 /* Query */:
            return visitor.visitQuery(node, context);
        case 12 /* Stagger */:
            return visitor.visitStagger(node, context);
        default:
            throw new Error(`Unable to resolve animation metadata node #${node.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvYnJvd3Nlci9zcmMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQTZFLFFBQVEsRUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBSXJJLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBRXJELE1BQU0sT0FBTyxVQUFVLEdBQUcsSUFBSTs7QUFFOUIsTUFBTSxPQUFPLHVCQUF1QixHQUFHLElBQUk7O0FBQzNDLE1BQU0sT0FBTyxxQkFBcUIsR0FBRyxJQUFJOztBQUN6QyxNQUFNLE9BQU8sZUFBZSxHQUFHLFVBQVU7O0FBQ3pDLE1BQU0sT0FBTyxlQUFlLEdBQUcsVUFBVTs7QUFDekMsTUFBTSxPQUFPLGNBQWMsR0FBRyxXQUFXOztBQUN6QyxNQUFNLE9BQU8sY0FBYyxHQUFHLFdBQVc7O0FBQ3pDLE1BQU0sT0FBTyxvQkFBb0IsR0FBRyxZQUFZOztBQUNoRCxNQUFNLE9BQU8sbUJBQW1CLEdBQUcsYUFBYTs7QUFDaEQsTUFBTSxPQUFPLHNCQUFzQixHQUFHLGNBQWM7O0FBQ3BELE1BQU0sT0FBTyxxQkFBcUIsR0FBRyxlQUFlOzs7OztBQUVwRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsS0FBc0I7SUFDdkQsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7O1VBRXJDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO0lBQ2hELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQUUsT0FBTyxDQUFDLENBQUM7SUFFN0MsT0FBTyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkUsQ0FBQzs7Ozs7O0FBRUQsU0FBUyxxQkFBcUIsQ0FBQyxLQUFhLEVBQUUsSUFBWTtJQUN4RCxRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssR0FBRztZQUNOLE9BQU8sS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUM1QixTQUFVLHVCQUF1QjtZQUMvQixPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUN6QixPQUF5QyxFQUFFLE1BQWEsRUFBRSxtQkFBNkI7SUFDekYsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsbUJBQWdCLE9BQU8sRUFBQSxDQUFDLENBQUM7UUFDekIsbUJBQW1CLENBQUMsbUJBQWUsT0FBTyxFQUFBLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDL0UsQ0FBQzs7Ozs7OztBQUVELFNBQVMsbUJBQW1CLENBQ3hCLEdBQW9CLEVBQUUsTUFBZ0IsRUFBRSxtQkFBNkI7O1VBQ2pFLEtBQUssR0FBRywwRUFBMEU7O1FBQ3BGLFFBQWdCOztRQUNoQixLQUFLLEdBQVcsQ0FBQzs7UUFDakIsTUFBTSxHQUFXLEVBQUU7SUFDdkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7O2NBQ3JCLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNoQyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsR0FBRyxlQUFlLENBQUMsQ0FBQztZQUM5RCxPQUFPLEVBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQztTQUM1QztRQUVELFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O2NBRS9ELFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtZQUN0QixLQUFLLEdBQUcscUJBQXFCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25FOztjQUVLLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksU0FBUyxFQUFFO1lBQ2IsTUFBTSxHQUFHLFNBQVMsQ0FBQztTQUNwQjtLQUNGO1NBQU07UUFDTCxRQUFRLEdBQUcsR0FBRyxDQUFDO0tBQ2hCO0lBRUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFOztZQUNwQixjQUFjLEdBQUcsS0FBSzs7WUFDdEIsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNO1FBQzlCLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtZQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGtFQUFrRSxDQUFDLENBQUM7WUFDaEYsY0FBYyxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUNELElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0RBQStELENBQUMsQ0FBQztZQUM3RSxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxjQUFjLEVBQUU7WUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLDhCQUE4QixHQUFHLGVBQWUsQ0FBQyxDQUFDO1NBQ2hGO0tBQ0Y7SUFFRCxPQUFPLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQztBQUNuQyxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUNuQixHQUF5QixFQUFFLGNBQW9DLEVBQUU7SUFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPOzs7O0lBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFDckUsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUFDLE1BQWlDOztVQUN6RCxnQkFBZ0IsR0FBZSxFQUFFO0lBQ3ZDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN6QixNQUFNLENBQUMsT0FBTzs7OztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsRUFBQyxDQUFDO0tBQ25FO1NBQU07UUFDTCxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0tBQzdDO0lBQ0QsT0FBTyxnQkFBZ0IsQ0FBQztBQUMxQixDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FDdEIsTUFBa0IsRUFBRSxhQUFzQixFQUFFLGNBQTBCLEVBQUU7SUFDMUUsSUFBSSxhQUFhLEVBQUU7UUFDakIsMkNBQTJDO1FBQzNDLDBDQUEwQztRQUMxQyxpQ0FBaUM7UUFDakMsS0FBSyxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDdkIsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztLQUNGO1NBQU07UUFDTCxPQUFPLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQzs7Ozs7OztBQUVELFNBQVMsdUJBQXVCLENBQUMsT0FBWSxFQUFFLEdBQVcsRUFBRSxLQUFhO0lBQ3ZFLDhFQUE4RTtJQUM5RSx1QkFBdUI7SUFDdkIsSUFBSSxLQUFLLEVBQUU7UUFDVCxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztLQUNoQztTQUFNO1FBQ0wsT0FBTyxFQUFFLENBQUM7S0FDWDtBQUNILENBQUM7Ozs7O0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxPQUFZOzs7Ozs7UUFLbkMsY0FBYyxHQUFHLEVBQUU7SUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztjQUN2QyxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLGNBQWMsSUFBSSx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUM5RjtJQUNELEtBQUssTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtRQUMvQixtRUFBbUU7UUFDbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDN0QsU0FBUztTQUNWOztjQUNLLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUM7UUFDeEMsY0FBYyxJQUFJLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2pGO0lBQ0QsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDaEQsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsT0FBWSxFQUFFLE1BQWtCLEVBQUUsWUFBbUM7SUFDN0YsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUU7O2tCQUMzQixTQUFTLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQzNDLElBQUksWUFBWSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEQsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0M7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDLEVBQUMsQ0FBQztRQUNILGtGQUFrRjtRQUNsRixJQUFJLE1BQU0sRUFBRSxFQUFFO1lBQ1osbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7S0FDRjtBQUNILENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsT0FBWSxFQUFFLE1BQWtCO0lBQzFELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLElBQUksQ0FBQyxFQUFFOztrQkFDM0IsU0FBUyxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQztZQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQyxDQUFDLEVBQUMsQ0FBQztRQUNILGtGQUFrRjtRQUNsRixJQUFJLE1BQU0sRUFBRSxFQUFFO1lBQ1osbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7S0FDRjtBQUNILENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLHVCQUF1QixDQUFDLEtBQThDO0lBRXBGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4QixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxtQkFBQSxLQUFLLEVBQXFCLENBQUM7QUFDcEMsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FDL0IsS0FBc0IsRUFBRSxPQUF5QixFQUFFLE1BQWE7O1VBQzVELE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUU7O1VBQzdCLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7SUFDekMsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ2xCLE9BQU8sQ0FBQyxPQUFPOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQ1AsK0NBQStDLE9BQU8sOEJBQThCLENBQUMsQ0FBQzthQUMzRjtRQUNILENBQUMsRUFBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDOztNQUVLLFdBQVcsR0FDYixJQUFJLE1BQU0sQ0FBQyxHQUFHLHVCQUF1QixnQkFBZ0IscUJBQXFCLEVBQUUsRUFBRSxHQUFHLENBQUM7Ozs7O0FBQ3RGLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxLQUFzQjs7UUFDbkQsTUFBTSxHQUFhLEVBQUU7SUFDekIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7O1lBQ3pCLEtBQVU7UUFDZCxPQUFPLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFVLENBQUMsQ0FBQztTQUNqQztRQUNELFdBQVcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0tBQzNCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FDN0IsS0FBc0IsRUFBRSxNQUE2QixFQUFFLE1BQWE7O1VBQ2hFLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFOztVQUMzQixHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXOzs7OztJQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFOztZQUNuRCxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixtRkFBbUY7UUFDbkYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxrREFBa0QsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN6RSxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDLEVBQUM7SUFFRiw0REFBNEQ7SUFDNUQsT0FBTyxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN2QyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsUUFBYTs7VUFDckMsR0FBRyxHQUFVLEVBQUU7O1FBQ2pCLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFO0lBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ2pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxxQkFBcUIsQ0FDakMsTUFBd0IsRUFBRSxXQUE2QjtJQUN6RCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7O2NBQ1gsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ3pCOztjQUNLLEVBQUUsR0FBRyxXQUFXLENBQUMsTUFBTTtRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDN0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2QjtRQUNILENBQUMsRUFBQyxDQUFDO0tBQ0o7SUFDRCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDOztNQUVLLGdCQUFnQixHQUFHLGVBQWU7Ozs7O0FBQ3hDLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxLQUFhO0lBQy9DLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0I7Ozs7SUFBRSxDQUFDLEdBQUcsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQztBQUM5RSxDQUFDOzs7OztBQUVELFNBQVMsbUJBQW1CLENBQUMsS0FBYTtJQUN4QyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDakUsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLDhCQUE4QixDQUFDLFFBQWdCLEVBQUUsS0FBYTtJQUM1RSxPQUFPLFFBQVEsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQztBQUN2QyxDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGtDQUFrQyxDQUM5QyxPQUFZLEVBQUUsU0FBaUMsRUFBRSxjQUFvQzs7VUFDakYsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDdEQsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTs7WUFDN0MsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQzs7WUFDL0IsaUJBQWlCLEdBQWEsRUFBRTtRQUNwQyxrQkFBa0IsQ0FBQyxPQUFPOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDMUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7WUFDNUIsMkJBQTJCO1lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztvQkFDckMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLGlCQUFpQixDQUFDLE9BQU87Ozs7Z0JBQUMsVUFBUyxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQzthQUN2RjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDOzs7Ozs7O0FBTUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxPQUFZLEVBQUUsSUFBUyxFQUFFLE9BQVk7SUFDaEUsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ2pCO1lBQ0UsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QztZQUNFLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0M7WUFDRSxPQUFPLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hEO1lBQ0UsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QztZQUNFLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0M7WUFDRSxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdDO1lBQ0UsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvQztZQUNFLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0M7WUFDRSxPQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9DO1lBQ0UsT0FBTyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xEO1lBQ0UsT0FBTyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRDtZQUNFLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0M7WUFDRSxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdDO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDOUU7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBbmltYXRlVGltaW5ncywgQW5pbWF0aW9uTWV0YWRhdGEsIEFuaW1hdGlvbk1ldGFkYXRhVHlwZSwgQW5pbWF0aW9uT3B0aW9ucywgc2VxdWVuY2UsIMm1U3R5bGVEYXRhfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuaW1wb3J0IHtBc3QgYXMgQW5pbWF0aW9uQXN0LCBBc3RWaXNpdG9yIGFzIEFuaW1hdGlvbkFzdFZpc2l0b3J9IGZyb20gJy4vZHNsL2FuaW1hdGlvbl9hc3QnO1xuaW1wb3J0IHtBbmltYXRpb25Ec2xWaXNpdG9yfSBmcm9tICcuL2RzbC9hbmltYXRpb25fZHNsX3Zpc2l0b3InO1xuaW1wb3J0IHtjb21wdXRlU3R5bGUsIGlzTm9kZX0gZnJvbSAnLi9yZW5kZXIvc2hhcmVkJztcblxuZXhwb3J0IGNvbnN0IE9ORV9TRUNPTkQgPSAxMDAwO1xuXG5leHBvcnQgY29uc3QgU1VCU1RJVFVUSU9OX0VYUFJfU1RBUlQgPSAne3snO1xuZXhwb3J0IGNvbnN0IFNVQlNUSVRVVElPTl9FWFBSX0VORCA9ICd9fSc7XG5leHBvcnQgY29uc3QgRU5URVJfQ0xBU1NOQU1FID0gJ25nLWVudGVyJztcbmV4cG9ydCBjb25zdCBMRUFWRV9DTEFTU05BTUUgPSAnbmctbGVhdmUnO1xuZXhwb3J0IGNvbnN0IEVOVEVSX1NFTEVDVE9SID0gJy5uZy1lbnRlcic7XG5leHBvcnQgY29uc3QgTEVBVkVfU0VMRUNUT1IgPSAnLm5nLWxlYXZlJztcbmV4cG9ydCBjb25zdCBOR19UUklHR0VSX0NMQVNTTkFNRSA9ICduZy10cmlnZ2VyJztcbmV4cG9ydCBjb25zdCBOR19UUklHR0VSX1NFTEVDVE9SID0gJy5uZy10cmlnZ2VyJztcbmV4cG9ydCBjb25zdCBOR19BTklNQVRJTkdfQ0xBU1NOQU1FID0gJ25nLWFuaW1hdGluZyc7XG5leHBvcnQgY29uc3QgTkdfQU5JTUFUSU5HX1NFTEVDVE9SID0gJy5uZy1hbmltYXRpbmcnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVRpbWluZ1ZhbHVlKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykgcmV0dXJuIHZhbHVlO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSB2YWx1ZS5tYXRjaCgvXigtP1tcXC5cXGRdKykobT9zKS8pO1xuICBpZiAoIW1hdGNoZXMgfHwgbWF0Y2hlcy5sZW5ndGggPCAyKSByZXR1cm4gMDtcblxuICByZXR1cm4gX2NvbnZlcnRUaW1lVmFsdWVUb01TKHBhcnNlRmxvYXQobWF0Y2hlc1sxXSksIG1hdGNoZXNbMl0pO1xufVxuXG5mdW5jdGlvbiBfY29udmVydFRpbWVWYWx1ZVRvTVModmFsdWU6IG51bWJlciwgdW5pdDogc3RyaW5nKTogbnVtYmVyIHtcbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gdmFsdWUgKiBPTkVfU0VDT05EO1xuICAgIGRlZmF1bHQ6ICAvLyBtcyBvciBzb21ldGhpbmcgZWxzZVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlVGltaW5nKFxuICAgIHRpbWluZ3M6IHN0cmluZyB8IG51bWJlciB8IEFuaW1hdGVUaW1pbmdzLCBlcnJvcnM6IGFueVtdLCBhbGxvd05lZ2F0aXZlVmFsdWVzPzogYm9vbGVhbikge1xuICByZXR1cm4gdGltaW5ncy5oYXNPd25Qcm9wZXJ0eSgnZHVyYXRpb24nKSA/XG4gICAgICA8QW5pbWF0ZVRpbWluZ3M+dGltaW5ncyA6XG4gICAgICBwYXJzZVRpbWVFeHByZXNzaW9uKDxzdHJpbmd8bnVtYmVyPnRpbWluZ3MsIGVycm9ycywgYWxsb3dOZWdhdGl2ZVZhbHVlcyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZUV4cHJlc3Npb24oXG4gICAgZXhwOiBzdHJpbmcgfCBudW1iZXIsIGVycm9yczogc3RyaW5nW10sIGFsbG93TmVnYXRpdmVWYWx1ZXM/OiBib29sZWFuKTogQW5pbWF0ZVRpbWluZ3Mge1xuICBjb25zdCByZWdleCA9IC9eKC0/W1xcLlxcZF0rKShtP3MpKD86XFxzKygtP1tcXC5cXGRdKykobT9zKSk/KD86XFxzKyhbLWEtel0rKD86XFwoLis/XFwpKT8pKT8kL2k7XG4gIGxldCBkdXJhdGlvbjogbnVtYmVyO1xuICBsZXQgZGVsYXk6IG51bWJlciA9IDA7XG4gIGxldCBlYXNpbmc6IHN0cmluZyA9ICcnO1xuICBpZiAodHlwZW9mIGV4cCA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBtYXRjaGVzID0gZXhwLm1hdGNoKHJlZ2V4KTtcbiAgICBpZiAobWF0Y2hlcyA9PT0gbnVsbCkge1xuICAgICAgZXJyb3JzLnB1c2goYFRoZSBwcm92aWRlZCB0aW1pbmcgdmFsdWUgXCIke2V4cH1cIiBpcyBpbnZhbGlkLmApO1xuICAgICAgcmV0dXJuIHtkdXJhdGlvbjogMCwgZGVsYXk6IDAsIGVhc2luZzogJyd9O1xuICAgIH1cblxuICAgIGR1cmF0aW9uID0gX2NvbnZlcnRUaW1lVmFsdWVUb01TKHBhcnNlRmxvYXQobWF0Y2hlc1sxXSksIG1hdGNoZXNbMl0pO1xuXG4gICAgY29uc3QgZGVsYXlNYXRjaCA9IG1hdGNoZXNbM107XG4gICAgaWYgKGRlbGF5TWF0Y2ggIT0gbnVsbCkge1xuICAgICAgZGVsYXkgPSBfY29udmVydFRpbWVWYWx1ZVRvTVMocGFyc2VGbG9hdChkZWxheU1hdGNoKSwgbWF0Y2hlc1s0XSk7XG4gICAgfVxuXG4gICAgY29uc3QgZWFzaW5nVmFsID0gbWF0Y2hlc1s1XTtcbiAgICBpZiAoZWFzaW5nVmFsKSB7XG4gICAgICBlYXNpbmcgPSBlYXNpbmdWYWw7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGR1cmF0aW9uID0gZXhwO1xuICB9XG5cbiAgaWYgKCFhbGxvd05lZ2F0aXZlVmFsdWVzKSB7XG4gICAgbGV0IGNvbnRhaW5zRXJyb3JzID0gZmFsc2U7XG4gICAgbGV0IHN0YXJ0SW5kZXggPSBlcnJvcnMubGVuZ3RoO1xuICAgIGlmIChkdXJhdGlvbiA8IDApIHtcbiAgICAgIGVycm9ycy5wdXNoKGBEdXJhdGlvbiB2YWx1ZXMgYmVsb3cgMCBhcmUgbm90IGFsbG93ZWQgZm9yIHRoaXMgYW5pbWF0aW9uIHN0ZXAuYCk7XG4gICAgICBjb250YWluc0Vycm9ycyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChkZWxheSA8IDApIHtcbiAgICAgIGVycm9ycy5wdXNoKGBEZWxheSB2YWx1ZXMgYmVsb3cgMCBhcmUgbm90IGFsbG93ZWQgZm9yIHRoaXMgYW5pbWF0aW9uIHN0ZXAuYCk7XG4gICAgICBjb250YWluc0Vycm9ycyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChjb250YWluc0Vycm9ycykge1xuICAgICAgZXJyb3JzLnNwbGljZShzdGFydEluZGV4LCAwLCBgVGhlIHByb3ZpZGVkIHRpbWluZyB2YWx1ZSBcIiR7ZXhwfVwiIGlzIGludmFsaWQuYCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtkdXJhdGlvbiwgZGVsYXksIGVhc2luZ307XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5T2JqKFxuICAgIG9iajoge1trZXk6IHN0cmluZ106IGFueX0sIGRlc3RpbmF0aW9uOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2gocHJvcCA9PiB7IGRlc3RpbmF0aW9uW3Byb3BdID0gb2JqW3Byb3BdOyB9KTtcbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplU3R5bGVzKHN0eWxlczogybVTdHlsZURhdGEgfCDJtVN0eWxlRGF0YVtdKTogybVTdHlsZURhdGEge1xuICBjb25zdCBub3JtYWxpemVkU3R5bGVzOiDJtVN0eWxlRGF0YSA9IHt9O1xuICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZXMpKSB7XG4gICAgc3R5bGVzLmZvckVhY2goZGF0YSA9PiBjb3B5U3R5bGVzKGRhdGEsIGZhbHNlLCBub3JtYWxpemVkU3R5bGVzKSk7XG4gIH0gZWxzZSB7XG4gICAgY29weVN0eWxlcyhzdHlsZXMsIGZhbHNlLCBub3JtYWxpemVkU3R5bGVzKTtcbiAgfVxuICByZXR1cm4gbm9ybWFsaXplZFN0eWxlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlTdHlsZXMoXG4gICAgc3R5bGVzOiDJtVN0eWxlRGF0YSwgcmVhZFByb3RvdHlwZTogYm9vbGVhbiwgZGVzdGluYXRpb246IMm1U3R5bGVEYXRhID0ge30pOiDJtVN0eWxlRGF0YSB7XG4gIGlmIChyZWFkUHJvdG90eXBlKSB7XG4gICAgLy8gd2UgbWFrZSB1c2Ugb2YgYSBmb3ItaW4gbG9vcCBzbyB0aGF0IHRoZVxuICAgIC8vIHByb3RvdHlwaWNhbGx5IGluaGVyaXRlZCBwcm9wZXJ0aWVzIGFyZVxuICAgIC8vIHJldmVhbGVkIGZyb20gdGhlIGJhY2tGaWxsIG1hcFxuICAgIGZvciAobGV0IHByb3AgaW4gc3R5bGVzKSB7XG4gICAgICBkZXN0aW5hdGlvbltwcm9wXSA9IHN0eWxlc1twcm9wXTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29weU9iaihzdHlsZXMsIGRlc3RpbmF0aW9uKTtcbiAgfVxuICByZXR1cm4gZGVzdGluYXRpb247XG59XG5cbmZ1bmN0aW9uIGdldFN0eWxlQXR0cmlidXRlU3RyaW5nKGVsZW1lbnQ6IGFueSwga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgLy8gUmV0dXJuIHRoZSBrZXktdmFsdWUgcGFpciBzdHJpbmcgdG8gYmUgYWRkZWQgdG8gdGhlIHN0eWxlIGF0dHJpYnV0ZSBmb3IgdGhlXG4gIC8vIGdpdmVuIENTUyBzdHlsZSBrZXkuXG4gIGlmICh2YWx1ZSkge1xuICAgIHJldHVybiBrZXkgKyAnOicgKyB2YWx1ZSArICc7JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gd3JpdGVTdHlsZUF0dHJpYnV0ZShlbGVtZW50OiBhbnkpIHtcbiAgLy8gUmVhZCB0aGUgc3R5bGUgcHJvcGVydHkgb2YgdGhlIGVsZW1lbnQgYW5kIG1hbnVhbGx5IHJlZmxlY3QgaXQgdG8gdGhlXG4gIC8vIHN0eWxlIGF0dHJpYnV0ZS4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBEb21pbm8gb24gcGxhdGZvcm0tc2VydmVyIGRvZXNuJ3RcbiAgLy8gdW5kZXJzdGFuZCB0aGUgZnVsbCBzZXQgb2YgYWxsb3dlZCBDU1MgcHJvcGVydGllcyBhbmQgZG9lc24ndCByZWZsZWN0IHNvbWVcbiAgLy8gb2YgdGhlbSBhdXRvbWF0aWNhbGx5LlxuICBsZXQgc3R5bGVBdHRyVmFsdWUgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50LnN0eWxlLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qga2V5ID0gZWxlbWVudC5zdHlsZS5pdGVtKGkpO1xuICAgIHN0eWxlQXR0clZhbHVlICs9IGdldFN0eWxlQXR0cmlidXRlU3RyaW5nKGVsZW1lbnQsIGtleSwgZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKGtleSkpO1xuICB9XG4gIGZvciAoY29uc3Qga2V5IGluIGVsZW1lbnQuc3R5bGUpIHtcbiAgICAvLyBTa2lwIGludGVybmFsIERvbWlubyBwcm9wZXJ0aWVzIHRoYXQgZG9uJ3QgbmVlZCB0byBiZSByZWZsZWN0ZWQuXG4gICAgaWYgKCFlbGVtZW50LnN0eWxlLmhhc093blByb3BlcnR5KGtleSkgfHwga2V5LnN0YXJ0c1dpdGgoJ18nKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IGRhc2hLZXkgPSBjYW1lbENhc2VUb0Rhc2hDYXNlKGtleSk7XG4gICAgc3R5bGVBdHRyVmFsdWUgKz0gZ2V0U3R5bGVBdHRyaWJ1dGVTdHJpbmcoZWxlbWVudCwgZGFzaEtleSwgZWxlbWVudC5zdHlsZVtrZXldKTtcbiAgfVxuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZUF0dHJWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTdHlsZXMoZWxlbWVudDogYW55LCBzdHlsZXM6IMm1U3R5bGVEYXRhLCBmb3JtZXJTdHlsZXM/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICBpZiAoZWxlbWVudFsnc3R5bGUnXSkge1xuICAgIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIGNvbnN0IGNhbWVsUHJvcCA9IGRhc2hDYXNlVG9DYW1lbENhc2UocHJvcCk7XG4gICAgICBpZiAoZm9ybWVyU3R5bGVzICYmICFmb3JtZXJTdHlsZXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgZm9ybWVyU3R5bGVzW3Byb3BdID0gZWxlbWVudC5zdHlsZVtjYW1lbFByb3BdO1xuICAgICAgfVxuICAgICAgZWxlbWVudC5zdHlsZVtjYW1lbFByb3BdID0gc3R5bGVzW3Byb3BdO1xuICAgIH0pO1xuICAgIC8vIE9uIHRoZSBzZXJ2ZXIgc2V0IHRoZSAnc3R5bGUnIGF0dHJpYnV0ZSBzaW5jZSBpdCdzIG5vdCBhdXRvbWF0aWNhbGx5IHJlZmxlY3RlZC5cbiAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgIHdyaXRlU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcmFzZVN0eWxlcyhlbGVtZW50OiBhbnksIHN0eWxlczogybVTdHlsZURhdGEpIHtcbiAgaWYgKGVsZW1lbnRbJ3N0eWxlJ10pIHtcbiAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICBjb25zdCBjYW1lbFByb3AgPSBkYXNoQ2FzZVRvQ2FtZWxDYXNlKHByb3ApO1xuICAgICAgZWxlbWVudC5zdHlsZVtjYW1lbFByb3BdID0gJyc7XG4gICAgfSk7XG4gICAgLy8gT24gdGhlIHNlcnZlciBzZXQgdGhlICdzdHlsZScgYXR0cmlidXRlIHNpbmNlIGl0J3Mgbm90IGF1dG9tYXRpY2FsbHkgcmVmbGVjdGVkLlxuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgd3JpdGVTdHlsZUF0dHJpYnV0ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUFuaW1hdGlvbkVudHJ5KHN0ZXBzOiBBbmltYXRpb25NZXRhZGF0YSB8IEFuaW1hdGlvbk1ldGFkYXRhW10pOlxuICAgIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3RlcHMpKSB7XG4gICAgaWYgKHN0ZXBzLmxlbmd0aCA9PSAxKSByZXR1cm4gc3RlcHNbMF07XG4gICAgcmV0dXJuIHNlcXVlbmNlKHN0ZXBzKTtcbiAgfVxuICByZXR1cm4gc3RlcHMgYXMgQW5pbWF0aW9uTWV0YWRhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVN0eWxlUGFyYW1zKFxuICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnMsIGVycm9yczogYW55W10pIHtcbiAgY29uc3QgcGFyYW1zID0gb3B0aW9ucy5wYXJhbXMgfHwge307XG4gIGNvbnN0IG1hdGNoZXMgPSBleHRyYWN0U3R5bGVQYXJhbXModmFsdWUpO1xuICBpZiAobWF0Y2hlcy5sZW5ndGgpIHtcbiAgICBtYXRjaGVzLmZvckVhY2godmFyTmFtZSA9PiB7XG4gICAgICBpZiAoIXBhcmFtcy5oYXNPd25Qcm9wZXJ0eSh2YXJOYW1lKSkge1xuICAgICAgICBlcnJvcnMucHVzaChcbiAgICAgICAgICAgIGBVbmFibGUgdG8gcmVzb2x2ZSB0aGUgbG9jYWwgYW5pbWF0aW9uIHBhcmFtICR7dmFyTmFtZX0gaW4gdGhlIGdpdmVuIGxpc3Qgb2YgdmFsdWVzYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgUEFSQU1fUkVHRVggPVxuICAgIG5ldyBSZWdFeHAoYCR7U1VCU1RJVFVUSU9OX0VYUFJfU1RBUlR9XFxcXHMqKC4rPylcXFxccyoke1NVQlNUSVRVVElPTl9FWFBSX0VORH1gLCAnZycpO1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RTdHlsZVBhcmFtcyh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogc3RyaW5nW10ge1xuICBsZXQgcGFyYW1zOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIGxldCBtYXRjaDogYW55O1xuICAgIHdoaWxlIChtYXRjaCA9IFBBUkFNX1JFR0VYLmV4ZWModmFsdWUpKSB7XG4gICAgICBwYXJhbXMucHVzaChtYXRjaFsxXSBhcyBzdHJpbmcpO1xuICAgIH1cbiAgICBQQVJBTV9SRUdFWC5sYXN0SW5kZXggPSAwO1xuICB9XG4gIHJldHVybiBwYXJhbXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnBvbGF0ZVBhcmFtcyhcbiAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBwYXJhbXM6IHtbbmFtZTogc3RyaW5nXTogYW55fSwgZXJyb3JzOiBhbnlbXSk6IHN0cmluZ3xudW1iZXIge1xuICBjb25zdCBvcmlnaW5hbCA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHN0ciA9IG9yaWdpbmFsLnJlcGxhY2UoUEFSQU1fUkVHRVgsIChfLCB2YXJOYW1lKSA9PiB7XG4gICAgbGV0IGxvY2FsVmFsID0gcGFyYW1zW3Zhck5hbWVdO1xuICAgIC8vIHRoaXMgbWVhbnMgdGhhdCB0aGUgdmFsdWUgd2FzIG5ldmVyIG92ZXJyaWRkZW4gYnkgdGhlIGRhdGEgcGFzc2VkIGluIGJ5IHRoZSB1c2VyXG4gICAgaWYgKCFwYXJhbXMuaGFzT3duUHJvcGVydHkodmFyTmFtZSkpIHtcbiAgICAgIGVycm9ycy5wdXNoKGBQbGVhc2UgcHJvdmlkZSBhIHZhbHVlIGZvciB0aGUgYW5pbWF0aW9uIHBhcmFtICR7dmFyTmFtZX1gKTtcbiAgICAgIGxvY2FsVmFsID0gJyc7XG4gICAgfVxuICAgIHJldHVybiBsb2NhbFZhbC50b1N0cmluZygpO1xuICB9KTtcblxuICAvLyB3ZSBkbyB0aGlzIHRvIGFzc2VydCB0aGF0IG51bWVyaWMgdmFsdWVzIHN0YXkgYXMgdGhleSBhcmVcbiAgcmV0dXJuIHN0ciA9PSBvcmlnaW5hbCA/IHZhbHVlIDogc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXRlcmF0b3JUb0FycmF5KGl0ZXJhdG9yOiBhbnkpOiBhbnlbXSB7XG4gIGNvbnN0IGFycjogYW55W10gPSBbXTtcbiAgbGV0IGl0ZW0gPSBpdGVyYXRvci5uZXh0KCk7XG4gIHdoaWxlICghaXRlbS5kb25lKSB7XG4gICAgYXJyLnB1c2goaXRlbS52YWx1ZSk7XG4gICAgaXRlbSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VBbmltYXRpb25PcHRpb25zKFxuICAgIHNvdXJjZTogQW5pbWF0aW9uT3B0aW9ucywgZGVzdGluYXRpb246IEFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25PcHRpb25zIHtcbiAgaWYgKHNvdXJjZS5wYXJhbXMpIHtcbiAgICBjb25zdCBwMCA9IHNvdXJjZS5wYXJhbXM7XG4gICAgaWYgKCFkZXN0aW5hdGlvbi5wYXJhbXMpIHtcbiAgICAgIGRlc3RpbmF0aW9uLnBhcmFtcyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBwMSA9IGRlc3RpbmF0aW9uLnBhcmFtcztcbiAgICBPYmplY3Qua2V5cyhwMCkuZm9yRWFjaChwYXJhbSA9PiB7XG4gICAgICBpZiAoIXAxLmhhc093blByb3BlcnR5KHBhcmFtKSkge1xuICAgICAgICBwMVtwYXJhbV0gPSBwMFtwYXJhbV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuXG5jb25zdCBEQVNIX0NBU0VfUkVHRVhQID0gLy0rKFthLXowLTldKS9nO1xuZXhwb3J0IGZ1bmN0aW9uIGRhc2hDYXNlVG9DYW1lbENhc2UoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBpbnB1dC5yZXBsYWNlKERBU0hfQ0FTRV9SRUdFWFAsICguLi5tOiBhbnlbXSkgPT4gbVsxXS50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZnVuY3Rpb24gY2FtZWxDYXNlVG9EYXNoQ2FzZShpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGxvd1ByZXZpb3VzUGxheWVyU3R5bGVzTWVyZ2UoZHVyYXRpb246IG51bWJlciwgZGVsYXk6IG51bWJlcikge1xuICByZXR1cm4gZHVyYXRpb24gPT09IDAgfHwgZGVsYXkgPT09IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWxhbmNlUHJldmlvdXNTdHlsZXNJbnRvS2V5ZnJhbWVzKFxuICAgIGVsZW1lbnQ6IGFueSwga2V5ZnJhbWVzOiB7W2tleTogc3RyaW5nXTogYW55fVtdLCBwcmV2aW91c1N0eWxlczoge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgY29uc3QgcHJldmlvdXNTdHlsZVByb3BzID0gT2JqZWN0LmtleXMocHJldmlvdXNTdHlsZXMpO1xuICBpZiAocHJldmlvdXNTdHlsZVByb3BzLmxlbmd0aCAmJiBrZXlmcmFtZXMubGVuZ3RoKSB7XG4gICAgbGV0IHN0YXJ0aW5nS2V5ZnJhbWUgPSBrZXlmcmFtZXNbMF07XG4gICAgbGV0IG1pc3NpbmdTdHlsZVByb3BzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHByZXZpb3VzU3R5bGVQcm9wcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgaWYgKCFzdGFydGluZ0tleWZyYW1lLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIG1pc3NpbmdTdHlsZVByb3BzLnB1c2gocHJvcCk7XG4gICAgICB9XG4gICAgICBzdGFydGluZ0tleWZyYW1lW3Byb3BdID0gcHJldmlvdXNTdHlsZXNbcHJvcF07XG4gICAgfSk7XG5cbiAgICBpZiAobWlzc2luZ1N0eWxlUHJvcHMubGVuZ3RoKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwga2V5ZnJhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBrZiA9IGtleWZyYW1lc1tpXTtcbiAgICAgICAgbWlzc2luZ1N0eWxlUHJvcHMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7IGtmW3Byb3BdID0gY29tcHV0ZVN0eWxlKGVsZW1lbnQsIHByb3ApOyB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGtleWZyYW1lcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0RHNsTm9kZShcbiAgICB2aXNpdG9yOiBBbmltYXRpb25Ec2xWaXNpdG9yLCBub2RlOiBBbmltYXRpb25NZXRhZGF0YSwgY29udGV4dDogYW55KTogYW55O1xuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0RHNsTm9kZShcbiAgICB2aXNpdG9yOiBBbmltYXRpb25Bc3RWaXNpdG9yLCBub2RlOiBBbmltYXRpb25Bc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlPiwgY29udGV4dDogYW55KTogYW55O1xuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0RHNsTm9kZSh2aXNpdG9yOiBhbnksIG5vZGU6IGFueSwgY29udGV4dDogYW55KTogYW55IHtcbiAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICBjYXNlIEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5UcmlnZ2VyOlxuICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRUcmlnZ2VyKG5vZGUsIGNvbnRleHQpO1xuICAgIGNhc2UgQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlN0YXRlOlxuICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRTdGF0ZShub2RlLCBjb250ZXh0KTtcbiAgICBjYXNlIEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5UcmFuc2l0aW9uOlxuICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRUcmFuc2l0aW9uKG5vZGUsIGNvbnRleHQpO1xuICAgIGNhc2UgQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlNlcXVlbmNlOlxuICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRTZXF1ZW5jZShub2RlLCBjb250ZXh0KTtcbiAgICBjYXNlIEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5Hcm91cDpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0R3JvdXAobm9kZSwgY29udGV4dCk7XG4gICAgY2FzZSBBbmltYXRpb25NZXRhZGF0YVR5cGUuQW5pbWF0ZTpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0QW5pbWF0ZShub2RlLCBjb250ZXh0KTtcbiAgICBjYXNlIEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5LZXlmcmFtZXM6XG4gICAgICByZXR1cm4gdmlzaXRvci52aXNpdEtleWZyYW1lcyhub2RlLCBjb250ZXh0KTtcbiAgICBjYXNlIEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TdHlsZTpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0U3R5bGUobm9kZSwgY29udGV4dCk7XG4gICAgY2FzZSBBbmltYXRpb25NZXRhZGF0YVR5cGUuUmVmZXJlbmNlOlxuICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRSZWZlcmVuY2Uobm9kZSwgY29udGV4dCk7XG4gICAgY2FzZSBBbmltYXRpb25NZXRhZGF0YVR5cGUuQW5pbWF0ZUNoaWxkOlxuICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRBbmltYXRlQ2hpbGQobm9kZSwgY29udGV4dCk7XG4gICAgY2FzZSBBbmltYXRpb25NZXRhZGF0YVR5cGUuQW5pbWF0ZVJlZjpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0QW5pbWF0ZVJlZihub2RlLCBjb250ZXh0KTtcbiAgICBjYXNlIEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5RdWVyeTpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0UXVlcnkobm9kZSwgY29udGV4dCk7XG4gICAgY2FzZSBBbmltYXRpb25NZXRhZGF0YVR5cGUuU3RhZ2dlcjpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0U3RhZ2dlcihub2RlLCBjb250ZXh0KTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcmVzb2x2ZSBhbmltYXRpb24gbWV0YWRhdGEgbm9kZSAjJHtub2RlLnR5cGV9YCk7XG4gIH1cbn1cbiJdfQ==