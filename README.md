## About this project

This repo is essentially a starter template for my personal [Next.js](https://nextjs.org/) projects; however, you are more than welcome to use it with some possible limited support. There will be changes to this project as technologies update or new techniques are discovered that make sense to add. Contributors are certainly welcome as well; however, the libraries and code standards chosen are what I specifically want to use at this time. I'm open to suggestions, but please do not expect for them to change. I've considered converting it over to TypeScript to make it easier to use for developers not familiar with the project, but that takes extra time and I'd prefer having someone with better expertise to help with that. I'm still a little green with TypeScript.

There's much to learn if you aren't already familiar with NextJS, GraphQL and Prisma. There is some information below that explains how to set some things up, but this is not going to be a tutorial or part of one. You can gather a great deal of how the project works just by studying the files located in `src/components` and `src/graphql`; otherwise, you will need to work through the documentation and getting started portions of the libraries described in this document.

The project was created with the following primary libraries...

-   [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) - an isomorphic web application framework
-   [Prisma 1](https://v1.prisma.io/docs/1.34) - a GraphQL server and database library
-   [Apollo Server (micro) and Client](https://www.apollographql.com/) - a GraphQL server/client library
-   [RMWC](https://rmwc.io/) - a Material Design React component library using SCSS files from the material design library
-   and other various tools

Setup files for Apollo all reside under the graphql folder. This is where modifications can be made to the type defs, mutations, and resolvers for the Apollo server as well as the init-apollo file for the client. The Apollo Server actually resides under `src/pages/api/graphql.js`. This is a nifty way to run the server under the NextJS web server using the `apollo-server-micro` library. The initilizatoin of Apollo into the client is imported into the `src/pages/_app.js` file.

In order to get the benefits of SASS, the project uses a combo of the [RMWC library](https://rmwc.io/) with the SCSS files from the [Material Design Components Web library](https://github.com/material-components/material-components-web). These are all located within the `src/components/core` directory. If you add any additional RMWC components, you will also need to install its companion SCSS files from the Material Design Components Web library and import them into that components .scss file. Creating a component for each third-party component in `src/components/core` makes it easy to switch to other libraries if ever desired.

This project uses a [BEM coding standard](http://getbem.com/introduction/) for naming the css classes of the components. This is a clean way to keep your components well namespaced and prevents css collisions. As you will see in all the components, they use a `getClassName` function to help with enforcing this rule. Also have a look at the `*.scss` files within the `src/components/core` library on some techniques of how to set up the seletors. Primary thing to avoid is never use the class name created for a component in another scss file. Always pass a className prop down to the component being used if you want to add additional styling from its parent. As a general rule when styling components, keep the styling to specifically how you want that component to always look. Generally you would never set margins on that component. Let the layout type of styling such as margins and what not come from the parent by passing a className prop down to the component so you can do all the layout type of styling from the parent using that className. If you follow this rule, the `!important` flag should never have to be used. There are also several global SASS vars that should be used whenever setting colors, z-index, font styling and sizing when it should be used globally such as gutter widths. These are all located within the `styles/` folder beginning with `_` in the name. If you import the `_globals.scss` file, it will include all the global variables that should be available to the app.

When a user logs in, a session id is created on the database to handle any actions that require authentication. Authentication uses an encryted httpOnly cookies using the `@hapi/iron` library for the session token as an extra measure of security to prevent access to the token though JavaScript. There is also an access token set in the headers that will keep the session token updated by fetching an updated session token when the access token expires and there's activity on the site. If there is no activity on the site and the session token expires, the user is logged out. If the user manually logs out, these tokens will be cleared from the client and remove the session id from the database. When creating an account, the passwords for the user are encrypted through a salt and hash method for a much more robust encryption.

## Getting Started

Duplicate the example.env file to a .env file and update the values. DO NOT SHARE the .env file you create for this repo!!! It is ignored through the .gitignore and should stay that way. It obviously contains some sensitive information that would open security vulnerabilities to the site. When this repo is ready to go on a public server, the .env file will either have to be created on that server separately. In many cases, there is an admin panel or CLI commands available to set the .env variables through the service you use such as Vercel or Heroku.

**IMPORTANT** - Be sure to change the values, especially the secrets, since the example.env file is shared for everyone to see in this repo.

Pro Tip: If you are planning on adding additional .env constants, any env constant starting with `NEXT_PUBLIC_` will make it available within the NextJS client JS files. Ideally, you would not want to store anything sensitive under environment variables available to the client so be careful what you set for any variables starting with `NEXT_PUBLIC_`.

###Environment Variables defined:

-   **ACCESS_SESSION_TOKEN_SECRET**: This is the token secret for the access token. This is only a JWT token; therefor, sensitive information should not be stored within this token. Use the session token to store any sensitive information, but use with caution.
-   **ACCESS_TOKEN_MAX_AGE**: This is the max age of the access token which should be a small amount of time like 15 minutes. It uses values like 15s for 15 seconds, 15m for 15 minutes.
-   **COOKIE_DOMAIN**: This is the domain that will be set for the cookie in a production build. Be sure to change this or the authorization will not work. Currently it's set to .mysite.local. You can edit your hosts file (`/etc/hosts` on Mac) to point the cookie domain to your local machine by adding this line to it...

    ```
    myserver.local    127.0.0.1
    ```

    ...then use `https://myserver.local:8080` to go to it. You will also need to set up nginx and do a proxy_pass to set up an ssl connection unless you edit the `/src/graphql/lib/app-cookies` file and disable the `secure` param from the cookie params. Here are some [mac instructions](https://github.com/bruqui/development-notes/blob/master/nginx-and-ssl.md) to set up the proxy_pass in nginx. Windows and Unix will be very similar except for the nginx installation procedure and possibly some different file locations.

-   **NEXT_PUBLIC_SITE_NAME**: This is the name of your site. This will go into the `<title />` tag and other meta tags for SEO. The component repsonsible for most of the tags relating to SEO is located at `src/components/app/SEO.js`. Also read more on the [`next/head`](https://nextjs.org/docs/api-reference/next/head) component if you want to learn more on how to set up the SEO on the site.
-   **NEXT_PUBLIC_SITE_URL**: Adds the site url to a meta tag for SEO and is used to set the URL for refreshing the access token.
-   **PRISMA_ENDPOINT**: This is the url to the prisma endpoint.
-   **PRISMA_MANAGEMENT_API_JWT_SECRET**: This is a JWT token secret for the prisma server set in the `docker-compose.yml` file.
-   **PRISMA_POSTGRES_USER**: This is user for the Prisma Postgres db set in the `docker-compose.yml` file.
-   **PRISMA_POSTGRES_PASSWORD**: This is password for the Prisma Postgres db set in the `docker-compose.yml` file.
-   **PRISMA_SECRET**: This is a secret key for the Prisma endpoint to keep it protected with the app connecting to it. The Prisma Client created by `prisma1 generate` or `npm run prisma:generate` will automatically set up the access token to have communication with the Prisma server.
-   **SESSION_TOKEN_MAX_AGE**: This is the max age of the session token in milliseconds (eg. 28000 is 8 hours). This should be set to a longer amount of time which would be the total time to keep a user logged in after the last time the session token is refreshed. The session token will refresh when the access token expires. This requires activity from the user within the timeframe the session token is still valid. If the access token and the session token are both exprired the user is logged out.
-   **SESSION_TOKEN_NAME**: This is the name of the token stored in the cookies. For instance if it were set to STID, if you look at the cookies in the application tab of the dev tools in chrome, you would see STID as the name and the token value as the value.
-   **SESSION_TOKEN_SECRET**: This is the secret to get access to the information in the session token. It must be at least 32 characters long.

### Install dependencies:

```bash
npm install
```

### Prisma Server Setup

This app uses the Prisma 1 library with a Prisma server running in a Docker container. Because of the ease of use with Prisma 1 to generate databases and the opinion that the Prisma 2 library is not quite ready, this repo is sticking with Prisma 1 for now. There are instructions in another section if you wish to run the Prisma server on [Heroku](https://www.heroku.com/home).

First, be sure to [install docker](https://docs.docker.com/get-docker/) if it isn't installed already. There are already files (`datamodel.prisma`, `docker-compose.yml`, `prisma.yml`) created with a base setup; therefor, you will only need to run a deploy command to get it all set up.

If you wish to run Prisma commands directly in the console, install it globally. See the [Prisma 1 docs on intalling](https://v1.prisma.io/docs/1.34/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/#install-the-prisma-cli) it globally.

Start the Prisma server once Docker is available.

```bash
docker-compose up
```

If you need to take the Prisma server back down use this command.

```bash
docker-compose down
```

Run the `prisma1 deploy` command to set the database up with all the tables and columns or any time you make changes to the `datamodel.prisma` file.

If you do not install Prisma globally, use this script to deploy it.

```bash
npm run prisma:deploy
```

Run `prisma1 generate` to create a prisma client. The NextJS server uses the prisma client to make the GraphQL calls to the Prisma server. Also, run this any time you make changes to the type definitions or resolvers under `src/graphql`

```bash
npm run prisma:generate
```

### Modifying data on the Prisma server and client:

When you come to a point where you need to add more tables or columns to the database, open the `datamodel.prisma` file to make changes to the schema for the Prisma server. Check out the [Prisma 1 docs](https://v1.prisma.io/docs/1.34) to learn more on how to set this file up.

When you need to add more functionality to the client side of things, the GraphQL resolvers and type defs are located in the `src/graphql` folder under `directives`, `resolvers` and `type-defs`. These are set up in a modularized way so you can have separation between concerns and prevents you from having one monolithic schema file. For instance, if you wanted to add a todo list, create a file called TodoList.js in the `src/graphql/resolvers` for your resolvers and create another one in the `src/graphql/type-defs` folder the type defs. Keep the type defs you create limited to what you want to have available to the client. For instance any of the password information for a user has been left out of the type defs so the client doesn't have access directly to it. Once you have made the changes, import the file to the `index.js` file in the same folder and follow the patter set up in that file. This will properly add it to the schema through the `src/graphql/schema.js` file. Use the Account.js files in `src/graphql/resolvers` and `src/graphql/type-defs` as a guide on how to set the files up. If you add a directive, you will need to add it to the `src/graphql/type-defs/root.js` file as well. Follow the pattern for `@auth` in that file to add it.

One thing to note which you may not find so easily in GraphQL documentation is that you want to extend type defs that are used in another file. The Query and Mutation type defs are initialized in the schema.js file so you always want to extend those in your type defs. If you need to add a relationship between type defs that are in different files, you would also extend those. For instance, if you wanted to add a relationship between a User type def and a TodoList type def, you would do it this way...

In `src/graphql/Account.js` the User type def looks like this...

```
type User {
    id: ID!
    createdAt: String!
    email: String!
    name: String!
    updatedAt: String!
    todos:
}
```

In the new `src/graphql/ToDos.js` file you would set it up like this...

```
type ToDo {
    id: ID!
    title: String!
    description: String
    createdBy: User!
}

extend type User {
    todos: [ToDo]!
}
```

You can learn more on working with GraphQL and Prisma at [How To GraphQL](https://www.howtographql.com/). This will cover most of the basics which covers a good amount of things set up in the core pieces of this project.

The web client uses the [`@apollo/react-hooks`](https://www.apollographql.com/docs/react/api/react-hooks/) library. Check out the `src/components/app/LoginForm.js` component for an example of its usage.

### Run the development server:

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) (or whatever port you use set in the package.json file) with your browser to see the result...

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Run the server in production mode:

You can run the server locally just like it would run in production by running the following commands...

```
npm run build
npm run start:local
```

The `start:local` script in the package.json file sets the port to 8080 unless you modify it. The `npm start` command is currently set up in a way for Heroku to kick it off.

### Creating Pages that Require Authenticated Requests

When creating pages in the NextJS client (`src/pages/*.js`) that use `isAuthorized()` in any resolvers that it or its children will query or mutate, `getServerSideProps` will need to be exported from `src/graphql/init-apollo` so an access token can be created for SSR.

The easiest way to do that is using `export {myFunction} from 'some-file'`. In this case, it's `getServerSideProps` which is a [NextJS function](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) that will run any functionality within it when it's server sided.

Example: src/pages/my-page.js

```
export default function MyPage() {
    // react content to be rendered
}

// This will refresh the access token which is necessary for SSR
// on any page that requires any authenticated requests
export {getServerSideProps} from 'graphql/init-apollo';
```

## Deploy Prisma Server on Heroku

Create an account or log in on the [Prisma Cloud](https://app.prisma.io/). Once logged in,

-   click on Servers in the main navigation
-   click on Add Server
-   enter a name for the server and click Create Server
-   click Create a new database
-   choose Heroku
-   choose PostgresQL and a desired region can continue on
-   choose Set Up A Server
-   choose Heroku
-   choose the tier you want and click Create Server then View The Server

Change the PRISMA_ENDPOINT value in the .env file to the endpoint url of the server plus `/my-project-name/dev`. Where the `my-project-name` would be replaced with the name of your project. This would be the project name you entered when

For example...
https://my-prisma-server.herokuapp.com/my-project-name/dev

If you're having trouble with this, the easiest work around is to create a new folder, run `prisma1 init`, choose the prisma server you just created as part of the questions, name the project the desired name and finish out the questions. Once fininished, open the `prisma.yml` file and copy the endpoint url from that file and replace the value of the PRISMA_ENDPOINT constant in the .env file in this project.

Also check out [Getting Started](https://v1.prisma.io/docs/1.34/get-started) in the Prisma 1 docs.
