export const id = 5492;
export const ids = [5492,954];
export const modules = {

/***/ 954:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/** @module Collection */
/** A {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map | Map} with some Array-like additions. */
class Collection extends Map {
    /** If this collection is empty. */
    get empty() {
        return this.size === 0;
    }
    every(predicate, thisArg) {
        return this.toArray().every(predicate, thisArg);
    }
    filter(predicate, thisArg) {
        return this.toArray().filter(predicate, thisArg);
    }
    find(predicate, thisArg) {
        return this.toArray().find(predicate, thisArg);
    }
    /** See: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex | Array#findIndex } */
    findIndex(predicate, thisArg) {
        return this.toArray().findIndex(predicate, thisArg);
    }
    first(amount) {
        if (amount === undefined) {
            const iterable = this.values();
            return iterable.next().value;
        }
        if (amount < 0) {
            return this.last(amount * -1);
        }
        amount = Math.min(amount, this.size);
        const iterable = this.values();
        return Array.from({ length: amount }, () => iterable.next().value);
    }
    last(amount) {
        const iterator = Array.from(this.values());
        if (amount === undefined) {
            return iterator.at(-1);
        }
        if (amount < 0) {
            return this.first(amount * -1);
        }
        if (!amount) {
            return [];
        }
        return iterator.slice(-amount);
    }
    /** See: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map | Array#map } */
    map(predicate, thisArg) {
        return this.toArray().map(predicate, thisArg);
    }
    /**
     * Pick a random element from the collection, or undefined if the collection is empty.
     */
    random() {
        if (this.empty) {
            return undefined;
        }
        const iterable = Array.from(this.values());
        return iterable[Math.floor(Math.random() * iterable.length)];
    }
    reduce(predicate, initialValue) {
        return this.toArray().reduce(predicate, initialValue);
    }
    reduceRight(predicate, initialValue) {
        return this.toArray().reduceRight(predicate, initialValue);
    }
    /** See: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some | Array#some } */
    some(predicate, thisArg) {
        return this.toArray().some(predicate, thisArg);
    }
    /** Get the values of this collection as an array. */
    toArray() {
        return Array.from(this.values());
    }
}
exports["default"] = Collection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL0NvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBeUI7QUFDekIsMklBQTJJO0FBQzNJLE1BQXFCLFVBQWlCLFNBQVEsR0FBUztJQUNuRCxtQ0FBbUM7SUFDbkMsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBS0QsS0FBSyxDQUFDLFNBQWdFLEVBQUUsT0FBaUI7UUFDckYsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBTUQsTUFBTSxDQUFDLFNBQWdFLEVBQUUsT0FBaUI7UUFDdEYsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBRTtJQUN0RCxDQUFDO0lBS0QsSUFBSSxDQUFDLFNBQThELEVBQUUsT0FBaUI7UUFDbEYsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsdUlBQXVJO0lBQ3ZJLFNBQVMsQ0FBQyxTQUE4RCxFQUFFLE9BQWlCO1FBQ3ZGLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQVFELEtBQUssQ0FBQyxNQUFlO1FBQ2pCLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvQixPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFVLENBQUM7UUFDdEMsQ0FBQztRQUVELElBQUksTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQVUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFRRCxJQUFJLENBQUMsTUFBZTtRQUNoQixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRCxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1YsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDJIQUEySDtJQUMzSCxHQUFHLENBQUksU0FBd0QsRUFBRSxPQUFpQjtRQUM5RSxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFNRCxNQUFNLENBQUksU0FBMEYsRUFBRSxZQUFnQjtRQUNsSCxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQWEsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFNRCxXQUFXLENBQUksU0FBMEYsRUFBRSxZQUFnQjtRQUN2SCxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFlBQWEsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCw2SEFBNkg7SUFDN0gsSUFBSSxDQUE2QixTQUFnRSxFQUFFLE9BQWlCO1FBQ2hILE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELHFEQUFxRDtJQUNyRCxPQUFPO1FBQ0gsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDSjtBQXJIRCw2QkFxSEMifQ==

/***/ }),

/***/ 5492:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module SimpleCollection */
const Collection_1 = tslib_1.__importDefault(__webpack_require__(954));
/** This is an internal class, you should not use it in your projects. If you want a collection type for your own projects, look at {@link Collection}. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class SimpleCollection extends Collection_1.default {
    conversionFunc;
    key;
    onDuplicate;
    limit;
    constructor(conversionFunc, limit = Infinity, onDuplicate = "throw", key) {
        super();
        this.limit = limit;
        Object.defineProperties(this, {
            conversionFunc: { value: conversionFunc, enumerable: false },
            key: { value: key ?? "id", enumerable: false },
            onDuplicate: { value: onDuplicate, enumerable: false }
        });
    }
    add(value) {
        if (this.key in value) {
            if (this.limit === 0) {
                return value;
            }
            if (this.has(value[this.key])) {
                switch (this.onDuplicate) {
                    case "merge": {
                        value = { ...this.get(value[this.key]), ...value };
                        break;
                    }
                    // we don't have the raw data, so we can't update
                    case "update":
                    case "throw": {
                        const err = new Error(`${this.constructor.name}#add: duplicate ${this.key} ${value[this.key]}`);
                        Object.defineProperty(err, "_object", { value });
                        throw err;
                    }
                }
            }
            this.set(value[this.key], value);
            if (this.limit && this.size > this.limit) {
                const iter = this.keys();
                while (this.size > this.limit) {
                    this.delete(iter.next().value);
                }
            }
            return value;
        }
        else {
            const err = new Error(`${this.constructor.name}#add: value must have a ${this.key} property`);
            Object.defineProperty(err, "_object", { value });
            throw err;
        }
    }
    update(value) {
        if (this.key in value) {
            if (this.has(value[this.key]) && this.onDuplicate === "update") {
                const obj = this.get(value[this.key]);
                if ("update" in obj && typeof obj.update === "function") {
                    obj.update(value);
                    return obj;
                }
                else {
                    const err = new Error(`${this.constructor.name}#update: existing object for ${value[this.key]} does not have an update method`);
                    Object.defineProperty(err, "_object", { value });
                    throw err;
                }
            }
            return this.add(this.conversionFunc(value));
        }
        else {
            const err = new Error(`${this.constructor.name}#update: value must have a ${this.key} property`);
            Object.defineProperty(err, "_object", { value });
            throw err;
        }
    }
}
exports["default"] = SimpleCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2ltcGxlQ29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL1NpbXBsZUNvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNFQUFzQztBQUV0QywwSkFBMEo7QUFDMUosOERBQThEO0FBQzlELE1BQXFCLGdCQUFzSixTQUFRLG9CQUFnQjtJQUN2TCxjQUFjLENBQWtCO0lBQzlCLEdBQUcsQ0FBTztJQUNWLFdBQVcsQ0FBNEM7SUFDakUsS0FBSyxDQUFTO0lBQ2QsWUFBWSxjQUE4QixFQUFFLEtBQUssR0FBRyxRQUFRLEVBQUUsY0FBd0QsT0FBTyxFQUFFLEdBQVM7UUFDcEksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO1lBQzFCLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRTtZQUM1RCxHQUFHLEVBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFO1lBQ3pELFdBQVcsRUFBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRTtTQUM1RCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsR0FBRyxDQUFjLEtBQVE7UUFDckIsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDbkIsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUNELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDNUIsUUFBUSxJQUFJLENBQUMs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

/***/ })

};
