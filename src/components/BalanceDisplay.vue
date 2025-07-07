<script setup>
import { computed } from 'vue';
import { useCostStore } from '@/stores/costStore';

const costStore = useCostStore();

const balance = computed(() => costStore.balance);

const balanceClass = computed(() => {
    if (balance.value > 0) return 'text-green-400';
    if (balance.value < 0) return 'text-red-400';
    return 'text-gray-400';
});
</script>

<template>
    <p :class="['font-medium, text-xl', balanceClass]">
        {{ balance.toFixed(2) }}
    </p>
</template>
