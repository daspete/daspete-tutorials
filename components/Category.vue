<template>
    <div class="category">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4" v-for="(child, childindex) in childs" :key="`category-child-${ childindex }`">
                    <nuxt-link :to="`${ GetLink(child) }`" class="category__link">
                        <div class="category__image" v-if="child.thumbnail"><img :src="child.thumbnail" alt="child.label"></div>
                        <div class="category__card">
                            <h3 class="category__label">{{ child.label }}</h3>
                            <p class="category__description" v-html="child.meta.description"></p>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['childs'],

    methods: {
        GetLink(page){
            let link = '/';

            console.log(page);

            if(typeof this.$route.params.category != 'undefined') link += `${ this.$route.params.category }/`;
            if(typeof this.$route.params.subcategory != 'undefined') link += `${ this.$route.params.subcategory }/`;
            if(typeof this.$route.params.content != 'undefined') link += `${ this.$route.params.content }/`;

            link += page.href;

            return link;
        }
    }
}
</script>