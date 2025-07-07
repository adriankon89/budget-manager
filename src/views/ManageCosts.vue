<template>
    <DefaultLayout title="Manage Costs">
        <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Cost Range</label>
            <div class="flex space-x-2">
                <input type="number" v-model="minAmount" placeholder="From" class="border rounded px-3 py-2 w-full" />
                <input type="number" v-model="maxAmount" placeholder="To" class="border rounded px-3 py-2 w-full" />
            </div>
        </div>

        <div v-if="filteredCosts.length === 0" class="mt-6 text-center text-gray-500 text-sm">
            No costs to display
        </div>

        <ul v-else class="space-y-4 mt-6">
            <li v-for="cost in filteredCosts" :key="cost.id"
                class="bg-white shadow rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-lg transition">
                <div>
                    <p class="text-lg font-semibold text-gray-800">{{ cost.name }}</p>
                    <p class="text-sm text-gray-500 mt-1">
                        <span
                            :class="{ 'text-green-600': cost.type === 'income', 'text-red-600': cost.type === 'expense' }">
                            ${{ cost.amount }}
                        </span>
                        &bull; {{ cost.date }} &bull; {{ getCategoryName(cost.categoryId) }}
                    </p>
                </div>

                <div class="mt-4 sm:mt-0 flex items-center space-x-4">
                    <button @click="removeCost(cost.id)" class="text-red-500 hover:text-red-700 text-sm font-medium">
                        Remove
                    </button>
                    <router-link :to="`/add-cost/${cost.id}`"
                        class="text-blue-500 hover:text-blue-700 text-sm font-medium">
                        Edit
                    </router-link>
                </div>
            </li>
        </ul>

    </DefaultLayout>
</template>


<script setup>
import { ref, computed, inject } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useCostStore } from '@/stores/costStore'
import { useCategories } from '@/composables/useCategories'

const costStore = useCostStore()
const { getCategoryName } = useCategories()
const toast = inject('toast')

const minAmount = computed({
    get: () => costStore.filters.minAmount,
    set: (val) => costStore.setFilters({ minAmount: val }),
})

const maxAmount = computed({
    get: () => costStore.filters.maxAmount,
    set: (val) => costStore.setFilters({ maxAmount: val }),
})

const filteredCosts = computed(() => costStore.filteredCosts)

const removeCost = (costId) => {
    costStore.deleteCost(costId)
    toast.show('Cost was successfully deleted')
}

</script>
