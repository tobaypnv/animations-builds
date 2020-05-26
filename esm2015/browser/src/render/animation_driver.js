/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NoopAnimationPlayer } from '@angular/animations';
import { Injectable } from '@angular/core';
import { containsElement, invokeQuery, matchesElement, validateStyleProperty } from './shared';
import * as i0 from "@angular/core";
/**
 * @publicApi
 */
let NoopAnimationDriver = /** @class */ (() => {
    class NoopAnimationDriver {
        validateStyleProperty(prop) {
            return validateStyleProperty(prop);
        }
        matchesElement(element, selector) {
            return matchesElement(element, selector);
        }
        containsElement(elm1, elm2) {
            return containsElement(elm1, elm2);
        }
        query(element, selector, multi) {
            return invokeQuery(element, selector, multi);
        }
        computeStyle(element, prop, defaultValue) {
            return defaultValue || '';
        }
        animate(element, keyframes, duration, delay, easing, previousPlayers = [], scrubberAccessRequested) {
            return new NoopAnimationPlayer(duration, delay);
        }
    }
    NoopAnimationDriver.ɵfac = function NoopAnimationDriver_Factory(t) { return new (t || NoopAnimationDriver)(); };
    NoopAnimationDriver.ɵprov = i0.ɵɵdefineInjectable({ token: NoopAnimationDriver, factory: NoopAnimationDriver.ɵfac });
    return NoopAnimationDriver;
})();
export { NoopAnimationDriver };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NoopAnimationDriver, [{
        type: Injectable
    }], null, null); })();
/**
 * @publicApi
 */
let AnimationDriver = /** @class */ (() => {
    class AnimationDriver {
    }
    AnimationDriver.NOOP = new NoopAnimationDriver();
    return AnimationDriver;
})();
export { AnimationDriver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2RyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvYnJvd3Nlci9zcmMvcmVuZGVyL2FuaW1hdGlvbl9kcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFrQixtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3pFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFDLE1BQU0sVUFBVSxDQUFDOztBQUU3Rjs7R0FFRztBQUNIO0lBQUEsTUFDYSxtQkFBbUI7UUFDOUIscUJBQXFCLENBQUMsSUFBWTtZQUNoQyxPQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRCxjQUFjLENBQUMsT0FBWSxFQUFFLFFBQWdCO1lBQzNDLE9BQU8sY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQsZUFBZSxDQUFDLElBQVMsRUFBRSxJQUFTO1lBQ2xDLE9BQU8sZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQsS0FBSyxDQUFDLE9BQVksRUFBRSxRQUFnQixFQUFFLEtBQWM7WUFDbEQsT0FBTyxXQUFXLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQsWUFBWSxDQUFDLE9BQVksRUFBRSxJQUFZLEVBQUUsWUFBcUI7WUFDNUQsT0FBTyxZQUFZLElBQUksRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFFRCxPQUFPLENBQ0gsT0FBWSxFQUFFLFNBQTJDLEVBQUUsUUFBZ0IsRUFBRSxLQUFhLEVBQzFGLE1BQWMsRUFBRSxrQkFBeUIsRUFBRSxFQUMzQyx1QkFBaUM7WUFDbkMsT0FBTyxJQUFJLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDOzswRkExQlUsbUJBQW1COytEQUFuQixtQkFBbUIsV0FBbkIsbUJBQW1COzhCQWhCaEM7S0EyQ0M7U0EzQlksbUJBQW1CO2tEQUFuQixtQkFBbUI7Y0FEL0IsVUFBVTs7QUE4Qlg7O0dBRUc7QUFDSDtJQUFBLE1BQXNCLGVBQWU7O0lBQzVCLG9CQUFJLEdBQW9CLElBQUksbUJBQW1CLEVBQUUsQ0FBQztJQWUzRCxzQkFBQztLQUFBO1NBaEJxQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvblBsYXllciwgTm9vcEFuaW1hdGlvblBsYXllcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2NvbnRhaW5zRWxlbWVudCwgaW52b2tlUXVlcnksIG1hdGNoZXNFbGVtZW50LCB2YWxpZGF0ZVN0eWxlUHJvcGVydHl9IGZyb20gJy4vc2hhcmVkJztcblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb29wQW5pbWF0aW9uRHJpdmVyIGltcGxlbWVudHMgQW5pbWF0aW9uRHJpdmVyIHtcbiAgdmFsaWRhdGVTdHlsZVByb3BlcnR5KHByb3A6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWxpZGF0ZVN0eWxlUHJvcGVydHkocHJvcCk7XG4gIH1cblxuICBtYXRjaGVzRWxlbWVudChlbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWF0Y2hlc0VsZW1lbnQoZWxlbWVudCwgc2VsZWN0b3IpO1xuICB9XG5cbiAgY29udGFpbnNFbGVtZW50KGVsbTE6IGFueSwgZWxtMjogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbnRhaW5zRWxlbWVudChlbG0xLCBlbG0yKTtcbiAgfVxuXG4gIHF1ZXJ5KGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZywgbXVsdGk6IGJvb2xlYW4pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGludm9rZVF1ZXJ5KGVsZW1lbnQsIHNlbGVjdG9yLCBtdWx0aSk7XG4gIH1cblxuICBjb21wdXRlU3R5bGUoZWxlbWVudDogYW55LCBwcm9wOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZSB8fCAnJztcbiAgfVxuXG4gIGFuaW1hdGUoXG4gICAgICBlbGVtZW50OiBhbnksIGtleWZyYW1lczoge1trZXk6IHN0cmluZ106IHN0cmluZ3xudW1iZXJ9W10sIGR1cmF0aW9uOiBudW1iZXIsIGRlbGF5OiBudW1iZXIsXG4gICAgICBlYXNpbmc6IHN0cmluZywgcHJldmlvdXNQbGF5ZXJzOiBhbnlbXSA9IFtdLFxuICAgICAgc2NydWJiZXJBY2Nlc3NSZXF1ZXN0ZWQ/OiBib29sZWFuKTogQW5pbWF0aW9uUGxheWVyIHtcbiAgICByZXR1cm4gbmV3IE5vb3BBbmltYXRpb25QbGF5ZXIoZHVyYXRpb24sIGRlbGF5KTtcbiAgfVxufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFuaW1hdGlvbkRyaXZlciB7XG4gIHN0YXRpYyBOT09QOiBBbmltYXRpb25Ecml2ZXIgPSBuZXcgTm9vcEFuaW1hdGlvbkRyaXZlcigpO1xuXG4gIGFic3RyYWN0IHZhbGlkYXRlU3R5bGVQcm9wZXJ0eShwcm9wOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIGFic3RyYWN0IG1hdGNoZXNFbGVtZW50KGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgYWJzdHJhY3QgY29udGFpbnNFbGVtZW50KGVsbTE6IGFueSwgZWxtMjogYW55KTogYm9vbGVhbjtcblxuICBhYnN0cmFjdCBxdWVyeShlbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcsIG11bHRpOiBib29sZWFuKTogYW55W107XG5cbiAgYWJzdHJhY3QgY29tcHV0ZVN0eWxlKGVsZW1lbnQ6IGFueSwgcHJvcDogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBzdHJpbmcpOiBzdHJpbmc7XG5cbiAgYWJzdHJhY3QgYW5pbWF0ZShcbiAgICAgIGVsZW1lbnQ6IGFueSwga2V5ZnJhbWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcn1bXSwgZHVyYXRpb246IG51bWJlciwgZGVsYXk6IG51bWJlcixcbiAgICAgIGVhc2luZz86IHN0cmluZ3xudWxsLCBwcmV2aW91c1BsYXllcnM/OiBhbnlbXSwgc2NydWJiZXJBY2Nlc3NSZXF1ZXN0ZWQ/OiBib29sZWFuKTogYW55O1xufVxuIl19