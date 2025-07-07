import { computed } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'

export function useCategories() {
  const categoryStore = useCategoryStore()

  const getCategoryName = (categoryId) => {
    return categoryStore.getCategoryNameById(categoryId) || 'Unknown'
  }

  const categories = computed(() => categoryStore.categories)

  return { getCategoryName, categories }
}
