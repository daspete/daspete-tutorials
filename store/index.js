export const state = () => {
    return {
        mineractive: false  
    }
}

export const mutations = {
    SETMINERSTATE(state, mineractive){ state.mineractive = mineractive }
}

export const getters = {
    minerstate(state){ return state.mineractive }
}