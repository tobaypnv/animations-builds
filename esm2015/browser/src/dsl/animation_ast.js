/**
 * @fileoverview added by tsickle
 * Generated from: packages/animations/browser/src/dsl/animation_ast.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const EMPTY_ANIMATION_OPTIONS = {};
/**
 * @record
 */
export function AstVisitor() { }
if (false) {
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitTrigger = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitState = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitTransition = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitSequence = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitGroup = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitAnimate = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitStyle = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitKeyframes = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitReference = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitAnimateChild = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitAnimateRef = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitQuery = function (ast, context) { };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    AstVisitor.prototype.visitStagger = function (ast, context) { };
}
/**
 * @record
 * @template T
 */
export function Ast() { }
if (false) {
    /** @type {?} */
    Ast.prototype.type;
    /** @type {?} */
    Ast.prototype.options;
}
/**
 * @record
 */
export function TriggerAst() { }
if (false) {
    /** @type {?} */
    TriggerAst.prototype.type;
    /** @type {?} */
    TriggerAst.prototype.name;
    /** @type {?} */
    TriggerAst.prototype.states;
    /** @type {?} */
    TriggerAst.prototype.transitions;
    /** @type {?} */
    TriggerAst.prototype.queryCount;
    /** @type {?} */
    TriggerAst.prototype.depCount;
}
/**
 * @record
 */
export function StateAst() { }
if (false) {
    /** @type {?} */
    StateAst.prototype.type;
    /** @type {?} */
    StateAst.prototype.name;
    /** @type {?} */
    StateAst.prototype.style;
}
/**
 * @record
 */
export function TransitionAst() { }
if (false) {
    /** @type {?} */
    TransitionAst.prototype.matchers;
    /** @type {?} */
    TransitionAst.prototype.animation;
    /** @type {?} */
    TransitionAst.prototype.queryCount;
    /** @type {?} */
    TransitionAst.prototype.depCount;
}
/**
 * @record
 */
export function SequenceAst() { }
if (false) {
    /** @type {?} */
    SequenceAst.prototype.steps;
}
/**
 * @record
 */
export function GroupAst() { }
if (false) {
    /** @type {?} */
    GroupAst.prototype.steps;
}
/**
 * @record
 */
export function AnimateAst() { }
if (false) {
    /** @type {?} */
    AnimateAst.prototype.timings;
    /** @type {?} */
    AnimateAst.prototype.style;
}
/**
 * @record
 */
export function StyleAst() { }
if (false) {
    /** @type {?} */
    StyleAst.prototype.styles;
    /** @type {?} */
    StyleAst.prototype.easing;
    /** @type {?} */
    StyleAst.prototype.offset;
    /** @type {?} */
    StyleAst.prototype.containsDynamicStyles;
    /** @type {?|undefined} */
    StyleAst.prototype.isEmptyStep;
}
/**
 * @record
 */
export function KeyframesAst() { }
if (false) {
    /** @type {?} */
    KeyframesAst.prototype.styles;
}
/**
 * @record
 */
export function ReferenceAst() { }
if (false) {
    /** @type {?} */
    ReferenceAst.prototype.animation;
}
/**
 * @record
 */
export function AnimateChildAst() { }
/**
 * @record
 */
export function AnimateRefAst() { }
if (false) {
    /** @type {?} */
    AnimateRefAst.prototype.animation;
}
/**
 * @record
 */
export function QueryAst() { }
if (false) {
    /** @type {?} */
    QueryAst.prototype.selector;
    /** @type {?} */
    QueryAst.prototype.limit;
    /** @type {?} */
    QueryAst.prototype.optional;
    /** @type {?} */
    QueryAst.prototype.includeSelf;
    /** @type {?} */
    QueryAst.prototype.animation;
    /** @type {?} */
    QueryAst.prototype.originalSelector;
}
/**
 * @record
 */
export function StaggerAst() { }
if (false) {
    /** @type {?} */
    StaggerAst.prototype.timings;
    /** @type {?} */
    StaggerAst.prototype.animation;
}
/**
 * @record
 */
export function TimingAst() { }
if (false) {
    /** @type {?} */
    TimingAst.prototype.duration;
    /** @type {?} */
    TimingAst.prototype.delay;
    /** @type {?} */
    TimingAst.prototype.easing;
    /** @type {?|undefined} */
    TimingAst.prototype.dynamic;
}
/**
 * @record
 */
export function DynamicTimingAst() { }
if (false) {
    /** @type {?} */
    DynamicTimingAst.prototype.strValue;
    /** @type {?} */
    DynamicTimingAst.prototype.dynamic;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2FzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvYnJvd3Nlci9zcmMvZHNsL2FuaW1hdGlvbl9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O01BU00sdUJBQXVCLEdBQXFCLEVBQUU7Ozs7QUFFcEQsZ0NBY0M7Ozs7Ozs7SUFiQyxnRUFBaUQ7Ozs7OztJQUNqRCw4REFBNkM7Ozs7OztJQUM3QyxtRUFBdUQ7Ozs7OztJQUN2RCxpRUFBbUQ7Ozs7OztJQUNuRCw4REFBNkM7Ozs7OztJQUM3QyxnRUFBaUQ7Ozs7OztJQUNqRCw4REFBNkM7Ozs7OztJQUM3QyxrRUFBcUQ7Ozs7OztJQUNyRCxrRUFBcUQ7Ozs7OztJQUNyRCxxRUFBMkQ7Ozs7OztJQUMzRCxtRUFBdUQ7Ozs7OztJQUN2RCw4REFBNkM7Ozs7OztJQUM3QyxnRUFBaUQ7Ozs7OztBQUduRCx5QkFHQzs7O0lBRkMsbUJBQVE7O0lBQ1Isc0JBQStCOzs7OztBQUdqQyxnQ0FPQzs7O0lBTkMsMEJBQW9DOztJQUNwQywwQkFBYTs7SUFDYiw0QkFBbUI7O0lBQ25CLGlDQUE2Qjs7SUFDN0IsZ0NBQW1COztJQUNuQiw4QkFBaUI7Ozs7O0FBR25CLDhCQUlDOzs7SUFIQyx3QkFBa0M7O0lBQ2xDLHdCQUFhOztJQUNiLHlCQUFnQjs7Ozs7QUFHbEIsbUNBTUM7OztJQUxDLGlDQUMrRjs7SUFDL0Ysa0NBQXNDOztJQUN0QyxtQ0FBbUI7O0lBQ25CLGlDQUFpQjs7Ozs7QUFHbkIsaUNBRUM7OztJQURDLDRCQUFvQzs7Ozs7QUFHdEMsOEJBRUM7OztJQURDLHlCQUFvQzs7Ozs7QUFHdEMsZ0NBR0M7OztJQUZDLDZCQUFtQjs7SUFDbkIsMkJBQTZCOzs7OztBQUcvQiw4QkFNQzs7O0lBTEMsMEJBQThCOztJQUM5QiwwQkFBb0I7O0lBQ3BCLDBCQUFvQjs7SUFDcEIseUNBQStCOztJQUMvQiwrQkFBc0I7Ozs7O0FBR3hCLGtDQUVDOzs7SUFEQyw4QkFBbUI7Ozs7O0FBR3JCLGtDQUVDOzs7SUFEQyxpQ0FBc0M7Ozs7O0FBR3hDLHFDQUFtRjs7OztBQUVuRixtQ0FFQzs7O0lBREMsa0NBQXdCOzs7OztBQUcxQiw4QkFPQzs7O0lBTkMsNEJBQWlCOztJQUNqQix5QkFBYzs7SUFDZCw0QkFBa0I7O0lBQ2xCLCtCQUFxQjs7SUFDckIsNkJBQXNDOztJQUN0QyxvQ0FBeUI7Ozs7O0FBRzNCLGdDQUdDOzs7SUFGQyw2QkFBd0I7O0lBQ3hCLCtCQUFzQzs7Ozs7QUFHeEMsK0JBS0M7OztJQUpDLDZCQUFpQjs7SUFDakIsMEJBQWM7O0lBQ2QsMkJBQW9COztJQUNwQiw0QkFBa0I7Ozs7O0FBR3BCLHNDQUdDOzs7SUFGQyxvQ0FBaUI7O0lBQ2pCLG1DQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBbmltYXRlVGltaW5ncywgQW5pbWF0aW9uTWV0YWRhdGFUeXBlLCBBbmltYXRpb25PcHRpb25zLCDJtVN0eWxlRGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmNvbnN0IEVNUFRZX0FOSU1BVElPTl9PUFRJT05TOiBBbmltYXRpb25PcHRpb25zID0ge307XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXN0VmlzaXRvciB7XG4gIHZpc2l0VHJpZ2dlcihhc3Q6IFRyaWdnZXJBc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRTdGF0ZShhc3Q6IFN0YXRlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0VHJhbnNpdGlvbihhc3Q6IFRyYW5zaXRpb25Bc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRTZXF1ZW5jZShhc3Q6IFNlcXVlbmNlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0R3JvdXAoYXN0OiBHcm91cEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEFuaW1hdGUoYXN0OiBBbmltYXRlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0U3R5bGUoYXN0OiBTdHlsZUFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEtleWZyYW1lcyhhc3Q6IEtleWZyYW1lc0FzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFJlZmVyZW5jZShhc3Q6IFJlZmVyZW5jZUFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEFuaW1hdGVDaGlsZChhc3Q6IEFuaW1hdGVDaGlsZEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEFuaW1hdGVSZWYoYXN0OiBBbmltYXRlUmVmQXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0UXVlcnkoYXN0OiBRdWVyeUFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFN0YWdnZXIoYXN0OiBTdGFnZ2VyQXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXN0PFQgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YVR5cGU+IHtcbiAgdHlwZTogVDtcbiAgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9uc3xudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyaWdnZXJBc3QgZXh0ZW5kcyBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlLlRyaWdnZXI+IHtcbiAgdHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlRyaWdnZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgc3RhdGVzOiBTdGF0ZUFzdFtdO1xuICB0cmFuc2l0aW9uczogVHJhbnNpdGlvbkFzdFtdO1xuICBxdWVyeUNvdW50OiBudW1iZXI7XG4gIGRlcENvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGVBc3QgZXh0ZW5kcyBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlLlN0YXRlPiB7XG4gIHR5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TdGF0ZTtcbiAgbmFtZTogc3RyaW5nO1xuICBzdHlsZTogU3R5bGVBc3Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNpdGlvbkFzdCBleHRlbmRzIEFzdDxBbmltYXRpb25NZXRhZGF0YVR5cGUuVHJhbnNpdGlvbj4ge1xuICBtYXRjaGVyczogKChmcm9tU3RhdGU6IHN0cmluZywgdG9TdGF0ZTogc3RyaW5nLCBlbGVtZW50OiBhbnksIHBhcmFtczoge1trZXk6IHN0cmluZ106XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFueX0pID0+IGJvb2xlYW4pW107XG4gIGFuaW1hdGlvbjogQXN0PEFuaW1hdGlvbk1ldGFkYXRhVHlwZT47XG4gIHF1ZXJ5Q291bnQ6IG51bWJlcjtcbiAgZGVwQ291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXF1ZW5jZUFzdCBleHRlbmRzIEFzdDxBbmltYXRpb25NZXRhZGF0YVR5cGUuU2VxdWVuY2U+IHtcbiAgc3RlcHM6IEFzdDxBbmltYXRpb25NZXRhZGF0YVR5cGU+W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JvdXBBc3QgZXh0ZW5kcyBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlLkdyb3VwPiB7XG4gIHN0ZXBzOiBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlPltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGVBc3QgZXh0ZW5kcyBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlLkFuaW1hdGU+IHtcbiAgdGltaW5nczogVGltaW5nQXN0O1xuICBzdHlsZTogU3R5bGVBc3R8S2V5ZnJhbWVzQXN0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0eWxlQXN0IGV4dGVuZHMgQXN0PEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TdHlsZT4ge1xuICBzdHlsZXM6ICjJtVN0eWxlRGF0YXxzdHJpbmcpW107XG4gIGVhc2luZzogc3RyaW5nfG51bGw7XG4gIG9mZnNldDogbnVtYmVyfG51bGw7XG4gIGNvbnRhaW5zRHluYW1pY1N0eWxlczogYm9vbGVhbjtcbiAgaXNFbXB0eVN0ZXA/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEtleWZyYW1lc0FzdCBleHRlbmRzIEFzdDxBbmltYXRpb25NZXRhZGF0YVR5cGUuS2V5ZnJhbWVzPiB7XG4gIHN0eWxlczogU3R5bGVBc3RbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWZlcmVuY2VBc3QgZXh0ZW5kcyBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlLlJlZmVyZW5jZT4ge1xuICBhbmltYXRpb246IEFzdDxBbmltYXRpb25NZXRhZGF0YVR5cGU+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGVDaGlsZEFzdCBleHRlbmRzIEFzdDxBbmltYXRpb25NZXRhZGF0YVR5cGUuQW5pbWF0ZUNoaWxkPiB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGVSZWZBc3QgZXh0ZW5kcyBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlLkFuaW1hdGVSZWY+IHtcbiAgYW5pbWF0aW9uOiBSZWZlcmVuY2VBc3Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnlBc3QgZXh0ZW5kcyBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlLlF1ZXJ5PiB7XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG4gIGxpbWl0OiBudW1iZXI7XG4gIG9wdGlvbmFsOiBib29sZWFuO1xuICBpbmNsdWRlU2VsZjogYm9vbGVhbjtcbiAgYW5pbWF0aW9uOiBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlPjtcbiAgb3JpZ2luYWxTZWxlY3Rvcjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWdnZXJBc3QgZXh0ZW5kcyBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlLlN0YWdnZXI+IHtcbiAgdGltaW5nczogQW5pbWF0ZVRpbWluZ3M7XG4gIGFuaW1hdGlvbjogQXN0PEFuaW1hdGlvbk1ldGFkYXRhVHlwZT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltaW5nQXN0IHtcbiAgZHVyYXRpb246IG51bWJlcjtcbiAgZGVsYXk6IG51bWJlcjtcbiAgZWFzaW5nOiBzdHJpbmd8bnVsbDtcbiAgZHluYW1pYz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHluYW1pY1RpbWluZ0FzdCBleHRlbmRzIFRpbWluZ0FzdCB7XG4gIHN0clZhbHVlOiBzdHJpbmc7XG4gIGR5bmFtaWM6IHRydWU7XG59XG4iXX0=