<template>
    <div class="page">
        <topmenu :pages="categories"></topmenu>
        <spotlight :page="home"></spotlight>
        <miner></miner>
        <contentblock v-if="content.trim() != '<section></section>'" :content="content"></contentblock>
        <category :childs="categories"></category>
        <comments></comments>
        <pagefooter></pagefooter>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: this.home.title,
            meta: [
                { name: 'description', content: this.home.meta.description },
                { name: 'keywords', content: this.home.meta.keywords },
                { name: 'og:title', content: this.home.title },
                { name: 'og:site_name', content: process.env.SITE_NAME },
                { name: 'og:description', content: this.home.meta.description },
                { name: 'og:image', content: process.env.SITE_URL + this.home.meta.image },
                { name: 'og:image:width', content: '917' },
                { name: 'og:image:height', content: '480' }
            ]
        }
    },

    async asyncData({app, store }){
        let home = await app.$axios.$get('home');
        let categories = await app.$axios.$get('categories');

        let content = require(`~/data/content/${ home.content }`);

        return {
            home: home,
            categories: categories,
            content: content
        }
    }

    
}
</script>
