import store from '@/store/store'
import { eventBus } from '@/event-bus';

let tactics;



const start = function(tcs) {
    eventBus.$emit('reset');
    tactics = tcs;
    startTactic(tactics[0]);
};

const openTacticBox = function(tactic) {
    for (let t of tactics) {
        if (t.played) {
            eventBus.$emit('show-tactic', t);
        } else {
            if (t === tactic) {
                eventBus.$emit('show-and-rewind-tactic', t);
            } else {
                eventBus.$emit('hide-tactic', t);
            }
        }

        store.commit('tactics/updatePropertyOfItem', {item: t, property: 'open', value: t === tactic} );
        store.commit('tactics/updatePropertyOfItem', {item: t, property: 'visible', value: t === tactic} );
    }
};

const startPeriod = function(period) {
    eventBus.$emit('play-period', {
        tactic: store.state.settings.currentTactic,
        period: period,
        callback: nextPeriod
    });
    store.commit('settings/updateProperty', {key: 'currentPeriod', value: period} );
    if (period.comment) {
        setTimeout(() => {
            store.commit('ui/updateProperty', {key: 'comment', value: period.comment.title} )
        }, 500)
    }

};

const nextPeriod = function() {
    let currentPeriod, currentTactic, index;
    currentTactic = store.state.settings.currentTactic;
    currentPeriod = store.state.settings.currentPeriod;
    index = currentTactic.periods.indexOf(currentPeriod) + 1;

    if (index > (currentTactic.periods.length - 1)) {
        store.commit('tactics/updatePropertyOfItem', {item: currentTactic, property: 'played', value: true} );
        setTimeout(() => {
            nextTactic();
        }, 1000)
    } else {
        startPeriod(currentTactic.periods[index]);
    }
};

const nextTactic = function() {
    let currentTactic, index;
    currentTactic = store.state.settings.currentTactic;
    index = tactics.indexOf(currentTactic) + 1;
    if (index > tactics.length - 1) {
        stop();
    } else {
        startTactic(tactics[index]);
    }
};

const stop = function() {
    store.commit('settings/updateProperty', {key: 'currentTactic', value: null} );
    store.commit('settings/updateProperty', {key: 'currentPeriod', value: null} );
    store.commit('ui/updateProperty', {key: 'comment', value: 'Speel de animatie opnieuw of wijzig de variabelen.'} )
};

const startTactic = function(tactic) {
    console.log(tactic.title);
    eventBus.$emit('play-tactic', {
        tactic: tactic
    });
    store.commit('settings/updateProperty', {key: 'currentTactic', value: tactic} );
    openTacticBox(tactic);
    startPeriod(tactic.periods[0]);
};

export default {
    start
}