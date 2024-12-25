export const id = 8685;
export const ids = [8685,1470,2739,9089];
export const modules = {

/***/ 8685:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
const OAuthApplication_1 = tslib_1.__importDefault(__webpack_require__(7103));
const Routes = tslib_1.__importStar(__webpack_require__(7660));
const PartialApplication_1 = tslib_1.__importDefault(__webpack_require__(4257));
const Integration_1 = tslib_1.__importDefault(__webpack_require__(1984));
const Member_1 = tslib_1.__importDefault(__webpack_require__(7826));
const OAuthGuild_1 = tslib_1.__importDefault(__webpack_require__(1662));
const ExtendedUser_1 = tslib_1.__importDefault(__webpack_require__(1470));
const Constants_1 = __webpack_require__(146);
/** A helper to make using authenticated oauth requests without needing a new client instance. */
class OAuthHelper {
    _manager;
    _token;
    constructor(manager, token) {
        this._token = token;
        this._manager = manager;
    }
    /**
     * Construct an oauth authorization url.
     * @param options The options to construct the url with.
     */
    static constructURL(options) {
        const params = [
            `client_id=${options.clientID}`,
            `response_type=${options.responseType ?? "code"}`,
            `scope=${options.scopes.join("%20")}`
        ];
        if (options.redirectURI) {
            params.push(`redirect_uri=${options.redirectURI}`);
        }
        if (options.disableGuildSelect !== undefined) {
            params.push(`disable_guild_select=${String(options.disableGuildSelect)}`);
        }
        if (options.prompt) {
            params.push(`prompt=${options.prompt}`);
        }
        if (options.permissions) {
            params.push(`permissions=${options.permissions}`);
        }
        if (options.guildID) {
            params.push(`guild_id=${options.guildID}`);
        }
        if (options.state) {
            params.push(`state=${options.state}`);
        }
        if (options.integrationType) {
            params.push(`integration_type=${options.integrationType}`);
        }
        return `${Constants_1.BASE_URL}${Routes.OAUTH_AUTHORIZE}?${params.join("&")}`;
    }
    async addGuildMember(guildID, userID, options) {
        return this._manager.guilds.addMember(guildID, userID, { accessToken: this._token.split(" ").slice(1).join(" "), ...options });
    }
    /**
     * Get the current OAuth2 application's information.
     */
    async getApplication() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_APPLICATION,
            auth: this._token
        }).then(data => new OAuthApplication_1.default(data, this._manager.client));
    }
    /**
     * Get information about the current authorization.
     */
    async getCurrentAuthorizationInformation() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_INFO,
            auth: this._token
        }).then(data => ({
            application: new PartialApplication_1.default(data.application, this._manager.client),
            expires: new Date(data.expires),
            scopes: data.scopes,
            user: this._manager.client.users.update(data.user)
        }));
    }
    /**
     * Get the connections of the currently authenticated user.
     *
     * Note: Requires the `connections` scope.
     */
    async getCurrentConnections() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_CONNECTIONS,
            auth: this._token
        }).then(data => data.map(connection => ({
            friendSync: connection.friend_sync,
            id: connection.id,
            integrations: connection.integrations?.map(integration => new Integration_1.default(integration, this._manager.client)),
            name: connection.name,
            revoked: connection.revoked,
            showActivity: connection.show_activity,
            twoWayLink: connection.two_way_link,
            type: connection.type,
            verified: connection.verified,
            visibility: connection.visibility
        })));
    }
    /**
     * Get the guild member information about the currently authenticated user.
     *
     * Note: Requires the `guilds.members.read` scope.
     * @param guild the ID of the guild
     */
    async getCurrentGuildMember(guild) {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_GUILD_MEMBER(guild),
            auth: this._token
        }).then(data => new Member_1.default(data, this._manager.client, guild));
    }
    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     */
    async getCurrentGuilds() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_GUILDS,
            auth: this._token
        }).then(data => data.map(d => new OAuthGuild_1.default(d, this._manager.client)));
    }
    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     */
    async getCurrentUser() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_CURRENT_USER,
            auth: this._token
        }).then(data => new ExtendedUser_1.default(data, this._manager.client));
    }
    /**
     * Revoke the used access token.
     * @param options The options for revoking the token.
     */
    async revokeToken(options) {
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("token", this._token);
        await this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN_REVOKE,
            form
        });
    }
    /**
     * Update the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @param data The metadata to update.
     */
    async updateRoleConnection(applicationID, data) {
        return this._manager.request({
            method: "PUT",
            path: Routes.OAUTH_ROLE_CONNECTION(applicationID),
            json: {
                metadata: data.metadata,
                platform_name: data.platformName,
                platform_username: data.platformUsername
            },
            auth: this._token
        }).then(d => ({
            metadata: Object.entries(d.metadata).map(([key, value]) => ({
                [key]: {
                    description: value.description,
                    descriptionLocalizations: value.description_localizations,
                    key: value.key,
                    name: value.name,
                    nameLocalizations: value.name_localizations,
                    type: value.type
                }
            })).reduce((a, b) => ({ ...a, ...b })),
            platformName: d.platform_name,
            platformUsername: d.platform_username
        }));
    }
}
exports["default"] = OAuthHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9PQXV0aEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw4RkFBOEQ7QUFVOUQsK0RBQXlDO0FBQ3pDLGtHQUFrRTtBQUNsRSxvRkFBb0Q7QUFDcEQsMEVBQTBDO0FBQzFDLGtGQUFrRDtBQUNsRCxzRkFBc0Q7QUFTdEQsNENBQXdDO0FBRXhDLGlHQUFpRztBQUNqRyxNQUFxQixXQUFXO0lBQ3BCLFFBQVEsQ0FBYztJQUN0QixNQUFNLENBQVM7SUFDdkIsWUFBWSxPQUFvQixFQUFFLEtBQWE7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBd0I7UUFDeEMsTUFBTSxNQUFNLEdBQWtCO1lBQzFCLGFBQWEsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUMvQixpQkFBaUIsT0FBTyxDQUFDLFlBQVksSUFBSSxNQUFNLEVBQUU7WUFDakQsU0FBUyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtTQUN4QyxDQUFDO1FBQ0YsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNELElBQUksT0FBTyxDQUFDLGtCQUFrQixLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE1BQU0s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

/***/ }),

/***/ 1470:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module ExtendedUser */
const User_1 = tslib_1.__importDefault(__webpack_require__(4199));
/** Represents the currently authenticated user. */
class ExtendedUser extends User_1.default {
    /** The user's email. (always null for bots) */
    email;
    /** The flags of the user. */
    flags;
    /** The locale of the user */
    locale;
    /** If the user has mfa enabled on their account */
    mfaEnabled;
    /** If this user's email is verified. (always true for bots) */
    verified;
    constructor(data, client) {
        super(data, client);
        this.email = data.email;
        this.flags = data.flags;
        this.verified = !!data.verified;
        this.mfaEnabled = !!data.mfa_enabled;
        this.update(data);
    }
    update(data) {
        super.update(data);
        if (data.email !== undefined) {
            this.email = data.email;
        }
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        if (data.locale !== undefined) {
            this.locale = data.locale;
        }
    }
    /**
     * Modify this user.
     * @param options The options for editing the user.
     */
    async edit(options) {
        return this.client.rest.users.editSelf(options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            email: this.email,
            flags: this.flags,
            locale: this.locale,
            mfaEnabled: this.mfaEnabled,
            verified: this.verified
        };
    }
}
exports["default"] = ExtendedUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0ZW5kZWRVc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvRXh0ZW5kZWRVc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQiwwREFBMEI7QUFLMUIsbURBQW1EO0FBQ25ELE1BQXFCLFlBQWEsU0FBUSxjQUFJO0lBQzFDLCtDQUErQztJQUMvQyxLQUFLLENBQWdCO0lBQ3JCLDZCQUE2QjtJQUM3QixLQUFLLENBQVM7SUFDZCw2QkFBNkI7SUFDN0IsTUFBTSxDQUFVO0lBQ2hCLG1EQUFtRDtJQUNuRCxVQUFVLENBQVU7SUFDcEIsK0RBQStEO0lBQy9ELFFBQVEsQ0FBVTtJQUNsQixZQUFZLElBQWtCLEVBQUUsTUFBYztRQUMxQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBMkI7UUFDakQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUE0QjtRQUNuQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLEtBQUssRUFBTyxJQUFJLENBQUMsS0FBSztZQUN0QixLQUFLLEVBQU8sSUFBSSxDQUFDLEtBQUs7WUFDdEIsTUFBTSxFQUFNLElBQUksQ0FBQyxNQUFNO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixRQUFRLEVBQUksSUFBSSxDQUFDLFFBQVE7U0FDNUIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQW5ERCwrQkFtREMifQ==

/***/ }),

/***/ 1984:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module Integration */
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
const PartialApplication_1 = tslib_1.__importDefault(__webpack_require__(4257));
const Errors_1 = __webpack_require__(3961);
/** Represents a guild integration. */
class Integration extends Base_1.default {
    _cachedGuild;
    _cachedRole;
    /** The account information associated with this integration. */
    account;
    /** The application associated with this integration. */
    application;
    /** If emoticons should be synced for this integration. */
    enableEmoticons;
    /** If this integration is enabled. */
    enabled;
    /** The [behavior](https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors) of expiring subscribers. */
    expireBehavior;
    /** The grace period (in days) before expiring subscribers. */
    expireGracePeriod;
    /** The ID of the guild this integration belongs to, if applicable. */
    guildID;
    /** The name of the integration. */
    name;
    /** If this integration has been revoked. */
    revoked;
    /** The id of the role this integration uses for subscribers, if any. */
    roleID;
    /** The scopes the application associated with this integration has been authorized for. */
    scopes;
    /** The number of subscribers this integration has. */
    subscriberCount;
    /** The last date at which this integration was synced at. */
    syncedAt;
    /** If this integration is syncing. */
    syncing;
    /** The type of integration. */
    type;
    /** The user associated with this integration, if applicable. */
    user;
    constructor(data, client, guildID) {
        super(data.id, client);
        this.account = data.account;
        this.application = null;
        this.enableEmoticons = !!data.enable_emoticons;
        this.enabled = !!data.enabled;
        this.guildID = guildID === undefined ? null : guildID;
        this.name = data.name;
        this.revoked = !!data.revoked;
        this.roleID = data.role_id === undefined ? null : data.role_id;
        this.syncing = !!data.syncing;
        this.type = data.type;
        this.update(data);
    }
    update(data) {
        if (data.account !== undefined) {
            this.account = data.account;
        }
        if (data.application !== undefined) {
            this.application = new PartialApplication_1.default(data.application, this.client);
        }
        if (data.enable_emoticons !== undefined) {
            this.enableEmoticons = data.enable_emoticons;
        }
        if (data.enabled !== undefined) {
            this.enabled = data.enabled;
        }
        if (data.expire_behavior !== undefined) {
            this.expireBehavior = data.expire_behavior;
        }
        if (data.expire_grace_period !== undefined) {
            this.expireGracePeriod = data.expire_grace_period;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.revoked !== undefined) {
            this.revoked = data.revoked;
        }
        if (data.role_id !== undefined) {
            this.roleID = data.role_id;
        }
        if (data.scopes !== undefined) {
            this.scopes = data.scopes;
        }
        if (data.subscriber_count !== undefined) {
            this.subscriberCount = data.subscriber_count;
        }
        if (data.synced_at !== undefined) {
            this.syncedAt = new Date(data.synced_at);
        }
        if (data.syncing !== undefined) {
            this.syncing = data.syncing;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
        if (data.user !== undefined) {
            this.user = this.client.users.update(data.user);
        }
    }
    /** The guild this integration belongs to, if applicable. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            this._cachedGuild ??= this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                if (this.client.options.restMode) {
                    throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present when rest mode is enabled.`);
                }
                if (!this.client.shards.connected) {
                    throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present without a gateway connection.`);
                }
                throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present.`);
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    /** The role this integration uses for subscribers, if any. */
    get role() {
        if (this.roleID !== null && this._cachedRole !== null) {
            try {
                return this._cachedRole ?? (this._cachedRole = this.guild?.roles.get(this.roleID));
            }
            catch {
                return (this._cachedRole = undefined);
            }
        }
        return this._cachedRole === null ? this._cachedRole : (this._cachedRole = null);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            account: this.account,
            application: this.application?.toJSON(),
            enableEmoticons: this.enableEmoticons,
            enabled: this.enabled,
            expireBehavior: this.expireBehavior,
            expireGracePeriod: this.expireGracePeriod,
            name: this.name,
            revoked: this.revoked,
            roleID: this.roleID,
            scopes: this.scopes,
            subscriberCount: this.subscriberCount,
            syncedAt: this.syncedAt?.getTime(),
            syncing: this.syncing,
            type: this.type,
            user: this.user?.toJSON()
        };
    }
}
exports["default"] = Integration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlZ3JhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsMERBQTBCO0FBQzFCLHNGQUFzRDtBQVF0RCwyQ0FBK0M7QUFFL0Msc0NBQXNDO0FBQ3RDLE1BQXFCLFdBQVksU0FBUSxjQUFJO0lBQ2pDLFlBQVksQ0FBZ0I7SUFDNUIsV0FBVyxDQUFlO0lBQ2xDLGdFQUFnRTtJQUNoRSxPQUFPLENBQXFCO0lBQzVCLHdEQUF3RDtJQUN4RCxXQUFXLENBQTRCO0lBQ3ZDLDBEQUEwRDtJQUMxRCxlQUFlLENBQVU7SUFDekIsc0NBQXNDO0lBQ3RDLE9BQU8sQ0FBVTtJQUNqQixtSkFBbUo7SUFDbkosY0FBYyxDQUE4QjtJQUM1Qyw4REFBOEQ7SUFDOUQsaUJBQWlCLENBQVU7SUFDM0Isc0VBQXNFO0lBQ3RFLE9BQU8sQ0FBZ0I7SUFDdkIsbUNBQW1DO0lBQ25DLElBQUksQ0FBUztJQUNiLDRDQUE0QztJQUM1QyxPQUFPLENBQVU7SUFDakIsd0VBQXdFO0lBQ3hFLE1BQU0sQ0FBZ0I7SUFDdEIsMkZBQTJGO0lBQzNGLE1BQU0sQ0FBaUI7SUFDdkIsc0RBQXNEO0lBQ3RELGVBQWUsQ0FBVTtJQUN6Qiw2REFBNkQ7SUFDN0QsUUFBUSxDQUFRO0lBQ2hCLHNDQUFzQztJQUN0QyxPQUFPLENBQVU7SUFDakIsK0JBQStCO0lBQy9CLElBQUksQ0FBa0I7SUFDdEIsZ0VBQWdFO0lBQ2hFLElBQUksQ0FBUTtJQUNaLFlBQVksSUFBb0IsRUFBRSxNQUFjLEVBQUUsT0FBZ0I7UUFDOUQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FB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

/***/ }),

/***/ 1662:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module OAuthGuild */
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
const Permission_1 = tslib_1.__importDefault(__webpack_require__(2739));
const Routes = tslib_1.__importStar(__webpack_require__(7660));
/** Represents a guild retrieved via oauth. */
class OAuthGuild extends Base_1.default {
    _cachedCompleteGuild;
    /** The approximate number of members in this guild (if retrieved with counts). */
    approximateMemberCount;
    /** The approximate number of non-offline members in this guild (if retrieved with counts). */
    approximatePresenceCount;
    /** The hash of this guild's banner. */
    banner;
    /** The [features](https://discord.com/developers/docs/resources/guild#guild-object-guild-features) this guild has. */
    features;
    /** The icon hash of this guild. */
    icon;
    /** The name of this guild. */
    name;
    /** If the user is the owner of this guild. */
    owner;
    /** The permissions of the user in this guild. */
    permissions;
    constructor(data, client) {
        super(data.id, client);
        this.approximateMemberCount = data.approximate_member_count;
        this.approximatePresenceCount = data.approximate_presence_count;
        this.banner = data.banner;
        this.features = data.features;
        this.name = data.name;
        this.icon = data.icon;
        this.owner = data.owner;
        this.permissions = new Permission_1.default(data.permissions);
    }
    /** The complete guild this OAuthGuild represents, if cached. */
    get completeGuild() {
        return this._cachedCompleteGuild ??= this.client.guilds.get(this.id);
    }
    /**
     * The url of this guild's banner.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    bannerURL(format, size) {
        return this.banner === null ? null : this.client.util.formatImage(Routes.BANNER(this.id, this.banner), format, size);
    }
    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format, size) {
        return this.icon === null ? null : this.client.util.formatImage(Routes.GUILD_ICON(this.id, this.icon), format, size);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            approximateMemberCount: this.approximateMemberCount,
            approximatePresenceCount: this.approximatePresenceCount,
            banner: this.banner,
            features: this.features,
            icon: this.icon,
            name: this.name,
            owner: this.owner,
            permissions: this.permissions.toJSON()
        };
    }
}
exports["default"] = OAuthGuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhHdWlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL09BdXRoR3VpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBQ3pCLDBEQUEwQjtBQUMxQixzRUFBc0M7QUFLdEMsK0RBQXlDO0FBRXpDLDhDQUE4QztBQUM5QyxNQUFxQixVQUFXLFNBQVEsY0FBSTtJQUNoQyxvQkFBb0IsQ0FBUztJQUNyQyxrRkFBa0Y7SUFDbEYsc0JBQXNCLENBQVU7SUFDaEMsOEZBQThGO0lBQzlGLHdCQUF3QixDQUFVO0lBQ2xDLHVDQUF1QztJQUN2QyxNQUFNLENBQWdCO0lBQ3RCLHNIQUFzSDtJQUN0SCxRQUFRLENBQXNCO0lBQzlCLG1DQUFtQztJQUNuQyxJQUFJLENBQWdCO0lBQ3BCLDhCQUE4QjtJQUM5QixJQUFJLENBQVM7SUFDYiw4Q0FBOEM7SUFDOUMsS0FBSyxDQUFVO0lBQ2YsaURBQWlEO0lBQ2pELFdBQVcsQ0FBYTtJQUN4QixZQUFZLElBQW1CLEVBQUUsTUFBYztRQUMzQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1FBQzVELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUM7UUFDaEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELGdFQUFnRTtJQUNoRSxJQUFJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsU0FBUyxDQUFDLE1BQW9CLEVBQUUsSUFBYTtRQUN6QyxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6SCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE9BQU8sQ0FBQyxNQUFvQixFQUFFLElBQWE7UUFDdkMsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekgsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLHNCQUFzQixFQUFJLElBQUksQ0FBQyxzQkFBc0I7WUFDckQsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QjtZQUN2RCxNQUFNLEVBQW9CLElBQUksQ0FBQyxNQUFNO1lBQ3JDLFFBQVEsRUFBa0IsSUFBSSxDQUFDLFFBQVE7WUFDdkMsSUFBSSxFQUFzQixJQUFJLENBQUMsSUFBSTtZQUNuQyxJQUFJLEVBQXNCLElBQUksQ0FBQyxJQUFJO1lBQ25DLEtBQUssRUFBcUIsSUFBSSxDQUFDLEtBQUs7WUFDcEMsV0FBVyxFQUFlLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1NBQ3RELENBQUM7SUFDTixDQUFDO0NBQ0o7QUFsRUQsNkJBa0VDIn0=

/***/ }),

/***/ 4257:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module PartialApplication */
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
const Routes = tslib_1.__importStar(__webpack_require__(7660));
/** Represents a partial application. */
class PartialApplication extends Base_1.default {
    /** When false, only the application's owners can invite the bot to guilds. */
    botPublic;
    /** When true, the applications bot will only join upon the completion of the full oauth2 code grant flow. */
    botRequireCodeGrant;
    /** The description of the application. */
    description;
    /** The icon hash of the application. */
    icon;
    /** The name of the application. */
    name;
    /** The bot's hex encoded public key. */
    verifyKey;
    constructor(data, client) {
        super(data.id, client);
        this.description = data.description;
        this.icon = null;
        this.name = data.name;
        this.verifyKey = data.verify_key;
        this.update(data);
    }
    update(data) {
        if (data.bot_public !== undefined) {
            this.botPublic = data.bot_public;
        }
        if (data.bot_require_code_grant !== undefined) {
            this.botRequireCodeGrant = data.bot_require_code_grant;
        }
        if (data.description !== undefined) {
            this.description = data.description;
        }
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
    }
    /**
     * The url of this application's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format, size) {
        return this.icon === null ? null : this.client.util.formatImage(Routes.APPLICATION_COVER(this.id, this.icon), format, size);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            botPublic: this.botPublic,
            botRequireCodeGrant: this.botRequireCodeGrant,
            description: this.description,
            icon: this.icon,
            name: this.name,
            verifyKey: this.verifyKey
        };
    }
}
exports["default"] = PartialApplication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydGlhbEFwcGxpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvUGFydGlhbEFwcGxpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQywwREFBMEI7QUFHMUIsK0RBQXlDO0FBSXpDLHdDQUF3QztBQUN4QyxNQUFxQixrQkFBbUIsU0FBUSxjQUFJO0lBQ2hELDhFQUE4RTtJQUM5RSxTQUFTLENBQVc7SUFDcEIsNkdBQTZHO0lBQzdHLG1CQUFtQixDQUFXO0lBQzlCLDBDQUEwQztJQUMxQyxXQUFXLENBQVM7SUFDcEIsd0NBQXdDO0lBQ3hDLElBQUksQ0FBZ0I7SUFDcEIsbUNBQW1DO0lBQ25DLElBQUksQ0FBUztJQUNiLHdDQUF3QztJQUN4QyxTQUFTLENBQVU7SUFDbkIsWUFBWSxJQUEyQixFQUFFLE1BQWM7UUFDbkQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRWtCLE1BQU0sQ0FBQyxJQUEyQjtRQUNqRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxzQkFBc0IsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1FBQzNELENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE9BQU8sQ0FBQyxNQUFvQixFQUFFLElBQWE7UUFDdkMsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoSSxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsU0FBUyxFQUFZLElBQUksQ0FBQyxTQUFTO1lBQ25DLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7WUFDN0MsV0FBVyxFQUFVLElBQUksQ0FBQyxXQUFXO1lBQ3JDLElBQUksRUFBaUIsSUFBSSxDQUFDLElBQUk7WUFDOUIsSUFBSSxFQUFpQixJQUFJLENBQUMsSUFBSTtZQUM5QixTQUFTLEVBQVksSUFBSSxDQUFDLFNBQVM7U0FDdEMsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTVERCxxQ0E0REMifQ==

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

/***/ })

};
