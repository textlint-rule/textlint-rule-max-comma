// LICENSE : MIT
"use strict";
import {split, Syntax as SentenceSyntax} from "sentence-splitter";
const filter = require("unist-util-filter");
function countOfComma(text) {
    return text.split(",").length - 1;
}
const defaultOptions = {
    // default: max comma count is 4
    max: 4
};
module.exports = function (context, options = defaultOptions) {
    const maxComma = options.max || defaultOptions.max;
    const {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Paragraph](node){
            const nodeWithoutCode = filter(node, (node) => node.type !== Syntax.Code);
            const text = getSource(nodeWithoutCode);
            const sentences = split(text).filter(node => node.type === SentenceSyntax.Sentence);
            sentences.forEach(sentence => {
                const sentenceValue = sentence.value;
                const count = countOfComma(sentenceValue);
                if(count > maxComma) {
                    report(node, new RuleError(`This sentence exceeds the maximum count of comma. Maximum is ${maxComma}.`, sentence));
                }
            });
        }
    }
};