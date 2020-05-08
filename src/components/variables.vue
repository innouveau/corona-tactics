<script>
    import Datepicker from 'vuejs-datepicker';
    import dateTools from '@/tools/date';

    export default {
        name: 'variables',
        components: {
            Datepicker
        },
        props: {},
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
            crushTheCurveLockdown() {
                return this.$store.getters['tactics/getItemById'](3).periods[1];
            },
            endLockdown: {
                set(value) {
                    let date1, date2;
                    date1 = dateTools.dateToString(value);
                    date2 = dateTools.dateToString( new Date(dateTools.offsetFromMs(value, 1)));

                    this.$store.commit('tactics/updateDateLockdown', {date1, date2})
                },
                get() {
                    return this.crushTheCurveLockdown.end;
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
            },
        },
        methods: {}
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
                Datum einde lockdown in Crush the Curve
            </div>
            <datepicker
                    v-model="endLockdown"/>
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
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .variables {
        border: 1px solid #ddd;
        padding: 10px;
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
                width: 150px;
            }

            input {
                width: 70px;
                padding: 10px;
            }

            &.variables__row--footer {
                margin-top: 40px;
            }
        }


    }
</style>