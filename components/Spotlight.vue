<template>
    <div class="spotlight" :style="`${page.spotlight.image ? `background-image: url('${ page.spotlight.image }')` : ''}`">
        <div class="spotlight__content">
            <h1 class="spotlight__headline" v-if="page.spotlight.headline" v-html="page.spotlight.headline"></h1>
            <span class="spotlight__subline" v-if="page.spotlight.subline" v-html="page.spotlight.subline"></span>
        </div>
    </div>
</template>


<script>
export default {
    props: ['page']
}
</script>