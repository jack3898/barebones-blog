# Blog (to be named!)

I know this readme is VERY boring, but it's early days for this project so it comes later!

This blog is like a Twitter clone but currently VERY cut down in comparison. In the future, this will be my alternative platform to Twitter. I enjoy the feeling of knowing I can post whatever I like and make the platform bespoke to me.

## Technologies

This blog-twitter-clone-thing (to be named) is proudly powered with some great technologies!

-   TypeScript
-   React
-   Prisma
-   tRPC
-   Docker
-   Turborepo

At the moment, this project runs on SQLite, however, it will will work with PostgresQL in the future (for production, SQLite is good for development).

## How to set up (local dev)

-   Ensure all `.env.example` files found in the project are copied and renamed to `.env` and make adjustments to your environment where necessary.
-   Install Yarn as a global dependency `npm i -g yarn`
-   Run `yarn install` and when done run `yarn run dev` to launch the backend and frontend.
-   Visit the configured URL!

Tips:

-   Run `yarn run devtools` to launch prisma studio and access the database.
-   There is no way to make an account, so you will need to `console.log` a password using `createHash` from the `@blog/utils` package to spit out a hashed password for your dev db. The best place would be in `auth.ts` in the backend which will fire the POST method when you submit the login form, there you can grab the password from the form to `createHash` with. I know it's awkward, but it's temporary!

## Or, launch docker (production)

-   Ensure the docker-compose.yml file at the root has all necessary environment variables.
-   Run `docker-compose up` to launch and build the production environment.
-   Visit the configured URL!

Tip:

-   Again, as you cannot yet create users just add a volume mapping from the development database in `app/backend/prisma/dev.db` to `/home/node/app/backend/prisma/prod.db`. Prisma Studio can still work locally outside of docker also so you can still edit the mapped `dev.db`!
