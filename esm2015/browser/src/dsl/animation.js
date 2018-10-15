import { ENTER_CLASSNAME, LEAVE_CLASSNAME, normalizeStyles } from '../util';
import { buildAnimationAst } from './animation_ast_builder';
import { buildAnimationTimelines } from './animation_timeline_builder';
import { ElementInstructionMap } from './element_instruction_map';
export class Animation {
    constructor(_driver, input) {
        this._driver = _driver;
        const errors = [];
        const ast = buildAnimationAst(_driver, input, errors);
        if (errors.length) {
            const errorMessage = `animation validation failed:\n${errors.join("\n")}`;
            throw new Error(errorMessage);
        }
        this._animationAst = ast;
    }
    buildTimelines(element, startingStyles, destinationStyles, options, subInstructions) {
        const start = Array.isArray(startingStyles) ? normalizeStyles(startingStyles) :
            startingStyles;
        const dest = Array.isArray(destinationStyles) ? normalizeStyles(destinationStyles) :
            destinationStyles;
        const errors = [];
        subInstructions = subInstructions || new ElementInstructionMap();
        const result = buildAnimationTimelines(this._driver, element, this._animationAst, ENTER_CLASSNAME, LEAVE_CLASSNAME, start, dest, options, subInstructions, errors);
        if (errors.length) {
            const errorMessage = `animation building failed:\n${errors.join("\n")}`;
            throw new Error(errorMessage);
        }
        return result;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5pbWF0aW9ucy9icm93c2VyL3NyYy9kc2wvYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUcxRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVoRSxNQUFNLE9BQU8sU0FBUztJQUVwQixZQUFvQixPQUF3QixFQUFFLEtBQTRDO1FBQXRFLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQzFDLE1BQU0sTUFBTSxHQUFVLEVBQUUsQ0FBQztRQUN6QixNQUFNLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqQixNQUFNLFlBQVksR0FBRyxpQ0FBaUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzFFLE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztJQUMzQixDQUFDO0lBRUQsY0FBYyxDQUNWLE9BQVksRUFBRSxjQUF1QyxFQUNyRCxpQkFBMEMsRUFBRSxPQUF5QixFQUNyRSxlQUF1QztRQUN6QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNyQixjQUFjLENBQUM7UUFDekUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLGlCQUFpQixDQUFDO1FBQzlFLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUN2QixlQUFlLEdBQUcsZUFBZSxJQUFJLElBQUkscUJBQXFCLEVBQUUsQ0FBQztRQUNqRSxNQUFNLE1BQU0sR0FBRyx1QkFBdUIsQ0FDbEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQ3hGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE1BQU0sWUFBWSxHQUFHLCtCQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDeEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMvQjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uTWV0YWRhdGEsIEFuaW1hdGlvbk1ldGFkYXRhVHlwZSwgQW5pbWF0aW9uT3B0aW9ucywgybVTdHlsZURhdGF9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge0FuaW1hdGlvbkRyaXZlcn0gZnJvbSAnLi4vcmVuZGVyL2FuaW1hdGlvbl9kcml2ZXInO1xuaW1wb3J0IHtFTlRFUl9DTEFTU05BTUUsIExFQVZFX0NMQVNTTkFNRSwgbm9ybWFsaXplU3R5bGVzfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtBc3R9IGZyb20gJy4vYW5pbWF0aW9uX2FzdCc7XG5pbXBvcnQge2J1aWxkQW5pbWF0aW9uQXN0fSBmcm9tICcuL2FuaW1hdGlvbl9hc3RfYnVpbGRlcic7XG5pbXBvcnQge2J1aWxkQW5pbWF0aW9uVGltZWxpbmVzfSBmcm9tICcuL2FuaW1hdGlvbl90aW1lbGluZV9idWlsZGVyJztcbmltcG9ydCB7QW5pbWF0aW9uVGltZWxpbmVJbnN0cnVjdGlvbn0gZnJvbSAnLi9hbmltYXRpb25fdGltZWxpbmVfaW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHtFbGVtZW50SW5zdHJ1Y3Rpb25NYXB9IGZyb20gJy4vZWxlbWVudF9pbnN0cnVjdGlvbl9tYXAnO1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uIHtcbiAgcHJpdmF0ZSBfYW5pbWF0aW9uQXN0OiBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlPjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZHJpdmVyOiBBbmltYXRpb25Ecml2ZXIsIGlucHV0OiBBbmltYXRpb25NZXRhZGF0YXxBbmltYXRpb25NZXRhZGF0YVtdKSB7XG4gICAgY29uc3QgZXJyb3JzOiBhbnlbXSA9IFtdO1xuICAgIGNvbnN0IGFzdCA9IGJ1aWxkQW5pbWF0aW9uQXN0KF9kcml2ZXIsIGlucHV0LCBlcnJvcnMpO1xuICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgYW5pbWF0aW9uIHZhbGlkYXRpb24gZmFpbGVkOlxcbiR7ZXJyb3JzLmpvaW4oXCJcXG5cIil9YDtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cbiAgICB0aGlzLl9hbmltYXRpb25Bc3QgPSBhc3Q7XG4gIH1cblxuICBidWlsZFRpbWVsaW5lcyhcbiAgICAgIGVsZW1lbnQ6IGFueSwgc3RhcnRpbmdTdHlsZXM6IMm1U3R5bGVEYXRhfMm1U3R5bGVEYXRhW10sXG4gICAgICBkZXN0aW5hdGlvblN0eWxlczogybVTdHlsZURhdGF8ybVTdHlsZURhdGFbXSwgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyxcbiAgICAgIHN1Ykluc3RydWN0aW9ucz86IEVsZW1lbnRJbnN0cnVjdGlvbk1hcCk6IEFuaW1hdGlvblRpbWVsaW5lSW5zdHJ1Y3Rpb25bXSB7XG4gICAgY29uc3Qgc3RhcnQgPSBBcnJheS5pc0FycmF5KHN0YXJ0aW5nU3R5bGVzKSA/IG5vcm1hbGl6ZVN0eWxlcyhzdGFydGluZ1N0eWxlcykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ybVTdHlsZURhdGE+c3RhcnRpbmdTdHlsZXM7XG4gICAgY29uc3QgZGVzdCA9IEFycmF5LmlzQXJyYXkoZGVzdGluYXRpb25TdHlsZXMpID8gbm9ybWFsaXplU3R5bGVzKGRlc3RpbmF0aW9uU3R5bGVzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPMm1U3R5bGVEYXRhPmRlc3RpbmF0aW9uU3R5bGVzO1xuICAgIGNvbnN0IGVycm9yczogYW55ID0gW107XG4gICAgc3ViSW5zdHJ1Y3Rpb25zID0gc3ViSW5zdHJ1Y3Rpb25zIHx8IG5ldyBFbGVtZW50SW5zdHJ1Y3Rpb25NYXAoKTtcbiAgICBjb25zdCByZXN1bHQgPSBidWlsZEFuaW1hdGlvblRpbWVsaW5lcyhcbiAgICAgICAgdGhpcy5fZHJpdmVyLCBlbGVtZW50LCB0aGlzLl9hbmltYXRpb25Bc3QsIEVOVEVSX0NMQVNTTkFNRSwgTEVBVkVfQ0xBU1NOQU1FLCBzdGFydCwgZGVzdCxcbiAgICAgICAgb3B0aW9ucywgc3ViSW5zdHJ1Y3Rpb25zLCBlcnJvcnMpO1xuICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgYW5pbWF0aW9uIGJ1aWxkaW5nIGZhaWxlZDpcXG4ke2Vycm9ycy5qb2luKFwiXFxuXCIpfWA7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19