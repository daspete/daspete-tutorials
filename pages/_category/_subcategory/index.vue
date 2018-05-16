<template>
    <div class="page">
        <topmenu :pages="categories"></topmenu>
        <spotlight :page="subcategory"></spotlight>
        <contentblock :content="content"></contentblock>
        <category :childs="subcategory.contents"></category>
        <pagefooter></pagefooter>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: this.subcategory.label, 
            meta: [
                { name: 'description', content: this.subcategory.meta.description }
            ]
        }
    },
    async asyncData({app, store, params }){
        let categories = await app.$axios.$get('categories');
        let subcategory = await app.$axios.$get(`subcategories?href=${ params.subcategory }&_embed=contents`);
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
