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
              class="button is-link has-background-success"
          >
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
          {{ item.description }}
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item" @click="editNote(item)">Edit</a>
        <a href="#" class="card-footer-item" @click="deleteNote(item.id)">Delete</a>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../axios';

const items = ref([]);
const newNote = ref('');

const fetchData = async () => {
  try {
    const response = await apiClient.get('/notebook');
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const addNote = async () => {
  try {
    const response = await apiClient.post('/notebook', {
      description: newNote.value,
      owner: 'mohammad'
    });
    newNote.value = '';
    fetchData();
  } catch (error) {
    console.error('Error adding note:', error);
  }
};

const editNote = (item) => {
  const updatedDescription = prompt('Edit your note', item.description);
  if (updatedDescription !== null) {
    apiClient.put(`/notebook/${item.id}`, {
      ...item,
      description: updatedDescription
    }).then(fetchData).catch(error => {
      console.error('Error updating note:', error);
    });
  }
};

const deleteNote = (id) => {
  apiClient.delete(`/notebook/${id}`)
      .then(fetchData)
      .catch(error => {
        console.error('Error deleting note:', error);
      });
};

onMounted(fetchData);
</script>

