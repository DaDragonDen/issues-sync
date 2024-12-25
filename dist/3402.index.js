export const id = 3402;
export const ids = [3402];
export const modules = {

/***/ 3402:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4285);
/** @module Application */
const ClientApplication_1 = tslib_1.__importDefault(__webpack_require__(5151));
const OAuthGuild_1 = tslib_1.__importDefault(__webpack_require__(6768));
const User_1 = tslib_1.__importDefault(__webpack_require__(5065));
const Team_1 = tslib_1.__importDefault(__webpack_require__(5095));
const Routes = tslib_1.__importStar(__webpack_require__(2222));
/** Represents an application. */
class Application extends ClientApplication_1.default {
    /** The approximate number of guilds the application is in. */
    approximateGuildCount;
    /** If the bot can be invited by anyone. */
    botPublic;
    /** If authorizing the bot requires a code grant. */
    botRequireCodeGrant;
    /** This application's rich presence invite cover image hash, if any. */
    coverImage;
    /** This application's default custom authorization link, if any. */
    customInstallURL;
    /** The description of the application. */
    description;
    /** The state of this application's discoverability. */
    discoverabilityState;
    /** The { @link Constants~ApplicationDiscoveryEligibilityFlags | flags } for this application's discovery eligibility. */
    discoveryEligibilityFlags;
    /** The explicit content filter for this application. */
    explicitContentFilter;
    /** If this application is a game sold on Discord, the guild to which it has been linked. This will only be present if recieved via {@link REST/Applications.getCurrent | `/applications/@me`}. */
    guild;
    /** If this application is a game sold on Discord, the ID of the guild to which it has been linked. */
    guildID;
    hook;
    /** The icon hash of the application. */
    icon;
    /** Settings for this application's in-app authorization link, if enabled. */
    installParams;
    /** The install types available for this application. */
    integrationTypes;
    /** The configs for the install types available for this application. */
    integrationTypesConfig;
    /** This applications interaction endpoint url, if any. */
    interactionsEndpointURL;
    /** The event types that will be recieved like http interactions, if interactionsVersion is 2. */
    interactionsEventTypes;
    /** The interactions version of this application. */
    interactionsVersion;
    /** If this application is monetized. */
    isMonetized;
    /** The { @link Constants~ApplicationMonetizationEligibilityFlags | flags } for this application's monetization eligibility. */
    monetizationEligibilityFlags;
    /** This application's monetization state. */
    monetizationState;
    /** The name of the application. */
    name;
    /** The owner of this application. */
    owner;
    /** If this application is a game sold on Discord, the id of the Game's SKU. */
    primarySKUID;
    /** A URL to this application's privacy policy. */
    privacyPolicyURL;
    /** The redirect URIs for this application. */
    redirectURIs;
    /** This application's role connections verification url, if any. */
    roleConnectionsVerificationURL;
    /** The state of this application's RPC application. */
    rpcApplicationState;
    /** A list of rpc origin urls, if rpc is enabled. */
    rpcOrigins;
    /** If this application is a game sold on Discord, the slug that links to its store page. */
    slug;
    /** The state of this application's store application state. */
    storeApplicationState;
    /** The tags for this application. */
    tags;
    /** The team that owns this application. */
    team;
    /** A URL to this application's terms of service. */
    termsOfServiceURL;
    /** The type of this application. */
    type;
    /** The state of this application's verification. */
    verificationState;
    /** The bot's hex encoded public key. */
    verifyKey;
    constructor(data, client) {
        super(data, client);
        this.approximateGuildCount = data.approximate_guild_count ?? 0;
        this.botPublic = data.bot_public;
        this.botRequireCodeGrant = data.bot_require_code_grant;
        this.coverImage = data.cover_image ?? null;
        this.description = data.description;
        this.discoverabilityState = data.discoverability_state;
        this.discoveryEligibilityFlags = data.discovery_eligibility_flags;
        this.explicitContentFilter = data.explicit_content_filter;
        this.guild = data.guild === undefined ? null : new OAuthGuild_1.default(data.guild, client);
        this.guildID = data.guild_id ?? null;
        this.hook = data.hook;
        this.icon = data.icon;
        this.installParams = data.install_params;
        this.integrationTypes = [];
        this.integrationTypesConfig = {};
        this.interactionsEndpointURL = null;
        this.interactionsEventTypes = data.interactions_event_types;
        this.interactionsVersion = data.interactions_version;
        this.isMonetized = data.is_monetized;
        this.monetizationEligibilityFlags = data.monetization_eligibility_flags;
        this.monetizationState = data.monetization_state;
        this.name = data.name;
        this.owner = data.owner === undefined ? null : new User_1.default(data.owner, client);
        this.primarySKUID = data.primary_sku_id;
        this.privacyPolicyURL = data.privacy_policy_url;
        this.redirectURIs = data.redirect_uris ?? [];
        this.roleConnectionsVerificationURL = null;
        this.rpcApplicationState = data.rpc_application_state;
        this.rpcOrigins = data.rpc_origins ?? [];
        this.slug = data.slug;
        this.storeApplicationState = data.store_application_state;
        this.tags = data.tags ?? [];
        this.team = data.team ? new Team_1.default(data.team, client) : null;
        this.termsOfServiceURL = data.terms_of_service_url;
        this.type = data.type;
        this.verificationState = data.verification_state;
        this.verifyKey = data.verify_key;
        this.update(data);
    }
    /**
     * The url of this application's cover image.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    coverImageURL(format, size) {
        return this.coverImage === null ? null : this.client.util.formatImage(Routes.APPLICATION_COVER(this.id, this.coverImage), format, size);
    }
    /**
     * The url of this application's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format, size) {
        return this.icon === null ? null : this.client.util.formatImage(Routes.APPLICATION_ICON(this.id, this.icon), format, size);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            approximateGuildCount: this.approximateGuildCount,
            botPublic: this.botPublic,
            botRequireCodeGrant: this.botRequireCodeGrant,
            coverImage: this.coverImage,
            customInstallURL: this.customInstallURL,
            description: this.description,
            discoverabilityState: this.discoverabilityState,
            discoveryEligibilityFlags: this.discoveryEligibilityFlags,
            explicitContentFilter: this.explicitContentFilter,
            guild: this.guild?.toJSON() ?? null,
            guildID: this.guildID,
            hook: this.hook,
            icon: this.icon,
            installParams: this.installParams,
            integrationTypes: this.integrationTypes,
            integrationTypesConfig: this.integrationTypesConfig,
            interactionsEndpointURL: this.interactionsEndpointURL,
            interactionsEventTypes: this.interactionsEventTypes,
            interactionsVersion: this.interactionsVersion,
            isMonetized: this.isMonetized,
            monetizationEligibilityFlags: this.monetizationEligibilityFlags,
            monetizationState: this.monetizationState,
            name: this.name,
            owner: this.owner?.toJSON() ?? null,
            primarySKUID: this.primarySKUID,
            privacyPolicyURL: this.privacyPolicyURL,
            redirectURIs: this.redirectURIs,
            roleConnectionsVerificationURL: this.roleConnectionsVerificationURL,
            rpcApplicationState: this.rpcApplicationState,
            rpcOrigins: this.rpcOrigins,
            slug: this.slug,
            storeApplicationState: this.storeApplicationState,
            tags: this.tags,
            team: this.team?.toJSON() ?? null,
            termsOfServiceURL: this.termsOfServiceURL,
            type: this.type,
            verificationState: this.verificationState,
            verifyKey: this.verifyKey
        };
    }
}
exports["default"] = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9BcHBsaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsb0ZBQW9EO0FBQ3BELHNFQUFzQztBQUN0QywwREFBMEI7QUFDMUIsMERBQTBCO0FBYTFCLCtEQUF5QztBQUl6QyxpQ0FBaUM7QUFDakMsTUFBcUIsV0FBWSxTQUFRLDJCQUFpQjtJQUN0RCw4REFBOEQ7SUFDOUQscUJBQXFCLENBQVM7SUFDOUIsMkNBQTJDO0lBQzNDLFNBQVMsQ0FBVztJQUNwQixvREFBb0Q7SUFDcEQsbUJBQW1CLENBQVc7SUFDOUIsd0VBQXdFO0lBQ3hFLFVBQVUsQ0FBZ0I7SUFDMUIsb0VBQW9FO0lBQ3BFLGdCQUFnQixDQUFVO0lBQzFCLDBDQUEwQztJQUMxQyxXQUFXLENBQVM7SUFDcEIsdURBQXVEO0lBQ3ZELG9CQUFvQixDQUFtQztJQUN2RCx5SEFBeUg7SUFDekgseUJBQXlCLENBQVU7SUFDbkMsd0RBQXdEO0lBQ3hELHFCQUFxQixDQUF5QztJQUM5RCxrTUFBa007SUFDbE0sS0FBSyxDQUFvQjtJQUN6QixzR0FBc0c7SUFDdEcsT0FBTyxDQUFnQjtJQUN2QixJQUFJLENBQVU7SUFDZCx3Q0FBd0M7SUFDeEMsSUFBSSxDQUFnQjtJQUNwQiw2RUFBNkU7SUFDN0UsYUFBYSxDQUFpQjtJQUM5Qix3REFBd0Q7SUFDeEQsZ0JBQWdCLENBQXFDO0lBQ3JELHdFQUF3RTtJQUN4RSxzQkFBc0IsQ0FBeUI7SUFDL0MsMERBQTBEO0lBQzFELHVCQUF1QixDQUFnQjtJQUN2QyxpR0FBaUc7SUFDakcsc0JBQXNCLENBQWlCO0lBQ3ZDLG9EQUFvRDtJQUNwRCxtQkFBbUIsQ0FBVTtJQUM3Qix3Q0FBd0M7SUFDeEMsV0FBVyxDQUFVO0lBQ3JCLCtIQUErSDtJQUMvSCw0QkFBNEIsQ0FBVTtJQUN0Qyw2Q0FBNkM7SUFDN0Ms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

/***/ }),

/***/ 6768:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4285);
/** @module OAuthGuild */
const Base_1 = tslib_1.__importDefault(__webpack_require__(9979));
const Permission_1 = tslib_1.__importDefault(__webpack_require__(2457));
const Routes = tslib_1.__importStar(__webpack_require__(2222));
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

/***/ })

};
