<script>
    import Event from '@/classes/Event';

    export default {
        name: 'event',
        components: {},
        props: {
            event: {
                type: Event,
                required: true
            }
        },
        computed: {
            sign() {
                if (this.event.r > 1) {
                    return '>';
                } else if (this.event.r < 1) {
                    return '<';
                } else {
                    return '=';
                }
            },
            icon() {
                return 'assets/img/events/' + this.event.icon;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="event">
        <div class="event__description">
            {{event.description}}
        </div>
        <div
            :class="{
                'event__r--up': event.r > 1,
                'event__r--equal': event.r === 1,
                'event__r--down': event.r < 1,
            }"
            class="event__r">R {{sign}} 1</div>
            <div class="event__growth">
                Groeicijfer per dag: {{event.r}}
            </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .event {
        font-size: 14px;

        .event__description {
            font-size: 12px;
        }


        .event__icon {

            img {
                width: 16px;
            }
        }

        .event__title {
            font-weight: 700;

        }

        .event__r {
            display: flex;
            align-items: center;

            &:after {
                margin-left: 6px;
                font-size: 9px;
                font-weight: 700;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
            }

            &.event__r--up {
                &:after {
                    content: '↗';
                    background: red;
                }
            }

            &.event__r--equal {
                &:after {
                    content: '→';
                    background: orange;
                }
            }

            &.event__r--down {
                &:after {
                    content: '↘';
                    background: green;
                }
            }
        }

        .event__growth {
            font-size: 11px;
        }
    }
</style>