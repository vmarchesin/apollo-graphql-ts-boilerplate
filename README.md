# Apollo GraphQL Boilerplate


---
## Development
### Running the project

This project consists of the database (Postgres) and an API server running GraphQL. To start development just run:

```bash
docker-compose up
```

This command has been conveniently added as a script running `npm run dev` with the proper configs.

### DB Migration

In order to migrate the DB you must be running the Postgres container first. Start the container with `docker-compose up` (or `npm run dev`) and migrate using:

```bash
npm run dev:migrate
```

You have to migrate the DB anytime you modify the `prisma/schema.prisma` file.

### Running Prisma

You need to run Prisma commands inside the container that is running the application. If you try them in your local terminal they will fail. That means you need to use the command `npm run docker:prisma` to do so, after spinning up the server with `npm run dev` or `docker-compose up`.

Just pass the argument after the command as such:

```bash
npm run docker:prisma format
```

### Populate DB

You can quickly generate dummy data and populate the DB with a few hundred entries by running:

```bash
npm run docker:prisma db seed
```

You can also just reset the database and it will automatically populate it afterwards.

```bash
npm run dev:migrate:reset
```

This commands resets the database, deleting all entries, and runs the script located in the `prisma/seed` folder.

---
## Playground
### Apollo Studio

You can query the database using GraphQL by accessing http://localhost:4000/graphql.

### Prisma Studio

You can interact with the database directly by accessing http://localhost:5555.
