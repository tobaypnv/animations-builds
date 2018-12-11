import * as tslib_1 from "tslib";
import { buildAnimationAst } from '../dsl/animation_ast_builder';
import { buildTrigger } from '../dsl/animation_trigger';
import { parseTimelineCommand } from './shared';
import { TimelineAnimationEngine } from './timeline_animation_engine';
import { TransitionAnimationEngine } from './transition_animation_engine';
var AnimationEngine = /** @class */ (function () {
    function AnimationEngine(bodyNode, _driver, normalizer) {
        var _this = this;
        this.bodyNode = bodyNode;
        this._driver = _driver;
        this._triggerCache = {};
        // this method is designed to be overridden by the code that uses this engine
        this.onRemovalComplete = function (element, context) { };
        this._transitionEngine = new TransitionAnimationEngine(bodyNode, _driver, normalizer);
        this._timelineEngine = new TimelineAnimationEngine(bodyNode, _driver, normalizer);
        this._transitionEngine.onRemovalComplete = function (element, context) {
            return _this.onRemovalComplete(element, context);
        };
    }
    AnimationEngine.prototype.registerTrigger = function (componentId, namespaceId, hostElement, name, metadata) {
        var cacheKey = componentId + '-' + name;
        var trigger = this._triggerCache[cacheKey];
        if (!trigger) {
            var errors = [];
            var ast = buildAnimationAst(this._driver, metadata, errors);
            if (errors.length) {
                throw new Error("The animation trigger \"" + name + "\" has failed to build due to the following errors:\n - " + errors.join("\n - "));
            }
            trigger = buildTrigger(name, ast);
            this._triggerCache[cacheKey] = trigger;
        }
        this._transitionEngine.registerTrigger(namespaceId, name, trigger);
    };
    AnimationEngine.prototype.register = function (namespaceId, hostElement) {
        this._transitionEngine.register(namespaceId, hostElement);
    };
    AnimationEngine.prototype.destroy = function (namespaceId, context) {
        this._transitionEngine.destroy(namespaceId, context);
    };
    AnimationEngine.prototype.onInsert = function (namespaceId, element, parent, insertBefore) {
        this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
    };
    AnimationEngine.prototype.onRemove = function (namespaceId, element, context) {
        this._transitionEngine.removeNode(namespaceId, element, context);
    };
    AnimationEngine.prototype.disableAnimations = function (element, disable) {
        this._transitionEngine.markElementAsDisabled(element, disable);
    };
    AnimationEngine.prototype.process = function (namespaceId, element, property, value) {
        if (property.charAt(0) == '@') {
            var _a = tslib_1.__read(parseTimelineCommand(property), 2), id = _a[0], action = _a[1];
            var args = value;
            this._timelineEngine.command(id, element, action, args);
        }
        else {
            this._transitionEngine.trigger(namespaceId, element, property, value);
        }
    };
    AnimationEngine.prototype.listen = function (namespaceId, element, eventName, eventPhase, callback) {
        // @@listen
        if (eventName.charAt(0) == '@') {
            var _a = tslib_1.__read(parseTimelineCommand(eventName), 2), id = _a[0], action = _a[1];
            return this._timelineEngine.listen(id, element, action, callback);
        }
        return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
    };
    AnimationEngine.prototype.flush = function (microtaskId) {
        if (microtaskId === void 0) { microtaskId = -1; }
        this._transitionEngine.flush(microtaskId);
    };
    Object.defineProperty(AnimationEngine.prototype, "players", {
        get: function () {
            return this._transitionEngine.players
                .concat(this._timelineEngine.players);
        },
        enumerable: true,
        configurable: true
    });
    AnimationEngine.prototype.whenRenderingDone = function () { return this._transitionEngine.whenRenderingDone(); };
    return AnimationEngine;
}());
export { AnimationEngine };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2VuZ2luZV9uZXh0LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5pbWF0aW9ucy9icm93c2VyL3NyYy9yZW5kZXIvYW5pbWF0aW9uX2VuZ2luZV9uZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFTQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQW1CLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBSXhFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM5QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUV4RTtJQVNFLHlCQUNZLFFBQWEsRUFBVSxPQUF3QixFQUN2RCxVQUFvQztRQUZ4QyxpQkFRQztRQVBXLGFBQVEsR0FBUixRQUFRLENBQUs7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQU5uRCxrQkFBYSxHQUFzQyxFQUFFLENBQUM7UUFFOUQsNkVBQTZFO1FBQ3RFLHNCQUFpQixHQUFHLFVBQUMsT0FBWSxFQUFFLE9BQVksSUFBTSxDQUFDLENBQUM7UUFLNUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUkseUJBQXlCLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksdUJBQXVCLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVsRixJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEdBQUcsVUFBQyxPQUFZLEVBQUUsT0FBWTtZQUNsRSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO1FBQXhDLENBQXdDLENBQUM7SUFDL0MsQ0FBQztJQUVE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LENBQUM7WUFDckQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNuRTtRQUNELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELCtCQUFLLEdBQUwsVUFBTSxXQUF3QjtRQUF4Qiw0QkFBQSxFQUFBLGVBQXVCLENBQUM7UUFBVSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQUMsQ0FBQztJQUVwRixzQkFBSSxvQ0FBTzthQUFYO1lBQ0UsT0FBUSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBNkI7aUJBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQTRCLENBQUMsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTtJQUVELDJDQUFpQixHQUFqQixjQUFvQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxRixzQkFBQztBQUFELENBQUMsQUF2RkQsSUF1RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvbk1ldGFkYXRhLCBBbmltYXRpb25QbGF5ZXIsIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1RyaWdnZXJBc3R9IGZyb20gJy4uL2RzbC9hbmltYXRpb25fYXN0JztcbmltcG9ydCB7YnVpbGRBbmltYXRpb25Bc3R9IGZyb20gJy4uL2RzbC9hbmltYXRpb25fYXN0X2J1aWxkZXInO1xuaW1wb3J0IHtBbmltYXRpb25UcmlnZ2VyLCBidWlsZFRyaWdnZXJ9IGZyb20gJy4uL2RzbC9hbmltYXRpb25fdHJpZ2dlcic7XG5pbXBvcnQge0FuaW1hdGlvblN0eWxlTm9ybWFsaXplcn0gZnJvbSAnLi4vZHNsL3N0eWxlX25vcm1hbGl6YXRpb24vYW5pbWF0aW9uX3N0eWxlX25vcm1hbGl6ZXInO1xuXG5pbXBvcnQge0FuaW1hdGlvbkRyaXZlcn0gZnJvbSAnLi9hbmltYXRpb25fZHJpdmVyJztcbmltcG9ydCB7cGFyc2VUaW1lbGluZUNvbW1hbmR9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7VGltZWxpbmVBbmltYXRpb25FbmdpbmV9IGZyb20gJy4vdGltZWxpbmVfYW5pbWF0aW9uX2VuZ2luZSc7XG5pbXBvcnQge1RyYW5zaXRpb25BbmltYXRpb25FbmdpbmV9IGZyb20gJy4vdHJhbnNpdGlvbl9hbmltYXRpb25fZW5naW5lJztcblxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkVuZ2luZSB7XG4gIHByaXZhdGUgX3RyYW5zaXRpb25FbmdpbmU6IFRyYW5zaXRpb25BbmltYXRpb25FbmdpbmU7XG4gIHByaXZhdGUgX3RpbWVsaW5lRW5naW5lOiBUaW1lbGluZUFuaW1hdGlvbkVuZ2luZTtcblxuICBwcml2YXRlIF90cmlnZ2VyQ2FjaGU6IHtba2V5OiBzdHJpbmddOiBBbmltYXRpb25UcmlnZ2VyfSA9IHt9O1xuXG4gIC8vIHRoaXMgbWV0aG9kIGlzIGRlc2lnbmVkIHRvIGJlIG92ZXJyaWRkZW4gYnkgdGhlIGNvZGUgdGhhdCB1c2VzIHRoaXMgZW5naW5lXG4gIHB1YmxpYyBvblJlbW92YWxDb21wbGV0ZSA9IChlbGVtZW50OiBhbnksIGNvbnRleHQ6IGFueSkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGJvZHlOb2RlOiBhbnksIHByaXZhdGUgX2RyaXZlcjogQW5pbWF0aW9uRHJpdmVyLFxuICAgICAgbm9ybWFsaXplcjogQW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyKSB7XG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZSA9IG5ldyBUcmFuc2l0aW9uQW5pbWF0aW9uRW5naW5lKGJvZHlOb2RlLCBfZHJpdmVyLCBub3JtYWxpemVyKTtcbiAgICB0aGlzLl90aW1lbGluZUVuZ2luZSA9IG5ldyBUaW1lbGluZUFuaW1hdGlvbkVuZ2luZShib2R5Tm9kZSwgX2RyaXZlciwgbm9ybWFsaXplcik7XG5cbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lLm9uUmVtb3ZhbENvbXBsZXRlID0gKGVsZW1lbnQ6IGFueSwgY29udGV4dDogYW55KSA9PlxuICAgICAgICB0aGlzLm9uUmVtb3ZhbENvbXBsZXRlKGVsZW1lbnQsIGNvbnRleHQpO1xuICB9XG5cbiAgcmVnaXN0ZXJUcmlnZ2VyKFxuICAgICAgY29tcG9uZW50SWQ6IHN0cmluZywgbmFtZXNwYWNlSWQ6IHN0cmluZywgaG9zdEVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLFxuICAgICAgbWV0YWRhdGE6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSk6IHZvaWQge1xuICAgIGNvbnN0IGNhY2hlS2V5ID0gY29tcG9uZW50SWQgKyAnLScgKyBuYW1lO1xuICAgIGxldCB0cmlnZ2VyID0gdGhpcy5fdHJpZ2dlckNhY2hlW2NhY2hlS2V5XTtcbiAgICBpZiAoIXRyaWdnZXIpIHtcbiAgICAgIGNvbnN0IGVycm9yczogYW55W10gPSBbXTtcbiAgICAgIGNvbnN0IGFzdCA9XG4gICAgICAgICAgYnVpbGRBbmltYXRpb25Bc3QodGhpcy5fZHJpdmVyLCBtZXRhZGF0YSBhcyBBbmltYXRpb25NZXRhZGF0YSwgZXJyb3JzKSBhcyBUcmlnZ2VyQXN0O1xuICAgICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYFRoZSBhbmltYXRpb24gdHJpZ2dlciBcIiR7bmFtZX1cIiBoYXMgZmFpbGVkIHRvIGJ1aWxkIGR1ZSB0byB0aGUgZm9sbG93aW5nIGVycm9yczpcXG4gLSAke2Vycm9ycy5qb2luKFwiXFxuIC0gXCIpfWApO1xuICAgICAgfVxuICAgICAgdHJpZ2dlciA9IGJ1aWxkVHJpZ2dlcihuYW1lLCBhc3QpO1xuICAgICAgdGhpcy5fdHJpZ2dlckNhY2hlW2NhY2hlS2V5XSA9IHRyaWdnZXI7XG4gICAgfVxuICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUucmVnaXN0ZXJUcmlnZ2VyKG5hbWVzcGFjZUlkLCBuYW1lLCB0cmlnZ2VyKTtcbiAgfVxuXG4gIHJlZ2lzdGVyKG5hbWVzcGFjZUlkOiBzdHJpbmcsIGhvc3RFbGVtZW50OiBhbnkpIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lLnJlZ2lzdGVyKG5hbWVzcGFjZUlkLCBob3N0RWxlbWVudCk7XG4gIH1cblxuICBkZXN0cm95KG5hbWVzcGFjZUlkOiBzdHJpbmcsIGNvbnRleHQ6IGFueSkge1xuICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUuZGVzdHJveShuYW1lc3BhY2VJZCwgY29udGV4dCk7XG4gIH1cblxuICBvbkluc2VydChuYW1lc3BhY2VJZDogc3RyaW5nLCBlbGVtZW50OiBhbnksIHBhcmVudDogYW55LCBpbnNlcnRCZWZvcmU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lLmluc2VydE5vZGUobmFtZXNwYWNlSWQsIGVsZW1lbnQsIHBhcmVudCwgaW5zZXJ0QmVmb3JlKTtcbiAgfVxuXG4gIG9uUmVtb3ZlKG5hbWVzcGFjZUlkOiBzdHJpbmcsIGVsZW1lbnQ6IGFueSwgY29udGV4dDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5yZW1vdmVOb2RlKG5hbWVzcGFjZUlkLCBlbGVtZW50LCBjb250ZXh0KTtcbiAgfVxuXG4gIGRpc2FibGVBbmltYXRpb25zKGVsZW1lbnQ6IGFueSwgZGlzYWJsZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUubWFya0VsZW1lbnRBc0Rpc2FibGVkKGVsZW1lbnQsIGRpc2FibGUpO1xuICB9XG5cbiAgcHJvY2VzcyhuYW1lc3BhY2VJZDogc3RyaW5nLCBlbGVtZW50OiBhbnksIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAocHJvcGVydHkuY2hhckF0KDApID09ICdAJykge1xuICAgICAgY29uc3QgW2lkLCBhY3Rpb25dID0gcGFyc2VUaW1lbGluZUNvbW1hbmQocHJvcGVydHkpO1xuICAgICAgY29uc3QgYXJncyA9IHZhbHVlIGFzIGFueVtdO1xuICAgICAgdGhpcy5fdGltZWxpbmVFbmdpbmUuY29tbWFuZChpZCwgZWxlbWVudCwgYWN0aW9uLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS50cmlnZ2VyKG5hbWVzcGFjZUlkLCBlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGxpc3RlbihcbiAgICAgIG5hbWVzcGFjZUlkOiBzdHJpbmcsIGVsZW1lbnQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50UGhhc2U6IHN0cmluZyxcbiAgICAgIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYW55KTogKCkgPT4gYW55IHtcbiAgICAvLyBAQGxpc3RlblxuICAgIGlmIChldmVudE5hbWUuY2hhckF0KDApID09ICdAJykge1xuICAgICAgY29uc3QgW2lkLCBhY3Rpb25dID0gcGFyc2VUaW1lbGluZUNvbW1hbmQoZXZlbnROYW1lKTtcbiAgICAgIHJldHVybiB0aGlzLl90aW1lbGluZUVuZ2luZS5saXN0ZW4oaWQsIGVsZW1lbnQsIGFjdGlvbiwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5saXN0ZW4obmFtZXNwYWNlSWQsIGVsZW1lbnQsIGV2ZW50TmFtZSwgZXZlbnRQaGFzZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgZmx1c2gobWljcm90YXNrSWQ6IG51bWJlciA9IC0xKTogdm9pZCB7IHRoaXMuX3RyYW5zaXRpb25FbmdpbmUuZmx1c2gobWljcm90YXNrSWQpOyB9XG5cbiAgZ2V0IHBsYXllcnMoKTogQW5pbWF0aW9uUGxheWVyW10ge1xuICAgIHJldHVybiAodGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5wbGF5ZXJzIGFzIEFuaW1hdGlvblBsYXllcltdKVxuICAgICAgICAuY29uY2F0KHRoaXMuX3RpbWVsaW5lRW5naW5lLnBsYXllcnMgYXMgQW5pbWF0aW9uUGxheWVyW10pO1xuICB9XG5cbiAgd2hlblJlbmRlcmluZ0RvbmUoKTogUHJvbWlzZTxhbnk+IHsgcmV0dXJuIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUud2hlblJlbmRlcmluZ0RvbmUoKTsgfVxufVxuIl19