<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">{{ title }}</h1>
        <Menu />
        <main class="mt-4">
            <slot />
        </main>
    </div>
</template>

<script setup>
import Menu from '@/components/Menu.vue'

defineProps({
    title: {
        type: String,
        required: true,
    }
})
</script>