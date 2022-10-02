# Blog (to be named and WIP!)

I know this readme is VERY boring, but it's early days for this project so it comes later!

# What is it

Host your own micro-blogging platform like Twitter. Post whatever you like, with zero restrictions. Open-source, written with TypeScript.

| ![screenshot1](https://user-images.githubusercontent.com/28375223/193466903-d28784d3-c8dc-4d41-9f5f-2e848bd95f8f.png) | ![screenshot2](https://user-images.githubusercontent.com/28375223/193466906-8380788e-1965-41c1-ae53-ff0a99e855a2.png) |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |

You can find a live demo at [this link](https://test.jackwright.uk)! You can't login, but you can see it as a public user.

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

-   Ensure the docker-compose.yml file at the root has all necessary environment variables. As you are now in a production setting the following MUST be present:
    -   HCAPTCHA_SITEKEY and HCAPTCHA_SECRET which you can find when you create a free account at [hCaptcha's site](https://dashboard.hcaptcha.com/signup).
        -   Left unchanged, hCaptcha will be left in testing mode allowing any bots to bypass it without challenge.
    -   PUB_HOST set to your live domain (e.g. example.com).
        -   If wrong, your SSL will not work, and CORS will block requests.
    -   Change JWT_SECRET to something more secure. I recommend using a cryptographically secure password generator to create a secret that is at least 512 bits in length with a mixture of special characters, numbers and letters.
        -   The current secret is public, which makes fraudulent tokens easy to create allowing hackers to trivially compromise any account.
    -   (Coming soon) update the database driver to use Postgres.
    -   The rest are safe to leave.
-   For HTTPS to work correctly, you will need to purchase an SSL certificate. Once you have your credentials you must overwrite the self-signed certs found in `dist/ssl`. Your certificates MUST use the same naming conventions as the self-signed ones. It is best to just overwrite the contents of the existing self-signed ones to ensure you get it right.
    -   "Why not Let's Encrypt?" whilst I have managed to get Let's Encrypt to work with Docker before, it is highly finnicky and hard to manage. So I made the decision to support paid SSL certs only. Sorry.
-   Run `docker-compose up` to launch and build the production environment. Use `-d` to run it as a background process.
-   Visit the configured public URL!

## Creating your first user

Simply to to /admin to create your first user. This applies in development and production.
