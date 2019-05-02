/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all animation APIs of the animation package.
 */
export { AnimationBuilder, AnimationFactory } from './animation_builder';
export { AUTO_STYLE, animate, animateChild, animation, group, keyframes, query, sequence, stagger, state, style, transition, trigger, useAnimation } from './animation_metadata';
export { NoopAnimationPlayer } from './players/animation_player';
export { ɵAnimationGroupPlayer, ɵPRE_STYLE } from './private_export';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvc3JjL2FuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXZFLE9BQU8sRUFBQyxVQUFVLEVBQTRkLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBYSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JwQixPQUFPLEVBQWtCLG1CQUFtQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFFaEYsa0RBQWMsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBFbnRyeSBwb2ludCBmb3IgYWxsIGFuaW1hdGlvbiBBUElzIG9mIHRoZSBhbmltYXRpb24gcGFja2FnZS5cbiAqL1xuZXhwb3J0IHtBbmltYXRpb25CdWlsZGVyLCBBbmltYXRpb25GYWN0b3J5fSBmcm9tICcuL2FuaW1hdGlvbl9idWlsZGVyJztcbmV4cG9ydCB7QW5pbWF0aW9uRXZlbnR9IGZyb20gJy4vYW5pbWF0aW9uX2V2ZW50JztcbmV4cG9ydCB7QVVUT19TVFlMRSwgQW5pbWF0ZUNoaWxkT3B0aW9ucywgQW5pbWF0ZVRpbWluZ3MsIEFuaW1hdGlvbkFuaW1hdGVDaGlsZE1ldGFkYXRhLCBBbmltYXRpb25BbmltYXRlTWV0YWRhdGEsIEFuaW1hdGlvbkFuaW1hdGVSZWZNZXRhZGF0YSwgQW5pbWF0aW9uR3JvdXBNZXRhZGF0YSwgQW5pbWF0aW9uS2V5ZnJhbWVzU2VxdWVuY2VNZXRhZGF0YSwgQW5pbWF0aW9uTWV0YWRhdGEsIEFuaW1hdGlvbk1ldGFkYXRhVHlwZSwgQW5pbWF0aW9uT3B0aW9ucywgQW5pbWF0aW9uUXVlcnlNZXRhZGF0YSwgQW5pbWF0aW9uUXVlcnlPcHRpb25zLCBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSwgQW5pbWF0aW9uU2VxdWVuY2VNZXRhZGF0YSwgQW5pbWF0aW9uU3RhZ2dlck1ldGFkYXRhLCBBbmltYXRpb25TdGF0ZU1ldGFkYXRhLCBBbmltYXRpb25TdHlsZU1ldGFkYXRhLCBBbmltYXRpb25UcmFuc2l0aW9uTWV0YWRhdGEsIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSwgYW5pbWF0ZSwgYW5pbWF0ZUNoaWxkLCBhbmltYXRpb24sIGdyb3VwLCBrZXlmcmFtZXMsIHF1ZXJ5LCBzZXF1ZW5jZSwgc3RhZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyLCB1c2VBbmltYXRpb24sIMm1U3R5bGVEYXRhfSBmcm9tICcuL2FuaW1hdGlvbl9tZXRhZGF0YSc7XG5leHBvcnQge0FuaW1hdGlvblBsYXllciwgTm9vcEFuaW1hdGlvblBsYXllcn0gZnJvbSAnLi9wbGF5ZXJzL2FuaW1hdGlvbl9wbGF5ZXInO1xuXG5leHBvcnQgKiBmcm9tICcuL3ByaXZhdGVfZXhwb3J0JztcbiJdfQ==