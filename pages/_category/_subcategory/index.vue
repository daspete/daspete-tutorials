<template>
    <div class="page">
        <topmenu :pages="categories"></topmenu>
        <spotlight :page="subcategory"></spotlight>
        <miner></miner>
        <contentblock v-if="content.trim() != '<section></section>'" :content="content"></contentblock>
        <category :childs="subcategory.contents"></category>
        <pagefooter></pagefooter>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: this.subcategory.title, 
            meta: [
                { name: 'description', content: this.subcategory.meta.description },
                { name: 'keywords', content: this.subcategory.meta.keywords },
                { name: 'og:title', content: this.subcategory.title },
                { name: 'og:site_name', content: process.env.SITE_NAME },
                { name: 'og:description', content: this.subcategory.meta.description },
                { name: 'og:image', content: process.env.SITE_URL + this.subcategory.meta.image },
                { name: 'og:image:width', content: '917' },
                { name: 'og:image:height', content: '480' }
            ]
        }
    },
    async asyncData({app, store, params }){
        let categories = await app.$axios.$get('categories');
        let subcategory = await app.$axios.$get(`subcategories?href=${ params.subcategory }&_embed=contents`);
        console.log(subcategory);
        subcategory = subcategory[0];

        let content = require(`~/data/content/${ subcategory.content }`);

        return {
            categories,
            subcategory,
            content
        }
    }
}
</script>
