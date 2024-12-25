export const id = 8317;
export const ids = [8317];
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

/***/ 8317:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module ClientApplication */
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
const TestEntitlement_1 = tslib_1.__importDefault(__webpack_require__(5137));
const Entitlement_1 = tslib_1.__importDefault(__webpack_require__(101));
const BaseEntitlement_1 = tslib_1.__importDefault(__webpack_require__(1466));
const TypedCollection_1 = tslib_1.__importDefault(__webpack_require__(5288));
/** A representation of the authorized client's application (typically received via gateway). */
class ClientApplication extends Base_1.default {
    /** The entitlements for this application. This will almost certainly be empty unless you fetch entitlements, or recieve new/updated entitlements. */
    entitlements;
    /** This application's [flags](https://discord.com/developers/docs/resources/application#application-object-application-flags). */
    flags;
    constructor(data, client) {
        super(data.id, client);
        this.entitlements = new TypedCollection_1.default(BaseEntitlement_1.default, client, Infinity, {
            construct: (entitlement) => {
                if ("subscription_id" in entitlement && entitlement.subscription_id) {
                    return new Entitlement_1.default(entitlement, client);
                }
                return new TestEntitlement_1.default(entitlement, client);
            }
        });
        this.flags = data.flags;
        this.update(data);
    }
    update(data) {
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
    }
    /**
     * Overwrite all existing global application commands.
     * @param options The commands.
     */
    async bulkEditGlobalCommands(options) {
        return this.client.rest.applications.bulkEditGlobalCommands(this.id, options);
    }
    /**
     * Overwrite all existing application commands in a guild.
     * @param guildID The ID of the guild.
     * @param options The commands.
     */
    async bulkEditGuildCommands(guildID, options) {
        return this.client.rest.applications.bulkEditGuildCommands(this.id, guildID, options);
    }
    /**
     * Mark an entitlement as consumed.
     * @param entitlementID The ID of the entitlement to consume.
     */
    async consumeEntitlement(entitlementID) {
        return this.client.rest.applications.consumeEntitlement(this.id, entitlementID);
    }
    /**
     * Create an emoji for this application.
     * @param options The options for creating the emoji.
     * @caching This method **does not** cache its result.
     */
    async createEmoji(options) {
        return this.client.rest.applications.createEmoji(this.id, options);
    }
    /**
     * Create a global application command.
     * @param options The options for creating the command.
     */
    async createGlobalCommand(options) {
        return this.client.rest.applications.createGlobalCommand(this.id, options);
    }
    /**
     * Create a guild application command.
     * @param guildID The ID of the guild.
     * @param options The options for creating the command.
     */
    async createGuildCommand(guildID, options) {
        return this.client.rest.applications.createGuildCommand(this.id, guildID, options);
    }
    /**
     * Create a test entitlement.
     * @param options The options for creating the test entitlement.
     */
    async createTestEntitlement(options) {
        return this.client.rest.applications.createTestEntitlement(this.id, options);
    }
    /**
     * Delete an emoji for this application.
     * @param emojiID The ID of the emoji to be deleted.
     * @caching This method **does not** cache its result.
     */
    async deleteEmoji(emojiID) {
        return this.client.rest.applications.deleteEmoji(this.id, emojiID);
    }
    /**
     * Delete a global application command.
     * @param commandID The ID of the command.
     */
    async deleteGlobalCommand(commandID) {
        return this.client.rest.applications.deleteGlobalCommand(this.id, commandID);
    }
    /**
     * Delete a guild application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    async deleteGuildCommand(guildID, commandID) {
        return this.client.rest.applications.deleteGuildCommand(this.id, guildID, commandID);
    }
    /**
     * Delete a test entitlement.
     * @param entitlementID The ID of the entitlement to delete.
     */
    async deleteTestEntitlement(entitlementID) {
        return this.client.rest.applications.deleteTestEntitlement(this.id, entitlementID);
    }
    /**
     * Edit this application.
     * @param options The options for editing the application.
     */
    async edit(options) {
        return this.client.rest.applications.editCurrent(options);
    }
    /**
     * Edit an existing emoji for this application.
     * @param emojiID The ID of the emoji to be edited.
     * @param options The options for editing the emoji.
     * @caching This method **does not** cache its result.
     */
    async editEmoji(emojiID, options) {
        return this.client.rest.applications.editEmoji(this.id, emojiID, options);
    }
    /**
     * Edit a global application command.
     * @param commandID The ID of the command.
     * @param options The options for editing the command.
     */
    async editGlobalCommand(commandID, options) {
        return this.client.rest.applications.editGlobalCommand(this.id, commandID, options);
    }
    /**
     * Edit a guild application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the command.
     */
    async editGuildCommand(guildID, commandID, options) {
        return this.client.rest.applications.editGuildCommand(this.id, guildID, commandID, options);
    }
    /**
     * Edit a guild application command's permissions. This requires a bearer token with the `applications.commands.permissions.update` scope.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the permissions.
     */
    async editGuildCommandPermissions(guildID, commandID, options) {
        return this.client.rest.applications.editGuildCommandPermissions(this.id, guildID, commandID, options);
    }
    /**
     * Get an emoji for this application.
     * @param emojiID The ID of the emoji to get.
     */
    async getEmoji(emojiID) {
        return this.client.rest.applications.getEmoji(this.id, emojiID);
    }
    /**
     * Get the emojis for this application.
     */
    async getEmojis() {
        return this.client.rest.applications.getEmojis(this.id);
    }
    /**
     * Get the entitlements for this application.
     * @param options The options for getting the entitlements.
     */
    async getEntitlements(options = {}) {
        return this.client.rest.applications.getEntitlements(this.id, options);
    }
    /**
     * Get a global application command.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    async getGlobalCommand(commandID, options) {
        return this.client.rest.applications.getGlobalCommand(this.id, commandID, options);
    }
    /**
     * Get this application's global commands.
     * @param options The options for getting the command.
     */
    async getGlobalCommands(options) {
        return this.client.rest.applications.getGlobalCommands(this.id, options);
    }
    /**
     * Get a global application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    async getGuildCommand(guildID, commandID, options) {
        return this.client.rest.applications.getGuildCommand(this.id, guildID, commandID, options);
    }
    /**
     * Get this application's commands in a specific guild.
     * @param guildID The ID of the guild.
     * @param options The options for getting the command.
     */
    async getGuildCommands(guildID, options) {
        return this.client.rest.applications.getGuildCommands(this.id, guildID, options);
    }
    /**
     * Get a command's permissions in a guild.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    async getGuildPermission(guildID, commandID) {
        return this.client.rest.applications.getGuildPermission(this.id, guildID, commandID);
    }
    /**
     * Get the permissions for all commands in a guild.
     * @param guildID The ID of the guild.
     */
    async getGuildPermissions(guildID) {
        return this.client.rest.applications.getGuildPermissions(this.id, guildID);
    }
    /**
     * Get this application's role connection metadata records.
     */
    async getRoleConnectionsMetadata() {
        return this.client.rest.oauth.getRoleConnectionsMetadata(this.id);
    }
    /**
     * Get the SKUs for this application.
     */
    async getSKUs() {
        return this.client.rest.applications.getSKUs(this.id);
    }
    /**
     * Get the authenticated user's role connection object for this application. This requires the `role_connections.write` scope.
     */
    async getUserRoleConnection() {
        return this.client.rest.oauth.getUserRoleConnection(this.id);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            flags: this.flags
        };
    }
    /**
     * Update this application's role connections metadata.
     * @param metadata The metadata records.
     */
    async updateRoleConnectionsMetadata(metadata) {
        return this.client.rest.oauth.updateRoleConnectionsMetadata(this.id, metadata);
    }
    /**
     * Update the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param data The metadata to update.
     */
    async updateUserRoleConnection(data) {
        return this.client.rest.oauth.updateUserRoleConnection(this.id, data);
    }
}
exports["default"] = ClientApplication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50QXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9DbGllbnRBcHBsaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnQ0FBZ0M7QUFDaEMsMERBQTBCO0FBRTFCLGdGQUFnRDtBQUNoRCx3RUFBd0M7QUFDeEMsZ0ZBQWdEO0FBNEJoRCxzRkFBc0Q7QUFFdEQsZ0dBQWdHO0FBQ2hHLE1BQXFCLGlCQUFrQixTQUFRLGNBQUk7SUFDL0MscUpBQXFKO0lBQ3JKLFlBQVksQ0FBc0Y7SUFDbEcsa0lBQWtJO0lBQ2xJLEtBQUssQ0FBUztJQUNkLFlBQVksSUFBMEIsRUFBRSxNQUFjO1FBQ2xELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx5QkFBZSxDQUFDLHlCQUFlLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtZQUN2RSxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQW1CLEVBQUU7Z0JBQ3hDLElBQUksaUJBQWlCLElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDbEUsT0FBTyxJQUFJLHFCQUFXLENBQUMsV0FBNkIsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbEUsQ0FBQztnQkFFRCxPQUFPLElBQUkseUJBQWUsQ0FBQyxXQUFpQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzFFLENBQUM7U0FDSixDQUF3RixDQUFDO1FBQzFGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQW1DO1FBQ3pELElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsS0FB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

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

/***/ })

};
