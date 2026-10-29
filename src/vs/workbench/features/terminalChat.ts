/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from '../../nls.js';
import { URI } from '../../base/common/uri.js';
import type { DisposableStore } from '../../base/common/lifecycle.js';
import { InstantiationType, registerSingleton } from '../../platform/instantiation/common/extensions.js';
import { IInstantiationService } from '../../platform/instantiation/common/instantiation.js';
import type { ITerminalCommand } from '../../platform/terminal/common/capabilities/capabilities.js';
import { IChatContextPickService } from '../contrib/chat/browser/attachments/chatContextPickService.js';
import { IChatWidgetService } from '../contrib/chat/browser/chat.js';
import { TerminalContext } from '../contrib/chat/browser/actions/chatContext.js';
import { ChatAgentLocation } from '../contrib/chat/common/constants.js';
import { ITerminalChatIntegrationService } from '../contrib/terminal/browser/terminalChatService.js';
import { getTerminalUri, parseTerminalUri } from '../contrib/terminal/browser/terminalUri.js';

import '../contrib/terminalContrib/chatAgentTools/browser/terminal.chatAgentTools.contribution.js';
import '../contrib/terminalContrib/chat/browser/terminal.chat.contribution.js';
import '../contrib/terminalContrib/inlineHint/browser/terminal.initialHint.contribution.js';

class TerminalChatIntegrationService implements ITerminalChatIntegrationService {
	declare _serviceBrand: undefined;

	constructor(
		@IChatContextPickService private readonly _contextPickService: IChatContextPickService,
		@IChatWidgetService private readonly _chatWidgetService: IChatWidgetService,
		@IInstantiationService private readonly _instantiationService: IInstantiationService,
	) { }

	createAttachToChatAction(resource: URI | undefined, command: ITerminalCommand, disposables: DisposableStore) {
		const chatIsEnabled = this._chatWidgetService.getWidgetsByLocations(ChatAgentLocation.Chat).some(w => w.attachmentCapabilities.supportsTerminalAttachments);
		if (!chatIsEnabled) {
			return undefined;
		}
		const label = localize('terminal.attachToChat', 'Attach To Chat');
		return {
			class: undefined,
			tooltip: label,
			id: 'terminal.attachToChat',
			label,
			enabled: true,
			run: async () => {
				let widget = this._chatWidgetService.lastFocusedWidget ?? this._chatWidgetService.getWidgetsByLocations(ChatAgentLocation.Chat)?.find(w => w.attachmentCapabilities.supportsTerminalAttachments);
				widget ??= await this._chatWidgetService.revealWidget();
				if (!widget) {
					return;
				}

				if (resource) {
					const parsedUri = parseTerminalUri(resource);
					const terminalContext = this._instantiationService.createInstance(TerminalContext, getTerminalUri(parsedUri.workspaceId, parsedUri.instanceId!, undefined, command.id));
					if (widget.attachmentCapabilities.supportsTerminalAttachments) {
						try {
							const attachment = await terminalContext.asAttachment(widget);
							if (attachment) {
								widget.attachmentModel.addContext(attachment);
								widget.focusInput();
								return;
							}
						} catch { }
						disposables.add(this._contextPickService.registerChatContextItem(terminalContext));
					}
				}
			}
		};
	}
}

registerSingleton(ITerminalChatIntegrationService, TerminalChatIntegrationService, InstantiationType.Delayed);
