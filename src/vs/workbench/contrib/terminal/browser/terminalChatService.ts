/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { IAction } from '../../../../base/common/actions.js';
import type { DisposableStore } from '../../../../base/common/lifecycle.js';
import { URI } from '../../../../base/common/uri.js';
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import type { ITerminalCommand } from '../../../../platform/terminal/common/capabilities/capabilities.js';

/** Optional Chat integration used by terminal command decorations. */
export interface ITerminalChatIntegrationService {
	readonly _serviceBrand: undefined;
	createAttachToChatAction(resource: URI | undefined, command: ITerminalCommand, disposables: DisposableStore): IAction | undefined;
}

export const ITerminalChatIntegrationService = createDecorator<ITerminalChatIntegrationService>('terminalChatIntegrationService');
