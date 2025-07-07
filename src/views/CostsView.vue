<template>
    <DefaultLayout title="Add cost">
        <AddCost :cost="costToEdit" />
    </DefaultLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCostStore } from '@/stores/costStore'
import AddCost from '@/components/AddCost.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const route = useRoute()
const costStore = useCostStore()

const costId = route.params.id

const costToEdit = costId ? costStore.costs.find(c => c.id === costId) : null
</script>
