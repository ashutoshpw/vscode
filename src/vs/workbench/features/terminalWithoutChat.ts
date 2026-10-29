/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Event } from '../../base/common/event.js';
import { Disposable, type IDisposable } from '../../base/common/lifecycle.js';
import { URI } from '../../base/common/uri.js';
import { InstantiationType, registerSingleton } from '../../platform/instantiation/common/extensions.js';
import { ITerminalChatService, type IChatTerminalToolProgressPart, type ITerminalInstance } from '../contrib/terminal/browser/terminal.js';
import { ITerminalChatIntegrationService } from '../contrib/terminal/browser/terminalChatService.js';

class NullTerminalChatService implements ITerminalChatService {
	declare _serviceBrand: undefined;
	readonly onDidRegisterTerminalInstanceWithToolSession = Event.None;

	registerTerminalInstanceWithToolSession(_terminalToolSessionId: string | undefined, _instance: ITerminalInstance): void { }
	getTerminalInstanceByToolSessionId(_terminalToolSessionId: string): Promise<ITerminalInstance | undefined> { return Promise.resolve(undefined); }
	getToolSessionTerminalInstances(_hiddenOnly?: boolean): readonly ITerminalInstance[] { return []; }
	getToolSessionIdForInstance(_instance: ITerminalInstance): string | undefined { return undefined; }
	registerTerminalInstanceWithChatSession(_chatSessionResource: URI, _instance: ITerminalInstance): void { }
	getChatSessionResourceForInstance(_instance: ITerminalInstance): URI | undefined { return undefined; }
	getChatSessionIdForInstance(_instance: ITerminalInstance): string | undefined { return undefined; }
	isBackgroundTerminal(_terminalToolSessionId?: string): boolean { return false; }
	registerProgressPart(_part: IChatTerminalToolProgressPart): IDisposable { return Disposable.None; }
	setFocusedProgressPart(_part: IChatTerminalToolProgressPart): void { }
	clearFocusedProgressPart(_part: IChatTerminalToolProgressPart): void { }
	getFocusedProgressPart(): IChatTerminalToolProgressPart | undefined { return undefined; }
	getMostRecentProgressPart(): IChatTerminalToolProgressPart | undefined { return undefined; }
	setChatSessionAutoApproval(_chatSessionResource: URI, _enabled: boolean): void { }
	hasChatSessionAutoApproval(_chatSessionResource: URI): boolean { return false; }
	addSessionAutoApproveRule(_chatSessionResource: URI, _key: string, _value: boolean | { approve: boolean; matchCommandLine?: boolean }): void { }
	getSessionAutoApproveRules(_chatSessionResource: URI): Readonly<Record<string, boolean | { approve: boolean; matchCommandLine?: boolean }>> { return {}; }
}

registerSingleton(ITerminalChatService, NullTerminalChatService, InstantiationType.Delayed);

class NullTerminalChatIntegrationService implements ITerminalChatIntegrationService {
	declare _serviceBrand: undefined;
	createAttachToChatAction(): undefined { return undefined; }
}

registerSingleton(ITerminalChatIntegrationService, NullTerminalChatIntegrationService, InstantiationType.Delayed);
