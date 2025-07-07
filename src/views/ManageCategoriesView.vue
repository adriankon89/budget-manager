<template>
    <DefaultLayout title="Manage Categories">
        <div class="mb-4">
            <input v-model="newCategory" placeholder="New category" class="border px-2 py-1 rounded" />
            <button @click="add" :disabled="!newCategory.trim()"
                class="ml-2 bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50">
                Add
            </button>
        </div>

        <ul v-if="categoryStore.categories.length" class="space-y-2">
            <li v-for="category in categoryStore.categories" :key="category.id"
                class="border p-2 rounded flex flex-col gap-2">
                <div class="flex items-center justify-between">
                    <span>{{ category.name }}</span>

                    <div class="flex gap-2">
                        <button v-if="editCategoryDisplay !== category.id" @click="editCategory(category.id)"
                            class="bg-blue-400 text-white px-3 py-1 rounded">
                            Edit
                        </button>
                    </div>
                </div>

                <div v-if="editCategoryDisplay === category.id" class="flex gap-2 items-center">
                    <input v-model="editCategoryValue" placeholder="Edit category" class="border px-2 py-1 rounded" />
                    <button @click="update" class="bg-green-500 text-white px-4 py-1 rounded"
                        :disabled="!editCategoryValue.trim()">
                        Save
                    </button>
                </div>
            </li>
        </ul>

        <p v-else class="text-gray-500">No categories yet.</p>
    </DefaultLayout>
</template>

<script setup>
import { useCategoryStore } from '@/stores/categoryStore'
import { ref } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const categoryStore = useCategoryStore()
const newCategory = ref('')
const editCategoryValue = ref('')
const editCategoryDisplay = ref(0)

const add = () => {
    categoryStore.addCategory(newCategory.value)
    newCategory.value = ''
}

const editCategory = (categoryId) => {
    const categoryValue = categoryStore.getCategoryNameById(categoryId)
    if (categoryValue) {
        editCategoryDisplay.value = categoryId
        editCategoryValue.value = categoryValue
    }
}

const update = () => {
    categoryStore.updateName(editCategoryDisplay.value, editCategoryValue.value)
    editCategoryValue.value = ''
    editCategoryDisplay.value = 0
}
</script>