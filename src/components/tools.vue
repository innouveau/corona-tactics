<script>
    import animation from '@/tools/animation';
    import variables from "./variables";

    export default {
        name: 'tools',
        components: {
            variables
        },
        props: {},
        data() {
            return {
                isEditing: false
            }
        },
        computed: {
            loaded() {
                return this.$store.state.settings.loaded;
            }
        },
        methods: {
            replay() {
                animation.start(this.$store.state.tactics.all);
            },
            edit() {
                this.isEditing = true;
            }
        }
    }
</script>


<template>
    <div class="tools">
        <div
            @click="replay()"
            class="button">
            Speel opnieuw
        </div>

        <div
            v-if="loaded"
                @click="edit()"
                class="button">
            Wijzig de variabelen
        </div>
        <variables
            v-if="isEditing"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .tools {
        display: flex;
        align-items: center;

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