import _base from './_base-module';
import Tactic from '@/classes/Tactic';

const Model = Tactic;

const state = {
    all: [],
    selected: [],
    current: null
};

const getters = {
    ..._base.getters
};

const actions = {};

const mutations = {
    init(state, set) {
        return _base.mutations.init(state, set, Model);
    },
    updatePropertyOfItem(state, payload) {
        _base.mutations.updatePropertyOfItem(state, payload.item, payload.property, payload.value);
    },
    updateDatePackage1(state, payload) {
        console.log(payload);

        state.all = state.all.map((item) => {
            if (item.id === 3) {
                item.periods = item.periods.map((period) => {
                    if (period.id === 7) {
                        period.end = payload.date2;
                    }
                    if (period.id === 8) {
                        period.start = payload.date1;
                    }
                    return period;
                })
            }
            return item;
        });

    },
    updateDatePackage2(state, payload) {
        state.all = state.all.map((item) => {
            if (item.id === 3) {
                item.periods = item.periods.map((period) => {
                    if (period.id === 8) {
                        period.end = payload.date2;
                    }
                    if (period.id === 9) {
                        period.start = payload.date1;
                    }
                    return period;
                })
            }
            return item;
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}