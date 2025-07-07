<template>
    <transition name="fade">
        <div v-if="toast.state.show"
            class="fixed bottom-4 right-4 bg-gray-900 text-white text-sm rounded-lg px-4 py-3 shadow-lg">
            {{ toast.state.message }}
        </div>
    </transition>
</template>

<script setup>
import { inject } from 'vue'

const toast = inject('toast')
</script>


<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>