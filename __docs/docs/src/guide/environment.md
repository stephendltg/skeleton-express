# ENVIRONMENT


## PRE-REQUIS:

### DEV:
- install sqlitebrowser: https://sqlitebrowser.org/dl/

```bash [Ubuntu and Derivatives, Debian]
sudo apt-get update
sudo apt-get install sqlitebrowser
```


## KNEX:

**refs**:
- https://devhints.io/knex
- https://knexjs.org/

### For use cli

```bash
npm i knex -g
```

__Create migration:__

```
knex migrate:make migration_name
knex migrate:make migration_name --env production
```

__Run migration:__

```
knex migrate:latest
knex migrate:latest --env staging
knex migrate:latest --env production
```

__Rollback:__

```
knex migrate:rollback
knex migrate:rollback --env staging
knex migrate:rollback --env production
```

__Create seed:__

```
knex seed:make seed_name
knex seed:make seed_name --env staging
knex seed:make seed_name --env production
```

__Run seed:__

```
knex seed:run
knex seed:run --env staging
knex seed:run --env production
```
