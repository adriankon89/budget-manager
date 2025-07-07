import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

function getStoredCosts() {
  try {
    return JSON.parse(localStorage.getItem('costs') || '[]')
  } catch (e) {
    console.error('Error parsing costs from localStorage', e)
    return []
  }
}

export const useCostStore = defineStore('costStore', {
  state: () => ({
    costs: getStoredCosts(),
    filters: {
      minAmount: null,
      maxAmount: null,
    },
  }),

  getters: {
    hasCosts: (state) => state.costs.length > 0,
    isEmpty: (state) => state.costs.length === 0,

    newestCosts: (state) => {
      return [...state.costs]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6)
    },

    totalIncome: (state) =>
      state.costs
        .filter(cost => cost.type === 'income')
        .reduce((sum, cost) => sum + Number(cost.amount), 0),

    totalExpenses: (state) =>
      state.costs
        .filter(cost => cost.type === 'expense')
        .reduce((sum, cost) => sum + Number(cost.amount), 0),

    balance(state) {
      return this.totalIncome - this.totalExpenses
    },

    filteredCosts(state) {
      const min = state.filters.minAmount
      const max = state.filters.maxAmount

      return state.costs.filter(cost => {
        const amount = Number(cost.amount)
        const meetsMin = min != null ? amount >= min : true
        const meetsMax = max != null ? amount <= max : true
        return meetsMin && meetsMax
      })
    },
  },

  actions: {
    setFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters }
    },

    addCost(cost) {
      this.costs.push(cost)
      this.saveCosts()
    },

    deleteCost(costId) {
      this.costs = this.costs.filter(cost => cost.id !== costId)
      this.saveCosts()
    },

    updateCost(updatedCost) {
      const index = this.costs.findIndex(cost => cost.id === updatedCost.id)
      if (index !== -1) {
        this.costs[index] = { ...this.costs[index], ...updatedCost }
        this.saveCosts()
      }
    },

    generateDemoData() {
      const demoCosts = [
        { id: uuidv4(), name: 'Groceries', amount: 50.25, categoryId: 1, date: '2025-06-01', type: 'expense' },
        { id: uuidv4(), name: 'Internet bill', amount: 30.00, categoryId: 1, date: '2025-06-05', type: 'expense' },
        { id: uuidv4(), name: 'Cinema ticket', amount: 15.00, categoryId: 1, date: '2025-06-03', type: 'expense' },
        { id: uuidv4(), name: 'Coffee', amount: 4.50, categoryId: 1, date: '2025-06-07', type: 'expense' },
        { id: uuidv4(), name: 'Wypłata RRUP', amount: 444.50, categoryId: 4, date: '2025-06-07', type: 'income' },
      ]
      this.costs = demoCosts
      this.saveCosts()
    },

    saveCosts() {
      localStorage.setItem('costs', JSON.stringify(this.costs))
    },

    loadCosts() {
      this.costs = getStoredCosts()
    },

    clear() {
      this.costs = []
      localStorage.removeItem('costs')
    },
  },
})
