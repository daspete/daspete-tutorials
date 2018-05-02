import Vue from 'vue'

import Topmenu from '~/components/Topmenu'
import Spotlight from '~/components/Spotlight'
import Tutorials from '~/components/Tutorials'
import Pagefooter from '~/components/Pagefooter'

import Category from '~/components/Category'

Vue.component('topmenu', Topmenu)
Vue.component('spotlight', Spotlight)
Vue.component('tutorials', Tutorials)
Vue.component('pagefooter', Pagefooter)

Vue.component('category', Category)