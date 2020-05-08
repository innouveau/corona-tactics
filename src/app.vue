<script>
    import lineChart from "./components/graph/line-chart";
    import comment from "./components/comment";
    import tactics from "./components/tactics";
    import animation from '@/tools/animation';

    import dataTactics from '@/data/tactics';
    import events from '@/data/events';

    export default {
        name: 'app',
        components: {
            lineChart,
            comment,
            tactics
        },
        props: {},

        computed: {
            dataLoaded() {
                return this.$store.state.dataLoaded;
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
            },
            startAnimation() {
                animation.start(this.$store.state.tactics.all);
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
        </div>
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
    }
</style>