<template>
    <div class="page">
        <topmenu :pages="categories"></topmenu>
        <spotlight :page="contentSettings"></spotlight>
        <contentblock :content="content"></contentblock>
        <!-- <category :childs="subcategory.contents"></category> -->
        <pagefooter></pagefooter>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: this.contentSettings.label,
            meta: [
                { name: 'description', content: this.contentSettings.meta.description }
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
