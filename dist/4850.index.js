export const id = 4850;
export const ids = [4850,1287,7729,1312,6758,3560];
export const modules = {

/***/ 950:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module AutocompleteInteraction */
const Interaction_1 = tslib_1.__importDefault(__webpack_require__(4850));
const Permission_1 = tslib_1.__importDefault(__webpack_require__(2739));
const GuildChannel_1 = tslib_1.__importDefault(__webpack_require__(4554));
const Constants_1 = __webpack_require__(146);
const InteractionOptionsWrapper_1 = tslib_1.__importDefault(__webpack_require__(7729));
const Errors_1 = __webpack_require__(3961);
/** Represents an autocomplete interaction. */
class AutocompleteInteraction extends Interaction_1.default {
    _cachedChannel;
    _cachedGuild;
    /** The permissions the bot has in the channel this interaction was sent from. If in a dm/group dm, this will contain `ATTACH_FILES`, `EMBED_LINKS`, and `MENTION_EVERYONE`. In addition, `USE_EXTERNAL_EMOJIS` will be included for DMs with the app's bot user. */
    appPermissions;
    /** Details about the authorizing user or server for the installation(s) relevant to the interaction. See [Discord's docs](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object) for more information. */
    authorizingIntegrationOwners;
    /** The ID of the channel this interaction was sent from. */
    channelID;
    /** The context this interaction was sent from. */
    context;
    /** The data associated with the interaction. */
    data;
    /** The entitlements for the user that created this interaction, and the guild it was created in. */
    entitlements;
    /** The id of the guild this interaction was sent from, if applicable. */
    guildID;
    /** The preferred [locale](https://discord.com/developers/docs/reference#locales) of the guild this interaction was sent from, if applicable. */
    guildLocale;
    /** The partial guild this interaction was sent from, if applicable. */
    guildPartial;
    /** The [locale](https://discord.com/developers/docs/reference#locales) of the invoking user. */
    locale;
    /** The member associated with the invoking user, if this interaction is sent from a guild. */
    member;
    /** The permissions of the member associated with the invoking user, if this interaction is sent from a guild. */
    memberPermissions;
    /** The user that invoked this interaction. */
    user;
    constructor(data, client) {
        super(data, client);
        this.appPermissions = new Permission_1.default(data.app_permissions ?? "0");
        this.authorizingIntegrationOwners = data.authorizing_integration_owners;
        this.channelID = data.channel_id;
        this.context = data.context;
        this.data = {
            guildID: data.data.guild_id,
            id: data.data.id,
            name: data.data.name,
            options: new InteractionOptionsWrapper_1.default(data.data.options ?? [], null),
            type: data.data.type
        };
        this.entitlements = data.entitlements?.map(entitlement => client.util.updateEntitlement(entitlement)) ?? [];
        this.guildID = (data.guild_id ?? null);
        this.guildLocale = data.guild_locale;
        this.guildPartial = data.guild;
        this.locale = data.locale;
        this.member = (data.member === undefined ? null : this.client.util.updateMember(data.guild_id, data.member.user.id, data.member));
        this.memberPermissions = (data.member === undefined ? null : new Permission_1.default(data.member.permissions));
        this.user = client.users.update(data.user ?? data.member.user);
    }
    /** The channel this interaction was sent from. */
    get channel() {
        return this._cachedChannel ??= this.client.getChannel(this.channelID);
    }
    /** The guild this interaction was sent from, if applicable. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            this._cachedGuild ??= this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                throw new Errors_1.UncachedError(this, "guild", "GUILDS", this.client);
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    /** Whether this interaction belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel() {
        return this.channel instanceof GuildChannel_1.default;
    }
    /** Whether this interaction belongs to a private channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inPrivateChannel() {
        return this.guildID === null;
    }
    /**
     * Acknowledge this interaction with a set of choices. This is an initial response, and more than one initial response cannot be used.
     * @param choices The choices to send.
     */
    async result(choices) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT, data: { choices } });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            appPermissions: this.appPermissions.toJSON(),
            authorizingIntegrationOwners: this.authorizingIntegrationOwners,
            channelID: this.channelID,
            context: this.context,
            data: this.data,
            guildID: this.guildID ?? undefined,
            guildLocale: this.guildLocale,
            locale: this.locale,
            member: this.member?.toJSON(),
            type: this.type,
            user: this.user.toJSON()
        };
    }
}
exports["default"] = AutocompleteInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0b2NvbXBsZXRlSW50ZXJhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9BdXRvY29tcGxldGVJbnRlcmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBc0M7QUFDdEMsd0VBQXdDO0FBSXhDLHNFQUFzQztBQUN0QywwRUFBMEM7QUFJMUMsNENBQTZHO0FBVzdHLHVIQUF1RjtBQUV2RiwyQ0FBK0M7QUFFL0MsOENBQThDO0FBQzlDLE1BQXFCLHVCQUF1RyxTQUFRLHFCQUFXO0lBQ25JLGNBQWMsQ0FBbUQ7SUFDakUsWUFBWSxDQUE0RDtJQUNoRixvUUFBb1E7SUFDcFEsY0FBYyxDQUFhO0lBQzNCLHVSQUF1UjtJQUN2Uiw0QkFBNEIsQ0FBK0I7SUFDM0QsNERBQTREO0lBQzVELFNBQVMsQ0FBUztJQUNsQixrREFBa0Q7SUFDbEQsT0FBTyxDQUEyQjtJQUNsQyxnREFBZ0Q7SUFDaEQsSUFBSSxDQUE4QjtJQUNsQyxvR0FBb0c7SUFDcEcsWUFBWSxDQUF1QztJQUNuRCx5RUFBeUU7SUFDekUsT0FBTyxDQUE2RDtJQUNwRSxnSkFBZ0o7SUFDaEosV0FBVyxDQUFrRTtJQUM3RSx1RUFBdUU7SUFDdkUsWUFBWSxDQUF1RjtJQUNuRyxnR0FBZ0c7SUFDaEcsTUFBTSxDQUFTO0lBQ2YsOEZBQThGO0lBQzlGLE1BQU0sQ0FBNkQ7SUFDbkUsaUhBQWlIO0lBQ2pILGlCQUFpQixDQUFxRTtJQUV0Riw4Q0FBOEM7SUFDOUMsSUFBSSxDQUFPO0lBQ1gsWUFBWSxJQUFnQyxFQUFFLE1BQWM7UUFDeEQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsOEJBQThC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

/***/ }),

/***/ 8359:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module CommandInteraction */
const Interaction_1 = tslib_1.__importDefault(__webpack_require__(4850));
const Attachment_1 = tslib_1.__importDefault(__webpack_require__(9681));
const Member_1 = tslib_1.__importDefault(__webpack_require__(7826));
const Message_1 = tslib_1.__importDefault(__webpack_require__(5709));
const Role_1 = tslib_1.__importDefault(__webpack_require__(3364));
const User_1 = tslib_1.__importDefault(__webpack_require__(4199));
const Permission_1 = tslib_1.__importDefault(__webpack_require__(2739));
const GuildChannel_1 = tslib_1.__importDefault(__webpack_require__(4554));
const InteractionResolvedChannel_1 = tslib_1.__importDefault(__webpack_require__(1287));
const TypedCollection_1 = tslib_1.__importDefault(__webpack_require__(5288));
const Constants_1 = __webpack_require__(146);
const InteractionOptionsWrapper_1 = tslib_1.__importDefault(__webpack_require__(7729));
const Errors_1 = __webpack_require__(3961);
const MessageInteractionResponse_1 = tslib_1.__importDefault(__webpack_require__(1312));
/** Represents a command interaction. */
class CommandInteraction extends Interaction_1.default {
    _cachedChannel;
    _cachedGuild;
    /** The permissions the bot has in the channel this interaction was sent from. If in a dm/group dm, this will contain `ATTACH_FILES`, `EMBED_LINKS`, and `MENTION_EVERYONE`. In addition, `USE_EXTERNAL_EMOJIS` will be included for DMs with the app's bot user. */
    appPermissions;
    /** Details about the authorizing user or server for the installation(s) relevant to the interaction. See [Discord's docs](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object) for more information. */
    authorizingIntegrationOwners;
    /** The ID of the channel this interaction was sent from. */
    channelID;
    /** The context this interaction was sent from. */
    context;
    /** The data associated with the interaction. */
    data;
    /** The entitlements for the user that created this interaction, and the guild it was created in. */
    entitlements;
    /** The id of the guild this interaction was sent from, if applicable. */
    guildID;
    /** The preferred [locale](https://discord.com/developers/docs/reference#locales) of the guild this interaction was sent from, if applicable. */
    guildLocale;
    /** The partial guild this interaction was sent from, if applicable. */
    guildPartial;
    /** The [locale](https://discord.com/developers/docs/reference#locales) of the invoking user. */
    locale;
    /** The member associated with the invoking user, if this interaction is sent from a guild. */
    member;
    /** The permissions of the member associated with the invoking user, if this interaction is sent from a guild. */
    memberPermissions;
    /** The user that invoked this interaction. */
    user;
    constructor(data, client) {
        super(data, client);
        this.appPermissions = new Permission_1.default(data.app_permissions ?? "0");
        this.authorizingIntegrationOwners = data.authorizing_integration_owners;
        this.channelID = data.channel_id;
        this.context = data.context;
        const resolved = {
            attachments: new TypedCollection_1.default(Attachment_1.default, client),
            channels: new TypedCollection_1.default(InteractionResolvedChannel_1.default, client),
            members: new TypedCollection_1.default(Member_1.default, client),
            messages: new TypedCollection_1.default(Message_1.default, client),
            roles: new TypedCollection_1.default(Role_1.default, client),
            users: new TypedCollection_1.default(User_1.default, client)
        };
        this.entitlements = data.entitlements?.map(entitlement => client.util.updateEntitlement(entitlement)) ?? [];
        this.guildID = (data.guild_id ?? null);
        this.guildLocale = data.guild_locale;
        this.guildPartial = data.guild;
        this.locale = data.locale;
        this.member = (data.member === undefined ? null : this.client.util.updateMember(data.guild_id, data.member.user.id, data.member));
        this.memberPermissions = (data.member === undefined ? null : new Permission_1.default(data.member.permissions));
        this.user = client.users.update((data.user ?? data.member.user));
        if (data.data.resolved) {
            if (data.data.resolved.attachments) {
                for (const attachment of Object.values(data.data.resolved.attachments))
                    resolved.attachments.update(attachment);
            }
            if (data.data.resolved.channels) {
                for (const channel of Object.values(data.data.resolved.channels))
                    resolved.channels.update(channel);
            }
            if (data.data.resolved.members) {
                for (const [id, member] of Object.entries(data.data.resolved.members)) {
                    const m = member;
                    m.user = data.data.resolved.users[id];
                    resolved.members.add(client.util.updateMember(data.guild_id, id, m));
                }
            }
            if (data.data.resolved.messages) {
                for (const message of Object.values(data.data.resolved.messages)) {
                    const channel = client.getChannel(message.channel_id);
                    if (channel && "messages" in channel) {
                        resolved.messages.add(channel.messages.update(message));
                    }
                    else {
                        resolved.messages.update(message);
                    }
                }
            }
            if (data.data.resolved.roles) {
                for (const role of Object.values(data.data.resolved.roles)) {
                    try {
                        resolved.roles.add(this.guild?.roles.update(role, this.guildID) ?? new Role_1.default(role, client, this.guildID));
                    }
                    catch {
                        resolved.roles.add(new Role_1.default(role, client, this.guildID));
                    }
                }
            }
            if (data.data.resolved.users) {
                for (const user of Object.values(data.data.resolved.users))
                    resolved.users.add(client.users.update(user));
            }
        }
        this.data = {
            guildID: data.data.guild_id,
            id: data.data.id,
            name: data.data.name,
            options: new InteractionOptionsWrapper_1.default(data.data.options ?? [], resolved ?? null),
            resolved,
            target: null,
            targetID: data.data.target_id,
            type: data.data.type
        };
        if (this.data.targetID) {
            if (this.data.type === Constants_1.ApplicationCommandTypes.USER) {
                this.data.target = resolved.users.get(this.data.targetID);
            }
            else if (this.data.type === Constants_1.ApplicationCommandTypes.MESSAGE) {
                this.data.target = resolved.messages.get(this.data.targetID);
            }
        }
    }
    /** The channel this interaction was sent from. */
    get channel() {
        return this._cachedChannel ??= this.client.getChannel(this.channelID);
    }
    /** The guild this interaction was sent from, if applicable. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            this._cachedGuild ??= this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                throw new Errors_1.UncachedError(this, "guild", "GUILDS", this.client);
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    /**
     * Create a followup message. Note that the returned class is not a message. The message is located in the property {@link MessageInteractionResponse#message | message}.
     * @param options The options for creating the followup message.
     */
    async createFollowup(options) {
        const message = await this.client.rest.interactions.createFollowupMessage(this.applicationID, this.token, options);
        return new MessageInteractionResponse_1.default(this, message, "followup");
    }
    /**
     * Create a message through this interaction. This is an initial response, and more than one initial response cannot be used. Use {@link CommandInteraction#createFollowup | createFollowup}.
     * Note that the returned class is not a message. This initial response does not return a message. You will need to call {@link MessageInteractionResponse#getMessage | MessageInteractionResponse#getMessage} on the returned class,
     * or {@link CommandInteraction#getOriginal | getOriginal}.
     * @note You cannot attach files in an initial response. Defer the interaction, then use {@link CommandInteraction#createFollowup | createFollowup}.
     * @param options The options for the message.
     */
    async createMessage(options) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        if ("files" in options && options.files.length !== 0) {
            this.client.emit("warn", "You cannot attach files in an initial response. Defer the interaction, then use createFollowup.");
        }
        this.acknowledged = true;
        await this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE, data: options });
        return new MessageInteractionResponse_1.default(this, null, "initial");
    }
    /**
     * Respond to this interaction with a modal. This is an initial response, and more than one initial response cannot be used.
     * @param options The options for the modal.
     */
    async createModal(options) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.MODAL, data: options });
    }
    /**
     * Defer this interaction. This is an initial response, and more than one initial response cannot be used.
     * @param flags The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) to respond with.
     */
    async defer(flags) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE, data: { flags } });
    }
    /**
     * Delete a follow-up message.
     * @param messageID The ID of the message.
     */
    async deleteFollowup(messageID) {
        return this.client.rest.interactions.deleteFollowupMessage(this.applicationID, this.token, messageID);
    }
    /**
     * Delete the original interaction response.
     */
    async deleteOriginal() {
        return this.client.rest.interactions.deleteOriginalMessage(this.applicationID, this.token);
    }
    /**
     * Edit a followup message.
     * @param messageID The ID of the message.
     * @param options The options for editing the followup message.
     */
    async editFollowup(messageID, options) {
        return this.client.rest.interactions.editFollowupMessage(this.applicationID, this.token, messageID, options);
    }
    /**
     * Edit the original interaction response.
     * @param options The options for editing the original message.
     */
    async editOriginal(options) {
        return this.client.rest.interactions.editOriginalMessage(this.applicationID, this.token, options);
    }
    /**
     * Get a followup message.
     * @param messageID The ID of the message.
     */
    async getFollowup(messageID) {
        return this.client.rest.interactions.getFollowupMessage(this.applicationID, this.token, messageID);
    }
    /**
     * Get the original interaction response.
     */
    async getOriginal() {
        return this.client.rest.interactions.getOriginalMessage(this.applicationID, this.token);
    }
    /** Whether this interaction belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel() {
        return this.channel instanceof GuildChannel_1.default;
    }
    /** Whether this interaction belongs to a private channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inPrivateChannel() {
        return this.guildID === null;
    }
    /** A type guard, checking if this command interaction is a {@link Constants~ApplicationCommandTypes.CHAT_INPUT | Chat Input} command. */
    isChatInputCommand() {
        return this.data.type === Constants_1.ApplicationCommandTypes.CHAT_INPUT;
    }
    /** A type guard, checking if this command interaction is a {@link Constants~ApplicationCommandTypes.MESSAGE | Message} command. */
    isMessageCommand() {
        return this.data.type === Constants_1.ApplicationCommandTypes.MESSAGE;
    }
    /** A type guard, checking if this command interaction is a {@link Constants~ApplicationCommandTypes.USER | User} command. */
    isUserCommand() {
        return this.data.type === Constants_1.ApplicationCommandTypes.USER;
    }
    /**
     * Show a "premium required" response to the user. This is an initial response, and more than one initial response cannot be used.
     * @deprecated The {@link Constants~InteractionResponseTypes.PREMIUM_REQUIRED | PREMIUM_REQUIRED} interaction response type is now deprecated in favor of using {@link Types/Channels~PremiumButton | custom premium buttons}.
     */
    async premiumRequired() {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.PREMIUM_REQUIRED, data: {} });
    }
    /**
     * Reply to this interaction. If the interaction hasn't been acknowledged, {@link CommandInteraction#createMessage | createMessage} is used. Else, {@link CommandInteraction#createFollowup | createFollowup} is used.
     * Note the returned class is not a message. Depending on which method was used, the returned class may or may not have the sent message. {@link MessageInteractionResponse#hasMessage | hasMessage} can be used for type narrowing
     * to check if {@link MessageInteractionResponse#message | message} is present. If it is not, the {@link MessageInteractionResponse#getMessage | getMessage} can be used.
     * @note Due to atachments not being able to be sent in initial responses, attachments will cause a deferred response, if the interaction has not been acknowledged.
     * @param options The options for the message.
     */
    async reply(options) {
        let useFollowup = this.acknowledged;
        if (!useFollowup && options.files && options.files.length !== 0) {
            await this.defer(options.flags);
            useFollowup = true;
        }
        return useFollowup ? this.createFollowup(options) : this.createMessage(options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            appPermissions: this.appPermissions.toJSON(),
            authorizingIntegrationOwners: this.authorizingIntegrationOwners,
            channelID: this.channelID,
            context: this.context,
            data: this.data,
            guildID: this.guildID ?? undefined,
            guildLocale: this.guildLocale,
            locale: this.locale,
            member: this.member?.toJSON(),
            type: this.type,
            user: this.user.toJSON()
        };
    }
}
exports["default"] = CommandInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZEludGVyYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvQ29tbWFuZEludGVyYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQyx3RUFBd0M7QUFDeEMsc0VBQXNDO0FBQ3RDLDhEQUE4QjtBQUM5QixnRUFBZ0M7QUFDaEMsMERBQTBCO0FBQzFCLDBEQUEwQjtBQUUxQixzRUFBc0M7QUFDdEMsMEVBQTBDO0FBRTFDLHNHQUFzRTtBQUd0RSxzRkFBc0Q7QUFDdEQsNENBQXNJO0FBaUJ0SSx1SEFBdUY7QUFFdkYsMkNBQStDO0FBQy9DLHlIQUErSztBQUUvSyx3Q0FBd0M7QUFDeEMsTUFBcUIsa0JBQStKLFNBQVEscUJBQVc7SUFDM0wsY0FBYyxDQUFtRDtJQUNqRSxZQUFZLENBQTREO0lBQ2hGLG9RQUFvUTtJQUNwUSxjQUFjLENBQWE7SUFDM0IsdVJBQXVSO0lBQ3ZSLDRCQUE0QixDQUErQjtJQUMzRCw0REFBNEQ7SUFDNUQsU0FBUyxDQUFTO0lBQ2xCLGtEQUFrRDtJQUNsRCxPQUFPLENBQTJCO0lBQ2xDLGdEQUFnRDtJQUNoRCxJQUFJLENBQTBDO0lBQzlDLG9HQUFvRztJQUNwRyxZQUFZLENBQXVDO0lBQ25ELHlFQUF5RTtJQUN6RSxPQUFPLENBQTZEO0lBQ3BFLGdKQUFnSjtJQUNoSixXQUFXLENBQWtFO0lBQzdFLHVFQUF1RTtJQUN2RSxZQUFZLENBQXVGO0lBQ25HLGdHQUFnRztJQUNoRyxNQUFNLENBQVM7SUFDZiw4RkFBOEY7SUFDOUYsTUFBTSxDQUE2RDtJQUNuRSxpSEFBaUg7SUFDakgsaUJBQWlCLENBQXFFO0lBRXRGLDhDQUE4QztJQUM5QyxJQUFJLENBQU87SUFDWCxZQUFZLElBQXNDLEVBQUUsTUFBYztRQUM5RCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcs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

/***/ }),

/***/ 2737:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module ComponentInteraction */
const Interaction_1 = tslib_1.__importDefault(__webpack_require__(4850));
const Message_1 = tslib_1.__importDefault(__webpack_require__(5709));
const Member_1 = tslib_1.__importDefault(__webpack_require__(7826));
const Permission_1 = tslib_1.__importDefault(__webpack_require__(2739));
const GuildChannel_1 = tslib_1.__importDefault(__webpack_require__(4554));
const Role_1 = tslib_1.__importDefault(__webpack_require__(3364));
const User_1 = tslib_1.__importDefault(__webpack_require__(4199));
const InteractionResolvedChannel_1 = tslib_1.__importDefault(__webpack_require__(1287));
const Constants_1 = __webpack_require__(146);
const SelectMenuValuesWrapper_1 = tslib_1.__importDefault(__webpack_require__(3560));
const TypedCollection_1 = tslib_1.__importDefault(__webpack_require__(5288));
const Errors_1 = __webpack_require__(3961);
const MessageInteractionResponse_1 = tslib_1.__importDefault(__webpack_require__(1312));
/** Represents a component interaction. */
class ComponentInteraction extends Interaction_1.default {
    _cachedChannel;
    _cachedGuild;
    /** The permissions the bot has in the channel this interaction was sent from. If in a dm/group dm, this will contain `ATTACH_FILES`, `EMBED_LINKS`, and `MENTION_EVERYONE`. In addition, `USE_EXTERNAL_EMOJIS` will be included for DMs with the app's bot user. */
    appPermissions;
    /** Details about the authorizing user or server for the installation(s) relevant to the interaction. See [Discord's docs](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object) for more information. */
    authorizingIntegrationOwners;
    /** The ID of the channel this interaction was sent from. */
    channelID;
    /** The context this interaction was sent from. */
    context;
    /** The data associated with the interaction. */
    data;
    /** The entitlements for the user that created this interaction, and the guild it was created in. */
    entitlements;
    /** The id of the guild this interaction was sent from, if applicable. */
    guildID;
    /** The preferred [locale](https://discord.com/developers/docs/reference#locales) of the guild this interaction was sent from, if applicable. */
    guildLocale;
    /** The partial guild this interaction was sent from, if applicable. */
    guildPartial;
    /** The [locale](https://discord.com/developers/docs/reference#locales) of the invoking user. */
    locale;
    /** The member associated with the invoking user, if this interaction is sent from a guild. */
    member;
    /** The permissions of the member associated with the invoking user, if this interaction is sent from a guild. */
    memberPermissions;
    /** The message the interaction is from. */
    message;
    /** The user that invoked this interaction. */
    user;
    constructor(data, client) {
        super(data, client);
        if (data.message !== undefined && data.guild_id !== undefined) {
            data.message.guild_id = data.guild_id;
        }
        this.appPermissions = new Permission_1.default(data.app_permissions ?? "0");
        this.authorizingIntegrationOwners = data.authorizing_integration_owners;
        this.channelID = data.channel_id;
        this.context = data.context;
        this.entitlements = data.entitlements?.map(entitlement => client.util.updateEntitlement(entitlement)) ?? [];
        this.guildID = (data.guild_id ?? null);
        this.guildLocale = data.guild_locale;
        this.guildPartial = data.guild;
        this.locale = data.locale;
        this.member = (data.member === undefined ? null : this.client.util.updateMember(data.guild_id, data.member.user.id, data.member));
        this.memberPermissions = (data.member === undefined ? null : new Permission_1.default(data.member.permissions));
        this.message = (this.channel && "messages" in this.channel && this.channel.messages.update(data.message)) || new Message_1.default(data.message, client);
        this.user = client.users.update((data.user ?? data.member.user));
        switch (data.data.component_type) {
            case Constants_1.ComponentTypes.BUTTON: {
                this.data = {
                    componentType: data.data.component_type,
                    customID: data.data.custom_id
                };
                break;
            }
            case Constants_1.ComponentTypes.STRING_SELECT:
            case Constants_1.ComponentTypes.USER_SELECT:
            case Constants_1.ComponentTypes.ROLE_SELECT:
            case Constants_1.ComponentTypes.MENTIONABLE_SELECT:
            case Constants_1.ComponentTypes.CHANNEL_SELECT: {
                const resolved = {
                    channels: new TypedCollection_1.default(InteractionResolvedChannel_1.default, client),
                    members: new TypedCollection_1.default(Member_1.default, client),
                    roles: new TypedCollection_1.default(Role_1.default, client),
                    users: new TypedCollection_1.default(User_1.default, client)
                };
                if (data.data.resolved) {
                    if (data.data.resolved.channels) {
                        for (const channel of Object.values(data.data.resolved.channels))
                            resolved.channels.update(channel);
                    }
                    if (data.data.resolved.members) {
                        for (const [id, member] of Object.entries(data.data.resolved.members)) {
                            const m = member;
                            m.user = data.data.resolved.users[id];
                            resolved.members.add(client.util.updateMember(data.guild_id, id, m));
                        }
                    }
                    if (data.data.resolved.roles) {
                        for (const role of Object.values(data.data.resolved.roles)) {
                            try {
                                resolved.roles.add(this.guild?.roles.update(role, this.guildID) ?? new Role_1.default(role, client, this.guildID));
                            }
                            catch {
                                resolved.roles.add(new Role_1.default(role, client, this.guildID));
                            }
                        }
                    }
                    if (data.data.resolved.users) {
                        for (const user of Object.values(data.data.resolved.users))
                            resolved.users.add(client.users.update(user));
                    }
                }
                this.data = {
                    componentType: data.data.component_type,
                    customID: data.data.custom_id,
                    values: new SelectMenuValuesWrapper_1.default(resolved, data.data.values),
                    resolved
                };
                break;
            }
        }
    }
    /** The channel this interaction was sent from. */
    get channel() {
        return this._cachedChannel ??= this.client.getChannel(this.channelID);
    }
    /** The guild this interaction was sent from, if applicable. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            this._cachedGuild = this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                throw new Errors_1.UncachedError(this, "guild", "GUILDS", this.client);
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    /**
     * Create a followup message. Note that the returned class is not a message. The message is located in the property {@link MessageInteractionResponse#message | message}.
     * @param options The options for creating the followup message.
     */
    async createFollowup(options) {
        const message = await this.client.rest.interactions.createFollowupMessage(this.applicationID, this.token, options);
        return new MessageInteractionResponse_1.default(this, message, "followup");
    }
    /**
     * Create a message through this interaction. This is an initial response, and more than one initial response cannot be used. Use  {@link ComponentInteraction#createFollowup | createFollowup}.
     * Note that the returned class is not a message. This initial response does not return a message. You will need to call {@link MessageInteractionResponse#getMessage | MessageInteractionResponse#getMessage} on the returned class,
     * or {@link ComponentInteraction#getOriginal | getOriginal}.
     * @note You cannot attach files in an initial response. Defer the interaction, then use {@link ComponentInteraction#createFollowup | createFollowup}.
     * @param options The options for the message.
     */
    async createMessage(options) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        if ("files" in options && options.files.length !== 0) {
            this.client.emit("warn", "You cannot attach files in an initial response. Defer the interaction, then use createFollowup.");
        }
        this.acknowledged = true;
        await this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE, data: options });
        return new MessageInteractionResponse_1.default(this, null, "initial");
    }
    /**
     * Respond to this interaction with a modal. This is an initial response, and more than one initial response cannot be used.
     * @param options The options for the modal.
     */
    async createModal(options) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.MODAL, data: options });
    }
    /**
     * Defer this interaction with a `DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE` response. This is an initial response, and more than one initial response cannot be used.
     * @param flags The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) to respond with.
     */
    async defer(flags) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE, data: { flags } });
    }
    /**
     * Defer this interaction with a `DEFERRED_UPDATE_MESSAGE` response. This is an initial response, and more than one initial response cannot be used.
     * @param flags The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) to respond with.
     */
    async deferUpdate(flags) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.DEFERRED_UPDATE_MESSAGE, data: { flags } });
    }
    /**
     * Delete a follow-up message.
     * @param messageID The ID of the message.
     */
    async deleteFollowup(messageID) {
        return this.client.rest.interactions.deleteFollowupMessage(this.applicationID, this.token, messageID);
    }
    /**
     * Delete the original interaction response.
     */
    async deleteOriginal() {
        return this.client.rest.interactions.deleteOriginalMessage(this.applicationID, this.token);
    }
    /**
     * Edit a followup message.
     * @param messageID The ID of the message.
     * @param options The options for editing the followup message.
     */
    async editFollowup(messageID, options) {
        return this.client.rest.interactions.editFollowupMessage(this.applicationID, this.token, messageID, options);
    }
    /**
     * Edit the original interaction response.
     * @param options The options for editing the original message.
     */
    async editOriginal(options) {
        return this.client.rest.interactions.editOriginalMessage(this.applicationID, this.token, options);
    }
    /**
     * Edit the message this interaction is from. If this interaction has already been acknowledged, use `editOriginal`.
     * @param options The options for editing the message.
     */
    async editParent(options) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.UPDATE_MESSAGE, data: options });
    }
    /**
     * Get a followup message.
     * @param messageID The ID of the message.
     */
    async getFollowup(messageID) {
        return this.client.rest.interactions.getFollowupMessage(this.applicationID, this.token, messageID);
    }
    /**
     * Get the original interaction response.
     */
    async getOriginal() {
        return this.client.rest.interactions.getOriginalMessage(this.applicationID, this.token);
    }
    /** Whether this interaction belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel() {
        return this.channel instanceof GuildChannel_1.default;
    }
    /** Whether this interaction belongs to a private channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inPrivateChannel() {
        return this.guildID === null;
    }
    /** Whether this interaction is a button interaction. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the component type. */
    isButtonComponentInteraction() {
        return this.data.componentType === Constants_1.ComponentTypes.BUTTON;
    }
    /** Whether this interaction is a select menu interaction. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the component type. */
    isSelectMenuComponentInteraction() {
        return this.data.componentType === Constants_1.ComponentTypes.STRING_SELECT
            || this.data.componentType === Constants_1.ComponentTypes.CHANNEL_SELECT
            || this.data.componentType === Constants_1.ComponentTypes.ROLE_SELECT
            || this.data.componentType === Constants_1.ComponentTypes.MENTIONABLE_SELECT
            || this.data.componentType === Constants_1.ComponentTypes.USER_SELECT;
    }
    /**
     * Show a "premium required" response to the user. This is an initial response, and more than one initial response cannot be used.
     * @deprecated The {@link Constants~InteractionResponseTypes.PREMIUM_REQUIRED | PREMIUM_REQUIRED} interaction response type is now deprecated in favor of using {@link Types/Channels~PremiumButton | custom premium buttons}.
     */
    async premiumRequired() {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.PREMIUM_REQUIRED, data: {} });
    }
    /**
     * Reply to this interaction. If the interaction hasn't been acknowledged, {@link ComponentInteraction#createMessage | createMessage} is used. Else, {@link ComponentInteraction#createFollowup | createFollowup} is used.
     * Note the returned class is not a message. Depending on which method was used, the returned class may or may not have the sent message. {@link MessageInteractionResponse#hasMessage | hasMessage} can be used for type narrowing
     * to check if {@link MessageInteractionResponse#message | message} is present. If it is not, the {@link MessageInteractionResponse#getMessage | getMessage} can be used.
     * @note Due to atachments not being able to be sent in initial responses, attachments will cause a deferred response, if the interaction has not been acknowledged.
     * @param options The options for the message.
     */
    async reply(options) {
        let useFollowup = this.acknowledged;
        if (!useFollowup && options.files && options.files.length !== 0) {
            await this.defer(options.flags);
            useFollowup = true;
        }
        return useFollowup ? this.createFollowup(options) : this.createMessage(options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            appPermissions: this.appPermissions.toJSON(),
            authorizingIntegrationOwners: this.authorizingIntegrationOwners,
            channelID: this.channelID,
            context: this.context,
            data: this.data,
            guildID: this.guildID ?? undefined,
            guildLocale: this.guildLocale,
            locale: this.locale,
            member: this.member?.toJSON(),
            type: this.type,
            user: this.user.toJSON()
        };
    }
}
exports["default"] = ComponentInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9uZW50SW50ZXJhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9Db21wb25lbnRJbnRlcmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsd0VBQXdDO0FBQ3hDLGdFQUFnQztBQUVoQyw4REFBOEI7QUFDOUIsc0VBQXNDO0FBQ3RDLDBFQUEwQztBQUUxQywwREFBMEI7QUFDMUIsMERBQTBCO0FBQzFCLHNHQUFzRTtBQXFCdEUsNENBTXNCO0FBQ3RCLG1IQUFtRjtBQUNuRixzRkFBc0Q7QUFDdEQsMkNBQStDO0FBQy9DLHlIQUErSztBQUUvSywwQ0FBMEM7QUFDMUMsTUFBcUIsb0JBQWlNLFNBQVEscUJBQVc7SUFDN04sY0FBYyxDQUFtRDtJQUNqRSxZQUFZLENBQTREO0lBQ2hGLG9RQUFvUTtJQUNwUSxjQUFjLENBQWE7SUFDM0IsdVJBQXVSO0lBQ3ZSLDRCQUE0QixDQUErQjtJQUMzRCw0REFBNEQ7SUFDNUQsU0FBUyxDQUFTO0lBQ2xCLGtEQUFrRDtJQUNsRCxPQUFPLENBQTJCO0lBQ2xDLGdEQUFnRDtJQUNoRCxJQUFJLENBQXNIO0lBQzFILG9HQUFvRztJQUNwRyxZQUFZLENBQXVDO0lBQ25ELHlFQUF5RTtJQUN6RSxPQUFPLENBQTZEO0lBQ3BFLGdKQUFnSjtJQUNoSixXQUFXLENBQWtFO0lBQzdFLHVFQUF1RTtJQUN2RSxZQUFZLENBQXVGO0lBQ25HLGdHQUFnRztJQUNoRyxNQUFNLENBQVM7SUFDZiw4RkFBOEY7SUFDOUYsTUFBTSxDQUE2RDtJQUNuRSxpSEFBaUg7SUFDakgsaUJBQWlCLENBQXFFO0lBQ3RGLDJDQUEyQztJQUMzQyxPQUFPLENBQWE7SUFFcEIsOENBQThDO0lBQzlDLElBQUksQ0FBTztJQUNYLFlBQVksSUFBb0MsRUFBRSxNQUFjO1FBQzVELEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIs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

/***/ }),

/***/ 4850:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module Interaction */
const Base_1 = tslib_1.__importDefault(__webpack_require__(4873));
const Constants_1 = __webpack_require__(146);
/** Represents an interaction. */
class Interaction extends Base_1.default {
    /** If this interaction has been acknowledged. */
    acknowledged;
    /** The application this interaction is for. */
    application;
    /** The ID of the application this interaction is for. */
    applicationID;
    /** The token of this interaction. */
    token;
    /** The [type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type) of this interaction. */
    type;
    /** Read-only property, always `1` */
    version;
    constructor(data, client) {
        super(data.id, client);
        this.acknowledged = false;
        this.application = client["_application"] && client.application.id === data.application_id ? client.application : undefined;
        this.applicationID = data.application_id;
        Object.defineProperty(this, "token", { value: data.token, enumerable: false });
        this.type = data.type;
        this.version = data.version;
    }
    static from(data, client) {
        switch (data.type) {
            case Constants_1.InteractionTypes.PING: {
                return new PingInteraction(data, client);
            }
            case Constants_1.InteractionTypes.APPLICATION_COMMAND: {
                return new CommandInteraction(data, client);
            }
            case Constants_1.InteractionTypes.MESSAGE_COMPONENT: {
                return new ComponentInteraction(data, client);
            }
            case Constants_1.InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE: {
                return new AutocompleteInteraction(data, client);
            }
            case Constants_1.InteractionTypes.MODAL_SUBMIT: {
                return new ModalSubmitInteraction(data, client);
            }
            default: {
                return new Interaction(data, client);
            }
        }
    }
    /** A type guard, checking if this interaction is an {@link AutocompleteInteraction | Autocomplete Interaction}. */
    isAutocompleteInteraction() {
        return this.type === Constants_1.InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE;
    }
    /** A type guard, checking if this interaction is a {@link CommandInteraction | Command Interaction}. */
    isCommandInteraction() {
        return this.type === Constants_1.InteractionTypes.APPLICATION_COMMAND;
    }
    /** A type guard, checking if this interaction is a {@link ComponentInteraction | Component Interaction}. */
    isComponentInteraction() {
        return this.type === Constants_1.InteractionTypes.MESSAGE_COMPONENT;
    }
    /** A type guard, checking if this interaction is a {@link ModalSubmitInteraction | Modal Submit Interaction}. */
    isModalSubmitInteraction() {
        return this.type === Constants_1.InteractionTypes.MODAL_SUBMIT;
    }
    /** A type guard, checking if this interaction is a {@link PingInteraction | Ping Interaction}. */
    isPingInteraction() {
        return this.type === Constants_1.InteractionTypes.PING;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            type: this.type,
            version: this.version
        };
    }
}
exports["default"] = Interaction;
// Yes this sucks, but it works. That's the important part. Circular imports are hell.
/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */
const AutocompleteInteraction = (__webpack_require__(950)["default"]);
const CommandInteraction = (__webpack_require__(8359)["default"]);
const ComponentInteraction = (__webpack_require__(2737)["default"]);
const ModalSubmitInteraction = (__webpack_require__(5243)["default"]);
const PingInteraction = (__webpack_require__(1846)["default"]);
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlcmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsMERBQTBCO0FBaUIxQiw0Q0FBZ0Q7QUFJaEQsaUNBQWlDO0FBQ2pDLE1BQXFCLFdBQVksU0FBUSxjQUFJO0lBQ3pDLGlEQUFpRDtJQUNqRCxZQUFZLENBQVU7SUFDdEIsK0NBQStDO0lBQy9DLFdBQVcsQ0FBcUI7SUFDaEMseURBQXlEO0lBQ3pELGFBQWEsQ0FBUztJQUN0QixxQ0FBcUM7SUFDckMsS0FBSyxDQUFVO0lBQ2YscUpBQXFKO0lBQ3JKLElBQUksQ0FBbUI7SUFDdkIscUNBQXFDO0lBQ3JDLE9BQU8sQ0FBSTtJQUNYLFlBQVksSUFBdUIsRUFBRSxNQUFjO1FBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUM1SCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDekMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJ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

/***/ }),

/***/ 1287:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
const Permission_1 = tslib_1.__importDefault(__webpack_require__(2739));
const Channel_1 = tslib_1.__importDefault(__webpack_require__(2381));
/** Represents a channel from an interaction option. This can be any guild channel, or a direct message. */
class InteractionResolvedChannel extends Channel_1.default {
    _cachedCompleteChannel;
    _cachedParent;
    /** The permissions the bot has in the channel. */
    appPermissions;
    /** The name of this channel. */
    name;
    /** The ID of the parent of this channel, if this represents a thread. */
    parentID;
    /** The [thread metadata](https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure) associated with this channel, if this represents a thread. */
    threadMetadata;
    constructor(data, client) {
        super(data, client);
        this.appPermissions = new Permission_1.default(data.permissions ?? "0");
        this.name = data.name;
        this.parentID = data.parent_id ?? null;
        this.threadMetadata = data.thread_metadata ? {
            archiveTimestamp: new Date(data.thread_metadata.archive_timestamp),
            archived: !!data.thread_metadata.archived,
            autoArchiveDuration: data.thread_metadata.auto_archive_duration,
            createTimestamp: data.thread_metadata.create_timestamp ? new Date(data.thread_metadata.create_timestamp) : null,
            locked: !!data.thread_metadata.locked,
            invitable: data.thread_metadata.invitable
        } : null;
    }
    /** The complete channel this channel option represents, if it's cached. */
    get completeChannel() {
        return this._cachedCompleteChannel ??= this.client.getChannel(this.id);
    }
    /** The parent of this channel, if this represents a thread. */
    get parent() {
        if (this.parentID !== null && this._cachedParent !== null) {
            return this._cachedParent ?? (this._cachedParent = this.client.getChannel(this.parentID));
        }
        return this._cachedParent === null ? this._cachedParent : (this._cachedParent = null);
    }
}
exports["default"] = InteractionResolvedChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25SZXNvbHZlZENoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlcmFjdGlvblJlc29sdmVkQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxzRUFBc0M7QUFDdEMsZ0VBQWdDO0FBTWhDLDJHQUEyRztBQUMzRyxNQUFxQiwwQkFBMkIsU0FBUSxpQkFBTztJQUNuRCxzQkFBc0IsQ0FBeUI7SUFDL0MsYUFBYSxDQUEyRDtJQUNoRixrREFBa0Q7SUFDbEQsY0FBYyxDQUFhO0lBQzNCLGdDQUFnQztJQUNoQyxJQUFJLENBQWdCO0lBQ3BCLHlFQUF5RTtJQUN6RSxRQUFRLENBQWdCO0lBQ3hCLCtMQUErTDtJQUMvTCxjQUFjLENBQWdEO0lBRTlELFlBQVksSUFBbUMsRUFBRSxNQUFjO1FBQzNELEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLG9CQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLGdCQUFnQixFQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7WUFDckUsUUFBUSxFQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7WUFDcEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUI7WUFDL0QsZUFBZSxFQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNuSCxNQUFNLEVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTTtZQUNsRCxTQUFTLEVBQVksSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTO1NBQ3RELENBQUMsQ0FBQyxDQUFFLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCwyRUFBMkU7SUFDM0UsSUFBSSxlQUFlO1FBQ2YsT0FBTyxJQUFJLENBQUMsc0JBQXNCLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCwrREFBK0Q7SUFDL0QsSUFBSSxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3hELE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQW1ELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2hKLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDMUYsQ0FBQztDQUNKO0FBeENELDZDQXdDQyJ9

/***/ }),

/***/ 5243:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module ModalSubmitInteraction */
const Interaction_1 = tslib_1.__importDefault(__webpack_require__(4850));
const Permission_1 = tslib_1.__importDefault(__webpack_require__(2739));
const Message_1 = tslib_1.__importDefault(__webpack_require__(5709));
const GuildChannel_1 = tslib_1.__importDefault(__webpack_require__(4554));
const Constants_1 = __webpack_require__(146);
const Errors_1 = __webpack_require__(3961);
const MessageInteractionResponse_1 = tslib_1.__importDefault(__webpack_require__(1312));
const ModalSubmitInteractionComponentsWrapper_1 = tslib_1.__importDefault(__webpack_require__(6758));
/** Represents a modal submit interaction. */
class ModalSubmitInteraction extends Interaction_1.default {
    _cachedChannel;
    _cachedGuild;
    /** The permissions the bot has in the channel this interaction was sent from. If in a dm/group dm, this will contain `ATTACH_FILES`, `EMBED_LINKS`, and `MENTION_EVERYONE`. In addition, `USE_EXTERNAL_EMOJIS` will be included for DMs with the app's bot user. */
    appPermissions;
    /** Details about the authorizing user or server for the installation(s) relevant to the interaction. See [Discord's docs](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object) for more information. */
    authorizingIntegrationOwners;
    /** The ID of the channel this interaction was sent from. */
    channelID;
    /** The context this interaction was sent from. */
    context;
    /** The data associated with the interaction. */
    data;
    /** The entitlements for the user that created this interaction, and the guild it was created in. */
    entitlements;
    /** The id of the guild this interaction was sent from, if applicable. */
    guildID;
    /** The preferred [locale](https://discord.com/developers/docs/reference#locales) of the guild this interaction was sent from, if applicable. */
    guildLocale;
    /** The partial guild this interaction was sent from, if applicable. */
    guildPartial;
    /** The [locale](https://discord.com/developers/docs/reference#locales) of the invoking user. */
    locale;
    /** The member associated with the invoking user, if this interaction is sent from a guild. */
    member;
    /** The permissions of the member associated with the invoking user, if this interaction is sent from a guild. */
    memberPermissions;
    /** The message this interaction is from, if the modal was triggered from a component interaction. */
    message;
    /** The user that invoked this interaction. */
    user;
    constructor(data, client) {
        super(data, client);
        if (data.message !== undefined && data.guild_id !== undefined) {
            data.message.guild_id = data.guild_id;
        }
        this.appPermissions = new Permission_1.default(data.app_permissions ?? "0");
        this.authorizingIntegrationOwners = data.authorizing_integration_owners;
        this.channelID = data.channel_id;
        this.context = data.context;
        this.data = {
            components: new ModalSubmitInteractionComponentsWrapper_1.default(client.util.modalSubmitComponentsToParsed(data.data.components)),
            customID: data.data.custom_id
        };
        this.entitlements = data.entitlements?.map(entitlement => client.util.updateEntitlement(entitlement)) ?? [];
        this.guildID = (data.guild_id ?? null);
        this.guildLocale = data.guild_locale;
        this.guildPartial = data.guild;
        this.locale = data.locale;
        this.member = (data.member === undefined ? null : this.client.util.updateMember(data.guild_id, data.member.user.id, data.member));
        this.memberPermissions = (data.member === undefined ? null : new Permission_1.default(data.member.permissions));
        if (data.message !== undefined) {
            this.message = (this.channel && "messages" in this.channel && this.channel.messages.update(data.message)) || new Message_1.default(data.message, client);
        }
        this.user = client.users.update(data.user ?? data.member.user);
    }
    /** The channel this interaction was sent from. */
    get channel() {
        return this._cachedChannel ??= this.client.getChannel(this.channelID);
    }
    /** The guild this interaction was sent from, if applicable. This will throw an error if the guild is not cached. */
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
     * Create a followup message. Note that the returned class is not a message. The message is located in the property {@link MessageInteractionResponse#message | message}.
     * @param options The options for creating the followup message.
     */
    async createFollowup(options) {
        const message = await this.client.rest.interactions.createFollowupMessage(this.applicationID, this.token, options);
        return new MessageInteractionResponse_1.default(this, message, "followup");
    }
    /**
     * Create a message through this interaction. This is an initial response, and more than one initial response cannot be used. Use {@link ModalSubmitInteraction#createFollowup | createFollowup}.
     * Note that the returned class is not a message. This initial response does not return a message. You will need to call {@link MessageInteractionResponse#getMessage | MessageInteractionResponse#getMessage} on the returned class,
     * or {@link ModalSubmitInteraction#getOriginal | getOriginal}.
     * @note You cannot attach files in an initial response. Defer the interaction, then use {@link ModalSubmitInteraction#createFollowup | createFollowup}.
     * @param options The options for the message.
     */
    async createMessage(options) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        if ("files" in options && options.files.length !== 0) {
            this.client.emit("warn", "You cannot attach files in an initial response. Defer the interaction, then use createFollowup.");
        }
        this.acknowledged = true;
        await this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE, data: options });
        return new MessageInteractionResponse_1.default(this, null, "initial");
    }
    /**
     * Defer this interaction. This is an initial response, and more than one initial response cannot be used.
     * @param flags The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) to respond with.
     */
    async defer(flags) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE, data: { flags } });
    }
    /**
     * Defer this interaction with a `DEFERRED_UPDATE_MESSAGE` response. This is an initial response, and more than one initial response cannot be used.
     * @param flags The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) to respond with.
     */
    async deferUpdate(flags) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.DEFERRED_UPDATE_MESSAGE, data: { flags } });
    }
    /**
     * Delete a follow-up message.
     * @param messageID The ID of the message.
     */
    async deleteFollowup(messageID) {
        return this.client.rest.interactions.deleteFollowupMessage(this.applicationID, this.token, messageID);
    }
    /**
     * Delete the original interaction response.
     */
    async deleteOriginal() {
        return this.client.rest.interactions.deleteOriginalMessage(this.applicationID, this.token);
    }
    /**
     * Edit a followup message.
     * @param messageID The ID of the message.
     * @param options The options for editing the followup message.
     */
    async editFollowup(messageID, options) {
        return this.client.rest.interactions.editFollowupMessage(this.applicationID, this.token, messageID, options);
    }
    /**
     * Edit the original interaction response.
     * @param options The options for editing the original message.
     */
    async editOriginal(options) {
        return this.client.rest.interactions.editOriginalMessage(this.applicationID, this.token, options);
    }
    /**
     * Edit the message this interaction is from. If this interaction has already been acknowledged, use `createFollowup`.
     * @param options The options for editing the message.
     */
    async editParent(options) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.UPDATE_MESSAGE, data: options });
    }
    /**
     * Get a followup message.
     * @param messageID The ID of the message.
     */
    async getFollowup(messageID) {
        return this.client.rest.interactions.getFollowupMessage(this.applicationID, this.token, messageID);
    }
    /**
     * Get the original interaction response.
     */
    async getOriginal() {
        return this.client.rest.interactions.getOriginalMessage(this.applicationID, this.token);
    }
    /** Whether this interaction belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel() {
        return this.channel instanceof GuildChannel_1.default;
    }
    /** Whether this interaction belongs to a private channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inPrivateChannel() {
        return this.guildID === null;
    }
    /**
     * Show a "premium required" response to the user. This is an initial response, and more than one initial response cannot be used.
     * @deprecated The {@link Constants~InteractionResponseTypes.PREMIUM_REQUIRED | PREMIUM_REQUIRED} interaction response type is now deprecated in favor of using {@link Types/Channels~PremiumButton | custom premium buttons}.
     */
    async premiumRequired() {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.PREMIUM_REQUIRED, data: {} });
    }
    /**
     * Reply to this interaction. If the interaction hasn't been acknowledged, {@link ModalSubmitInteraction#createMessage | createMessage} is used. Else, {@link ModalSubmitInteraction#createFollowup | createFollowup} is used.
     * Note the returned class is not a message. Depending on which method was used, the returned class may or may not have the sent message. {@link MessageInteractionResponse#hasMessage | hasMessage} can be used for type narrowing
     * to check if {@link MessageInteractionResponse#message | message} is present. If it is not, the {@link MessageInteractionResponse#getMessage | getMessage} can be used.
     * @note Due to atachments not being able to be sent in initial responses, attachments will cause a deferred response, if the interaction has not been acknowledged.
     * @param options The options for the message.
     */
    async reply(options) {
        let useFollowup = this.acknowledged;
        if (!useFollowup && options.files && options.files.length !== 0) {
            await this.defer(options.flags);
            useFollowup = true;
        }
        return useFollowup ? this.createFollowup(options) : this.createMessage(options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            appPermissions: this.appPermissions.toJSON(),
            authorizingIntegrationOwners: this.authorizingIntegrationOwners,
            channelID: this.channelID,
            context: this.context,
            data: this.data,
            guildID: this.guildID ?? undefined,
            guildLocale: this.guildLocale,
            locale: this.locale,
            member: this.member?.toJSON(),
            type: this.type,
            user: this.user.toJSON()
        };
    }
}
exports["default"] = ModalSubmitInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWxTdWJtaXRJbnRlcmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL01vZGFsU3VibWl0SW50ZXJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLHdFQUF3QztBQUl4QyxzRUFBc0M7QUFDdEMsZ0VBQWdDO0FBQ2hDLDBFQUEwQztBQUkxQyw0Q0FBNkc7QUFjN0csMkNBQStDO0FBQy9DLHlIQUErSztBQUMvSyxtSkFBbUg7QUFFbkgsNkNBQTZDO0FBQzdDLE1BQXFCLHNCQUFzRyxTQUFRLHFCQUFXO0lBQ2xJLGNBQWMsQ0FBbUQ7SUFDakUsWUFBWSxDQUE0RDtJQUNoRixvUUFBb1E7SUFDcFEsY0FBYyxDQUFhO0lBQzNCLHVSQUF1UjtJQUN2Uiw0QkFBNEIsQ0FBK0I7SUFDM0QsNERBQTREO0lBQzVELFNBQVMsQ0FBUztJQUNsQixrREFBa0Q7SUFDbEQsT0FBTyxDQUEyQjtJQUNsQyxnREFBZ0Q7SUFDaEQsSUFBSSxDQUE2QjtJQUNqQyxvR0FBb0c7SUFDcEcsWUFBWSxDQUF1QztJQUNuRCx5RUFBeUU7SUFDekUsT0FBTyxDQUE2RDtJQUNwRSxnSkFBZ0o7SUFDaEosV0FBVyxDQUFrRTtJQUM3RSx1RUFBdUU7SUFDdkUsWUFBWSxDQUF1RjtJQUNuRyxnR0FBZ0c7SUFDaEcsTUFBTSxDQUFTO0lBQ2YsOEZBQThGO0lBQzlGLE1BQU0sQ0FBNkQ7SUFDbkUsaUhBQWlIO0lBQ2pILGlCQUFpQixDQUFxRTtJQUN0RixxR0FBcUc7SUFDckcsT0FBTyxDQUFjO0lBRXJCLDhDQUE4QztJQUM5QyxJQUFJLENBQU87SUFDWCxZQUFZLElBQStCLEVBQUUsTUFBYztRQUN2RCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzFDLENBQUM7UUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1IsVUFBVSxFQUFFLElBQUksaURBQXVDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hILFFBQVEsRUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7U0FDbEMsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBK0QsQ0FBQztRQUNyRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUErRSxDQUFDO1FBQ3hHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFPLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQStELENBQUM7UUFDak0sSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxvQkFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQXVFLENBQUM7UUFDNUssSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFnQixDQUFDLElBQUksSUFBSSxpQkFBTyxDQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEssQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxrREFBa0Q7SUFDbEQsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQW9ELENBQUM7SUFDN0gsQ0FBQztJQUVELG9IQUFvSDtJQUNwSCxJQUFJLEtBQUs7UUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdEQsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQy9CLE1BQU0sSUFBSSxzQkFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGtEQUFrRCxDQUFDLENBQUM7Z0JBQ3hHLENBQUM7Z0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNoQyxNQUFNLElBQUksc0JBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxxREFBcUQsQ0FBQyxDQUFDO2dCQUMzRyxDQUFDO2dCQUVELE1BQU0sSUFBSSxzQkFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHdCQUF3QixDQUFDLENBQUM7WUFDOUUsQ0FBQztZQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQWdFLENBQUMsQ0FBQztJQUNuSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUEyQjtRQUM1QyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBSSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEgsT0FBTyxJQUFJLG9DQUEwQixDQUE0QixJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBNkMsQ0FBQztJQUM1SSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFrQztRQUNsRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixNQUFNLElBQUksU0FBUyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUNELElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSyxPQUFPLENBQUMsS0FBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsaUdBQWlHLENBQUMsQ0FBQztRQUNoSSxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9DQUF3QixDQUFDLDJCQUEyQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ2xLLE9BQU8sSUFBSSxvQ0FBMEIsQ0FBTyxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBNkMsQ0FBQztJQUNuSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFjO1FBQ3RCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLE1BQU0sSUFBSSxTQUFTLENBQUMsMERBQTBELENBQUMsQ0FBQztRQUNwRixDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9DQUF3QixDQUFDLG9DQUFvQyxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFjO1FBQzVCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLE1BQU0sSUFBSSxTQUFTLENBQUMsMERBQTBELENBQUMsQ0FBQztRQUNwRixDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9DQUF3QixDQUFDLHVCQUF1QixFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNySyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFpQjtRQUNsQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQWlCLEVBQUUsT0FBK0I7UUFDakUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUErQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBSSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBMkI7UUFDeEMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsTUFBTSxJQUFJLFNBQVMsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0NBQXdCLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzFKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQWlCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFRCxnUEFBZ1A7SUFDaFAsb0JBQW9CO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sWUFBWSxzQkFBWSxDQUFDO0lBQ2hELENBQUM7SUFFRCx3UUFBd1E7SUFDeFEsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGVBQWU7UUFDakIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsTUFBTSxJQUFJLFNBQVMsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0NBQXdCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkosQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBMkI7UUFDbkMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDOUQsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsY0FBYyxFQUFnQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtZQUMxRCw0QkFBNEIsRUFBRSxJQUFJLENBQUMsNEJBQTRCO1lBQy9ELFNBQVMsRUFBcUIsSUFBSSxDQUFDLFNBQVM7WUFDNUMsT0FBTyxFQUF1QixJQUFJLENBQUMsT0FBTztZQUMxQyxJQUFJLEVBQTBCLElBQUksQ0FBQyxJQUFJO1lBQ3ZDLE9BQU8sRUFBdUIsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTO1lBQ3ZELFdBQVcsRUFBbUIsSUFBSSxDQUFDLFdBQVc7WUFDOUMsTUFBTSxFQUF3QixJQUFJLENBQUMsTUFBTTtZQUN6QyxNQUFNLEVBQXdCLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO1lBQ25ELElBQUksRUFBMEIsSUFBSSxDQUFDLElBQUk7WUFDdkMsSUFBSSxFQUEwQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtTQUNuRCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBNVBELHlDQTRQQyJ9

/***/ }),

/***/ 1846:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(6735);
/** @module PingInteraction */
const Interaction_1 = tslib_1.__importDefault(__webpack_require__(4850));
const Constants_1 = __webpack_require__(146);
/** Represents a PING interaction. This will not be received over a gateway connection. */
class PingInteraction extends Interaction_1.default {
    constructor(data, client) {
        super(data, client);
    }
    /**
     * Responds to the interaction with a `PONG`.
     */
    async pong() {
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.PONG });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            type: this.type
        };
    }
}
exports["default"] = PingInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGluZ0ludGVyYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvUGluZ0ludGVyYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhCQUE4QjtBQUM5Qix3RUFBd0M7QUFDeEMsNENBQStFO0FBSy9FLDBGQUEwRjtBQUMxRixNQUFxQixlQUFnQixTQUFRLHFCQUFXO0lBRXBELFlBQVksSUFBd0IsRUFBRSxNQUFjO1FBQ2hELEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0NBQXdCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqSSxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2xCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFuQkQsa0NBbUJDIn0=

/***/ }),

/***/ 7729:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/** @module InteractionOptionsWrapper */
const Errors_1 = __webpack_require__(3961);
const Constants_1 = __webpack_require__(146);
/** A wrapper for interaction options. */
class InteractionOptionsWrapper {
    /** The raw options from Discord.  */
    raw;
    /** The resolved data for this options instance. */
    resolved;
    constructor(data, resolved) {
        this.raw = data;
        this.resolved = resolved;
    }
    _getOption(name, required = false, type) {
        const opt = this.getOptions().find(o => o.name === name && o.type === type);
        if (!opt && required) {
            throw new Errors_1.WrapperError(`Missing required option: ${name}`);
        }
        else {
            return opt;
        }
    }
    getAttachment(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getAttachment with null resolved. If this is on an autocomplete interaction, use getAttachmentOption instead.");
        }
        let val;
        if (!(val = this.getAttachmentOption(name, required)?.value)) {
            return undefined;
        }
        const a = this.resolved.attachments.get(val);
        if (!a && required) {
            throw new Errors_1.WrapperError(`Attachment not present for required option: ${name}`);
        }
        return a;
    }
    getAttachmentOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.ATTACHMENT);
    }
    getBoolean(name, required) {
        return this.getBooleanOption(name, required)?.value;
    }
    getBooleanOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.BOOLEAN);
    }
    getChannel(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getChannel with null resolved. If this is on an autocomplete interaction, use getChannelOption instead.");
        }
        let val;
        if (!(val = this.getChannelOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.channels.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`Channel not present for required option: ${name}`);
        }
        return ch;
    }
    getChannelOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.CHANNEL);
    }
    getCompleteChannel(name, required) {
        const resolved = this.getChannel(name, required);
        if (!resolved) {
            return undefined; // required will be handled in getChannel
        }
        const channel = resolved.completeChannel ?? (resolved.type === Constants_1.ChannelTypes.DM ? resolved : undefined);
        if (!channel && required) {
            throw new Errors_1.WrapperError(`Failed to resolve complete channel for required option: ${name}`);
        }
        return channel;
    }
    getFocused(required) {
        const opt = this.getOptions().find(o => o.focused === true);
        if (!opt && required) {
            throw new Errors_1.WrapperError("Missing required focused option");
        }
        else {
            return opt;
        }
    }
    getInteger(name, required) {
        return this.getIntegerOption(name, required)?.value;
    }
    getIntegerOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.INTEGER);
    }
    getMember(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getMember with null resolved. If this is on an autocomplete interaction, use getUserOption instead.");
        }
        let val;
        if (!(val = this.getUserOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.members.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`Member not present for required option: ${name}`);
        }
        return ch;
    }
    getMentionable(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getMentionable with null resolved. If this is on an autocomplete interaction, use getAttachmentOption instead.");
        }
        let val;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        if (!(val = this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.MENTIONABLE)?.value)) {
            return undefined;
        }
        const role = this.resolved.roles.get(val);
        const user = this.resolved.users.get(val);
        if ((!role && !user) && required) {
            throw new Errors_1.WrapperError(`Value not present for required option: ${name}`);
        }
        return role ?? user;
    }
    getMentionableOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.MENTIONABLE);
    }
    getNumber(name, required) {
        return this.getNumberOption(name, required)?.value;
    }
    getNumberOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.NUMBER);
    }
    /** Get the options received in this interaction, excluding subcommands and subcommand groups. */
    getOptions() {
        let baseOptions;
        const sub = this.getSubCommand(false) ?? [];
        switch (sub.length) {
            case 0: {
                baseOptions = this.raw;
                break;
            }
            case 1: {
                baseOptions = this.raw.find(o => o.name === sub[0] && o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND)?.options;
                break;
            }
            case 2: {
                baseOptions = this.raw.find(o => o.name === sub[0] && o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP)?.options?.find(o2 => o2.name === sub[1] && o2.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND)?.options;
                break;
            }
        }
        return baseOptions ?? [];
    }
    getRole(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getRole with null resolved. If this is on an autocomplete interaction, use getRoleOption instead.");
        }
        let val;
        if (!(val = this.getRoleOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.roles.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`Role not present for required option: ${name}`);
        }
        return ch;
    }
    getRoleOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.ROLE);
    }
    getString(name, required) {
        return this.getStringOption(name, required)?.value;
    }
    getStringOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.STRING);
    }
    getSubCommand(required) {
        const opt = this.raw.find(o => o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND || o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP);
        if (opt?.options) {
            // nested
            if (opt.options.length === 1 && opt.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP) {
                const sub = opt.options.find(o => o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND);
                return sub?.options ? [opt.name, sub.name] : [opt.name];
            }
            else {
                return [opt.name];
            }
        }
        else {
            if (required) {
                throw new Errors_1.WrapperError("Missing required option: SubCommand/SubCommandGroup.");
            }
            else {
                return undefined;
            }
        }
    }
    getUser(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getUser with null resolved. If this is on an autocomplete interaction, use getUseOption instead.");
        }
        let val;
        if (!(val = this.getUserOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.users.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`User not present for required option: ${name}`);
        }
        return ch;
    }
    getUserOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.USER);
    }
}
exports["default"] = InteractionOptionsWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25PcHRpb25zV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi91dGlsL2ludGVyYWN0aW9ucy9JbnRlcmFjdGlvbk9wdGlvbnNXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXdDO0FBQ3hDLHNDQUF5QztBQUN6QywrQ0FBOEU7QUEwQjlFLHlDQUF5QztBQUN6QyxNQUFxQix5QkFBeUI7SUFDMUMscUNBQXFDO0lBQ3JDLEdBQUcsQ0FBNEI7SUFDL0IsbURBQW1EO0lBQ25ELFFBQVEsQ0FBbUQ7SUFDM0QsWUFBWSxJQUErQixFQUFFLFFBQTBEO1FBQ25HLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFTyxVQUFVLENBQXNFLElBQVksRUFBRSxRQUFRLEdBQUcsS0FBSyxFQUFFLElBQW1DO1FBQ3ZKLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBa0IsQ0FBQztRQUM3RixJQUFJLENBQUMsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxxQkFBWSxDQUFDLDRCQUE0QixJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO0lBQ0wsQ0FBQztJQVNELGFBQWEsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDMUMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxTQUFTLENBQUMsOEhBQThILENBQUMsQ0FBQztRQUN4SixDQUFDO1FBQ0QsSUFBSSxHQUF1QixDQUFDO1FBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFFBQWlCLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3BFLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNqQixNQUFNLElBQUkscUJBQVksQ0FBQywrQ0FBK0MsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRixDQUFDO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBU0QsbUJBQW1CLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQ2hELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLHlDQUE2QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFTRCxVQUFVLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxRQUFpQixDQUFDLEVBQUUsS0FBSyxDQUFDO0lBQ2pFLENBQUM7SUFVRCxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDN0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUseUNBQTZCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQVNELFVBQVUsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDdkMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxTQUFTLENBQUMsd0hBQXdILENBQUMsQ0FBQztRQUNsSixDQUFDO1FBQ0QsSUFBSSxHQUF1QixDQUFDO1FBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFFBQWlCLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ2pFLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEVBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNsQixNQUFNLElBQUkscUJBQVksQ0FBQyw0Q0FBNEMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvRSxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBU0QsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLHlDQUE2QixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFTRCxrQkFBa0IsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDL0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBaUIsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNaLE9BQU8sU0FBUyxDQUFDLENBQUMseUNBQXlDO1FBQy9ELENBQUM7UUFDRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsZUFBZSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyx3QkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxxQkFBWSxDQUFDLDJEQUEyRCxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzlGLENBQUM7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBUUQsVUFBVSxDQUFrRSxRQUFrQjtRQUMxRixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQWtCLENBQUM7UUFDN0UsSUFBSSxDQUFDLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNuQixNQUFNLElBQUkscUJBQVksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQzlELENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO0lBQ0wsQ0FBQztJQVNELFVBQVUsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDdkMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFFBQWlCLENBQUMsRUFBRSxLQUFLLENBQUM7SUFDakUsQ0FBQztJQVNELGdCQUFnQixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUM3QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSx5Q0FBNkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBU0QsU0FBUyxDQUFDLElBQVksRUFBRSxRQUFrQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDekIsTUFBTSxJQUFJLFNBQVMsQ0FBQyxvSEFBb0gsQ0FBQyxDQUFDO1FBQzlJLENBQUM7UUFDRCxJQUFJLEdBQXVCLENBQUM7UUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQWlCLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzlELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNsQixNQUFNLElBQUkscUJBQVksQ0FBQywyQ0FBMkMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM5RSxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBU0QsY0FBYyxDQUFDLElBQVksRUFBRSxRQUFrQjtRQUMzQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDekIsTUFBTSxJQUFJLFNBQVMsQ0FBQywrSEFBK0gsQ0FBQyxDQUFDO1FBQ3pKLENBQUM7UUFDRCxJQUFJLEdBQXVCLENBQUM7UUFDNUIsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxRQUFpQixFQUFFLHlDQUE2QixDQUFDLFdBQVcsQ0FBK0MsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3JKLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQy9CLE1BQU0sSUFBSSxxQkFBWSxDQUFDLDBDQUEwQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFFRCxPQUFPLElBQUksSUFBSSxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQVNELG9CQUFvQixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUNqRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSx5Q0FBNkIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBU0QsU0FBUyxDQUFDLElBQVksRUFBRSxRQUFrQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFFBQWlCLENBQUMsRUFBRSxLQUFLLENBQUM7SUFDaEUsQ0FBQztJQVNELGVBQWUsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDNUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUseUNBQTZCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELGlHQUFpRztJQUNqRyxVQUFVO1FBQ04sSUFBSSxXQUEyRCxDQUFDO1FBQ2hFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVDLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDTCxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQXlDLENBQUM7Z0JBQzdELE1BQU07WUFDVixDQUFDO1lBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFdBQVcsR0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUsseUNBQTZCLENBQUMsV0FBVyxDQUE4QyxFQUFFLE9BQU8sQ0FBQztnQkFDbkssTUFBTTtZQUNWLENBQUM7WUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsV0FBVyxHQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyx5Q0FBNkIsQ0FBQyxpQkFBaUIsQ0FBbUQsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyx5Q0FBNkIsQ0FBQyxXQUFXLENBQThDLEVBQUUsT0FBTyxDQUFDO2dCQUM5VCxNQUFNO1lBQ1YsQ0FBQztRQUNMLENBQUM7UUFDRCxPQUFPLFdBQVcsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQVNELE9BQU8sQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxTQUFTLENBQUMsa0hBQWtILENBQUMsQ0FBQztRQUM1SSxDQUFDO1FBQ0QsSUFBSSxHQUF1QixDQUFDO1FBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFpQixDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUM5RCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxFQUFFLElBQUksUUFBUSxFQUFFLENBQUM7WUFDbEIsTUFBTSxJQUFJLHFCQUFZLENBQUMseUNBQXlDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQVNELGFBQWEsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDMUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUseUNBQTZCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQVNELFNBQVMsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDdEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxRQUFpQixDQUFDLEVBQUUsS0FBSyxDQUFDO0lBQ2hFLENBQUM7SUFTRCxlQUFlLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQzVDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLHlDQUE2QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFRRCxhQUFhLENBQUMsUUFBa0I7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLHlDQUE2QixDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLHlDQUE2QixDQUFDLGlCQUFpQixDQUFxRSxDQUFDO1FBQ3ZOLElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDO1lBQ25CLFNBQVM7WUFDTCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLHlDQUE2QixDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQzNGLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyx5Q0FBNkIsQ0FBQyxXQUFXLENBQTZDLENBQUM7Z0JBQ3BJLE9BQU8sR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUQsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ0osSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDWCxNQUFNLElBQUkscUJBQVksQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1lBQ25GLENBQUM7aUJBQU0sQ0FBQztnQkFDSixPQUFPLFNBQVMsQ0FBQztZQUNyQixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFTRCxPQUFPLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQ3BDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN6QixNQUFNLElBQUksU0FBUyxDQUFDLGlIQUFpSCxDQUFDLENBQUM7UUFDM0ksQ0FBQztRQUNELElBQUksR0FBdUIsQ0FBQztRQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBaUIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDOUQsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsRUFBRSxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sSUFBSSxxQkFBWSxDQUFDLHlDQUF5QyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFTRCxhQUFhLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQzFDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLHlDQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9FLENBQUM7Q0FDSjtBQXpYRCw0Q0F5WEMifQ==

/***/ }),

/***/ 1312:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class MessageInteractionResponse {
    message;
    type;
    constructor(interaction, message, type) {
        this.interaction = interaction;
        this.message = message;
        this.type = type;
    }
    async deleteMessage() {
        if (this.hasMessage()) {
            return this.interaction.deleteFollowup(this.message.id);
        }
        return this.interaction.deleteOriginal();
    }
    async getMessage() {
        if (this.hasMessage()) {
            return this.message;
        }
        return this.interaction.getOriginal();
    }
    hasMessage() {
        return this.message !== null;
    }
}
exports["default"] = MessageInteractionResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUludGVyYWN0aW9uUmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdXRpbC9pbnRlcmFjdGlvbnMvTWVzc2FnZUludGVyYWN0aW9uUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQSxNQUFxQiwwQkFBMEI7SUFFM0MsT0FBTyxDQUFvRDtJQUMzRCxJQUFJLENBQXlCO0lBQzdCLFlBQVksV0FBYyxFQUFFLE9BQTBELEVBQUUsSUFBNEI7UUFDaEgsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhO1FBQ2YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztZQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVU7UUFDWixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBeUQsQ0FBQztJQUNqRyxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBN0JELDZDQTZCQyJ9

/***/ }),

/***/ 6758:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/** @module ModalSubmitInteractionComponentsWrapper */
const Errors_1 = __webpack_require__(3961);
const Constants_1 = __webpack_require__(146);
/** A wrapper for interaction components. */
class ModalSubmitInteractionComponentsWrapper {
    /** The raw components from Discord.  */
    raw;
    constructor(data) {
        this.raw = data;
    }
    _getComponent(customID, required = false, type) {
        const opt = this.getComponents().find(o => o.customID === customID && o.type === type);
        if (!opt && required) {
            throw new Errors_1.WrapperError(`Missing required component: ${customID}`);
        }
        else {
            return opt;
        }
    }
    /** Get the components in this interaction. */
    getComponents() {
        return this.raw.reduce((a, b) => a.concat(...b.components), []);
    }
    getTextInput(name, required) {
        return this.getTextInputComponent(name, required)?.value;
    }
    getTextInputComponent(name, required) {
        return this._getComponent(name, required, Constants_1.ComponentTypes.TEXT_INPUT);
    }
}
exports["default"] = ModalSubmitInteractionComponentsWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWxTdWJtaXRJbnRlcmFjdGlvbkNvbXBvbmVudHNXcmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWwvaW50ZXJhY3Rpb25zL01vZGFsU3VibWl0SW50ZXJhY3Rpb25Db21wb25lbnRzV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNEQUFzRDtBQUN0RCxzQ0FBeUM7QUFDekMsK0NBQTJFO0FBRzNFLDRDQUE0QztBQUM1QyxNQUFxQix1Q0FBdUM7SUFDeEQsd0NBQXdDO0lBQ3hDLEdBQUcsQ0FBd0M7SUFDM0MsWUFBWSxJQUEyQztRQUNuRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRU8sYUFBYSxDQUEwRCxRQUFnQixFQUFFLFFBQVEsR0FBRyxLQUFLLEVBQUUsSUFBeUI7UUFDeEksTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFrQixDQUFDO1FBQ3hHLElBQUksQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLHFCQUFZLENBQUMsK0JBQStCLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdEUsQ0FBQzthQUFNLENBQUM7WUFDSixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7SUFDTCxDQUFDO0lBRUQsOENBQThDO0lBQzlDLGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFrQyxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQVNELFlBQVksQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDekMsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLFFBQWlCLENBQUMsRUFBRSxLQUFLLENBQUM7SUFDdEUsQ0FBQztJQVNELHFCQUFxQixDQUFDLElBQVksRUFBRSxRQUFrQjtRQUNsRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSwwQkFBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7Q0FDSjtBQTFDRCwwREEwQ0MifQ==

/***/ }),

/***/ 3560:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/** @module SelectMenuValuesWrapper */
const Errors_1 = __webpack_require__(3961);
const Constants_1 = __webpack_require__(146);
/** A wrapper for select menu data. */
class SelectMenuValuesWrapper {
    /** The raw received values. */
    raw;
    /** The resolved data for this instance. */
    resolved;
    constructor(resolved, values) {
        this.resolved = resolved;
        this.raw = values;
    }
    /**
     * Get the selected channels.
     *
     * If `ensurePresent` is false, channels that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a channel.
     */
    getChannels(ensurePresent) {
        return this.raw.map(id => {
            const ch = this.resolved.channels.get(id);
            if (!ch && ensurePresent) {
                throw new Errors_1.WrapperError(`Failed to find channel in resolved data: ${id}`);
            }
            return ch;
        }).filter(Boolean);
    }
    /**
     * Get the complete version of the selected channels. This will only succeed if the channel is cached. If the channel is private and isn't cached, an `InteractionResolvedChannel` instance will still be returned.
     *
     * If `ensurePresent` is false, channels that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a channel.
     */
    getCompleteChannels(ensurePresent) {
        return this.raw.map(id => {
            const ch = this.resolved.channels.get(id);
            if (ch && ch.type === Constants_1.ChannelTypes.DM) {
                return ch?.completeChannel ?? ch;
            }
            if (!ch && ensurePresent) {
                throw new Errors_1.WrapperError(`Failed to find channel in resolved data: ${id}`);
            }
            return ch;
        }).filter(Boolean);
    }
    /**
     * Get the selected members.
     *
     * If `ensurePresent` is false, members that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a member.
     */
    getMembers(ensurePresent) {
        return this.raw.map(id => {
            const member = this.resolved.members.get(id);
            if (!member && ensurePresent) {
                throw new Errors_1.WrapperError(`Failed to find member in resolved data: ${id}`);
            }
            return member;
        }).filter(Boolean);
    }
    /**
     * Get the selected mentionables. (users, roles)
     *
     * If `ensurePresent` is false, mentionables that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a user, or role.
     */
    getMentionables(ensurePresent) {
        const res = [];
        for (const id of this.raw) {
            const role = this.resolved.roles.get(id);
            const user = this.resolved.users.get(id);
            if ((!role && !user)) {
                if (ensurePresent) {
                    throw new Errors_1.WrapperError(`Failed to find mentionable in resolved data: ${id}`);
                }
            }
            else {
                res.push((role ?? user));
            }
        }
        return res;
    }
    /**
     * Get the selected roles.
     *
     * If `ensurePresent` is false, roles that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a role.
     */
    getRoles(ensurePresent) {
        return this.raw.map(id => {
            const role = this.resolved.roles.get(id);
            if (!role && ensurePresent) {
                throw new Errors_1.WrapperError(`Failed to find role in resolved data: ${id}`);
            }
            return role;
        }).filter(Boolean);
    }
    /**
     * Get the selected string values. This cannot fail.
     */
    getStrings() {
        return this.raw;
    }
    /**
     * Get the selected users.
     *
     * If `ensurePresent` is false, users that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a user.
     */
    getUsers(ensurePresent) {
        return this.raw.map(id => {
            const user = this.resolved.users.get(id);
            if (!user && ensurePresent) {
                throw new Errors_1.WrapperError(`Failed to find user in resolved data: ${id}`);
            }
            return user;
        }).filter(Boolean);
    }
}
exports["default"] = SelectMenuValuesWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0TWVudVZhbHVlc1dyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdXRpbC9pbnRlcmFjdGlvbnMvU2VsZWN0TWVudVZhbHVlc1dyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0M7QUFDdEMsc0NBQXlDO0FBQ3pDLCtDQUErQztBQVEvQyxzQ0FBc0M7QUFDdEMsTUFBcUIsdUJBQXVCO0lBQ3hDLCtCQUErQjtJQUMvQixHQUFHLENBQWdCO0lBQ25CLDJDQUEyQztJQUMzQyxRQUFRLENBQTBDO0lBQ2xELFlBQVksUUFBaUQsRUFBRSxNQUFxQjtRQUNoRixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxHQUFLLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxXQUFXLENBQUMsYUFBdUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNyQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxJQUFJLHFCQUFZLENBQUMsNENBQTRDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0UsQ0FBQztZQUNELE9BQU8sRUFBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILG1CQUFtQixDQUFDLGFBQXVCO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMs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

/***/ })

};
