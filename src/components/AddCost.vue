<template>
    <div>
        <div class="space-y-4">
            <div class="flex items-center space-x-4">
                <label for="cost-value" class="text-sm font-medium text-gray-900 w-24">Value</label>
                <input id="cost-value" v-model="costValue" placeholder="Cost value" type="number" step="0.01"
                    class="flex-1 rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600" />
            </div>

            <div class="flex items-center space-x-4">
                <label for="cost-name" class="text-sm font-medium text-gray-900 w-24">Name</label>
                <input id="cost-name" v-model="costName" placeholder="Cost name"
                    class="flex-1 rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600" />
            </div>

            <div class="flex items-center space-x-4">
                <label for="category" class="text-sm font-medium text-gray-900 w-24">Category</label>
                <CategorySelect id="category" v-model="selectedCategoryId" class="flex-1" />
            </div>

            <div class="flex items-center space-x-4">
                <label for="cost-date" class="text-sm font-medium text-gray-900 w-24">Date</label>
                <input id="cost-date" type="date" v-model="date"
                    class="flex-1 rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600" />
            </div>

            <button @click="saveCost"
                class="bg-cyan-500 text-white px-4 py-2 rounded-md shadow hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 border-0 w-full">
                {{ isEditMode ? 'Update' : 'Add' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import CategorySelect from '@/components/CategorySelect.vue'
import { useCostStore } from '../stores/costStore'

import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
    cost: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['saved'])

const costStore = useCostStore()

const selectedCategoryId = ref('')
const costName = ref('')
const costValue = ref(0)
const date = ref(new Date().toISOString().substr(0, 10))

watch(
    () => props.cost,
    (newCost) => {
        if (newCost) {
            selectedCategoryId.value = newCost.categoryId
            costName.value = newCost.name
            costValue.value = newCost.amount
            date.value = newCost.date
        } else {
            resetForm()
        }
    },
    { immediate: true }
)

function resetForm() {
    selectedCategoryId.value = ''
    costName.value = ''
    costValue.value = 0
    date.value = new Date().toISOString().substr(0, 10)
}

const isEditMode = computed(() => props.cost !== null)

function saveCost() {
    if (isNaN(costValue.value) || costValue.value <= 0) {
        alert('Cost must be a positive number')
        return
    }
    if (selectedCategoryId.value === '') {
        alert('Category must be selected')
        return
    }
    if (costName.value.trim() === '') {
        alert('Name must be provided')
        return
    }

    if (isEditMode.value) {
        costStore.updateCost({
            id: props.cost.id,
            name: costName.value.trim(),
            amount: parseFloat(costValue.value),
            categoryId: selectedCategoryId.value,
            date: date.value
        })
        alert('Cost was updated')
    } else {
        costStore.addCost({
            id: uuidv4(),
            name: costName.value.trim(),
            amount: parseFloat(costValue.value),
            categoryId: selectedCategoryId.value,
            date: date.value
        })
        alert('Cost was added')
        resetForm()
    }

    emit('saved')
}
</script>
