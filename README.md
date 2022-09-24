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

At the moment, this project runs on SQLite, however, it will will work with PostgreSQL in the future (for production, SQLite is good for development).

## How to set up (local dev)

-   Ensure all `.env.example` files found in the project are copied and renamed to `.env` and make adjustments to your environment where necessary.
-   Install Yarn as a global dependency `npm i -g yarn`
-   Run `yarn install` and when done run `yarn run dev` to launch the backend and frontend.
-   Visit the configured frontend URL!

Tips:

-   Run `yarn run devtools` to launch prisma studio and access the database.

## Or, launch docker (production)

-   Ensure the docker-compose.yml file at the root has all necessary environment variables.
-   Run `docker-compose up` to launch and build the production environment.
-   Visit the configured frontend URL!
-
