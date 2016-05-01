const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
const rule = require("../src/textlint-rule-max-comma");
// ruleName, rule, { valid, invalid }
tester.run("no-todo", rule, {
    valid: [
        // no match
        "This is text.",
        // 3
        "0, 1, 2, 3",
        {
            options: {
                max: 5
            },
            text: "0, 1, 2, 3, 4"
        }
    ],
    invalid: [
        {
            text: "t0, t1, t2, t3, t4",
            errors: [
                {
                    message: " exceeds the maximum line length of"
                }
            ]
        }]
});