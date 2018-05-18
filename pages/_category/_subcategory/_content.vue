<template>
    <div class="page">
        <topmenu :pages="categories"></topmenu>
        <spotlight :page="contentSettings"></spotlight>
        <miner></miner>
        <contentblock v-if="content.trim() != '<section></section>'" :content="content"></contentblock>
        <!-- <category :childs="subcategory.contents"></category> -->
        <pagefooter></pagefooter>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: this.contentSettings.title,
            meta: [
                { name: 'description', content: this.contentSettings.meta.description },
                { name: 'og:title', content: this.contentSettings.title },
                { name: 'og:site_name', content: process.env.SITE_NAME },
                { name: 'og:description', content: this.contentSettings.meta.description },
                { name: 'og:image', content: process.env.SITE_URL + this.contentSettings.meta.image },
                { name: 'og:image:width', content: '917' },
                { name: 'og:image:height', content: '480' }
            ]
        }
    },

    async asyncData({app, store, params }){
        let categories = await app.$axios.$get('categories');
        let contentSettings = await app.$axios.$get(`contents?href=${ params.content }`);
        contentSettings = contentSettings[0];

        let content = require(`~/data/content/${ contentSettings.content }`);

        return {
            categories,
            contentSettings,
            content
        }
    }
}
</script>
