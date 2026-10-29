/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { InstantiationType, registerSingleton } from '../../platform/instantiation/common/extensions.js';
import { IMcpGalleryManifestService } from '../../platform/mcp/common/mcpGalleryManifest.js';
import { WorkbenchMcpGalleryManifestService } from '../services/mcp/browser/mcpGalleryManifestService.js';
import '../../platform/mcp/common/mcpResourceScannerService.js';
import '../services/aiEmbeddingVector/common/aiEmbeddingVectorService.js';
import '../services/aiRelatedInformation/common/aiRelatedInformationService.js';
import '../services/aiSettingsSearch/common/aiSettingsSearchService.js';
import '../contrib/chat/browser/chat.contribution.js';
import '../contrib/inlineChat/browser/inlineChat.contribution.js';
import '../contrib/codeEditor/browser/emptyTextEditorHint/emptyTextEditorHint.js';
import '../contrib/mcp/browser/mcp.contribution.js';
import '../contrib/chat/browser/chatSessions/chatSessions.contribution.js';
import '../contrib/chat/browser/contextContrib/chatContext.contribution.js';
import '../contrib/welcomeAgentSessions/browser/agentSessionsWelcome.contribution.js';
import '../api/browser/mainThreadLanguageModels.js';
import '../api/browser/mainThreadChatAgents2.js';
import '../api/browser/mainThreadChatCodeMapper.js';
import '../api/browser/mainThreadLanguageModelTools.js';
import '../api/browser/mainThreadEmbeddings.js';
import '../api/browser/mainThreadMcp.js';
import '../api/browser/mainThreadChatContext.js';
import '../api/browser/mainThreadChatStatus.js';
import '../api/browser/mainThreadChatOutputRenderer.js';
import '../api/browser/mainThreadChatSessions.js';
import '../api/browser/mainThreadAiRelatedInformation.js';
import '../api/browser/mainThreadAiEmbeddingVector.js';
import '../api/browser/mainThreadAiSettingsSearch.js';
registerSingleton(IMcpGalleryManifestService, WorkbenchMcpGalleryManifestService, InstantiationType.Delayed);
