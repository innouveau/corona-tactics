<script>
    import Tactic from "@/classes/Tactic";
    import period from "./period";

    export default {
        name: 'tactic',
        components: {
            period
        },
        props: {
            tactic: {
                type: Tactic,
                required: true
            }
        },
        computed: {
            periods() {
                return this.tactic.periods;
            },
            isCurrent() {
                return this.$store.state.settings.currentTactic === this.tactic;
            }
        },
        methods: {
            toggle() {
                this.$store.commit('tactics/updatePropertyOfItem', {item: this.tactic, property: 'open', value: !this.tactic.open} )
            }
        }
    }
</script>


<template>
    <div
        :class="{'tactic--current': isCurrent}"
        class="tactic">
        <div
            @click="toggle()"
            :style="{'border-bottom': '2px solid ' + tactic.color }"
            class="tactic__title">
            Tactiek {{tactic.id}}
            <b>{{tactic.title}}</b>
        </div>
        <div
            v-if="tactic.open"
            class="tactic__body">
            <div class="tactic__periods">
                <period
                        v-for="period in periods"
                        :period="period"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .tactic {
        border: 1px solid #ddd;
        margin-bottom: 16px;
        background: #eee;
        position: relative;

        &.tactic--current {
            left: 20px;
            box-shadow: 2px 2px 12px rgba(0,0,0,0.2);
        }

        .tactic__title {
            font-size: 14px;
            cursor: pointer;
            padding: 8px;

            &:hover {
                background: #fff;
            }
        }

        .tactic__body {
            padding: 8px;

            .tactic__periods {
                /*display: flex;*/
                /*align-items: center;*/
                margin-top: 8px;
            }
        }
    }
</style>