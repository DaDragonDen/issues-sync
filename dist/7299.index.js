export const id = 7299;
export const ids = [7299,4873,7254,9635,2016];
export const modules = {

/***/ 7299:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module AuditLogEntry */
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
/** Represents a guild audit log entry. */
class AuditLogEntry extends Base_1.default {
    _cachedUser;
    /** The [type](https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events) of this action. */
    actionType;
    /** See the [audit log documentation](https://discord.com/developers/docs/resources/audit-log#audit-log-change-object) for more information. */
    changes;
    /** Additional info for specific event types */
    options;
    /** The reason for the change. */
    reason;
    /** The ID of what was targeted (webhook, user, role, etc). */
    targetID;
    /** The ID of the user or application that made the changes. */
    userID;
    constructor(data, client) {
        super(data.id, client);
        this.actionType = data.action_type;
        this.changes = data.changes;
        this.options = {
            applicationID: data.options?.application_id,
            autoModerationRuleName: data.options?.auto_moderation_rule_name,
            autoModerationRuleTriggerType: data.options?.auto_moderation_rule_trigger_type,
            channelID: data.options?.channel_id,
            count: data.options?.count,
            deleteMemberDays: data.options?.delete_member_days,
            id: data.options?.id,
            integrationType: data.options?.integration_type,
            membersRemoved: data.options?.members_removed,
            messageID: data.options?.message_id,
            roleName: data.options?.role_name,
            status: data.options?.status,
            type: data.options?.type
        };
        this.reason = data.reason;
        this.targetID = data.target_id;
        this.userID = data.user_id;
    }
    /** The user or application that made the changes. */
    get user() {
        if (this.userID !== null && this._cachedUser !== null) {
            return this._cachedUser ?? (this._cachedUser = this.client.users.get(this.userID));
        }
        return this._cachedUser === null ? this._cachedUser : (this._cachedUser = null);
    }
}
exports["default"] = AuditLogEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXVkaXRMb2dFbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0F1ZGl0TG9nRW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNEJBQTRCO0FBQzVCLDBEQUEwQjtBQU0xQiwwQ0FBMEM7QUFDMUMsTUFBcUIsYUFBYyxTQUFRLGNBQUk7SUFDbkMsV0FBVyxDQUFlO0lBQ2xDLGtJQUFrSTtJQUNsSSxVQUFVLENBQXNCO0lBQ2hDLCtJQUErSTtJQUMvSSxPQUFPLENBQXlCO0lBQ2hDLCtDQUErQztJQUMvQyxPQUFPLENBQXdCO0lBQy9CLGlDQUFpQztJQUNqQyxNQUFNLENBQVU7SUFDaEIsOERBQThEO0lBQzlELFFBQVEsQ0FBZ0I7SUFDeEIsK0RBQStEO0lBQy9ELE1BQU0sQ0FBZ0I7SUFDdEIsWUFBWSxJQUFzQixFQUFFLE1BQWM7UUFDOUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsYUFBYSxFQUFrQixJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWM7WUFDM0Qsc0JBQXNCLEVBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSx5QkFBeUI7WUFDdEUsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxpQ0FBaUM7WUFDOUUsU0FBUyxFQUFzQixJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVU7WUFDdkQsS0FBSyxFQUEwQixJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUs7WUFDbEQsZ0JBQWdCLEVBQWUsSUFBSSxDQUFDLE9BQU8sRUFBRSxrQkFBa0I7WUFDL0QsRUFBRSxFQUE2QixJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDL0MsZUFBZSxFQUFnQixJQUFJLENBQUMsT0FBTyxFQUFFLGdCQUFnQjtZQUM3RCxjQUFjLEVBQWlCLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZTtZQUM1RCxTQUFTLEVBQXNCLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVTtZQUN2RCxRQUFRLEVBQXVCLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUztZQUN0RCxNQUFNLEVBQXlCLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUNuRCxJQUFJLEVBQTJCLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSTtTQUNwRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVELHFEQUFxRDtJQUNyRCxJQUFJLElBQUk7UUFDSixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDcEQsT0FBTyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNwRixDQUFDO0NBQ0o7QUE5Q0QsZ0NBOENDIn0=

/***/ }),

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

/***/ })

};
