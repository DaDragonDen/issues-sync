export const id = 4834;
export const ids = [4834];
export const modules = {

/***/ 4834:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4285);
/** @module TypedEmitter */
const Errors_1 = __webpack_require__(9811);
const node_events_1 = tslib_1.__importDefault(__webpack_require__(8474));
class TypedEmitter extends node_events_1.default {
    emit(eventName, ...args) {
        if (this.listenerCount(eventName) === 0) {
            if (eventName === "error") {
                throw new Errors_1.UncaughtError(args[0]);
            }
            return false;
        }
        return super.emit(eventName, ...args);
    }
}
exports["default"] = TypedEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZWRFbWl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3V0aWwvVHlwZWRFbWl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQixxQ0FBeUM7QUFDekMsc0VBQXVDO0FBbUJ2QyxNQUFNLFlBQTBELFNBQVEscUJBQVk7SUFDdkUsSUFBSSxDQUF5QixTQUFZLEVBQUUsR0FBRyxJQUFlO1FBQ2xFLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN0QyxJQUFJLFNBQVMsS0FBSyxPQUFPLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSxJQUFJLHNCQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBbUIsRUFBRSxHQUFHLElBQWtCLENBQUMsQ0FBQztJQUNsRSxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxZQUFZLENBQUMifQ==

/***/ })

};
