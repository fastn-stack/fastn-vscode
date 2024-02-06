"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
function activate(context) {
    let disposable = vscode.workspace.onDidSaveTextDocument((document) => {
        // Check if the saved document is a file (not untitled or unsaved)
        if (document.uri.scheme === 'file') {
            // Get the path to the saved document
            const filePath = document.uri.fsPath;
            // Get the workspace root path
            const workspaceRootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
            if (!workspaceRootPath) {
                console.error('No workspace root found.');
                return;
            }
            // Get the relative path of the file to the workspace root
            const relativeFilePath = path.relative(workspaceRootPath, filePath);
            // Execute your shell command in the current folder
            (0, child_process_1.exec)(`fastn fmt "${relativeFilePath}"`, { cwd: workspaceRootPath }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(stderr);
                    return;
                }
                console.log(stdout);
            });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map