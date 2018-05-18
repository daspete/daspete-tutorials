<template>
    <div class="contentblock">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="contentblock__content" v-html="content"></div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    props: ['content']
}
</script>