import Vue from 'vue'

import Site from '~/helpers/site'

export default ({ store, params }) => {
    let site = new Site({
        params: params
    });

    store.commit('SET_PAGE', site.GetPage());
    store.commit('SET_CHILDREN', site.GetChilds());
    store.commit('SET_MAINCHILDREN', site.GetMainChilds());
}