<template>
    <div class="page">
        <topmenu :pages="categories"></topmenu>
        <spotlight :page="category"></spotlight>
        <contentblock :content="content"></contentblock>
        <category :childs="category.subcategories"></category>
        <pagefooter></pagefooter>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: this.category.label,
            meta: [
                { name: 'description', content: this.category.meta.description }
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
