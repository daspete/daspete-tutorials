import Vue from 'vue'

import Site from '~/helpers/site'

export default ({ store, params }) => {
    let site = new Site({
        params: params
    });

    store.commit('SET_CHILDREN', site.GetChilds(params));
    store.commit('SET_MAINCHILDREN', site.GetMainChilds(params));
}