include ./backend/.envrc

# ==================================================================================== #
# HELPERS
# ==================================================================================== #

## help: print this help message
.PHONY: help
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'

.PHONY: confirm
confirm:
	@echo -n 'Are you sure? [y/N] ' && read ans && [ $${ans:-N} = y ]

# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #

## dev-api: run the API in development mode
.PHONY: dev-api
dev-api:
	cd ./backend && go run ./cmd/api -db-dsn=${GREENLIGHT_DB_DSN} -cors-trusted-origins="http://localhost:5173"

## dev-frontend: run the frontend development server
.PHONY: dev-frontend
dev-frontend:
	cd ./frontend && pnpm dev

## dev: run both API and frontend development servers
.PHONY: dev
dev:
	@echo "Starting API and frontend in development mode..."
	@(make dev-api &)
	@(make dev-frontend)

## db/psql: connect to the database using psql
.PHONY: db/psql
db/psql:
	psql ${GREENLIGHT_DB_DSN}

## db/migrations/new name=$1: create a new database migration
.PHONY: db/migrations/new
db/migrations/new:
	@echo 'Creating migration files for ${name}...'
	migrate create -seq -ext=.sql -dir=./backend/migrations ${name}

## db/migrations/up: apply all up database migrations
.PHONY: db/migrations/up
db/migrations/up: confirm
	@echo 'Running up migrations...'
	migrate -path ./backend/migrations -database ${GREENLIGHT_DB_DSN} up

# ==================================================================================== #
# FRONTEND
# ==================================================================================== #

## frontend/install: install frontend dependencies
.PHONY: frontend/install
frontend/install:
	cd ./frontend && pnpm install

## frontend/build: build the frontend for production
.PHONY: frontend/build
frontend/build:
	@echo 'Building frontend for production...'
	cd ./frontend && pnpm build

# ==================================================================================== #
# QUALITY CONTROL
# ==================================================================================== #

## audit: tidy and vendor dependencies and format, vet and test all code
.PHONY: audit
audit: vendor
	@echo 'Formatting code...'
	cd ./backend && go fmt ./...
	@echo 'Vetting code...'
	cd ./backend && go vet ./...
	cd ./backend && staticcheck ./...
	@echo 'Running tests...'
	cd ./backend && go test -race -vet=off ./...

## vendor: tidy and vendor dependencies
.PHONY: vendor
vendor:
	@echo 'Tidying and verifying module dependencies...'
	cd ./backend && go mod tidy
	cd ./backend && go mod verify
	@echo 'Vendoring dependencies...'
	cd ./backend && go mod vendor

# ==================================================================================== #
# PRODUCTION
# ==================================================================================== #

## build: build the API application for production
.PHONY: build
build:
	@echo 'Building API binary for production...'
	cd ./backend && go build -ldflags='-s' -o=../bin/api ./cmd/api
	cd ./backend && GOOS=linux GOARCH=amd64 go build -ldflags='-s' -o=../bin/linux_amd64/api ./cmd/api

## run: run the production API binary
.PHONY: run
run: build
	@echo 'Starting API server...'
	./bin/api -db-dsn=${GREENLIGHT_DB_DSN}
