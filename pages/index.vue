<template>
    <div class="page">
        <topmenu :pages="$store.getters['mainchildren']"></topmenu>
        <spotlight :page="$store.getters['page']"></spotlight>
        <contentblock :content="content"></contentblock>
        <category :childs="$store.getters['children']"></category>
        <pagefooter></pagefooter>
    </div>
</template>

<script>
export default {
    async asyncData({app, store }){
        return {
            content: app.$md.render(await app.$axios.$get(`/contents/${ store.getters['page'].content }`))
        }
    }
}
</script>
