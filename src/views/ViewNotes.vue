<template>
  <div class="notes">

    <div class="card has-background-success-white p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
              class="textarea"
              placeholder="Add a new note"
              v-model="newNote"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button 
          @click="addNote"
          :disabled="!newNote"
          class="button is-link has-background-success">
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <div
        v-for="item in items"
        :key="item.id"
        class="card mb-4"
    >
      <div class="card-content">
        <div class="content">
         {{ item.description  }}
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../axios';


const items = ref([]);
const newNote = ref('');

const addNote =  async ()=>{
  const response = await apiClient.post('/notebook',{
     description: newNote.value,
      owner: "mohammad"
  });
  newNote.value = ''
}
const fetchData = async () => {
  try {
    const response = await apiClient.get('/notebook'); // Get
    items.value = response.data; //json
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);
</script>