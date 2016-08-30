const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
const rule = require("../src/textlint-rule-max-comma");
const fs = require("fs");
// ruleName, rule, { valid, invalid }
tester.run("no-todo", rule, {
    valid: [
        // no match
        "This is text.",
        // 3
        "0, 1, 2, 3",
        "This `sum(0,1,2,3,4,5,6,7,8,9,10)` is ok",
        {
            options: {
                max: 5
            },
            text: "0, 1, 2, 3, 4"
        },
        // example
        fs.readFileSync(__dirname + "/fixtures/README.md", "utf-8")
    ],
    invalid: [
        {
            text: "t0, t1, t2, t3, t4, t5",
            errors: [
                {
                    message: "This sentence exceeds the maximum count of comma. Maximum is 4.",
                    line: 1,
                    column: 1
                }
            ]
        },
        // multi sentence
        {
            text: `First line, is ok.
Second, this, is, not, ok, sentence.`,
            errors: [
                {
                    message: "This sentence exceeds the maximum count of comma. Maximum is 4.",
                    line: 2,
                    column: 1
                }
            ]
        }
    ]
});