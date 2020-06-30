## About this project

This repo is essentially a starter template for my personal [Next.js](https://nextjs.org/) projects; however, you are more than welcome to use it with some possible limited support. There will be changes to this project as technologies update or new techniques are discovered that make sense to add.

The project was created with the following primary libraries...

-   [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app)
-   [Prisma 1](https://v1.prisma.io/docs/1.34) - a GraphQL server library
-   [Apollo Server (micro) and Client](https://www.apollographql.com/)
-   [RMWC](https://rmwc.io/) - a Material Design React component library using SCSS files from the material design library
-   and other various tools

Setup files for Apollo all reside under the graphql folder. This is where modifications can be made to the type defs, mutations, and resolvers for the Apollo server as well as the init-apollo file for the client. The Apollo Server actually resides under `src/pages/api/graphql.js`. This is a nifty way to run the server under the NextJS node server using the `apollo-server-micro` library. The initilizatoin of Apollo into the client is imported into the `src/pages/_app.js` file.

In order to get the benefits of SASS, the project uses a combo of the [RMWC library](https://rmwc.io/) with the SCSS files from the [Material Design Components Web library](https://github.com/material-components/material-components-web). These are all located within the `src/components/core` directory.

This project uses a [BEM coding standard](http://getbem.com/introduction/) for naming the css classes of the components. This is a clean way to keep your components well namespaced and prevents css collisions. As you will see in all the components, they use a `getClassName` function to help with enforcing this rule. Also have a look at the `*.scss` files within the `src/components/core` library on some techniques of how to set up the seletors. Primary thing to avoid is never use the class name created for a component in another file. Always pass a className prop down to the component being used if you want to add additional styling from its parent. If you follow this rule, the `!important` flag should never have to be used. There are also several global SASS vars that should be used whenever setting colors, z-index, font styling and sizing when it should be used globally such as gutter widths. These are all located within the `styles/` folder beginning with `_` in the name. If you import the `_globals.scss` file, it will include all the global variables that should be available to the app.

## Getting Started

Duplicate the example.env file to a .env file and update the values. The NEXT*PUBLIC_SITE_NAME should be the value of your site name. This will be impletemented into the `<title/>` tag as well as other various meta tags for SEO. Pro Tip: If you are planning on adding additional env constants, any env constant starting with NEXT_PUBLIC* will make it available within the NextJS client JS files. The NEXT_PUBLIC_SITE_URL only adds the site url to a meta tag for SEO at this time. The component repsonsible for most of the tags relating to SEO is located at `src/components/app/SEO.js`. Also read more on the [`next/head`](https://nextjs.org/docs/api-reference/next/head) component if you want to learn more on how to set up the SEO on the site.

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

Run the prisma deploy any time you make changes to the `datamodel.prisma` file.

If you do not install Prisma globally, use this script to deploy it.

```bash
npm run prisma:deploy
```

Run `prisma1 generate` to create a prisma client. Also, run this any time you make changes to the type definitions under `src/graphql`

```bash
npm run prisma:generate
```

### Run the development server:

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) (or whatever port you use set in the package.json file) with your browser to see the result...

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Deploy Prisma Server on Heroku

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

If you're having trouble with this, you can create a new folder, run `prisma1 init`, choose the prisma server you just created as part of the questions, name the project the desired name and finish out the questions. Once fininished, open the prisma.yml file and copy the endpoint url from that file and replace the value of the PRISMA_ENDPOINT constant in the .env file in this project.

Also check out [Getting Started](https://v1.prisma.io/docs/1.34/get-started) in the Prisma 1 docs.
