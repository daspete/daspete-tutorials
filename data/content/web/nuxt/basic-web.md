## The goal

Create a simple site, which has categories and subcategories, with NUXT JS and a REST api, and then deploy it on a remote host.

## Knowledge to have

If you want to get started here, you should learn some things before:

- [Vue.js](https://vuejs.org/) -> With vue.js we can easily build reuseable web components
- [NUXT](https://nuxtjs.org/) -> nuxt.js builts a server side rendering functionality on top of vue.js
- [json-server](https://github.com/typicode/json-server) -> creates a simple and powerful json rest api

## Requirements

You should have following stack:

- ssh access to your production environment
- nodejs >= 9
- pm2 -> install with ``` npm install -g pm2 ```
- yarn -> you can install it with: ``` npm install -g yarn ```
- a running apache environment (for proxying the nodejs instances)

## Basic setup

create a new folder and create your package.json in the terminal with ``` yarn init ``` Answer the few questions to your project (or just hit enter a few times :) )

## Dependencies

We need some vendor packages, install them with:

``` bash
yarn add nuxt # the nuxtjs package
yarn add @nuxtjs/axios # the XHR package for nuxt
yarn add @nuxtjs/markdownit # package to give you the ability to write markdown
yarn add dotenv # helper to use a .env file for different configurations per hosting
yarn add json-server # a simple REST api, organized with json data
yarn add markdown-it-highlightjs # The loader for highlight.js
yarn add node-sass # if you want to use sass in your project
yarn add sass-loader # let nuxt load sass-files
```

or the shorthand

``` bash
yarn add nuxt @nuxtjs/axios @nuxtjs/markdownit dotenv json-server markdown-it-highlightjs node-sass sass-loader
```

after installing the dependencies, start configuring your package.json.

## package.json update

Open your package.json file.

We are creating 4 tasks, we can start afterwards:

``` json
"scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "api": "json-server --watch api/db.json --read-only"
},
```

After the edit, your package.json file should look like:

``` json
{
    "name": "your-project-name",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "scripts": {
        "dev": "nuxt",
        "build": "nuxt build",
        "start": "nuxt start",
        "api": "json-server --watch api/db.json --read-only"
    },
    "dependencies": {
        "@nuxtjs/axios": "^5.3.1",
        "@nuxtjs/markdownit": "^1.2.1",
        "dotenv": "^5.0.1",
        "highlight.js": "^9.12.0",
        "json-server": "^0.12.2",
        "markdown-it-highlightjs": "^3.0.0",
        "node-sass": "^4.9.0",
        "nuxt": "^1.4.0",
        "sass-loader": "^7.0.1"
    }
}
```



## Project tasks

These 4 tasks we just created, have following functionality

| task           | function |
| -------------- | ------------- |
| yarn run dev   | This is our task, while we are developing. Everytime we change a file, the project will automatically recompiled |
| yarn run build | After developing, when we deploy, start this task to compile and optimize the web package |
| yarn run start | This task starts a production node server |
| yarn run api   | This tasks starts the json-server which works as REST API for your page |



## API setup

create a new folder in your project root named ``` api ``` and create a new json file with the name: ``` db.json ```

edit this file and create a simple structure like:

``` json
{
    "categories": [
        {
            "id": 1,
            "title": "My Category",
            "slug": "my-category",
            "content": "my-category.md",
            "meta": {
                "keywords": "",
                "description": ""
            }
        }
    ],

    "subcategories": [
        {
            "id": 1,
            "categoryId": 1,
            "title": "My Subcategory",
            "slug": "my-subcategory",
            "content": "my-category/my-subcategory.md",
            "meta": {
                "keywords": "",
                "description": ""
            }
        }
    ]

}
```

### category fields

| field |description|
| ----- | ----- |
| id | the current id |
| title | the title |
| slug | the current url segment |
| content | the markdown file path (relative to the contents folder we create later on) |
| meta | the current meta datas (keywords and description) we need for SEO |

### subcategory fields

| field |description|
| ----- | ----- |
| id | the current id |
| categoryId | the category id of the current subcategory |
| title | the title |
| slug | the current url segment |
| content | the markdown file path (relative to the contents folder we create later on) |
| meta | the current meta datas (keywords and description) we need for SEO |

Now we can run the yarn task: ``` yarn run api ``` and you should see the documentation of the current api at [http://localhost:3001](http://localhost:3001)


## NUXT config

create a new file on your project root folder named ``` nuxt.config.js ```

``` js
// load our .env file
require('dotenv').config();

module.exports = {

    // setting the currents page html header params
    head: {
        titleTemplate: '%s - ' + process.env.SITE_NAME, // the title of the site, %s is the placeholder for the current page's title
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'HandheldFriendly', content: 'true' }
        ]
    },

    css: [
        '~/assets/scss/styles.scss', // load the current project scss entry file
        { src: '~/node_modules/highlight.js/styles/atom-one-dark.css', lang: 'css' } // use the atom-one-dark theme for highlight.js
    ],

    plugins: [
        '~/plugins/components' // inject all page components
    ],

    modules: [
        '@nuxtjs/axios', // XHR package
        '@nuxtjs/markdownit' // compile markdown files
    ],

    build: {
        extractCSS: true, // extract inline css into separate files
    },

    // the markdownit configuration
    markdownit: {
        preset: 'default',
        linkify: true,
        breaks: true,
        use: [
            'markdown-it-highlightjs'
        ] 
    }

}
```

As you see, we need a few more files:

| file | description |
| ---- | ----------- |
| /plugins/components.js | in this file, we will inject our vue components in all page instances | 
| /assets/scss/styles.scss | this files is the entry file for your (S)CSS |

The ``` /plugins/components.js ``` has following syntax

``` js
// import Vue.js
import Vue from 'vue'

// import your components
import YourComponent from '~/components/YourComponent'

// register your components
Vue.component('your-component', YourComponent)
```

So every component you create has to be imported and registered as a global vue component.

## the .env file

create a new file at ``` /.env ```

and enter following content:

```
API_URL=http://localhost:3001
SITE_NAME=My Site
```

Since we have our api running at port 3001, we have to tell this info our site with the parameter ``` API_URL ```

## Our first page

lets create a new file at ``` /pages/index.vue ```. This will create our first page.

This file has following content: 

``` html
<template>
    <div>
        Hello Nuxt
    </div>
</template>
```

Save the file and run ``` yarn run dev ``` in the terminal. After the compiling task has finished, you can go to [http://localhost:3000](http://localhost:3000) and you should see the text: "Hello Nuxt"

## Lets get the categories

We need to make some changes to our ``` pages/index.vue ``` file

```
<template>
    <div>
        <div v-for="category in categories" :key="`category-link-${ category.slug }`">
            <a :href="category.slug">{{ category.title }}</a>
        </div>
    </div>
</template>

<script>
export default {
    
    // since we use an ajax call to our api, we need to wait for the data
    // to have an asynchrous function, we need to make it async
    async asyncData({ app }){
        // let's get all categories from our api
        let categories = await app.$axios.$get('categories');

        return {
            categories
        }
    }

    
}
</script>
```

**What we have done**
We fetched the categories from our api and stored them in our component data holder.
In the template itself, we loop through the categories and create links for them

## the category page

to view the category content, we need to create a new vue page at ``` /pages/_category/index.vue

```
<template>
    <div>
        I am a category
    </div>
</template>
```

After you saved this file, you can click on the "My category" link at the website, and you should see "I am a category"

Next, we want to show the category content. So create a new markdown file at ``` /contents/my-category.md ```

``` md
# My category content

this is the content of my category
```

Now we can head back to the file ``` /pages/_category/index.vue ```

``` html
<template>
    <div>
        <h1>{{ category.title }}</h1>
        <div v-html="content"></div>
        <div>
            <h2>Subcategories</h2>
            <div v-for="subcategory in category.subcategories" :key="`subcategory-link-${ subcategory.slug }`">
                <a :href="`/${ category.slug }/${ subcategory.slug }`">{{ subcategory.title }}</a>
            </div>
        </div>
        <div>
            <h2>All categories</h2>
            <div v-for="category in categories" :key="`category-link-${ category.slug }`">
                <a :href="category.slug">{{ category.title }}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: this.category.title,
            meta: [
                { name: 'description', content: this.category.meta.description }
            ]
        }
    },

    async asyncData({app, params }){
        let categories = await app.$axios.$get('categories');
        let category = await app.$axios.$get(`categories?slug=${ params.category }&_embed=subcategories`);
        category = category[0];

        let content = require(`~/contents/${ category.content }`);

        return {
            categories,
            category,
            content
        }
    }
}
</script>
```

**What we have done**
We fetched the all categories and the current category from the api, then we fetched the markdown content from the contents folder.
In the template, we show the category title, and the content, after that, we show all subcategories and all categories.

## the subcategory page

The same way, we created the category page, we create the subcategory page in ``` /pages/_category/_subcategory/index.vue ```

Try to create the subcategory page by yourself. You'll find the solution at [github](https://github.com/daspete/basic-nuxt-rest/blob/2af1cbb92325386acbbc596bd3d38f6d10eb7ae4/pages/_category/_subcategory/index.vue)


## Apache vhost configuration

Because we don't want to give the users a strange url like ``` http://your.domain.name:3000 ``` we are proxying the yarn task

You'll need the following configuration at your virtualhost

``` apache
<VirtualHost *:80>
    ServerName your.domain.name

    ProxyRequests on
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

and for the api, you'll need to do the same.

``` apache
<VirtualHost *:80>
    ServerName api.your.domain.name

    ProxyRequests on
    ProxyPass / http://localhost:3001/
    ProxyPassReverse / http://localhost:3001/
</VirtualHost>
```

## Start the production system

now we need to start the api and the site.

Before we can do it, we need to compile the current nuxt project with ``` yarn run build ```

Then start the api with 
```
pm2 start --name="my-api" yarn -- run api
```

After that start the site with
```
pm2 start --name="my-site" yarn -- run start
```

Let pm2 remember your tasks with ``` pm2 save ```

## Resume

Now we have a working website system, in which we can add contents by simply add contents in the db.json file and the markdown files. Of course, you'll need to secure your api endpoint, the json-server package is just for api mockups. There is a nice authorization example [here](https://www.techiediaries.com/fake-api-jwt-json-server/)

The github repo of this tutorial is here: [https://github.com/daspete/basic-nuxt-rest](https://github.com/daspete/basic-nuxt-rest)