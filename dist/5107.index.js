export const id = 5107;
export const ids = [5107];
export const modules = {

/***/ 5107:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4285);
/** @module Invite */
const Channel_1 = tslib_1.__importDefault(__webpack_require__(5519));
const PartialApplication_1 = tslib_1.__importDefault(__webpack_require__(59));
const InviteGuild_1 = tslib_1.__importDefault(__webpack_require__(1356));
/** Represents an invite. */
class Invite {
    _cachedChannel;
    /** The approximate number of total members in the guild this invite leads to. */
    approximateMemberCount;
    /** The approximate number of online members in the guild this invite leads to. */
    approximatePresenceCount;
    /** The ID of the channel this invite leads to. */
    channelID;
    client;
    /** The code of this invite. */
    code;
    /** When this invite was created. */
    createdAt;
    /** The date at which this invite expires. */
    expiresAt;
    /** This invite's [flags](https://discord.com/developers/docs/resources/invite#invite-object-invite-flags). */
    flags;
    /** The guild this invite leads to or `null` if this invite leads to a Group DM. */
    guild;
    /** The ID of the guild this invite leads to or `null` if this invite leads to a Group DM. */
    guildID;
    /** The scheduled event associated with this invite. */
    guildScheduledEvent;
    /** The user that created this invite. */
    inviter;
    /** The time after which this invite expires. */
    maxAge;
    /** The maximum number of times this invite can be used, */
    maxUses;
    /** @deprecated The stage instance in the invite this channel is for. */
    stageInstance;
    /** The embedded application this invite will open. */
    targetApplication;
    /** The [target type](https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types) of this invite. */
    targetType;
    /** The user whose stream to display for this voice channel stream invite. */
    targetUser;
    /** If this invite only grants temporary membership. */
    temporary;
    /** The number of times this invite has been used. */
    uses;
    constructor(data, client) {
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
            configurable: false
        });
        this.channelID = (data.channel_id ?? data.channel?.id) ?? null;
        this.code = data.code;
        this.flags = data.flags ?? 0;
        this.guild = null;
        this.guildID = data.guild?.id ?? null;
        this.expiresAt = (data.expires_at ? new Date(data.expires_at) : undefined);
        this.targetType = data.target_type;
        this.update(data);
    }
    update(data) {
        if (data.approximate_member_count !== undefined) {
            this.approximateMemberCount = data.approximate_member_count;
        }
        if (data.approximate_presence_count !== undefined) {
            this.approximatePresenceCount = data.approximate_presence_count;
        }
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        let guild;
        if (data.guild) {
            if (this.guild === null) {
                this.guild = new InviteGuild_1.default(data.guild, this.client);
            }
            else {
                this.guild["update"](data.guild);
            }
            if (this.client.guilds.has(data.guild.id)) {
                this.client.guilds.update(data.guild);
            }
        }
        if (this.channelID === null) {
            this._cachedChannel = null;
        }
        else {
            let channel;
            channel = this.client.getChannel(this.channelID);
            if (data.channel !== undefined) {
                if (channel && channel instanceof Channel_1.default) {
                    channel["update"](data.channel);
                }
                else {
                    channel = data.channel;
                }
            }
            this._cachedChannel = channel;
        }
        if (data.inviter !== undefined) {
            this.inviter = this.client.users.update(data.inviter);
        }
        if (data.stage_instance !== undefined) {
            this.stageInstance = {
                members: data.stage_instance.members.map(member => this.client.util.updateMember(guild.id, member.user.id, member)),
                participantCount: data.stage_instance.participant_count,
                speakerCount: data.stage_instance.speaker_count,
                topic: data.stage_instance.topic
            };
        }
        if (data.target_application !== undefined) {
            this.targetApplication = new PartialApplication_1.default(data.target_application, this.client);
        }
        if (data.guild_scheduled_event !== undefined) {
            this.guildScheduledEvent = guild.scheduledEvents.update(data.guild_scheduled_event);
        }
        if (data.target_user !== undefined) {
            this.targetUser = this.client.users.update(data.target_user);
        }
        if ("created_at" in data) {
            if (data.created_at !== undefined) {
                this.createdAt = new Date(data.created_at);
            }
            if (data.uses !== undefined) {
                this.uses = data.uses;
            }
            if (data.max_uses !== undefined) {
                this.maxUses = data.max_uses;
            }
            if (data.max_age !== undefined) {
                this.maxAge = data.max_age;
            }
            if (data.temporary !== undefined) {
                this.temporary = data.temporary;
            }
        }
    }
    /** The channel this invite leads to. If the channel is not cached, this will be a partial with only `id`, `name, and `type`. */
    get channel() {
        if (this.channelID !== null) {
            if (this._cachedChannel instanceof Channel_1.default) {
                return this._cachedChannel;
            }
            const cachedChannel = this.client.getChannel(this.channelID);
            return cachedChannel ? (this._cachedChannel = cachedChannel) : this._cachedChannel;
        }
        return this._cachedChannel === null ? this._cachedChannel : (this._cachedChannel = null);
    }
    /**
     * Delete this invite.
     * @param reason The reason for deleting this invite.
     */
    async deleteInvite(reason) {
        return this.client.rest.channels.deleteInvite(this.code, reason);
    }
    /** Whether this invite belongs to a cached channel. The only difference on using this method over a simple if statement is to easily update all the invite properties typing definitions based on the channel it belongs to. */
    inCachedChannel() {
        return this.channel instanceof Channel_1.default;
    }
    toJSON() {
        return {
            approximateMemberCount: this.approximateMemberCount,
            approximatePresenceCount: this.approximatePresenceCount,
            channelID: this.channelID ?? undefined,
            code: this.code,
            createdAt: this.createdAt?.getTime(),
            expiresAt: this.expiresAt?.getTime(),
            guild: this.guild?.toJSON(),
            guildID: this.guildID ?? undefined,
            guildScheduledEvent: this.guildScheduledEvent?.toJSON(),
            inviter: this.inviter?.id,
            maxAge: this.maxAge,
            maxUses: this.maxUses,
            stageInstance: this.stageInstance ? {
                members: this.stageInstance.members.map(member => member.id),
                participantCount: this.stageInstance.participantCount,
                speakerCount: this.stageInstance.speakerCount,
                topic: this.stageInstance.topic
            } : undefined,
            targetApplication: this.targetApplication?.toJSON(),
            targetType: this.targetType,
            targetUser: this.targetUser?.id,
            temporary: this.temporary,
            uses: this.uses
        };
    }
}
exports["default"] = Invite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvSW52aXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFCQUFxQjtBQUNyQixnRUFBZ0M7QUFJaEMsc0ZBQXNEO0FBQ3RELHdFQUF3QztBQWN4Qyw0QkFBNEI7QUFDNUIsTUFBcUIsTUFBTTtJQUNmLGNBQWMsQ0FBb0U7SUFDMUYsaUZBQWlGO0lBQ2pGLHNCQUFzQixDQUFVO0lBQ2hDLGtGQUFrRjtJQUNsRix3QkFBd0IsQ0FBVTtJQUNsQyxrREFBa0Q7SUFDbEQsU0FBUyxDQUFnQjtJQUN6QixNQUFNLENBQVU7SUFDaEIsK0JBQStCO0lBQy9CLElBQUksQ0FBUztJQUNiLG9DQUFvQztJQUNwQyxTQUFTLENBQStDO0lBQ3hELDZDQUE2QztJQUM3QyxTQUFTLENBQWlFO0lBQzFFLDhHQUE4RztJQUM5RyxLQUFLLENBQVM7SUFDZCxtRkFBbUY7SUFDbkYsS0FBSyxDQUFxQjtJQUMxQiw2RkFBNkY7SUFDN0YsT0FBTyxDQUFnQjtJQUN2Qix1REFBdUQ7SUFDdkQsbUJBQW1CLENBQXVCO0lBQzFDLHlDQUF5QztJQUN6QyxPQUFPLENBQVE7SUFDZixnREFBZ0Q7SUFDaEQsTUFBTSxDQUE2QztJQUNuRCwyREFBMkQ7SUFDM0QsT0FBTyxDQUE2QztJQUNwRCx3RUFBd0U7SUFDeEUsYUFBYSxDQUF1QjtJQUNwQyxzREFBc0Q7SUFDdEQsaUJBQWlCLENBQXNCO0lBQ3ZDLGdJQUFnSTtJQUNoSSxVQUFVLENBQXFCO0lBQy9CLDZFQUE2RTtJQUM3RSxVQUFVLENBQVE7SUFDbEIsdURBQXVEO0lBQ3ZELFNBQVMsQ0FBOEM7SUFDdkQscURBQXFEO0lBQ3JELElBQUksQ0FBNkM7SUFDakQsWUFBWSxJQUF1QyxFQUFFLE1BQWM7UUFDL0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ2xDLEtBQUssRUFBUyxNQUFNO1lB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

/***/ }),

/***/ 1356:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4285);
/** @module InviteGuild */
const Base_1 = tslib_1.__importDefault(__webpack_require__(9979));
const Routes = tslib_1.__importStar(__webpack_require__(2222));
/** Represents a guild received via an invite. */
class InviteGuild extends Base_1.default {
    _cachedCompleteGuild;
    /** The hash of this guild's banner. */
    banner;
    /** The description of this guild. */
    description;
    /** The [features](https://discord.com/developers/docs/resources/guild#guild-object-guild-features) this guild has. */
    features;
    /** The icon hash of this guild. */
    icon;
    /** The name of this guild. */
    name;
    /** The [nsfw level](https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level) of this guild. */
    nsfwLevel;
    /** The number of nitro boosts this guild has. */
    premiumSubscriptionCount;
    /** The invite splash hash of this guild. */
    splash;
    /** The vanity url of this guild. Only present in guilds with the `VANITY_URL` feature. */
    vanityURLCode;
    /** The [verification level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level) of this guild. */
    verificationLevel;
    constructor(data, client) {
        super(data.id, client);
        this.banner = data.banner;
        this.description = data.description;
        this.features = data.features;
        this.name = data.name;
        this.nsfwLevel = data.nsfw_level;
        this.icon = data.icon;
        this.premiumSubscriptionCount = data.premium_subscription_count;
        this.splash = data.splash;
        this.vanityURLCode = data.vanity_url_code;
        this.verificationLevel = data.verification_level;
    }
    /** The complete guild this InviteGuild represents, if cached. */
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
    /**
     * The url of this guild's invite splash.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    splashURL(format, size) {
        return this.splash === null ? null : this.client.util.formatImage(Routes.GUILD_SPLASH(this.id, this.splash), format, size);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            banner: this.banner,
            description: this.description,
            features: this.features,
            icon: this.icon,
            name: this.name,
            nsfwLevel: this.nsfwLevel,
            premiumSubscriptionCount: this.premiumSubscriptionCount,
            splash: this.splash,
            vanityURLCode: this.vanityURLCode,
            verificationLevel: this.verificationLevel
        };
    }
}
exports["default"] = InviteGuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlR3VpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnZpdGVHdWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsMERBQTBCO0FBSzFCLCtEQUF5QztBQUV6QyxpREFBaUQ7QUFDakQsTUFBcUIsV0FBWSxTQUFRLGNBQUk7SUFDakMsb0JBQW9CLENBQVM7SUFDckMsdUNBQXVDO0lBQ3ZDLE1BQU0sQ0FBZ0I7SUFDdEIscUNBQXFDO0lBQ3JDLFdBQVcsQ0FBZ0I7SUFDM0Isc0hBQXNIO0lBQ3RILFFBQVEsQ0FBc0I7SUFDOUIsbUNBQW1DO0lBQ25DLElBQUksQ0FBZ0I7SUFDcEIsOEJBQThCO0lBQzlCLElBQUksQ0FBUztJQUNiLHlIQUF5SDtJQUN6SCxTQUFTLENBQWtCO0lBQzNCLGlEQUFpRDtJQUNqRCx3QkFBd0IsQ0FBVTtJQUNsQyw0Q0FBNEM7SUFDNUMsTUFBTSxDQUFnQjtJQUN0QiwwRkFBMEY7SUFDMUYsYUFBYSxDQUFnQjtJQUM3QixtSUFBbUk7SUFDbkksaUJBQWlCLENBQXFCO0lBQ3RDLFlBQVksSUFBb0IsRUFBRSxNQUFjO1FBQzVDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyx3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

/***/ })

};
