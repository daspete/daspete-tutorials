<template>
    <div class="page">
        <topmenu :pages="categories"></topmenu>
        <spotlight :page="{
            spotlight: {
                image: null,
                headline: 'Impress',
                subline: '..:: Some facts ::..'
            }
        }"></spotlight>
        
        <div class="contentblock">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="contentblock__content">
                            <h2>Contact</h2>

                            <p>
                                Peter Braith<br>
                                Drorygasse 6/1<br>
                                1030 Wien
                            </p>
                            <p>
                                Mail: <a href="mailto:daspetemail@gmail.com">daspetemail@gmail.com</a>
                            </p>

                            <h2>Privacy</h2>
                            <p>
                                This website uses Google Analytics to track user visits with anonymized IP addresses.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <category :childs="categories"></category>
        <pagefooter></pagefooter>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: 'Impress',
            meta: [
                
            ]
        }
    },

    async asyncData({ app }){
        let categories = await app.$axios.$get('categories');
        
        return {
            categories
        }
    }
}
</script>
