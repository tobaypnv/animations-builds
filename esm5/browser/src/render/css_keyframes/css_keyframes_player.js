import { computeStyle } from '../../util';
import { ElementAnimationStyleHandler } from './element_animation_style_handler';
var DEFAULT_FILL_MODE = 'forwards';
var DEFAULT_EASING = 'linear';
var ANIMATION_END_EVENT = 'animationend';
var CssKeyframesPlayer = /** @class */ (function () {
    function CssKeyframesPlayer(element, keyframes, animationName, _duration, _delay, easing, _finalStyles) {
        this.element = element;
        this.keyframes = keyframes;
        this.animationName = animationName;
        this._duration = _duration;
        this._delay = _delay;
        this._finalStyles = _finalStyles;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._started = false;
        this.currentSnapshot = {};
        this._state = 0;
        this.easing = easing || DEFAULT_EASING;
        this.totalTime = _duration + _delay;
        this._buildStyler();
    }
    CssKeyframesPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    CssKeyframesPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    CssKeyframesPlayer.prototype.onDestroy = function (fn) { this._onDestroyFns.push(fn); };
    CssKeyframesPlayer.prototype.destroy = function () {
        this.init();
        if (this._state >= 4 /* DESTROYED */)
            return;
        this._state = 4 /* DESTROYED */;
        this._styler.destroy();
        this._flushStartFns();
        this._flushDoneFns();
        this._onDestroyFns.forEach(function (fn) { return fn(); });
        this._onDestroyFns = [];
    };
    CssKeyframesPlayer.prototype._flushDoneFns = function () {
        this._onDoneFns.forEach(function (fn) { return fn(); });
        this._onDoneFns = [];
    };
    CssKeyframesPlayer.prototype._flushStartFns = function () {
        this._onStartFns.forEach(function (fn) { return fn(); });
        this._onStartFns = [];
    };
    CssKeyframesPlayer.prototype.finish = function () {
        this.init();
        if (this._state >= 3 /* FINISHED */)
            return;
        this._state = 3 /* FINISHED */;
        this._styler.finish();
        this._flushStartFns();
        this._flushDoneFns();
    };
    CssKeyframesPlayer.prototype.setPosition = function (value) { this._styler.setPosition(value); };
    CssKeyframesPlayer.prototype.getPosition = function () { return this._styler.getPosition(); };
    CssKeyframesPlayer.prototype.hasStarted = function () { return this._state >= 2 /* STARTED */; };
    CssKeyframesPlayer.prototype.init = function () {
        if (this._state >= 1 /* INITIALIZED */)
            return;
        this._state = 1 /* INITIALIZED */;
        var elm = this.element;
        this._styler.apply();
        if (this._delay) {
            this._styler.pause();
        }
    };
    CssKeyframesPlayer.prototype.play = function () {
        this.init();
        if (!this.hasStarted()) {
            this._flushStartFns();
            this._state = 2 /* STARTED */;
        }
        this._styler.resume();
    };
    CssKeyframesPlayer.prototype.pause = function () {
        this.init();
        this._styler.pause();
    };
    CssKeyframesPlayer.prototype.restart = function () {
        this.reset();
        this.play();
    };
    CssKeyframesPlayer.prototype.reset = function () {
        this._styler.destroy();
        this._buildStyler();
        this._styler.apply();
    };
    CssKeyframesPlayer.prototype._buildStyler = function () {
        var _this = this;
        this._styler = new ElementAnimationStyleHandler(this.element, this.animationName, this._duration, this._delay, this.easing, DEFAULT_FILL_MODE, function () { return _this.finish(); });
    };
    /* @internal */
    /* @internal */
    CssKeyframesPlayer.prototype.triggerCallback = /* @internal */
    function (phaseName) {
        var methods = phaseName == 'start' ? this._onStartFns : this._onDoneFns;
        methods.forEach(function (fn) { return fn(); });
        methods.length = 0;
    };
    CssKeyframesPlayer.prototype.beforeDestroy = function () {
        var _this = this;
        this.init();
        var styles = {};
        if (this.hasStarted()) {
            var finished_1 = this._state >= 3 /* FINISHED */;
            Object.keys(this._finalStyles).forEach(function (prop) {
                if (prop != 'offset') {
                    styles[prop] = finished_1 ? _this._finalStyles[prop] : computeStyle(_this.element, prop);
                }
            });
        }
        this.currentSnapshot = styles;
    };
    return CssKeyframesPlayer;
}());
export { CssKeyframesPlayer };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX2tleWZyYW1lc19wbGF5ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL3JlbmRlci9jc3Nfa2V5ZnJhbWVzL2Nzc19rZXlmcmFtZXNfcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFFeEMsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFL0UsSUFBTSxpQkFBaUIsR0FBRyxVQUFVLENBQUM7QUFDckMsSUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDO0FBQ2hDLElBQU0sbUJBQW1CLEdBQUcsY0FBYyxDQUFDO0FBSTNDLElBQUE7SUFlRSw0QkFDb0IsT0FBWSxFQUFrQixTQUE2QyxFQUMzRSxhQUFxQixFQUFtQixTQUFpQixFQUN4RCxNQUFjLEVBQUUsTUFBYyxFQUM5QixZQUFrQztRQUhuQyxZQUFPLEdBQVAsT0FBTyxDQUFLO1FBQWtCLGNBQVMsR0FBVCxTQUFTLENBQW9DO1FBQzNFLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQW1CLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDeEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGlCQUFZLEdBQVosWUFBWSxDQUFzQjswQkFsQnRCLEVBQUU7MkJBQ0QsRUFBRTs2QkFDQSxFQUFFO3dCQUVuQixLQUFLOytCQU0wQixFQUFFO3NCQUViLENBQUM7UUFPdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksY0FBYyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7SUFFRCxvQ0FBTyxHQUFQLFVBQVEsRUFBYyxJQUFVLElBQUksQ0FBQyxXQUFXLENB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b0JBQWlDLENBQUM7WUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDekMsSUFBSSxJQUFJLElBQUksUUFBUSxFQUFFO29CQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDdEY7YUFDRixDQUFDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO0tBQy9COzZCQS9JSDtJQWdKQyxDQUFBO0FBN0hELDhCQTZIQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uUGxheWVyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuaW1wb3J0IHtjb21wdXRlU3R5bGV9IGZyb20gJy4uLy4uL3V0aWwnO1xuXG5pbXBvcnQge0VsZW1lbnRBbmltYXRpb25TdHlsZUhhbmRsZXJ9IGZyb20gJy4vZWxlbWVudF9hbmltYXRpb25fc3R5bGVfaGFuZGxlcic7XG5cbmNvbnN0IERFRkFVTFRfRklMTF9NT0RFID0gJ2ZvcndhcmRzJztcbmNvbnN0IERFRkFVTFRfRUFTSU5HID0gJ2xpbmVhcic7XG5jb25zdCBBTklNQVRJT05fRU5EX0VWRU5UID0gJ2FuaW1hdGlvbmVuZCc7XG5cbmV4cG9ydCBjb25zdCBlbnVtIEFuaW1hdG9yQ29udHJvbFN0YXRlIHtJTklUSUFMSVpFRCA9IDEsIFNUQVJURUQgPSAyLCBGSU5JU0hFRCA9IDMsIERFU1RST1lFRCA9IDR9XG5cbmV4cG9ydCBjbGFzcyBDc3NLZXlmcmFtZXNQbGF5ZXIgaW1wbGVtZW50cyBBbmltYXRpb25QbGF5ZXIge1xuICBwcml2YXRlIF9vbkRvbmVGbnM6IEZ1bmN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfb25TdGFydEZuczogRnVuY3Rpb25bXSA9IFtdO1xuICBwcml2YXRlIF9vbkRlc3Ryb3lGbnM6IEZ1bmN0aW9uW10gPSBbXTtcblxuICBwcml2YXRlIF9zdGFydGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX3N0eWxlcjogRWxlbWVudEFuaW1hdGlvblN0eWxlSGFuZGxlcjtcblxuICBwdWJsaWMgcGFyZW50UGxheWVyOiBBbmltYXRpb25QbGF5ZXI7XG4gIHB1YmxpYyByZWFkb25seSB0b3RhbFRpbWU6IG51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IGVhc2luZzogc3RyaW5nO1xuICBwdWJsaWMgY3VycmVudFNuYXBzaG90OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG4gIHByaXZhdGUgX3N0YXRlOiBBbmltYXRvckNvbnRyb2xTdGF0ZSA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZWxlbWVudDogYW55LCBwdWJsaWMgcmVhZG9ubHkga2V5ZnJhbWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyfVtdLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGFuaW1hdGlvbk5hbWU6IHN0cmluZywgcHJpdmF0ZSByZWFkb25seSBfZHVyYXRpb246IG51bWJlcixcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2RlbGF5OiBudW1iZXIsIGVhc2luZzogc3RyaW5nLFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBfZmluYWxTdHlsZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNpbmcgfHwgREVGQVVMVF9FQVNJTkc7XG4gICAgdGhpcy50b3RhbFRpbWUgPSBfZHVyYXRpb24gKyBfZGVsYXk7XG4gICAgdGhpcy5fYnVpbGRTdHlsZXIoKTtcbiAgfVxuXG4gIG9uU3RhcnQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fb25TdGFydEZucy5wdXNoKGZuKTsgfVxuXG4gIG9uRG9uZShmbjogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl9vbkRvbmVGbnMucHVzaChmbik7IH1cblxuICBvbkRlc3Ryb3koZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fb25EZXN0cm95Rm5zLnB1c2goZm4pOyB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICBpZiAodGhpcy5fc3RhdGUgPj0gQW5pbWF0b3JDb250cm9sU3RhdGUuREVTVFJPWUVEKSByZXR1cm47XG4gICAgdGhpcy5fc3RhdGUgPSBBbmltYXRvckNvbnRyb2xTdGF0ZS5ERVNUUk9ZRUQ7XG4gICAgdGhpcy5fc3R5bGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLl9mbHVzaFN0YXJ0Rm5zKCk7XG4gICAgdGhpcy5fZmx1c2hEb25lRm5zKCk7XG4gICAgdGhpcy5fb25EZXN0cm95Rm5zLmZvckVhY2goZm4gPT4gZm4oKSk7XG4gICAgdGhpcy5fb25EZXN0cm95Rm5zID0gW107XG4gIH1cblxuICBwcml2YXRlIF9mbHVzaERvbmVGbnMoKSB7XG4gICAgdGhpcy5fb25Eb25lRm5zLmZvckVhY2goZm4gPT4gZm4oKSk7XG4gICAgdGhpcy5fb25Eb25lRm5zID0gW107XG4gIH1cblxuICBwcml2YXRlIF9mbHVzaFN0YXJ0Rm5zKCkge1xuICAgIHRoaXMuX29uU3RhcnRGbnMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICB0aGlzLl9vblN0YXJ0Rm5zID0gW107XG4gIH1cblxuICBmaW5pc2goKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgaWYgKHRoaXMuX3N0YXRlID49IEFuaW1hdG9yQ29udHJvbFN0YXRlLkZJTklTSEVEKSByZXR1cm47XG4gICAgdGhpcy5fc3RhdGUgPSBBbmltYXRvckNvbnRyb2xTdGF0ZS5GSU5JU0hFRDtcbiAgICB0aGlzLl9zdHlsZXIuZmluaXNoKCk7XG4gICAgdGhpcy5fZmx1c2hTdGFydEZucygpO1xuICAgIHRoaXMuX2ZsdXNoRG9uZUZucygpO1xuICB9XG5cbiAgc2V0UG9zaXRpb24odmFsdWU6IG51bWJlcikgeyB0aGlzLl9zdHlsZXIuc2V0UG9zaXRpb24odmFsdWUpOyB9XG5cbiAgZ2V0UG9zaXRpb24oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3N0eWxlci5nZXRQb3NpdGlvbigpOyB9XG5cbiAgaGFzU3RhcnRlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3N0YXRlID49IEFuaW1hdG9yQ29udHJvbFN0YXRlLlNUQVJURUQ7IH1cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RhdGUgPj0gQW5pbWF0b3JDb250cm9sU3RhdGUuSU5JVElBTElaRUQpIHJldHVybjtcbiAgICB0aGlzLl9zdGF0ZSA9IEFuaW1hdG9yQ29udHJvbFN0YXRlLklOSVRJQUxJWkVEO1xuICAgIGNvbnN0IGVsbSA9IHRoaXMuZWxlbWVudDtcbiAgICB0aGlzLl9zdHlsZXIuYXBwbHkoKTtcbiAgICBpZiAodGhpcy5fZGVsYXkpIHtcbiAgICAgIHRoaXMuX3N0eWxlci5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG4gIHBsYXkoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgaWYgKCF0aGlzLmhhc1N0YXJ0ZWQoKSkge1xuICAgICAgdGhpcy5fZmx1c2hTdGFydEZucygpO1xuICAgICAgdGhpcy5fc3RhdGUgPSBBbmltYXRvckNvbnRyb2xTdGF0ZS5TVEFSVEVEO1xuICAgIH1cbiAgICB0aGlzLl9zdHlsZXIucmVzdW1lKCk7XG4gIH1cblxuICBwYXVzZSgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLl9zdHlsZXIucGF1c2UoKTtcbiAgfVxuICByZXN0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdHlsZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuX2J1aWxkU3R5bGVyKCk7XG4gICAgdGhpcy5fc3R5bGVyLmFwcGx5KCk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFN0eWxlcigpIHtcbiAgICB0aGlzLl9zdHlsZXIgPSBuZXcgRWxlbWVudEFuaW1hdGlvblN0eWxlSGFuZGxlcihcbiAgICAgICAgdGhpcy5lbGVtZW50LCB0aGlzLmFuaW1hdGlvbk5hbWUsIHRoaXMuX2R1cmF0aW9uLCB0aGlzLl9kZWxheSwgdGhpcy5lYXNpbmcsXG4gICAgICAgIERFRkFVTFRfRklMTF9NT0RFLCAoKSA9PiB0aGlzLmZpbmlzaCgpKTtcbiAgfVxuXG4gIC8qIEBpbnRlcm5hbCAqL1xuICB0cmlnZ2VyQ2FsbGJhY2socGhhc2VOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBtZXRob2RzID0gcGhhc2VOYW1lID09ICdzdGFydCcgPyB0aGlzLl9vblN0YXJ0Rm5zIDogdGhpcy5fb25Eb25lRm5zO1xuICAgIG1ldGhvZHMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICBtZXRob2RzLmxlbmd0aCA9IDA7XG4gIH1cblxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIGNvbnN0IHN0eWxlczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBpZiAodGhpcy5oYXNTdGFydGVkKCkpIHtcbiAgICAgIGNvbnN0IGZpbmlzaGVkID0gdGhpcy5fc3RhdGUgPj0gQW5pbWF0b3JDb250cm9sU3RhdGUuRklOSVNIRUQ7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLl9maW5hbFN0eWxlcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgaWYgKHByb3AgIT0gJ29mZnNldCcpIHtcbiAgICAgICAgICBzdHlsZXNbcHJvcF0gPSBmaW5pc2hlZCA/IHRoaXMuX2ZpbmFsU3R5bGVzW3Byb3BdIDogY29tcHV0ZVN0eWxlKHRoaXMuZWxlbWVudCwgcHJvcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRTbmFwc2hvdCA9IHN0eWxlcztcbiAgfVxufVxuIl19