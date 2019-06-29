# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```


## Known bugs & issues
1. If a user and an admin have the same email and any of them logins in. The token generated is not differentiable because they both get their token from `tokens` table.
2. Add default image a user's avatar in case their image is not available on cloudinary. [ This can be done on cloudinary so no need to change the url dynamically]