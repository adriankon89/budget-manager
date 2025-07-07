import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from './views/DashboardView.vue'
import ManageCategoriesView from './views/ManageCategoriesView.vue'
import CostsView from './views/CostsView.vue'
import ManageCosts from './views/ManageCosts.vue'

const routes = [
    { path: '/', component: DashboardView },
    { path: '/add-cost/:id?', component: CostsView },
    { path: '/manage-categories', component: ManageCategoriesView },
    { path: '/manage-costs', component: ManageCosts },
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router