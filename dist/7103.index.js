export const id = 7103;
export const ids = [7103];
export const modules = {

/***/ 7103:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
const Team_1 = tslib_1.__importDefault(__webpack_require__(8941));
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
const Routes = tslib_1.__importStar(__webpack_require__(7660));
const Errors_1 = __webpack_require__(3961);
/** Represents an oauth application. */
class OAuthApplication extends Base_1.default {
    _cachedGuild;
    /** When false, only the application's owners can invite the bot to guilds. */
    botPublic;
    /** When true, the applications bot will only join upon the completion of the full oauth2 code grant flow. */
    botRequireCodeGrant;
    /** This application's rich presence invite cover image hash, if any. */
    coverImage;
    /** This application's default custom authorization link, if any. */
    customInstallURL;
    /** The description of the application. */
    description;
    /** This application's [public flags](https://discord.com/developers/docs/resources/application#application-object-application-flags). */
    flags;
    /** If this application is a game sold on Discord, the ID of the guild to which it has been linked. */
    guildID;
    /** The icon hash of the application. */
    icon;
    /** Settings for this application's in-app authorization link, if enabled. */
    installParams;
    /** The install types available for this application. */
    integrationTypes;
    /** The configs for the install types available for this application. */
    integrationTypesConfig;
    /** The name of the application. */
    name;
    /** The owner of this application. */
    owner;
    /** The ID of the owner of this application. */
    ownerID;
    /** If this application is a game sold on Discord, the id of the Game's SKU. */
    primarySKUID;
    /** A URL to this application's privacy policy. */
    privacyPolicyURL;
    /** This application's role connections verification url. */
    roleConnectionsVerificationURL;
    /** A list of rpc origin urls, if rpc is enabled. */
    rpcOrigins;
    /** If this application is a game sold on Discord, the slug that links to its store page. */
    slug;
    /** The tags for this application. */
    tags;
    /** The team that owns this application, if any. */
    team;
    /** A URL to this application's terms of service. */
    termsOfServiceURL;
    /** The type of this application. */
    type;
    /** The bot's hex encoded public key. */
    verifyKey;
    constructor(data, client) {
        super(data.id, client);
        this.botPublic = !!data.bot_public;
        this.botRequireCodeGrant = !!data.bot_require_code_grant;
        this.coverImage = null;
        this.description = data.description;
        this.flags = data.flags;
        this.guildID = data.guild_id ?? null;
        this.icon = null;
        this.integrationTypes = [];
        this.integrationTypesConfig = {};
        this.name = data.name;
        this.owner = client.users.update(data.owner);
        this.ownerID = data.owner.id;
        this.rpcOrigins = [];
        this.team = null;
        this.type = data.type;
        this.verifyKey = data.verify_key;
        this.update(data);
    }
    update(data) {
        super.update(data);
        if (data.bot_public !== undefined) {
            this.botPublic = data.bot_public;
        }
        if (data.bot_require_code_grant !== undefined) {
            this.botRequireCodeGrant = data.bot_require_code_grant;
        }
        if (data.cover_image !== undefined) {
            this.coverImage = data.cover_image;
        }
        if (data.custom_install_url !== undefined) {
            this.customInstallURL = data.custom_install_url;
        }
        if (data.description !== undefined) {
            this.description = data.description;
        }
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        this.guildID = data.guild_id === undefined ? null : data.guild_id;
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.install_params !== undefined) {
            this.installParams = data.install_params;
        }
        if (data.integration_types !== undefined) {
            this.integrationTypes = data.integration_types;
        }
        if (data.integration_types_config !== undefined) {
            this.integrationTypesConfig = Object.fromEntries(Object.entries(data.integration_types_config).map(([key, value]) => [key, { oauth2InstallParams: value.oauth2_install_params }]));
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.owner !== undefined) {
            this.owner = this.client.users.update(data.owner);
            this.ownerID = data.owner.id;
        }
        if (data.primary_sku_id !== undefined) {
            this.primarySKUID = data.primary_sku_id;
        }
        if (data.privacy_policy_url !== undefined) {
            this.privacyPolicyURL = data.privacy_policy_url;
        }
        if (data.rpc_origins !== undefined) {
            this.rpcOrigins = data.rpc_origins;
        }
        if (data.slug !== undefined) {
            this.slug = data.slug;
        }
        if (data.tags !== undefined) {
            this.tags = data.tags;
        }
        if (data.team !== undefined) {
            this.team = data.team ? new Team_1.default(data.team, this.client) : null;
        }
        if (data.terms_of_service_url !== undefined) {
            this.termsOfServiceURL = data.terms_of_service_url;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
        if (data.verify_key !== undefined) {
            this.verifyKey = data.verify_key;
        }
    }
    /** If this application is a game sold on Discord, the guild to which it has been linked. This will throw an error if the guild is not cached. */
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
            botPublic: this.botPublic,
            botRequireCodeGrant: this.botRequireCodeGrant,
            coverImage: this.coverImage,
            customInstallURL: this.customInstallURL,
            description: this.description,
            flags: this.flags,
            guildID: this.guildID,
            icon: this.icon,
            installParams: this.installParams,
            integrationTypes: this.integrationTypes,
            integrationTypesConfig: this.integrationTypesConfig,
            name: this.name,
            owner: this.owner.toJSON(),
            ownerID: this.ownerID,
            primarySKUID: this.primarySKUID,
            privacyPolicyURL: this.privacyPolicyURL,
            rpcOrigins: this.rpcOrigins,
            slug: this.slug,
            tags: this.tags,
            team: this.team?.toJSON() ?? null,
            termsOfServiceURL: this.termsOfServiceURL,
            type: this.type,
            verifyKey: this.verifyKey
        };
    }
}
exports["default"] = OAuthApplication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhBcHBsaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL09BdXRoQXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsMERBQTBCO0FBRTFCLDBEQUEwQjtBQUsxQiwrREFBeUM7QUFFekMsMkNBQStDO0FBRS9DLHVDQUF1QztBQUN2QyxNQUFxQixnQkFBaUIsU0FBUSxjQUFJO0lBQ3RDLFlBQVksQ0FBZ0I7SUFDcEMsOEVBQThFO0lBQzlFLFNBQVMsQ0FBVTtJQUNuQiw2R0FBNkc7SUFDN0csbUJBQW1CLENBQVU7SUFDN0Isd0VBQXdFO0lBQ3hFLFVBQVUsQ0FBZ0I7SUFDMUIsb0VBQW9FO0lBQ3BFLGdCQUFnQixDQUFVO0lBQzFCLDBDQUEwQztJQUMxQyxXQUFXLENBQVM7SUFDcEIseUlBQXlJO0lBQ3pJLEtBQUssQ0FBUztJQUNkLHNHQUFzRztJQUN0RyxPQUFPLENBQWdCO0lBQ3ZCLHdDQUF3QztJQUN4QyxJQUFJLENBQWdCO0lBQ3BCLDZFQUE2RTtJQUM3RSxhQUFhLENBQWlCO0lBQzlCLHdEQUF3RDtJQUN4RCxnQkFBZ0IsQ0FBcUM7SUFDckQsd0VBQXdFO0lBQ3hFLHNCQUFzQixDQUF5QjtJQUMvQyxtQ0FBbUM7SUFDbkMsSUFBSSxDQUFTO0lBQ2IscUNBQXFDO0lBQ3JDLEtBQUssQ0FBTztJQUNaLCtDQUErQztJQUMvQyxPQUFPLENBQVM7SUFDaEIsK0VBQStFO0lBQy9FLFlBQVksQ0FBVTtJQUN0QixrREFBa0Q7SUFDbEQsZ0JBQWdCLENBQVU7SUFDMUIsNERBQTREO0lBQzVELDhCQUE4QixDQUFVO0lBQ3hDLG9EQUFvRDtJQUNwRCxVQUFVLENBQWdCO0lBQzFCLDRGQUE0RjtJQUM1RixJQUFJLENBQVU7SUFDZCxxQ0FBcUM7SUFDckMsSUFBSSxDQUFpQjtJQUNyQixtREFBbUQ7SUFDbkQsSUFBSSxDQUFjO0lBQ2xCLG9EQUFvRDtJQUNwRCxpQkFB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

/***/ }),

/***/ 8941:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module Team */
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
/** Represents an OAuth team. */
class Team extends Base_1.default {
    /** The icon hash of this team. */
    icon;
    /** The members of this team. */
    members;
    /** The name of this team. */
    name;
    /** The owner of this team. */
    owner;
    /** The ID of the owner of this team. */
    ownerID;
    constructor(data, client) {
        super(data.id, client);
        this.icon = null;
        this.members = [];
        this.name = data.name;
        this.owner = this.client.users.get(data.owner_user_id);
        this.ownerID = data.owner_user_id;
        this.update(data);
    }
    update(data) {
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.owner_user_id !== undefined) {
            this.owner = this.client.users.get(data.owner_user_id);
            this.ownerID = data.owner_user_id;
        }
        if (data.members !== undefined) {
            for (const member of this.members) {
                if (!data.members.some(m => m.user.id === member.user.id)) {
                    this.members.splice(this.members.indexOf(member), 1);
                }
            }
            for (const member of data.members) {
                if (!this.members.some(m => m.user.id === member.user.id)) {
                    this.members.push({
                        membershipState: member.membership_state,
                        role: member.role,
                        teamID: member.team_id,
                        user: this.client.users.update(member.user)
                    });
                }
            }
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            icon: this.icon,
            members: this.members,
            name: this.name,
            ownerID: this.ownerID
        };
    }
}
exports["default"] = Team;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1RlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLDBEQUEwQjtBQU0xQixnQ0FBZ0M7QUFDaEMsTUFBcUIsSUFBSyxTQUFRLGNBQUk7SUFDbEMsa0NBQWtDO0lBQ2xDLElBQUksQ0FBZ0I7SUFDcEIsZ0NBQWdDO0lBQ2hDLE9BQU8sQ0FBb0I7SUFDM0IsNkJBQTZCO0lBQzdCLElBQUksQ0FBUztJQUNiLDhCQUE4QjtJQUM5QixLQUFLLENBQVE7SUFDYix3Q0FBd0M7SUFDeEMsT0FBTyxDQUFTO0lBQ2hCLFlBQVksSUFBYSxFQUFFLE1BQWM7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRWtCLE1BQU0sQ0FBQyxJQUFzQjtRQUM1QyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzdCLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxDQUFDO1lBQ0wsQ0FBQztZQUVELEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUNkLGVBQWUsRUFBRSxNQUFNLENBQUMsZ0JBQWdCO3dCQUN4QyxJQUFJLEVBQWEsTUFBTSxDQUFDLElBQUk7d0JBQzVCLE1BQU0sRUFBVyxNQUFNLENBQUMsT0FBTzt3QkFDL0IsSUFBSSxFQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUN6RCxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztZQUNMLENBQUM7UUFHTCxDQUFDO0lBQ0wsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLElBQUksRUFBSyxJQUFJLENBQUMsSUFBSTtZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsSUFBSSxFQUFLLElBQUksQ0FBQyxJQUFJO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN4QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBL0RELHVCQStEQyJ9

/***/ })

};
