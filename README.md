# textlint-rule-max-comma [![Build Status](https://travis-ci.org/azu/textlint-rule-max-comma.svg?branch=master)](https://travis-ci.org/azu/textlint-rule-max-comma)

[textlint](http://textlint.github.io/ "textlint") rule is that limit maximum comma(,) count of sentence.

## Installation

    npm install textlint-rule-max-comma

## Usage

    $ npm install -D textlint textlint-rule-max-comma
    $ $(npm bin)/textlint --rule max-comma README.md
    #    11:0  error  This sentence exceeds the maximum count of comma. Maximum is 4.

## Configure

Configure the maximum number of "," allowed in a sentence. The default is `4`

Configure `"max"` value of the `.textlintrc` file.

```json
{
  "rules": {
    "max-comma": {
        "max" : 3
    }
  }
}
```

## Tests

    npm test

## Related

- [azu/textlint-rule-max-ten: textlint rule that limit maxinum ten(、) count of sentence.](https://github.com/azu/textlint-rule-max-ten "azu/textlint-rule-max-ten: textlint rule that limit maxinum ten(、) count of sentence.")

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT