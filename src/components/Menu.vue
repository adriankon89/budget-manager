<template>
    <div>
        <nav class="space-x-2 mb-3">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/add-cost">Add Cost</NavLink>
            <NavLink to="/manage-costs">Manage Costs</NavLink>
            <NavLink to="/manage-categories">Manage Categories</NavLink>
        </nav>
    </div>
</template>

<script setup>
import NavLink from '@/components/NavLink.vue'
</script>