<template>
    <div id="newsfeed">
        <h2 class="m-t-0 m-b-20">Latest Beeps</h2>
        <beep-list></beep-list>
    </div>
</template>

<script>
    import BeepList from './BeepList';

    export default {
        name: 'newsfeed',
        components: {
            beepList: BeepList,
        },
    }
</script>

<style scoped>

</style>