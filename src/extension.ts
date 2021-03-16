import * as vscode from 'vscode';

export function activate (context: vscode.ExtensionContext) {
  /**
   * Parse all words in the document for autocompletion
   */
  const wordProvider = vscode.languages.registerCompletionItemProvider(
    'plaintext',
    {
      provideCompletionItems (
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
      ) {
        const completionList: vscode.CompletionList = { items: [] };
        const text = document.getText();

        // parse words
        const words = text.split(/[\s,'"`:!&]+/);

        words.forEach((word: string) => {
          // add completion for each word
          completionList.items.push(new vscode.CompletionItem(word));
        });

        // return all completion items as array
        return completionList;
      }
    }
  );

  context.subscriptions.push(wordProvider);
}
