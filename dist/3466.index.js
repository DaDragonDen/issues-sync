export const id = 3466;
export const ids = [3466,4873,7254,9635,2739,2016];
export const modules = {

/***/ 4873:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const node_util_1 = __webpack_require__(7975);
const DISCORD_EPOCH = 1420070400000;
/** A base class which most other classes extend. */
class Base {
    client;
    id;
    constructor(id, client) {
        this.id = id;
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
            configurable: false
        });
    }
    static generateID(timestamp = Date.now()) {
        if (timestamp instanceof Date) {
            timestamp = timestamp.getTime();
        }
        return ((timestamp - DISCORD_EPOCH) << 22).toString();
    }
    static getCreatedAt(id) {
        return new Date(Base.getDiscordEpoch(id) + DISCORD_EPOCH);
    }
    static getDiscordEpoch(id) {
        return Number(BigInt(id) / 4194304n);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    update(data) { }
    get createdAt() {
        return Base.getCreatedAt(this.id);
    }
    /** @hidden */
    [node_util_1.inspect.custom]() {
        // https://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
        const copy = new { [this.constructor.name]: class {
            } }[this.constructor.name]();
        for (const key in this) {
            if (Object.hasOwn(this, key) && !key.startsWith("_") && this[key] !== undefined) {
                copy[key] = this[key];
            }
        }
        return copy;
    }
    toJSON() {
        return {
            createdAt: this.createdAt.getTime(),
            id: this.id
        };
    }
    toString() {
        return `[${this.constructor.name} ${this.id}]`;
    }
}
exports["default"] = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSx5Q0FBb0M7QUFFcEMsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ3BDLG9EQUFvRDtBQUNwRCxNQUE4QixJQUFJO0lBQzlCLE1BQU0sQ0FBVTtJQUNoQixFQUFFLENBQVM7SUFDWCxZQUFZLEVBQVUsRUFBRSxNQUFjO1FBQ2xDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ2xDLEtBQUssRUFBUyxNQUFNO1lBQ3BCLFVBQVUsRUFBSSxLQUFLO1lBQ25CLFFBQVEsRUFBTSxLQUFLO1lBQ25CLFlBQVksRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQTJCLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDbkQsSUFBSSxTQUFTLFlBQVksSUFBSSxFQUFFLENBQUM7WUFDNUIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsT0FBTyxDQUFDLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFELENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQVU7UUFDMUIsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQVU7UUFDN0IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxtR0FBbUc7SUFDekYsTUFBTSxDQUFDLElBQWEsSUFBUyxDQUFDO0lBRXhDLElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELGNBQWM7SUFDZCxDQUFDLG1CQUFPLENBQUMsTUFBTSxDQUFDO1FBQ1osa0ZBQWtGO1FBQ2xGLE1BQU0sSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7YUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBVSxDQUFDO1FBQ3hGLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDckIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDO2dCQUM5RSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDO1FBR0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPO1lBQ0gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ25DLEVBQUUsRUFBUyxJQUFJLENBQUMsRUFBRTtTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ25ELENBQUM7Q0FDSjtBQTNERCx1QkEyREMifQ==

/***/ }),

/***/ 2739:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/** @module Permission */
const Constants_1 = __webpack_require__(146);
/** Represents a permission. */
class Permission {
    _json;
    /** The allowed permissions for this permission instance. */
    allow;
    /** The denied permissions for this permission instance. */
    deny;
    constructor(allow, deny = 0n) {
        this.allow = BigInt(allow);
        this.deny = BigInt(deny);
        Object.defineProperty(this, "#json", {
            value: undefined,
            enumerable: false,
            writable: true,
            configurable: false
        });
    }
    /** A key-value map of permission to if it's been allowed or denied (not present if neither) */
    get json() {
        if (this._json) {
            return this._json;
        }
        else {
            const json = {};
            for (const perm of Object.keys(Constants_1.Permissions)) {
                if (this.allow & Constants_1.Permissions[perm]) {
                    json[perm] = true;
                }
                else if (this.deny & Constants_1.Permissions[perm]) {
                    json[perm] = false;
                }
            }
            return (this._json = json);
        }
    }
    /**
     * Check if this permissions instance has the given permissions allowed
     * @param permissions The permissions to check for.
     */
    has(...permissions) {
        for (const perm of permissions) {
            if (typeof perm === "bigint") {
                if ((this.allow & perm) !== perm) {
                    return false;
                }
            }
            else if (!(this.allow & Constants_1.Permissions[perm])) {
                return false;
            }
        }
        return true;
    }
    toJSON() {
        return {
            allow: this.allow.toString(),
            deny: this.deny.toString()
        };
    }
    toString() {
        return `[${this.constructor.name} +${this.allow} -${this.deny}]`;
    }
}
exports["default"] = Permission;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1Blcm1pc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBeUI7QUFDekIsNENBQW1GO0FBR25GLCtCQUErQjtBQUMvQixNQUFxQixVQUFVO0lBQ25CLEtBQUssQ0FBaUU7SUFDOUUsNERBQTREO0lBQzVELEtBQUssQ0FBUztJQUNkLDJEQUEyRDtJQUMzRCxJQUFJLENBQVM7SUFDYixZQUFZLEtBQXNCLEVBQUUsT0FBd0IsRUFBRTtRQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDakMsS0FBSyxFQUFTLFNBQVM7WUFDdkIsVUFBVSxFQUFJLEtBQUs7WUFDbkIsUUFBUSxFQUFNLElBQUk7WUFDbEIsWUFBWSxFQUFFLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELCtGQUErRjtJQUMvRixJQUFJLElBQUk7UUFDSixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBQU0sQ0FBQztZQUNKLE1BQU0sSUFBSSxHQUF1RCxFQUFFLENBQUM7WUFDcEUsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUFXLENBQW9DLEVBQUUsQ0FBQztnQkFDN0UsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLHVCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDdEIsQ0FBQztxQkFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsdUJBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixDQUFDO1lBQ0wsQ0FBQztZQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsR0FBRyxDQUFDLEdBQUcsV0FBNEM7UUFDL0MsS0FBSyxNQUFNLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUM3QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDL0IsT0FBTyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7WUFDTCxDQUFDO2lCQUFNLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsdUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQzNDLE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUM7UUFDTCxDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUksRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtTQUM5QixDQUFDO0lBQ04sQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7SUFDckUsQ0FBQztDQUNKO0FBL0RELDZCQStEQyJ9

/***/ }),

/***/ 3466:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module PermissionOverwrite */
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
const Permission_1 = tslib_1.__importDefault(__webpack_require__(2739));
/** Represents a permission overwrite. */
class PermissionOverwrite extends Base_1.default {
    /** The permissions of this overwrite. */
    permission;
    /** The type of this overwrite. `0` for role, `1` for user. */
    type;
    constructor(data, client) {
        super(data.id, client);
        this.permission = new Permission_1.default(data.allow, data.deny);
        this.type = data.type;
    }
    update(data) {
        if (data.allow !== undefined || data.deny !== undefined) {
            this.permission = new Permission_1.default(data.allow ?? 0n, data.deny ?? 0n);
        }
    }
    get allow() {
        return this.permission.allow;
    }
    get deny() {
        return this.permission.deny;
    }
    /** A key-value map of permission to if it's been allowed or denied (not present if neither) */
    get json() {
        return this.permission.json;
    }
    /**
     *Check if this permissions instance has the given permissions allowed
     * @param permissions The permissions to check for.
     */
    has(...permissions) {
        return this.permission.has(...permissions);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            permission: this.permission.toJSON(),
            type: this.type
        };
    }
}
exports["default"] = PermissionOverwrite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbk92ZXJ3cml0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1Blcm1pc3Npb25PdmVyd3JpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBQWtDO0FBQ2xDLDBEQUEwQjtBQUMxQixzRUFBc0M7QUFNdEMseUNBQXlDO0FBQ3pDLE1BQXFCLG1CQUFvQixTQUFRLGNBQUk7SUFDakQseUNBQXlDO0lBQ3pDLFVBQVUsQ0FBYTtJQUN2Qiw4REFBOEQ7SUFDOUQsSUFBSSxDQUFpQjtJQUNyQixZQUFZLElBQWtCLEVBQUUsTUFBYztRQUMxQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBMkI7UUFDakQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxvQkFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRCwrRkFBK0Y7SUFDL0YsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsR0FBRyxDQUFDLEdBQUcsV0FBNEM7UUFDL0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDcEMsSUFBSSxFQUFRLElBQUksQ0FBQyxJQUFJO1NBQ3hCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE1Q0Qsc0NBNENDIn0=

/***/ })

};
