<template>
    <h3>User Profile Page</h3>
</template>
    
<script setup lang='ts'>
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/profile'
    }
})
</script>
    
<style></style>