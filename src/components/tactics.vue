<script>
    import tactic from "./tactic";

    export default {
        name: 'tactics',
        components: {
            tactic
        },
        props: {},
        computed: {
            tactics() {
                return this.$store.state.tactics.all;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="tactics">
        <tactic
            v-for="tactic in tactics"
            :tactic="tactic"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .tactics {
        height: 100%;
        overflow: auto;
        padding: 8px 28px 8px 8px;
        //display: flex;
    }
</style>