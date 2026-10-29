/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { isObject, isString } from '../../base/common/types.js';
import { parse as parseJsonc } from '../../base/common/jsonc.js';

export const webWorkbenchFeatureIds = [
	'terminal',
	'extensions',
	'debugging',
	'sourceControl',
	'search',
	'chat',
	'notebooks',
	'testing',
	'mergeEditor',
	'multiDiffEditor',
	'problems',
	'timeline',
	'output',
	'logs',
	'comments',
	'webviews',
	'preferences',
	'outline',
	'welcome',
	'portForwarding',
] as const;

export type WebWorkbenchFeature = typeof webWorkbenchFeatureIds[number];

const webWorkbenchFeatureIdSet = new Set<string>(webWorkbenchFeatureIds);

/**
 * Parses web workbench features from JSONC content.
 */
export function parseWebWorkbenchFeaturesJsonc(content: string): readonly WebWorkbenchFeature[] {
	return parseWebWorkbenchFeatures(parseJsonc(content));
}

/**
 * Parses the webWorkbench section of the repository configuration.
 */
export function parseWebWorkbenchFeatures(configuration: unknown): readonly WebWorkbenchFeature[] {
	if (!isObject(configuration)) {
		throw new Error('The vscode web workbench configuration root must be an object.');
	}

	const configurationObject = configuration as Record<string, unknown>;
	const webWorkbench = configurationObject['webWorkbench'];
	if (webWorkbench === undefined) {
		return [];
	}
	if (!isObject(webWorkbench)) {
		throw new Error('The vscode web workbench configuration property must be an object.');
	}

	const webWorkbenchObject = webWorkbench as Record<string, unknown>;
	const enabledFeatures = webWorkbenchObject['enabledFeatures'];
	if (enabledFeatures === undefined) {
		return [];
	}
	if (!Array.isArray(enabledFeatures)) {
		throw new Error('The vscode web workbench enabledFeatures property must be an array.');
	}

	const result: WebWorkbenchFeature[] = [];
	for (const feature of enabledFeatures) {
		if (!isString(feature) || !webWorkbenchFeatureIdSet.has(feature)) {
			throw new Error(`Unknown web workbench feature: ${String(feature)}.`);
		}

		const typedFeature = feature as WebWorkbenchFeature;
		if (!result.includes(typedFeature)) {
			result.push(typedFeature);
		}
	}
	return result;
}
