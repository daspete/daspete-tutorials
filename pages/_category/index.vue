<template>
    <div class="page">
        <topmenu :pages="categories"></topmenu>
        <spotlight :page="category"></spotlight>
        <miner></miner>
        <contentblock v-if="content.trim() != '<section></section>'" :content="content"></contentblock>
        <category :childs="category.subcategories"></category>
        <comments></comments>
        <pagefooter></pagefooter>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: this.category.title,
            meta: [
                { name: 'description', content: this.category.meta.description },
                { name: 'keywords', content: this.category.meta.keywords },
                { name: 'og:title', content: this.category.title },
                { name: 'og:site_name', content: process.env.SITE_NAME },
                { name: 'og:description', content: this.category.meta.description },
                { name: 'og:image', content: process.env.SITE_URL + this.category.meta.image },
                { name: 'og:image:width', content: '917' },
                { name: 'og:image:height', content: '480' }
            ]
        }
    },

    async asyncData({app, store, params }){
        let categories = await app.$axios.$get('categories');
        let category = await app.$axios.$get(`categories?href=${ params.category }&_embed=subcategories`);
        category = category[0];

        let content = require(`~/data/content/${ category.content }`);

        return {
            categories,
            category,
            content
        }
    }
}
</script>
