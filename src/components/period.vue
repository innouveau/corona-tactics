<script>
    import event from "./event";
    import dateTools from '@/tools/date';

    export default {
        name: 'period',
        components: {
            event
        },
        props: {
            period: {
                type: Object,
                required: true
            }
        },
        computed: {
            event() {
                return this.$store.getters['events/getItemById'](this.period.event_id);
            },
            start() {
                return this.formatDate(this.period.start);
            },
            end() {
                return this.formatDate(this.period.end);
            },
            isCurrent() {
                return this.$store.state.settings.currentPeriod === this.period;
            }
        },
        methods: {
            formatDate(date) {
                return dateTools.formatFromString(date);
            }
        }
    }
</script>


<template>
    <div
        :class="{'period--current': isCurrent}"
        class="period">
        <div class="period__event-title">
            {{event.title}}
        </div>
        <div class="period__dates">
            <div class="period__start">
                {{start}}
            </div>
            <div
                v-if="period.end"
                class="period__divider">
                t/m
            </div>
            <div
                v-if="period.end"
                class="period__end">
                {{end}}
            </div>
        </div>

        <event
            :event="event"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .period {
        border: 1px solid #ddd;
        background: #fff;
        padding: 4px;
        margin-bottom: 4px;

        .period__event-title {
            font-weight: 700;
            font-size: 13px;
            margin-bottom: 1px;
        }

        .period__dates {
            display: flex;
            align-items: center;
            color: #888;

            .period__divider {
                margin: 0 4px;
            }
        }

        &:last-child {
            margin-bottom: 0;
        }

        &.period--current {
            background: orange;

            .period__dates {
                color: #fff;
            }
        }
    }
</style>