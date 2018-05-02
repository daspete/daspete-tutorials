export const state = () => {
    return {
        children: null,
        mainchildren: null    
    }
}

export const mutations = {
    SET_CHILDREN(state, children){ state.children = children },
    SET_MAINCHILDREN(state, mainchildren){ state.mainchildren = mainchildren }
}

export const getters = {
    children(state){ return state.children },
    mainchildren(state){ return state.mainchildren }
}