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
            text: "t0, t1, t2, t3, t4, t5",
            errors: [
                {
                    message: "This sentence exceeds the maximum count of comma. Maximum is 4.",
                    line: 1,
                    column: 1
                }
            ]
        }
    ]
});