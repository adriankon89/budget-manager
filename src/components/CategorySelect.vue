<template>
    <select v-model="selected"
        class="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200">
        <option disabled value="">Select category</option>
        <option v-for="category in store.categories" :key="category" :value="category.id">
            {{ category.name }}
        </option>
    </select>

</template>

<script setup>
import { useCategoryStore } from '@/stores/categoryStore'

const store = useCategoryStore()
const selected = defineModel();
</script>
