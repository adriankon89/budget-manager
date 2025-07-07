import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref([
    { id: 1, name: 'Sport' },
    { id: 2, name: 'Entertainment' },
    { id: 3, name: 'Gas' },
    { id: 4, name: 'Income' }
  ])

  const addCategory = (newCat) => {
    const trimmed = newCat.trim()
    if (
      trimmed &&
      !categories.value.some((cat) => cat.name.toLowerCase() === trimmed.toLowerCase())
    ) {
      const nextId = categories.value.length
        ? Math.max(...categories.value.map((cat) => cat.id)) + 1
        : 1
  
      categories.value.push({ id: nextId, name: trimmed })
    }
  }
  const getCategoryNameById = (categoryId) => {
    const found = categories.value.find((cat) => cat.id === categoryId)
    return found?.name ?? null
  }

  const updateName = (categoryId, newName) => {
    const trimmed = newName.trim()
    if (!trimmed) return
  
    const nameExists = categories.value.some(
      cat => cat.name.toLowerCase() === trimmed.toLowerCase() && cat.id !== categoryId
    )
    if (nameExists) return
  
    const found = categories.value.find(cat => cat.id === categoryId)
    if (found) {
      found.name = trimmed
    }
  }

  return {
    categories,
    addCategory,
    getCategoryNameById,
    updateName
  }
})