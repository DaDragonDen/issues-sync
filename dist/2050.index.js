export const id = 2050;
export const ids = [2050];
export const modules = {

/***/ 1466:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
/** Represents a base entitlement. See {@link TestEntitlement | TestEntitlement} and {@link Entitlement | Entitlement}. */
class BaseEntitlement extends Base_1.default {
    applicationID;
    consumed;
    deleted;
    giftCodeFlags;
    guildID;
    promotionID;
    skuID;
    type;
    userID;
    constructor(data, client) {
        super(data.id, client);
        this.applicationID = data.application_id;
        this.consumed = data.consumed;
        this.deleted = data.deleted;
        this.giftCodeFlags = data.gift_code_flags;
        this.guildID = data.guild_id;
        this.promotionID = data.promotion_id;
        this.skuID = data.sku_id;
        this.type = data.type;
        this.userID = data.user_id;
    }
    /** Mark this entitlement as consumed. */
    async consume() {
        return this.client.rest.applications.consumeEntitlement(this.applicationID, this.id);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            consumed: this.consumed,
            deleted: this.deleted,
            giftCodeFlags: this.giftCodeFlags,
            guildID: this.guildID,
            promotionID: this.promotionID,
            skuID: this.skuID,
            type: this.type,
            userID: this.userID
        };
    }
}
exports["default"] = BaseEntitlement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUVudGl0bGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvQmFzZUVudGl0bGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUEwQjtBQU0xQiwwSEFBMEg7QUFDMUgsTUFBcUIsZUFBZ0IsU0FBUSxjQUFJO0lBQzdDLGFBQWEsQ0FBUztJQUN0QixRQUFRLENBQVU7SUFDbEIsT0FBTyxDQUFVO0lBQ2pCLGFBQWEsQ0FBUztJQUN0QixPQUFPLENBQWdCO0lBQ3ZCLFdBQVcsQ0FBZ0I7SUFDM0IsS0FBSyxDQUFTO0lBQ2QsSUFBSSxDQUFtQjtJQUN2QixNQUFNLENBQWdCO0lBQ3RCLFlBQVksSUFBd0IsRUFBRSxNQUFjO1FBQ2hELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRCx5Q0FBeUM7SUFDekMsS0FBSyxDQUFDLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2pDLFFBQVEsRUFBTyxJQUFJLENBQUMsUUFBUTtZQUM1QixPQUFPLEVBQVEsSUFBSSxDQUFDLE9BQU87WUFDM0IsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2pDLE9BQU8sRUFBUSxJQUFJLENBQUMsT0FBTztZQUMzQixXQUFXLEVBQUksSUFBSSxDQUFDLFdBQVc7WUFDL0IsS0FBSyxFQUFVLElBQUksQ0FBQyxLQUFLO1lBQ3pCLElBQUksRUFBVyxJQUFJLENBQUMsSUFBSTtZQUN4QixNQUFNLEVBQVMsSUFBSSxDQUFDLE1BQU07U0FDN0IsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTFDRCxrQ0EwQ0MifQ==

/***/ }),

/***/ 101:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
const BaseEntitlement_1 = tslib_1.__importDefault(__webpack_require__(1466));
/** Represents an entitlement. */
class Entitlement extends BaseEntitlement_1.default {
    endsAt;
    startsAt;
    subscriptionID;
    constructor(data, client) {
        super(data, client);
        this.endsAt = new Date(data.ends_at);
        this.startsAt = new Date(data.starts_at);
        this.subscriptionID = data.subscription_id;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            endsAt: this.endsAt.getTime(),
            startsAt: this.startsAt.getTime(),
            subscriptionID: this.subscriptionID
        };
    }
}
exports["default"] = Entitlement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXRsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9FbnRpdGxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnRkFBZ0Q7QUFLaEQsaUNBQWlDO0FBQ2pDLE1BQXFCLFdBQVksU0FBUSx5QkFBZTtJQUNwRCxNQUFNLENBQU87SUFDYixRQUFRLENBQU87SUFDZixjQUFjLENBQVM7SUFDdkIsWUFBWSxJQUFvQixFQUFFLE1BQWM7UUFDNUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDL0MsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE1BQU0sRUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNyQyxRQUFRLEVBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDdkMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ3RDLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFuQkQsOEJBbUJDIn0=

/***/ }),

/***/ 5137:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
const BaseEntitlement_1 = tslib_1.__importDefault(__webpack_require__(1466));
/** Represents a test entitlement. */
class TestEntitlement extends BaseEntitlement_1.default {
    constructor(data, client) {
        super(data, client);
    }
    /** Delete this entitlement. */
    async delete() {
        return this.client.rest.applications.deleteTestEntitlement(this.applicationID, this.id);
    }
    toJSON() {
        return {
            ...super.toJSON()
        };
    }
}
exports["default"] = TestEntitlement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdEVudGl0bGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvVGVzdEVudGl0bGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdGQUFnRDtBQUloRCxxQ0FBcUM7QUFDckMsTUFBcUIsZUFBZ0IsU0FBUSx5QkFBZTtJQUN4RCxZQUFZLElBQXdCLEVBQUUsTUFBYztRQUNoRCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCwrQkFBK0I7SUFDL0IsS0FBSyxDQUFDLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7U0FDcEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWZELGtDQWVDIn0=

/***/ }),

/***/ 8526:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 8526;
module.exports = webpackEmptyContext;

/***/ })

};
