export const id = 8467;
export const ids = [8467];
export const modules = {

/***/ 8467:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRESENCE_UPDATE = exports.MESSAGE_UPDATE = exports.MESSAGE_REACTION_REMOVE_EMOJI = exports.MESSAGE_REACTION_REMOVE_ALL = exports.MESSAGE_REACTION_REMOVE = exports.MESSAGE_REACTION_ADD = exports.MESSAGE_POLL_VOTE_REMOVE = exports.MESSAGE_POLL_VOTE_ADD = exports.MESSAGE_DELETE_BULK = exports.MESSAGE_DELETE = exports.MESSAGE_CREATE = exports.INVITE_DELETE = exports.INVITE_CREATE = exports.INTERACTION_CREATE = exports.INTEGRATION_UPDATE = exports.INTEGRATION_DELETE = exports.INTEGRATION_CREATE = exports.GUILD_UPDATE = exports.GUILD_STICKERS_UPDATE = exports.GUILD_SCHEDULED_EVENT_USER_REMOVE = exports.GUILD_SCHEDULED_EVENT_USER_ADD = exports.GUILD_SCHEDULED_EVENT_UPDATE = exports.GUILD_SCHEDULED_EVENT_DELETE = exports.GUILD_SCHEDULED_EVENT_CREATE = exports.GUILD_ROLE_UPDATE = exports.GUILD_ROLE_DELETE = exports.GUILD_ROLE_CREATE = exports.GUILD_MEMBER_UPDATE = exports.GUILD_MEMBER_REMOVE = exports.GUILD_MEMBERS_CHUNK = exports.GUILD_MEMBER_ADD = exports.GUILD_INTEGRATIONS_UPDATE = exports.GUILD_EMOJIS_UPDATE = exports.GUILD_DELETE = exports.GUILD_CREATE = exports.GUILD_BAN_REMOVE = exports.GUILD_BAN_ADD = exports.GUILD_AUDIT_LOG_ENTRY_CREATE = exports.ENTITLEMENT_UPDATE = exports.ENTITLEMENT_DELETE = exports.ENTITLEMENT_CREATE = exports.CHANNEL_UPDATE = exports.CHANNEL_PINS_UPDATE = exports.CHANNEL_DELETE = exports.CHANNEL_CREATE = exports.AUTO_MODERATION_RULE_UPDATE = exports.AUTO_MODERATION_RULE_DELETE = exports.AUTO_MODERATION_RULE_CREATE = exports.AUTO_MODERATION_ACTION_EXECUTION = exports.APPLICATION_COMMAND_PERMISSIONS_UPDATE = void 0;
exports.WEBHOOKS_UPDATE = exports.VOICE_SERVER_UPDATE = exports.VOICE_CHANNEL_STATUS_UPDATE = exports.VOICE_STATE_UPDATE = exports.VOICE_CHANNEL_EFFECT_SEND = exports.USER_UPDATE = exports.TYPING_START = exports.THREAD_UPDATE = exports.THREAD_MEMBERS_UPDATE = exports.THREAD_MEMBER_UPDATE = exports.THREAD_LIST_SYNC = exports.THREAD_DELETE = exports.THREAD_CREATE = exports.STAGE_INSTANCE_UPDATE = exports.STAGE_INSTANCE_DELETE = exports.STAGE_INSTANCE_CREATE = exports.RESUMED = exports.READY = void 0;
const tslib_1 = __webpack_require__(4285);
const Constants_1 = __webpack_require__(5660);
const Member_1 = tslib_1.__importDefault(__webpack_require__(1212));
const AutoModerationRule_1 = tslib_1.__importDefault(__webpack_require__(2227));
const Channel_1 = tslib_1.__importDefault(__webpack_require__(5519));
const VoiceChannel_1 = tslib_1.__importDefault(__webpack_require__(8211));
const StageChannel_1 = tslib_1.__importDefault(__webpack_require__(7559));
const GuildScheduledEvent_1 = tslib_1.__importDefault(__webpack_require__(694));
const Invite_1 = tslib_1.__importDefault(__webpack_require__(5107));
const Message_1 = tslib_1.__importDefault(__webpack_require__(7023));
const StageInstance_1 = tslib_1.__importDefault(__webpack_require__(1009));
const Interaction_1 = tslib_1.__importDefault(__webpack_require__(4196));
const Guild_1 = tslib_1.__importDefault(__webpack_require__(6691));
const Role_1 = tslib_1.__importDefault(__webpack_require__(4774));
const Integration_1 = tslib_1.__importDefault(__webpack_require__(9890));
const VoiceState_1 = tslib_1.__importDefault(__webpack_require__(3473));
const AuditLogEntry_1 = tslib_1.__importDefault(__webpack_require__(2505));
async function APPLICATION_COMMAND_PERMISSIONS_UPDATE(data, shard) {
    shard.client.emit("applicationCommandPermissionsUpdate", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id }, {
        application: data.application_id === shard.client.application.id ? shard.client.application : undefined,
        applicationID: data.application_id,
        id: data.id,
        permissions: data.permissions
    });
}
exports.APPLICATION_COMMAND_PERMISSIONS_UPDATE = APPLICATION_COMMAND_PERMISSIONS_UPDATE;
async function AUTO_MODERATION_ACTION_EXECUTION(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const channel = shard.client.getChannel(data.channel_id ?? "");
    shard.client.emit("autoModerationActionExecution", guild ?? { id: data.guild_id }, data.channel_id === undefined ? null : channel ?? { id: data.channel_id }, shard.client.users.get(data.user_id) ?? { id: data.user_id }, {
        action: {
            metadata: {
                channelID: data.action.metadata.channel_id,
                customMessage: data.action.metadata.custom_message,
                durationSeconds: data.action.metadata.duration_seconds
            },
            type: data.action.type
        },
        alertSystemMessageID: data.alert_system_message_id,
        content: data.content,
        matchedContent: data.matched_content,
        matchedKeyword: data.matched_keyword,
        messageID: data.message_id,
        rule: guild?.autoModerationRules.get(data.rule_id),
        ruleID: data.rule_id,
        ruleTriggerType: data.rule_trigger_type
    });
}
exports.AUTO_MODERATION_ACTION_EXECUTION = AUTO_MODERATION_ACTION_EXECUTION;
async function AUTO_MODERATION_RULE_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const rule = guild?.autoModerationRules.update(data) ?? new AutoModerationRule_1.default(data, shard.client);
    shard.client.emit("autoModerationRuleCreate", rule);
}
exports.AUTO_MODERATION_RULE_CREATE = AUTO_MODERATION_RULE_CREATE;
async function AUTO_MODERATION_RULE_DELETE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const rule = guild?.autoModerationRules.update(data) ?? new AutoModerationRule_1.default(data, shard.client);
    guild?.autoModerationRules.delete(data.id);
    shard.client.emit("autoModerationRuleDelete", rule);
}
exports.AUTO_MODERATION_RULE_DELETE = AUTO_MODERATION_RULE_DELETE;
async function AUTO_MODERATION_RULE_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldRule = guild?.autoModerationRules.get(data.id)?.toJSON() ?? null;
    const rule = guild?.autoModerationRules.update(data) ?? new AutoModerationRule_1.default(data, shard.client);
    shard.client.emit("autoModerationRuleUpdate", rule, oldRule);
    shard.client.emit("autoModerationRuleUpdate", rule, oldRule);
}
exports.AUTO_MODERATION_RULE_UPDATE = AUTO_MODERATION_RULE_UPDATE;
async function CHANNEL_CREATE(data, shard) {
    const channel = shard.client.util.updateChannel(data);
    shard.client.emit("channelCreate", channel);
}
exports.CHANNEL_CREATE = CHANNEL_CREATE;
async function CHANNEL_DELETE(data, shard) {
    if (data.type === Constants_1.ChannelTypes.DM) {
        const channel = shard.client.privateChannels.get(data.id);
        shard.client.privateChannels.delete(data.id);
        shard.client.emit("channelDelete", channel ?? {
            id: data.id,
            flags: data.flags,
            lastMessageID: data.last_message_id,
            type: data.type
        });
        return;
    }
    const guild = shard.client.guilds.get(data.guild_id);
    const channel = shard.client.util.updateChannel(data);
    if (channel instanceof VoiceChannel_1.default || channel instanceof StageChannel_1.default) {
        for (const [, member] of channel.voiceMembers) {
            channel.voiceMembers.delete(member.id);
            shard.client.emit("voiceChannelLeave", member, channel);
        }
    }
    guild?.channels.delete(data.id);
    shard.client.emit("channelDelete", channel);
}
exports.CHANNEL_DELETE = CHANNEL_DELETE;
async function CHANNEL_PINS_UPDATE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    shard.client.emit("channelPinsUpdate", channel ?? { id: data.channel_id }, data.last_pin_timestamp === undefined || data.last_pin_timestamp === null ? null : new Date(data.last_pin_timestamp));
}
exports.CHANNEL_PINS_UPDATE = CHANNEL_PINS_UPDATE;
async function CHANNEL_UPDATE(data, shard) {
    const oldChannel = shard.client.getChannel(data.id)?.toJSON() ?? null;
    let channel;
    if (oldChannel && oldChannel.type !== data.type) {
        if (shard.client.channelGuildMap[data.id]) {
            shard.client.guilds.get(shard.client.channelGuildMap[data.id]).channels.delete(data.id);
        }
        channel = shard.client.util.updateChannel(data);
    }
    else {
        channel = shard.client.util.updateChannel(data);
    }
    shard.client.emit("channelUpdate", channel, oldChannel);
}
exports.CHANNEL_UPDATE = CHANNEL_UPDATE;
async function ENTITLEMENT_CREATE(data, shard) {
    const entitlement = shard.client.util.updateEntitlement(data);
    shard.client.emit("entitlementCreate", entitlement);
}
exports.ENTITLEMENT_CREATE = ENTITLEMENT_CREATE;
async function ENTITLEMENT_DELETE(data, shard) {
    const entitlement = shard.client.util.updateEntitlement(data);
    shard.client["_application"]?.entitlements.delete(data.id);
    shard.client.emit("entitlementDelete", entitlement);
}
exports.ENTITLEMENT_DELETE = ENTITLEMENT_DELETE;
async function ENTITLEMENT_UPDATE(data, shard) {
    const oldEntitlement = shard.client["_application"]?.entitlements.get(data.id)?.toJSON() ?? null;
    const entitlement = shard.client.util.updateEntitlement(data);
    shard.client.emit("entitlementUpdate", entitlement, oldEntitlement);
}
exports.ENTITLEMENT_UPDATE = ENTITLEMENT_UPDATE;
async function GUILD_AUDIT_LOG_ENTRY_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    shard.client.emit("guildAuditLogEntryCreate", guild ?? { id: data.guild_id }, guild?.auditLogEntries.update(data) ?? new AuditLogEntry_1.default(data, shard.client));
}
exports.GUILD_AUDIT_LOG_ENTRY_CREATE = GUILD_AUDIT_LOG_ENTRY_CREATE;
async function GUILD_BAN_ADD(data, shard) {
    shard.client.emit("guildBanAdd", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id }, shard.client.users.update(data.user));
}
exports.GUILD_BAN_ADD = GUILD_BAN_ADD;
async function GUILD_BAN_REMOVE(data, shard) {
    shard.client.emit("guildBanRemove", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id }, shard.client.users.update(data.user));
}
exports.GUILD_BAN_REMOVE = GUILD_BAN_REMOVE;
async function GUILD_CREATE(data, shard) {
    if (data.unavailable) {
        shard.client.guilds.delete(data.id);
        shard.client.emit("unavailableGuildCreate", shard.client.unavailableGuilds.update(data));
    }
    else {
        const guild = shard["createGuild"](data);
        if (shard.ready) {
            if (shard.client.unavailableGuilds.delete(guild.id)) {
                shard.client.emit("guildAvailable", guild);
            }
            else {
                shard.client.emit("guildCreate", guild);
            }
        }
        else {
            if (shard.client.unavailableGuilds.delete(guild.id)) {
                void shard["restartGuildCreateTimeout"]();
            }
            else {
                shard.client.emit("guildCreate", guild);
            }
        }
    }
}
exports.GUILD_CREATE = GUILD_CREATE;
async function GUILD_DELETE(data, shard) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    shard.client.voiceAdapters.get(data.id)?.destroy();
    delete shard.client.guildShardMap[data.id];
    const guild = shard.client.guilds.get(data.id);
    guild?.channels.clear();
    guild?.threads.clear();
    shard.client.guilds.delete(data.id);
    if (data.unavailable) {
        shard.client.emit("guildUnavailable", shard.client.unavailableGuilds.update(data));
    }
    else {
        shard.client.emit("guildDelete", guild ?? { id: data.id });
    }
}
exports.GUILD_DELETE = GUILD_DELETE;
async function GUILD_EMOJIS_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldEmojis = guild?.emojis ? guild.emojis.toArray() : null;
    // eslint-disable-next-line @typescript-eslint/dot-notation
    guild?.["update"]({ emojis: data.emojis });
    shard.client.emit("guildEmojisUpdate", guild ?? { id: data.guild_id }, guild?.emojis?.toArray() ?? data.emojis.map(emoji => shard.client.util.convertGuildEmoji(emoji)), oldEmojis);
}
exports.GUILD_EMOJIS_UPDATE = GUILD_EMOJIS_UPDATE;
async function GUILD_INTEGRATIONS_UPDATE(data, shard) {
    shard.client.emit("guildIntegrationsUpdate", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id });
}
exports.GUILD_INTEGRATIONS_UPDATE = GUILD_INTEGRATIONS_UPDATE;
async function GUILD_MEMBER_ADD(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    if (guild) {
        guild.memberCount++;
    }
    const member = shard.client.util.updateMember(data.guild_id, data.user.id, data);
    shard.client.emit("guildMemberAdd", member);
}
exports.GUILD_MEMBER_ADD = GUILD_MEMBER_ADD;
async function GUILD_MEMBERS_CHUNK(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    // eslint-disable-next-line @typescript-eslint/dot-notation
    guild?.["updateMemberLimit"](data.members.length);
    const members = data.members.map(member => shard.client.util.updateMember(data.guild_id, member.user.id, member));
    if (data.presences)
        for (const presence of data.presences) {
            const member = members.find(m => m.id === presence.user.id);
            member.presence = {
                clientStatus: presence.client_status,
                guildID: presence.guild_id,
                status: presence.status,
                activities: presence.activities?.map(activity => ({
                    createdAt: activity.created_at,
                    name: activity.name,
                    type: activity.type,
                    applicationID: activity.application_id,
                    assets: activity.assets ? {
                        largeImage: activity.assets.large_image,
                        largeText: activity.assets.large_text,
                        smallImage: activity.assets.small_image,
                        smallText: activity.assets.small_text
                    } : undefined,
                    buttons: activity.buttons,
                    details: activity.details,
                    emoji: activity.emoji,
                    flags: activity.flags,
                    instance: activity.instance,
                    party: activity.party,
                    secrets: activity.secrets,
                    state: activity.state,
                    timestamps: activity.timestamps,
                    url: activity.url
                }))
            };
        }
    if (!data.nonce) {
        shard.client.emit("warn", "Received GUILD_MEMBERS_CHUNK without a nonce.");
        return;
    }
    if (shard["_requestMembersPromise"][data.nonce]) {
        shard["_requestMembersPromise"][data.nonce].members.push(...members);
    }
    if (data.chunk_index >= data.chunk_count - 1) {
        if (shard["_requestMembersPromise"][data.nonce]) {
            clearTimeout(shard["_requestMembersPromise"][data.nonce].timeout);
            shard["_requestMembersPromise"][data.nonce].resolve(shard["_requestMembersPromise"][data.nonce].members);
            delete shard["_requestMembersPromise"][data.nonce];
        }
        if (shard["_getAllUsersCount"][data.guild_id]) {
            delete shard["_getAllUsersCount"][data.guild_id];
            void shard["checkReady"]();
        }
    }
    shard.client.emit("guildMemberChunk", members);
    shard.lastHeartbeatAck = true;
}
exports.GUILD_MEMBERS_CHUNK = GUILD_MEMBERS_CHUNK;
async function GUILD_MEMBER_REMOVE(data, shard) {
    if (data.user.id === shard.client.user.id) {
        return;
    }
    const guild = shard.client.guilds.get(data.guild_id);
    // eslint-disable-next-line @typescript-eslint/dot-notation
    let user = guild?.members.get(data.user.id);
    if (user instanceof Member_1.default) {
        user["update"]({ user: data.user });
    }
    else {
        user = shard.client.users.update(data.user);
    }
    if (guild) {
        guild.memberCount--;
        guild.members.delete(data.user.id);
    }
    shard.client.emit("guildMemberRemove", user, guild ?? { id: data.guild_id });
}
exports.GUILD_MEMBER_REMOVE = GUILD_MEMBER_REMOVE;
async function GUILD_MEMBER_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldMember = guild?.members.get(data.user.id)?.toJSON() ?? null;
    const member = shard.client.util.updateMember(data.guild_id, data.user.id, { deaf: oldMember?.deaf ?? false, mute: oldMember?.mute ?? false, ...data });
    shard.client.emit("guildMemberUpdate", member, oldMember);
}
exports.GUILD_MEMBER_UPDATE = GUILD_MEMBER_UPDATE;
async function GUILD_ROLE_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const role = guild?.roles.update(data.role, data.guild_id) ?? new Role_1.default(data.role, shard.client, data.guild_id);
    shard.client.emit("guildRoleCreate", role);
}
exports.GUILD_ROLE_CREATE = GUILD_ROLE_CREATE;
async function GUILD_ROLE_DELETE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const role = guild?.roles.get(data.role_id);
    guild?.roles.delete(data.role_id);
    shard.client.emit("guildRoleDelete", role ?? { id: data.role_id }, guild ?? { id: data.guild_id });
}
exports.GUILD_ROLE_DELETE = GUILD_ROLE_DELETE;
async function GUILD_ROLE_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldRole = guild?.roles.get(data.role.id)?.toJSON() ?? null;
    const role = guild?.roles.update(data.role, data.guild_id) ?? new Role_1.default(data.role, shard.client, data.guild_id);
    shard.client.emit("guildRoleUpdate", role, oldRole);
}
exports.GUILD_ROLE_UPDATE = GUILD_ROLE_UPDATE;
async function GUILD_SCHEDULED_EVENT_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const event = guild?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, shard.client);
    shard.client.emit("guildScheduledEventCreate", event);
}
exports.GUILD_SCHEDULED_EVENT_CREATE = GUILD_SCHEDULED_EVENT_CREATE;
async function GUILD_SCHEDULED_EVENT_DELETE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const event = guild?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, shard.client);
    guild?.scheduledEvents.delete(data.id);
    shard.client.emit("guildScheduledEventDelete", event);
}
exports.GUILD_SCHEDULED_EVENT_DELETE = GUILD_SCHEDULED_EVENT_DELETE;
async function GUILD_SCHEDULED_EVENT_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldEvent = guild?.scheduledEvents.get(data.id)?.toJSON() ?? null;
    const event = guild?.scheduledEvents.update(data) ?? new GuildScheduledEvent_1.default(data, shard.client);
    shard.client.emit("guildScheduledEventUpdate", event, oldEvent);
}
exports.GUILD_SCHEDULED_EVENT_UPDATE = GUILD_SCHEDULED_EVENT_UPDATE;
async function GUILD_SCHEDULED_EVENT_USER_ADD(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const event = guild?.scheduledEvents.get(data.guild_scheduled_event_id);
    if (event?.userCount) {
        event.userCount++;
    }
    const user = shard.client.users.get(data.user_id) ?? { id: data.user_id };
    shard.client.emit("guildScheduledEventUserAdd", event ?? { id: data.guild_scheduled_event_id }, user ?? { id: data.user_id });
}
exports.GUILD_SCHEDULED_EVENT_USER_ADD = GUILD_SCHEDULED_EVENT_USER_ADD;
async function GUILD_SCHEDULED_EVENT_USER_REMOVE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const event = guild?.scheduledEvents.get(data.guild_scheduled_event_id);
    if (event?.userCount) {
        event.userCount--;
    }
    const user = shard.client.users.get(data.user_id) ?? { id: data.user_id };
    shard.client.emit("guildScheduledEventUserRemove", event ?? { id: data.guild_scheduled_event_id }, user ?? { id: data.user_id });
}
exports.GUILD_SCHEDULED_EVENT_USER_REMOVE = GUILD_SCHEDULED_EVENT_USER_REMOVE;
async function GUILD_STICKERS_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldStickers = guild?.stickers ? guild.stickers.toArray() : null;
    // eslint-disable-next-line @typescript-eslint/dot-notation
    guild?.["update"]({ stickers: data.stickers });
    shard.client.emit("guildStickersUpdate", guild ?? { id: data.guild_id }, guild?.stickers?.toArray() ?? data.stickers.map(sticker => shard.client.util.convertSticker(sticker)), oldStickers);
}
exports.GUILD_STICKERS_UPDATE = GUILD_STICKERS_UPDATE;
async function GUILD_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.id);
    const oldGuild = guild?.toJSON() ?? null;
    shard.client.emit("guildUpdate", shard.client.guilds.update(data), oldGuild);
}
exports.GUILD_UPDATE = GUILD_UPDATE;
async function INTEGRATION_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const integration = guild?.integrations.update(data, data.guild_id) ?? new Integration_1.default(data, shard.client, data.guild_id);
    shard.client.emit("integrationCreate", guild ?? { id: data.guild_id }, integration);
}
exports.INTEGRATION_CREATE = INTEGRATION_CREATE;
async function INTEGRATION_DELETE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const integration = guild?.integrations.get(data.id);
    guild?.integrations.delete(data.id);
    shard.client.emit("integrationDelete", guild ?? { id: data.guild_id }, integration ?? { applicationID: data.application_id, id: data.id });
}
exports.INTEGRATION_DELETE = INTEGRATION_DELETE;
async function INTEGRATION_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldIntegration = guild?.integrations.get(data.id)?.toJSON() ?? null;
    const integration = guild?.integrations.update(data, data.guild_id) ?? new Integration_1.default(data, shard.client, data.guild_id);
    shard.client.emit("integrationUpdate", guild ?? { id: data.guild_id }, integration, oldIntegration);
}
exports.INTEGRATION_UPDATE = INTEGRATION_UPDATE;
async function INTERACTION_CREATE(data, shard) {
    shard.client.emit("interactionCreate", Interaction_1.default.from(data, shard.client));
}
exports.INTERACTION_CREATE = INTERACTION_CREATE;
async function INVITE_CREATE(data, shard) {
    let invite;
    if (data.guild_id) {
        const guild = shard.client.guilds.get(data.guild_id);
        invite = guild?.invites.update(data);
    }
    shard.client.emit("inviteCreate", invite ?? new Invite_1.default(data, shard.client));
}
exports.INVITE_CREATE = INVITE_CREATE;
async function INVITE_DELETE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id) ?? { id: data.channel_id };
    const guild = data.guild_id ? shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id } : undefined;
    let invite = {
        code: data.code,
        channel,
        guild
    };
    if (guild instanceof Guild_1.default && guild.invites.has(data.code)) {
        invite = guild.invites.get(data.code);
        guild.invites.delete(data.code);
    }
    shard.client.emit("inviteDelete", invite);
}
exports.INVITE_DELETE = INVITE_DELETE;
async function MESSAGE_CREATE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages?.update(data) ?? new Message_1.default(data, shard.client);
    if (channel) {
        channel.lastMessage = message;
        channel.lastMessageID = message.id;
    }
    shard.client.emit("messageCreate", message);
}
exports.MESSAGE_CREATE = MESSAGE_CREATE;
async function MESSAGE_DELETE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages?.get(data.id);
    if (channel) {
        channel.messages?.delete(data.id);
        if (channel.lastMessageID === data.id) {
            channel.lastMessageID = null;
            channel.lastMessage = null;
        }
    }
    shard.client.emit("messageDelete", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild: data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined,
        guildID: data.guild_id, id: data.id
    });
}
exports.MESSAGE_DELETE = MESSAGE_DELETE;
async function MESSAGE_DELETE_BULK(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const guild = data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined;
    shard.client.emit("messageDeleteBulk", data.ids.map(id => {
        const message = channel?.messages?.get(id);
        channel?.messages?.delete(id);
        return message ?? {
            channel: channel ?? { id: data.channel_id },
            channelID: data.channel_id,
            guild,
            guildID: data.guild_id,
            id
        };
    }));
}
exports.MESSAGE_DELETE_BULK = MESSAGE_DELETE_BULK;
async function MESSAGE_POLL_VOTE_ADD(data, shard) {
    const user = shard.client.users.get(data.user_id) ?? { id: data.user_id };
    const channel = shard.client.getChannel(data.channel_id) ?? { id: data.channel_id };
    const guild = data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined;
    const message = (channel instanceof Channel_1.default ? channel.messages.get(data.message_id) : undefined) ?? { channel, channelID: channel.id, guild, guildID: guild?.id, id: data.message_id };
    let answer = { answerID: data.answer_id };
    if (message instanceof Message_1.default && message.poll !== undefined) {
        const pollAnswer = message.poll.answers.find(a => a.answerID === data.answer_id);
        if (pollAnswer) {
            answer = pollAnswer;
        }
        shard.client.util.updatePollAnswer(message.poll, data.answer_id, 1, data.user_id);
    }
    shard.client.emit("messagePollVoteAdd", message, user, answer);
}
exports.MESSAGE_POLL_VOTE_ADD = MESSAGE_POLL_VOTE_ADD;
async function MESSAGE_POLL_VOTE_REMOVE(data, shard) {
    const user = shard.client.users.get(data.user_id) ?? { id: data.user_id };
    const channel = shard.client.getChannel(data.channel_id) ?? { id: data.channel_id };
    const guild = data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined;
    const message = (channel instanceof Channel_1.default ? channel.messages.get(data.message_id) : undefined) ?? { channel, channelID: channel.id, guild, guildID: guild?.id, id: data.message_id };
    let answer = { answerID: data.answer_id };
    if (message instanceof Message_1.default && message.poll !== undefined) {
        const pollAnswer = message.poll.answers.find(a => a.answerID === data.answer_id);
        if (pollAnswer) {
            answer = pollAnswer;
        }
        shard.client.util.updatePollAnswer(message.poll, data.answer_id, -1, data.user_id);
    }
    shard.client.emit("messagePollVoteRemove", message, user, answer);
}
exports.MESSAGE_POLL_VOTE_REMOVE = MESSAGE_POLL_VOTE_REMOVE;
async function MESSAGE_REACTION_ADD(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const guild = data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined;
    const message = channel?.messages?.get(data.message_id);
    const reactor = data.member
        ? (data.guild_id ? shard.client.util.updateMember(data.guild_id, data.user_id, data.member) : shard.client.users.get(data.user_id) ?? { id: data.user_id })
        : shard.client.users.get(data.user_id) ?? { id: data.user_id };
    if (message) {
        const index = message.reactions.findIndex(r => r.emoji.id === data.emoji.id && r.emoji.name === data.emoji.name);
        if (index === -1) {
            message.reactions.push({
                burstColors: data.burst_colors,
                count: 1,
                countDetails: {
                    burst: data.burst ? 1 : 0,
                    normal: data.burst ? 0 : 1
                },
                emoji: data.emoji,
                me: data.user_id === shard.client.user.id,
                meBurst: data.user_id === shard.client.user.id && data.burst
            });
        }
        else {
            if (data.burst) {
                message.reactions[index].countDetails.burst++;
            }
            else {
                message.reactions[index].countDetails.normal++;
            }
            message.reactions[index].count++;
            if (data.user_id === shard.client.user.id) {
                message.reactions[index].me = true;
            }
        }
    }
    shard.client.emit("messageReactionAdd", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild,
        guildID: data.guild_id,
        id: data.message_id,
        author: data.message_author_id === undefined ? undefined : shard.client.users.get(data.message_author_id) ?? { id: data.message_author_id },
        member: data.message_author_id === undefined ? undefined : guild?.members.get(data.message_author_id) ?? { id: data.message_author_id }
    }, reactor, {
        burst: data.burst,
        burstColors: data.burst_colors,
        emoji: data.emoji,
        type: data.type
    });
}
exports.MESSAGE_REACTION_ADD = MESSAGE_REACTION_ADD;
async function MESSAGE_REACTION_REMOVE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages?.get(data.message_id);
    const reactor = shard.client.users.get(data.user_id) ?? { id: data.user_id };
    if (message) {
        const index = message.reactions.findIndex(r => r.emoji.id === data.emoji.id && r.emoji.name === data.emoji.name);
        if (index !== -1) {
            if (data.burst) {
                message.reactions[index].countDetails.burst--;
            }
            else {
                message.reactions[index].countDetails.normal--;
            }
            message.reactions[index].count--;
            if (data.user_id === shard.client.user.id) {
                if (data.burst) {
                    message.reactions[index].meBurst = false;
                }
                else {
                    message.reactions[index].me = false;
                }
            }
            if (message.reactions[index].count === 0) {
                message.reactions.splice(index, 1);
            }
        }
    }
    shard.client.emit("messageReactionRemove", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild: data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined,
        guildID: data.guild_id,
        id: data.message_id
    }, reactor, {
        burst: data.burst,
        burstColors: data.burst_colors,
        emoji: data.emoji,
        type: data.type
    });
}
exports.MESSAGE_REACTION_REMOVE = MESSAGE_REACTION_REMOVE;
async function MESSAGE_REACTION_REMOVE_ALL(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages?.get(data.message_id);
    if (message) {
        message.reactions = [];
    }
    shard.client.emit("messageReactionRemoveAll", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild: data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined,
        guildID: data.guild_id,
        id: data.message_id
    });
}
exports.MESSAGE_REACTION_REMOVE_ALL = MESSAGE_REACTION_REMOVE_ALL;
async function MESSAGE_REACTION_REMOVE_EMOJI(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const message = channel?.messages?.get(data.message_id);
    if (message) {
        const index = message.reactions.findIndex(r => r.emoji.id === data.emoji.id && r.emoji.name === data.emoji.name);
        if (index !== -1) {
            message.reactions.splice(index, 1);
        }
    }
    shard.client.emit("messageReactionRemoveEmoji", message ?? {
        channel: channel ?? { id: data.channel_id },
        channelID: data.channel_id,
        guild: data.guild_id ? shard.client.guilds.get(data.guild_id) : undefined,
        guildID: data.guild_id,
        id: data.message_id
    }, data.emoji);
}
exports.MESSAGE_REACTION_REMOVE_EMOJI = MESSAGE_REACTION_REMOVE_EMOJI;
async function MESSAGE_UPDATE(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const oldMessage = channel?.messages?.get(data.id)?.toJSON() ?? null;
    if (!oldMessage && !data.author) {
        shard.client.emit("debug", `Got partial MESSAGE_UPDATE for uncached message ${data.id} for channel ${data.channel_id}, discarding..`);
        return;
    }
    const message = channel?.messages?.update(data) ?? new Message_1.default(data, shard.client);
    shard.client.emit("messageUpdate", message, oldMessage);
}
exports.MESSAGE_UPDATE = MESSAGE_UPDATE;
async function PRESENCE_UPDATE(data, shard) {
    const user = shard.client.users.get(data.user.id);
    if (user) {
        const oldUser = user.toJSON();
        user["update"](data.user);
        if (JSON.stringify(oldUser) !== JSON.stringify(user.toJSON())) {
            shard.client.emit("userUpdate", user, oldUser);
        }
    }
    const guild = shard.client.guilds.get(data.guild_id);
    const member = guild?.members.get(data.user.id);
    const oldPresence = member?.presence ?? null;
    const presence = {
        clientStatus: data.client_status,
        guildID: data.guild_id,
        status: data.status,
        activities: data.activities?.map(activity => ({
            createdAt: activity.created_at,
            name: activity.name,
            type: activity.type,
            applicationID: activity.application_id,
            assets: activity.assets ? {
                largeImage: activity.assets.large_image,
                largeText: activity.assets.large_text,
                smallImage: activity.assets.small_image,
                smallText: activity.assets.small_text
            } : undefined,
            buttons: activity.buttons,
            details: activity.details,
            emoji: activity.emoji,
            flags: activity.flags,
            instance: activity.instance,
            party: activity.party,
            secrets: activity.secrets,
            state: activity.state,
            timestamps: activity.timestamps,
            url: activity.url
        }))
    };
    const userID = data.user.id;
    delete data.user;
    if (member) {
        member.presence = presence;
    }
    shard.client.emit("presenceUpdate", guild ?? { id: data.guild_id }, member ?? { id: userID }, presence, oldPresence);
}
exports.PRESENCE_UPDATE = PRESENCE_UPDATE;
async function READY(data, shard) {
    shard["_ready"](data);
}
exports.READY = READY;
async function RESUMED(data, shard) {
    shard["_resume"]();
}
exports.RESUMED = RESUMED;
async function STAGE_INSTANCE_CREATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const stateInstance = guild?.stageInstances.update(data) ?? new StageInstance_1.default(data, shard.client);
    shard.client.emit("stageInstanceCreate", stateInstance);
}
exports.STAGE_INSTANCE_CREATE = STAGE_INSTANCE_CREATE;
async function STAGE_INSTANCE_DELETE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const stateInstance = guild?.stageInstances.update(data) ?? new StageInstance_1.default(data, shard.client);
    guild?.stageInstances.delete(data.id);
    shard.client.emit("stageInstanceDelete", stateInstance);
}
exports.STAGE_INSTANCE_DELETE = STAGE_INSTANCE_DELETE;
async function STAGE_INSTANCE_UPDATE(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    const oldStageInstance = guild?.stageInstances.get(data.id)?.toJSON() ?? null;
    const stateInstance = guild?.stageInstances.update(data) ?? new StageInstance_1.default(data, shard.client);
    shard.client.emit("stageInstanceUpdate", stateInstance, oldStageInstance);
}
exports.STAGE_INSTANCE_UPDATE = STAGE_INSTANCE_UPDATE;
async function THREAD_CREATE(data, shard) {
    const thread = shard.client.util.updateThread(data);
    const channel = shard.client.getChannel(data.parent_id);
    if (channel && channel.type === Constants_1.ChannelTypes.GUILD_FORUM) {
        channel.lastThreadID = thread.id;
    }
    shard.client.emit("threadCreate", thread);
}
exports.THREAD_CREATE = THREAD_CREATE;
async function THREAD_DELETE(data, shard) {
    const channel = shard.client.getChannel(data.parent_id);
    const thread = shard.client.getChannel(data.id) ?? {
        id: data.id,
        guild: shard.client.guilds.get(data.guild_id),
        guildID: data.guild_id,
        parent: channel || { id: data.parent_id },
        parentID: data.parent_id,
        type: data.type
    };
    if (channel && channel.type === Constants_1.ChannelTypes.GUILD_FORUM && channel.lastThreadID === data.id) {
        channel.lastThreadID = null;
    }
    shard.client.guilds.get(data.guild_id)?.threads.delete(data.id);
    shard.client.emit("threadDelete", thread);
}
exports.THREAD_DELETE = THREAD_DELETE;
async function THREAD_LIST_SYNC(data, shard) {
    const guild = shard.client.guilds.get(data.guild_id);
    if (!guild) {
        shard.client.emit("debug", `Missing guild in THREAD_LIST_SYNC: ${data.guild_id}`);
        return;
    }
    for (const threadData of data.threads) {
        shard.client.util.updateThread(threadData);
    }
    for (const member of data.members) {
        const thread = shard.client.getChannel(member.id);
        if (thread) {
            const threadMember = {
                id: member.id,
                flags: member.flags,
                joinTimestamp: new Date(member.join_timestamp),
                userID: member.user_id
            };
            const index = thread.members.findIndex(m => m.userID === member.user_id);
            if (index === -1) {
                thread.members.push(threadMember);
            }
            else {
                thread.members[index] = threadMember;
            }
        }
    }
}
exports.THREAD_LIST_SYNC = THREAD_LIST_SYNC;
async function THREAD_MEMBER_UPDATE(data, shard) {
    const thread = shard.client.getChannel(data.id);
    const guild = shard.client.guilds.get(data.guild_id);
    const threadMember = {
        id: data.id,
        flags: data.flags,
        joinTimestamp: new Date(data.join_timestamp),
        userID: data.user_id
    };
    let oldThreadMember = null;
    if (thread) {
        const index = thread.members.findIndex(m => m.userID === data.user_id);
        if (index === -1) {
            thread.members.push(threadMember);
        }
        else {
            oldThreadMember = { ...thread.members[index] };
            thread.members[index] = threadMember;
        }
    }
    shard.client.emit("threadMemberUpdate", thread ?? {
        id: data.id,
        guild,
        guildID: data.guild_id
    }, threadMember, oldThreadMember);
}
exports.THREAD_MEMBER_UPDATE = THREAD_MEMBER_UPDATE;
async function THREAD_MEMBERS_UPDATE(data, shard) {
    const thread = shard.client.getChannel(data.id);
    const guild = shard.client.guilds.get(data.guild_id);
    const addedMembers = (data.added_members ?? []).map(rawMember => ({
        flags: rawMember.flags,
        id: rawMember.id,
        joinTimestamp: new Date(rawMember.join_timestamp),
        userID: rawMember.user_id
    }));
    const removedMembers = (data.removed_member_ids ?? []).map(id => ({ userID: id, id: data.id }));
    if (thread) {
        thread.memberCount = data.member_count;
        for (const rawMember of addedMembers) {
            const index = thread.members.findIndex(m => m.userID === rawMember.id);
            if (index === -1) {
                thread.members.push(rawMember);
            }
            else {
                thread.members[index] = rawMember;
            }
        }
        for (const [index, { userID }] of removedMembers.entries()) {
            const memberIndex = thread.members.findIndex(m => m.userID === userID);
            if (memberIndex >= 0) {
                removedMembers[index] = thread.members[memberIndex];
                thread.members.splice(memberIndex, 1);
            }
        }
    }
    shard.client.emit("threadMembersUpdate", thread ?? {
        id: data.id,
        guild,
        guildID: data.guild_id
    }, addedMembers, removedMembers);
}
exports.THREAD_MEMBERS_UPDATE = THREAD_MEMBERS_UPDATE;
async function THREAD_UPDATE(data, shard) {
    const oldThread = shard.client.getChannel(data.id)?.toJSON() ?? null;
    const thread = shard.client.util.updateThread(data);
    shard.client.emit("threadUpdate", thread, oldThread);
}
exports.THREAD_UPDATE = THREAD_UPDATE;
async function TYPING_START(data, shard) {
    const channel = shard.client.getChannel(data.channel_id) ?? { id: data.channel_id };
    const startTimestamp = new Date(data.timestamp);
    if (data.member) {
        const member = shard.client.util.updateMember(data.guild_id, data.user_id, data.member);
        shard.client.emit("typingStart", channel, member, startTimestamp);
        return;
    }
    const user = shard.client.users.get(data.user_id);
    shard.client.emit("typingStart", channel, user ?? { id: data.user_id }, startTimestamp);
}
exports.TYPING_START = TYPING_START;
async function USER_UPDATE(data, shard) {
    const oldUser = shard.client.users.get(data.id)?.toJSON() ?? null;
    shard.client.emit("userUpdate", shard.client.users.update(data), oldUser);
}
exports.USER_UPDATE = USER_UPDATE;
async function VOICE_CHANNEL_EFFECT_SEND(data, shard) {
    const channel = shard.client.getChannel(data.channel_id);
    const guild = shard.client.guilds.get(data.guild_id);
    const user = guild?.members.get(data.user_id) ?? shard.client.users.get(data.user_id);
    shard.client.emit("voiceChannelEffectSend", channel ?? { id: data.channel_id, guild: guild ?? { id: data.guild_id } }, user ?? { id: data.user_id }, {
        animationID: data.animation_id,
        animationType: data.animation_type
    });
}
exports.VOICE_CHANNEL_EFFECT_SEND = VOICE_CHANNEL_EFFECT_SEND;
async function VOICE_STATE_UPDATE(data, shard) {
    if (data.guild_id && data.session_id && data.user_id === shard.client.user.id) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        shard.client.voiceAdapters.get(data.guild_id)?.onVoiceStateUpdate(data);
    }
    // @TODO voice states without guilds?
    if (!data.guild_id || !data.member) {
        return;
    }
    data.self_stream = !!data.self_stream;
    const guild = shard.client.guilds.get(data.guild_id);
    const member = shard.client.util.updateMember(data.guild_id, data.user_id, data.member);
    const oldState = guild?.voiceStates.get(member.id)?.toJSON() ?? null;
    const state = guild?.voiceStates.update({ ...data, id: member.id }) ?? new VoiceState_1.default(data, shard.client);
    member["update"]({ deaf: state.deaf, mute: state.mute });
    if (oldState?.channelID !== state.channelID) {
        const oldChannel = oldState?.channelID ? shard.client.getChannel(oldState.channelID) ?? { id: oldState.channelID } : null;
        const newChannel = state.channel === null ? null : state.channel ?? { id: state.channelID };
        if (newChannel instanceof Channel_1.default) {
            newChannel.voiceMembers.add(member);
        }
        if (oldChannel instanceof Channel_1.default) {
            oldChannel.voiceMembers.delete(member.id);
        }
        if (oldChannel && newChannel) {
            shard.client.emit("voiceChannelSwitch", member, newChannel, oldChannel);
        }
        else if (newChannel) {
            shard.client.emit("voiceChannelJoin", member, newChannel);
        }
        else if (state.channelID === null) {
            shard.client.emit("voiceChannelLeave", member, oldChannel);
        }
    }
    if (JSON.stringify(oldState) !== JSON.stringify(state.toJSON())) {
        shard.client.emit("voiceStateUpdate", member, oldState);
    }
}
exports.VOICE_STATE_UPDATE = VOICE_STATE_UPDATE;
async function VOICE_CHANNEL_STATUS_UPDATE(data, shard) {
    shard.client.emit("voiceChannelStatusUpdate", shard.client.getChannel(data.id) ?? { id: data.id }, data.status);
}
exports.VOICE_CHANNEL_STATUS_UPDATE = VOICE_CHANNEL_STATUS_UPDATE;
async function VOICE_SERVER_UPDATE(data, shard) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    shard.client.voiceAdapters.get(data.guild_id)?.onVoiceServerUpdate(data);
}
exports.VOICE_SERVER_UPDATE = VOICE_SERVER_UPDATE;
async function WEBHOOKS_UPDATE(data, shard) {
    shard.client.emit("webhooksUpdate", shard.client.guilds.get(data.guild_id) ?? { id: data.guild_id }, shard.client.getChannel(data.channel_id) ?? { id: data.channel_id });
}
exports.WEBHOOKS_UPDATE = WEBHOOKS_UPDATE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2dhdGV3YXkvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsNENBQTRDO0FBRTVDLDBFQUEwQztBQUMxQyxrR0FBa0U7QUFDbEUsNEVBQTRDO0FBZ0I1QyxzRkFBc0Q7QUFDdEQsc0ZBQXNEO0FBQ3RELG9HQUFvRTtBQUNwRSwwRUFBMEM7QUFDMUMsNEVBQTRDO0FBQzVDLHdGQUF3RDtBQUV4RCxvRkFBb0Q7QUFDcEQsd0VBQXdDO0FBQ3hDLHNFQUFzQztBQUN0QyxvRkFBb0Q7QUFDcEQsa0ZBQWtEO0FBQ2xELHdGQUF3RDtBQUdqRCxLQUFLLFVBQVUsc0NBQXNDLENBQUMsSUFBZ0UsRUFBRSxLQUFZO0lBQ3ZJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3RILFdBQVcsRUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDekcsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO1FBQ2xDLEVBQUUsRUFBYSxJQUFJLENBQUMsRUFBRTtRQUN0QixXQUFXLEVBQUksSUFBSSxDQUFDLFdBQVc7S0FDbEMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVBELHdGQU9DO0FBRU0sS0FBSyxVQUFVLGdDQUFnQyxDQUFDLElBQTBELEVBQUUsS0FBWTtJQUMzSCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFD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

/***/ })

};
