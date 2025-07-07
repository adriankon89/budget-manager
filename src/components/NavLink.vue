<template>
    <router-link :to="to" :class="[
        'inline-block px-6 py-2 rounded-full font-medium transition duration-200 text-sm shadow-sm',
        isActive
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow'
    ]">
        <slot />
    </router-link>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
    to: {
        type: [String, Object],
        required: true,
    },
})

const route = useRoute()

const isActive = computed(() => {
    if (typeof props.to === 'string') {
        return route.path === props.to
    }

    if (typeof props.to === 'object' && props.to.path) {
        return route.path === props.to.path
    }

    return false
})
</script>