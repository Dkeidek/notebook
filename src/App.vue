<template>
  <NavBar />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
    <!-- <button @click="fetchData">Fetch Data</button> -->
    <!-- <ul>
      <li v-for="item in items" :key="item.id">description:{{ item.description }}</li>
    </ul> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from './axios';
import NavBar from '@/components/Layout/NavBar.vue';

const items = ref([]);

const fetchData = async () => {
  try {
    const response = await apiClient.get('/notebook'); // Get
    items.value = response.data; //json
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
