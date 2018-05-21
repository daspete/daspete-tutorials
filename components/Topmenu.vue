<template>
    <div class="topmenu">
        <div class="row">
            <div class="col-12 text-center col-md-3 text-md-left">
                <div class="topmenu__logo"><nuxt-link to="/"><icon name="code"></icon> DasPeTe Tutorials</nuxt-link></div>
            </div>
            <div class="col-12 text-center col-md-9 text-md-right">
                <div class="topmenu__navigation">
                    <ul>
                        <li><nuxt-link to="/">Home</nuxt-link></li>
                        <li v-for="(page, pageid) in pages" :key="`page-link-${ pageid }`"><nuxt-link :to="`/${ page.href }`">{{ page.label }}</nuxt-link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['pages']
}
</script>