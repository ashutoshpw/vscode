/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Do NOT change these exports in a way that something is removed unless
// intentional. These exports are used by web embedders and thus require
// an adoption when something changes.
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import { create, commands, env, window, workspace, logger } from './browser/web.factory.js';
import { Menu } from './browser/web.api.js';
import { URI } from '../base/common/uri.js';
import { Event, Emitter } from '../base/common/event.js';
import { Disposable } from '../base/common/lifecycle.js';
import { GroupOrientation } from './services/editor/common/editorGroupsService.js';
import { RemoteAuthorityResolverError, RemoteAuthorityResolverErrorCode } from '../platform/remote/common/remoteAuthorityResolver.js';
import { LogLevel } from '../platform/log/common/log.js';
import { parseWebWorkbenchFeatures, parseWebWorkbenchFeaturesJsonc, type WebWorkbenchFeature } from './common/webWorkbenchFeatures.js';

type WebWorkbenchHtmlConfiguration = Record<string, unknown> & {
	readonly webWorkbenchFeatures?: readonly WebWorkbenchFeature[];
};

async function readConfiguredFeatures(): Promise<readonly WebWorkbenchFeature[] | undefined> {
	const configElement = document.getElementById('vscode-workbench-web-configuration');
	const configAttribute = configElement?.getAttribute('data-settings');
	const configuration = configAttribute ? JSON.parse(configAttribute) as WebWorkbenchHtmlConfiguration : undefined;
	if (configuration?.webWorkbenchFeatures !== undefined) {
		return parseWebWorkbenchFeatures({ webWorkbench: { enabledFeatures: configuration.webWorkbenchFeatures } });
	}

	// @vscode/test-web serves the repository under /static/sources and does not
	// pass server options through the workbench configuration payload.
	if (new URL(import.meta.url).pathname.includes('/static/sources/out/vs/workbench/')) {
		let response = await fetch(new URL('../../../vscode.jsonc', import.meta.url));
		if (response.status === 404) {
			response = await fetch(new URL('../../../vscode.json', import.meta.url));
		}
		if (response.status === 404) {
			return undefined;
		}
		if (!response.ok) {
			throw new Error(`Unable to load the vscode web workbench configuration: ${response.status} ${response.statusText}`);
		}
		const features = parseWebWorkbenchFeaturesJsonc(await response.text());
		if (configElement && configuration) {
			configElement.setAttribute('data-settings', JSON.stringify({ ...configuration, webWorkbenchFeatures: features }));
		}
		return features;
	}

	return undefined;
}

const enabledFeatures = await readConfiguredFeatures();
if (enabledFeatures === undefined) {
	// Keep the existing full entrypoint for external web embedders and servers
	// without a feature profile.
	await import('./workbench.web.main.js');
} else {
	await import('./workbench.web.main.core.js');
	const featureImporters: Record<WebWorkbenchFeature, () => Promise<void>> = {
		terminal: async () => {
			await import('./features/terminal.js');
			if (enabledFeatures.includes('chat')) {
				await import('./features/terminalChat.js');
			} else {
				await import('./features/terminalWithoutChat.js');
			}
		},
		extensions: async () => { await import('./features/extensions.js'); },
		debugging: async () => { await import('./features/debugging.js'); },
		sourceControl: async () => { await import('./features/sourceControl.js'); },
		search: async () => { await import('./features/search.js'); },
		chat: async () => { await import('./features/chat.js'); },
		notebooks: async () => { await import('./features/notebooks.js'); },
		testing: async () => { await import('./features/testing.js'); },
		mergeEditor: async () => { await import('./features/mergeEditor.js'); },
		multiDiffEditor: async () => { await import('./features/multiDiffEditor.js'); },
		problems: async () => { await import('./features/problems.js'); },
		timeline: async () => { await import('./features/timeline.js'); },
		output: async () => { await import('./features/output.js'); },
		logs: async () => { await import('./features/logs.js'); },
		comments: async () => { await import('./features/comments.js'); },
		webviews: async () => { await import('./features/webviews.js'); },
		preferences: async () => { await import('./features/preferences.js'); },
		outline: async () => { await import('./features/outline.js'); },
		welcome: async () => { await import('./features/welcome.js'); },
		portForwarding: async () => { await import('./features/portForwarding.js'); },
	};
	for (const feature of enabledFeatures) {
		await featureImporters[feature]();
	}
	if (!enabledFeatures.includes('extensions')) {
		await import('./features/disabledExtensions.js');
	}
}

export {

	// Factory
	create,

	// Basic Types
	URI,
	Event,
	Emitter,
	Disposable,
	GroupOrientation,
	LogLevel,
	RemoteAuthorityResolverError,
	RemoteAuthorityResolverErrorCode,

	// Facade API
	env,
	window,
	workspace,
	commands,
	logger,
	Menu
};
