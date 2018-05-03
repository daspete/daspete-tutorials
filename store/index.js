export const state = () => {
    return {
        children: null,
        mainchildren: null,
        page: null   
    }
}

export const mutations = {
    SET_PAGE(state, page){ state.page = page },
    SET_CHILDREN(state, children){ state.children = children },
    SET_MAINCHILDREN(state, mainchildren){ state.mainchildren = mainchildren }

}

export const getters = {
    page(state){ return state.page },
    children(state){ return state.children },
    mainchildren(state){ return state.mainchildren }
}