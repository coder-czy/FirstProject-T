import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutations/mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,
        username: '',
        password: '',


        store: {},
        cart: [],
        orderType: 'takein',
        address: {},
        addresses: {},
        member: {},
        order: {}
    },
    mutations: {
        [types.setUserMsg](state, userMsg) {
            state.username = userMsg.username
            state.password = userMsg.password
        },
        [types.setLoginStatus](state, isLogin) {
            state.isLogin = isLogin
        },
        [types.SET_ORDER_TYPE](state, type) {
            state.orderType = type
        },
        [types.SET_MEMBER](state, member) {
            state.member = member
        },
        [types.SET_ADDRESS](state, address) {
            state.address = address
        },
        [types.SET_ADDRESSES](state, addresses) {
            state.addresses = addresses
        },
        [types.SET_STORE](state, store) {
            state.store = store
        },
        [types.SET_CART](state, cart) {
            state.cart = cart
        },
        [types.REMOVE_CART](state) {
            state.cart = []
        },
        [types.SET_ORDER](state, order) {
            state.order = order
        }
    },
    actions: {
        async getStore({ commit }) {
            const store = await api('store')
            commit('SET_STORE', store)
        }
    },
    modules: {}
})