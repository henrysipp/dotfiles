.PHONY: all build dev lint init dev-build dev-init clean

all: build

build:
	@./scripts/build.sh

dev:
	@./scripts/dev.sh

lint:
	@./scripts/lint.sh

init:
	@./scripts/init.sh

dev-init: init

dev-build:
	@./scripts/devbuild.sh

clean:
	@rm -rf build/