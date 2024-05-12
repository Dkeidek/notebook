<template>
  <div class="notes">

    <div class="card has-background-success-white p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
              class="textarea"
              placeholder="Add a new note"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button class="button is-link has-background-success">
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <div
        v-for="i in 2"
        class="card mb-4"
    >
      <div class="card-content">
        <div class="content">
         Today's Meeting Note
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>