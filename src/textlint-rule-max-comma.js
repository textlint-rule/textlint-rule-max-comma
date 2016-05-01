// LICENSE : MIT
"use strict";
const splitSentences = require("sentence-splitter").split;
const Syntax = require("sentence-splitter").Syntax;
module.exports = function (context) {
    const {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Paragraph](node){
            const text = getSource(node);
            const sentences = splitSentences(text).filter(node => node.type === Syntax.Sentence)
        }
        
    }
};