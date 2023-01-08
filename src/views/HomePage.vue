<template>
    <div id="home">
        <main-view :isStudent=isStudent></main-view>
    </div>
</template>

<script>
import MainView from '@/components/MainView.vue'
export default {
    name: 'HomePage',
    components: {
        MainView
    },
}
</script>
