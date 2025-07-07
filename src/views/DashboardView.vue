<template>
    <DefaultLayout title="Budget Dashboard">
        <button v-if="costStore.isEmpty" @click="generateDemo" class="bg-blue-500 text-white px-4 py-2 rounded">
            Generate Demo Data
        </button>

        <button v-if="!costStore.isEmpty" @click="clearCosts" class="bg-red-500 text-white px-4 py-2 rounded">
            Clear costs
        </button>

        <div class="flex justify-between items-center mt-4">
            <p class="font-semibold">Latest transactions</p>
            <BalanceDisplay />
        </div>

        <ul class="mt-4">
            <li v-for="cost in costStore.newestCosts" :key="cost.id" class="flex items-center space-x-2 py-1" :class="{
                'text-green-600': cost.type === 'income',
                'text-red-600': cost.type === 'expense'
            }">
                <span>{{ cost.type === 'income' ? '⬆️' : '⬇️' }}</span>
                <span class="font-medium">{{ cost.name }}</span>
                <span class="text-sm">- ${{ cost.amount }} - {{ cost.date }}</span>
                <span class="ml-auto text-xs text-gray-500">
                    ({{ getCategoryName(cost.categoryId) }})
                </span>
            </li>
        </ul>
        <div class="space-y-4">
            <div class="flex justify-end">
                <button @click="showAddCost = !showAddCost"
                    class="flex items-center justify-between bg-blue-100 text-blue-800 px-4 py-2 rounded shadow hover:bg-blue-200 transition">
                    <span>{{ showAddCost ? 'Hide' : 'Add Cost' }}</span>
                    <svg class="w-5 h-5 transform transition-transform duration-200"
                        :class="{ 'rotate-180': showAddCost }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <transition name="fade">
                    <div v-show="showAddCost" class="border border-blue-200 rounded p-4 bg-blue-50">
                        <AddCost />
                    </div>
                </transition>
            </div>
        </div>
    </DefaultLayout>
</template>

<script setup>
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BalanceDisplay from '@/components/BalanceDisplay.vue'
import AddCost from '../components/AddCost.vue'
import { useCostStore } from '@/stores/costStore'
import { useCategories } from '@/composables/useCategories'

const costStore = useCostStore()
const { getCategoryName } = useCategories()

const showAddCost = ref(false)

function generateDemo() {
    costStore.generateDemoData()
}

function clearCosts() {
    costStore.clear()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>