// LICENSE : MIT
"use strict";
import filter from "unist-util-filter";
import { splitAST, Syntax as SentenceSyntax } from "sentence-splitter";
import { StringSource } from "textlint-util-to-string"

function countOfComma(text) {
    return text.split(",").length - 1;
}

const defaultOptions = {
    // default: allowed command count
    max: 4
};
export default function (context, options = defaultOptions) {
    const maxComma = options.max || defaultOptions.max;
    const { Syntax, RuleError, report, getSource } = context;
    return {
        [Syntax.Paragraph](node) {
            const nodeWithoutCode = filter(node, (node) => {
                return node.type !== Syntax.Code;
            });
            if (!nodeWithoutCode) {
                return;
            }
            const sentences = splitAST(nodeWithoutCode).children.filter(node => node.type === SentenceSyntax.Sentence);
            sentences.forEach(sentence => {
                const source = new StringSource(sentence);
                const sentenceValue = source.toString();
                const count = countOfComma(sentenceValue);
                if (count > maxComma) {
                    const lastCommandIndex = sentenceValue.lastIndexOf(",");
                    report(node, new RuleError(`This sentence exceeds the maximum count of comma. Maximum is ${maxComma}.`, {
                        index: source.originalIndexFromIndex(lastCommandIndex)
                    }));
                }
            });
        }
    }
}
