import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import settings from './modules/settings';
import ui from './modules/ui';

import tactics from './modules/tactics';
import events from './modules/events';

const state = {
    dataLoaded: false
};
const mutations = {
    updateProperty(state, payload) {
        state[payload.key] = payload.value;
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions: {},
    modules: {
        tactics, events,
       settings, ui
    }

})
