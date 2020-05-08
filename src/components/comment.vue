<script>
    export default {
        name: 'comment',
        components: {},
        props: {},
        computed: {
            comment() {
                return this.$store.state.ui.comment;
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        v-html="comment"
        class="comment">
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .comment {
        font-size: 24px;
        font-weight: 700;
        padding: 20px;
        height: 100px;
    }
</style>