<template>
    <div class="comments">
        <div class="container">
            <vue-disqus shortname="daspetetutorials" :identifier="pageIdentifier" :url="pageurl"></vue-disqus>
        </div>
    </div>
</template>

<script>
export default {
    
    data(){
        return {
            pageIdentifier: this.$route.path,
            pageurl: `https://tutorials.daspete.at${ this.$route.path }`
        }
    }

}
</script>

<style lang="scss" scoped>
.comments {
    padding: 1rem 0;
    background-color: white;
}
</style>
