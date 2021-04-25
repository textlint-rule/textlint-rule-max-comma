import TextLintTester from "textlint-tester";
import rule from "../src/textlint-rule-max-comma";
import fs from "fs";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("no-todo", rule, {
    valid: [
        // no match
        "This is text.",
        // 3 is ok by default
        "0, 1, 2, 3",
        "This `sum(0,1,2,3,4,5,6,7,8,9,10)` is ok",
        {
            text: "0, 1, 2, 3, 4",
            options: {
                max: 5
            }
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
                    column: 19
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
                    index: 25
                }
            ]
        }
    ]
});
