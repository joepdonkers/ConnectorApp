<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-white">
    <SiteNavigation />
    <RouterView />
    <CreateForm />
    <SendMessage />
    <RetrieveMessage />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue'
import CreateForm from './components/CreateForm.vue';
import SendMessage from './components/SendMessage.vue';
import RetrieveMessage from './components/RetrieveMessage.vue';
</script>

<style lang="scss" scoped></style>