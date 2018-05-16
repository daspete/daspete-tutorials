<template>
    <div class="page">
        <topmenu :pages="categories"></topmenu>
        <spotlight :page="home"></spotlight>
        <contentblock :content="content"></contentblock>
        <category :childs="categories"></category>
        <pagefooter></pagefooter>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: this.home.label,
            meta: [
                { name: 'description', content: this.home.meta.description }
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
