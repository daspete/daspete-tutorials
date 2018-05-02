<template>
    <div class="category">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4" v-for="(child, childindex) in childs" :key="`category-child-${ childindex }`">
                {{ child.label }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['childs']
}
</script>
