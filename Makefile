NPM=./node_modules/.bin
SRC=$(shell find lib -type f -name "*.js")
TESTTIMEOUT=5000
REPORTER=spec

node_modules:
	@echo "Installing dependencies..."
	@npm install

dependencies: node_modules

test:
	@node $(NPM)/_mocha \
		--reporter $(REPORTER) \
		--timeout $(TESTTIMEOUT)

coverage: dependencies
	@$(NPM)/istanbul cover $(NPM)/_mocha -- --reporter $(REPORTER)
	@open ./coverage/lcov-report/index.html

min: dependencies
	@$(NPM)/uglifyjs --compress --mangle --comments '/Copyright/' $(SRC) > html2bbcode.min.js

publish:
	@npm run coveralls
	@npm publish

clean:
	@rm -rf coverage

distclean: clean
	@rm -rf node_modules

check: test
deps: dependencies
