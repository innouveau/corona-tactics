<script>
    import Datepicker from 'vuejs-datepicker';
    import dateTools from '@/tools/date';
    import { eventBus } from '@/event-bus';

    export default {
        name: 'variables',
        components: {
            Datepicker
        },
        props: {},
        data() {
            return {
                disabledDatesLockdown: {
                    to: new Date('2020-03-24'),
                    from: new Date('2020-06-29'),
                }
            }
        },
        computed: {
            package1() {
                return this.$store.getters['events/getItemById'](3);
            },
            package2() {
                return this.$store.getters['events/getItemById'](5);
            },
            lockdown() {
                return this.$store.getters['events/getItemById'](2);
            },
            crushTheCurvePackage1() {
                return this.$store.getters['tactics/getItemById'](3).periods[2];
            },
            crushTheCurvePackage2() {
                return this.$store.getters['tactics/getItemById'](3).periods[3];
            },
            startPackage1: {
                set(value) {
                    let date1, date2;
                    date1 = dateTools.dateToString(value);
                    date2 = dateTools.dateToString( new Date(dateTools.offsetFromMs(value.getTime(), -1)));

                    this.$store.commit('tactics/updateDatePackage1', {date1, date2})
                },
                get() {
                    return this.crushTheCurvePackage1.start;
                }
            },
            startPackage2: {
                set(value) {
                    let date1, date2;
                    date1 = dateTools.dateToString(value);
                    date2 = dateTools.dateToString( new Date(dateTools.offsetFromMs(value.getTime(), -1)));

                    this.$store.commit('tactics/updateDatePackage2', {date1, date2})
                },
                get() {
                    return this.crushTheCurvePackage2.start;
                }
            },
            ratePackage1: {
                set(value) {
                    this.$store.commit('events/updatePropertyOfItem', {item: this.package1, property: 'r', value: value})
                },
                get() {
                    return this.package1.r;
                }
            },
            ratePackage2: {
                set(value) {
                    this.$store.commit('events/updatePropertyOfItem', {item: this.package2, property: 'r', value: value})
                },
                get() {
                    return this.package2.r;
                }
            },
            rateLockdown: {
                set(value) {
                    this.$store.commit('events/updatePropertyOfItem', {item: this.lockdown, property: 'r', value: value})
                },
                get() {
                    return this.lockdown.r;
                }
            }
        },
        methods: {
            apply() {
                for (let tactic of this.$store.state.tactics.all) {
                    tactic.fillCases();
                }
                eventBus.$emit('redraw');
                this.$parent.isEditing = false;
            }
        }
    }
</script>


<template>
    <div class="variables">
        <div class="variables__row">
            <div class="variables__label">
                Groeicijfer* Intelligente Lockdown
            </div>
            <input
                v-model="rateLockdown"
                type="number"/>
        </div>
        <div class="variables__row">
            <div class="variables__label">
                Datum start Versoepeling pakket 1 in 'Crush the Curve'<br>
                (oftewel: einde Lockdown)
            </div>
            <datepicker
                    v-model="startPackage1"
                    :disabled-dates="disabledDatesLockdown"/>
        </div>
        <div class="variables__row">
            <div class="variables__label">
                Datum start Versoepeling pakket 2 in 'Crush the Curve'
            </div>
            <datepicker
                    v-model="startPackage2"/>
        </div>
        <div class="variables__row">
            <div class="variables__label">
                Groeicijfer* Versoepeling pakket 1
            </div>
            <input
                    v-model="ratePackage1"
                    type="number"/>
        </div>
        <div class="variables__row">
            <div class="variables__label">
                Groeicijfer* Versoepeling pakket 2
            </div>
            <input
                v-model="ratePackage2"
                type="number"/>
        </div>
        <div class="variables__row variables__row--footer">
            * Groeicijfer is een equivalent van R, maar niet identiek
        </div>
        <div class="footer">
            <div
                @click="apply()"
                class="button">
                Voer uit en teken opnieuw
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .variables {
        border: 1px solid #ddd;
        padding: 32px;
        background: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        width: 500px;
        box-shadow: 2px 2px 12px rgba(0,0,0, 0.2);

        .variables__row {
            display: flex;
            align-items: center;
            padding: 8px 0;

            .variables__label {
                width: 2150px;
            }

            input {
                width: 70px;
                padding: 10px;
            }

            &.variables__row--footer {
                margin-top: 40px;
            }
        }

        .footer {
            display: flex;
            margin-top: 20px;

            .button {
                background: orange;

                &:hover {
                    color: #fff;
                }
            }
        }


    }
</style>