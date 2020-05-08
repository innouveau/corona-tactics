<script>
    import lineChart from "./components/graph/line-chart";
    import comment from "./components/comment";
    import tactics from "./components/tactics";
    import animation from '@/tools/animation';

    import dataTactics from '@/data/tactics';
    import events from '@/data/events';
    import tools from "./components/tools";
    import Disclaimer from "./components/disclaimer";

    export default {
        name: 'app',
        components: {
            Disclaimer,
            tools,
            lineChart,
            comment,
            tactics
        },
        props: {},

        computed: {
            dataLoaded() {
                return this.$store.state.dataLoaded;
            },
            showDisclaimer() {
                return this.$store.state.ui.disclaimer;
            }
        },
        methods: {
            initData() {
                let tactics;
                this.$store.commit('events/init', events);
                tactics = dataTactics.map(t => {
                    let tactic = {...t};
                    tactic.periods = t.periods.map(p => {
                        let period = {...p};
                        period.event = this.$store.getters['events/getItemById'](p.event_id);
                        return period;
                    });
                    return tactic;
                });
                this.$store.commit('tactics/init', tactics);
                this.$store.commit('settings/updateProperty', {key: 'loaded', value: true});
            },
            startAnimation() {
                animation.start(this.$store.state.tactics.all);
            },
            show() {
                this.$store.commit('ui/updateProperty', {key: 'disclaimer', value: true});
            }
        },
        mounted() {
            this.initData();
            setTimeout(() =>{
                this.startAnimation();
            }, 10);
        }
    }
</script>


<template>
    <div class="app">
        <div class="left">
            <tactics/>
        </div>
        <div class="right">
            <comment/>
            <line-chart/>
            <tools/>
        </div>
        <div
            @click="show()"
            class="show-disclaimer">
            Disclaimer
        </div>
        <disclaimer
            v-if="showDisclaimer"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .app {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;

        .left {
            width: 300px;
        }

        .right {
            width: calc(100% - 300px);
        }

        .show-disclaimer {
            position: absolute;
            right: 8px;
            bottom: 8px;
            cursor: pointer;
            text-decoration: underline;
        }

        .button {
            border: 1px solid #888;
            padding: 10px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 700;
            margin-right: 10px;

            &:hover {
                background: orange;
            }
        }
    }
</style>