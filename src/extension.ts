import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
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
            exec(`fastn fmt "${relativeFilePath}"`, { cwd: workspaceRootPath }, (error, stdout, stderr) => {
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

export function deactivate() {}
