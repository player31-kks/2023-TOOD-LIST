db:
	docker-compose up -d
db-inspect:
	atlas schema inspect -u "postgres://qwer:qwer1234@localhost:5432/qwer?sslmode=disable"
db-apply:
	atlas schema apply -u "postgres://qwer:qwer1234@localhost:5432/qwer?sslmode=disable" --to file://schema/schema.hcl
db-erd:
	atlas schema inspect -u "postgres://qwer:qwer1234@localhost:5432/qwer?sslmode=disable" --visualize