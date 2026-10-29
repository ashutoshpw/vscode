/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import '../contrib/terminal/browser/terminal.contribution.js';
import '../contrib/terminal/common/environmentVariable.contribution.js';
import '../contrib/terminal/common/terminalExtensionPoints.contribution.js';
import '../contrib/terminalContrib/accessibility/browser/terminal.accessibility.contribution.js';
import '../contrib/terminalContrib/autoReplies/browser/terminal.autoReplies.contribution.js';
import '../contrib/terminalContrib/developer/browser/terminal.developer.contribution.js';
import '../contrib/terminalContrib/environmentChanges/browser/terminal.environmentChanges.contribution.js';
import '../contrib/terminalContrib/find/browser/terminal.find.contribution.js';
import '../contrib/terminalContrib/commandGuide/browser/terminal.commandGuide.contribution.js';
import '../contrib/terminalContrib/history/browser/terminal.history.contribution.js';
import '../contrib/terminalContrib/links/browser/terminal.links.contribution.js';
import '../contrib/terminalContrib/zoom/browser/terminal.zoom.contribution.js';
import '../contrib/terminalContrib/stickyScroll/browser/terminal.stickyScroll.contribution.js';
import '../contrib/terminalContrib/quickAccess/browser/terminal.quickAccess.contribution.js';
import '../contrib/terminalContrib/quickFix/browser/terminal.quickFix.contribution.js';
import '../contrib/terminalContrib/typeAhead/browser/terminal.typeAhead.contribution.js';
import '../contrib/terminalContrib/resizeDimensionsOverlay/browser/terminal.resizeDimensionsOverlay.contribution.js';
import '../contrib/terminalContrib/sendSequence/browser/terminal.sendSequence.contribution.js';
import '../contrib/terminalContrib/sendSignal/browser/terminal.sendSignal.contribution.js';
import '../contrib/terminalContrib/suggest/browser/terminal.suggest.contribution.js';
import '../contrib/terminalContrib/voice/browser/terminal.voice.contribution.js';
import '../contrib/externalTerminal/browser/externalTerminal.contribution.js';
import '../contrib/terminal/browser/terminal.web.contribution.js';
import '../contrib/terminal/browser/terminalInstanceService.js';
import '../api/browser/mainThreadTerminalService.js';
import '../api/browser/mainThreadTerminalShellIntegration.js';
