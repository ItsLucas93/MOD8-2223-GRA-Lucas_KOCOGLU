<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import BookForm from '../components/BookForm.vue'
import useAuthenticationService from '../services/authentication-service.js'
import useBookService from '../services/book-service.js'

const router = useRouter()
const authenticationService = useAuthenticationService()
const user = authenticationService.user

const errorMessage = ref('')


async function addBook(title, author, year, pageCount, description) {
  try {
    const response = await useBookService().createBook(title, author, year, pageCount, description)
    if (response.createBook) {
      await router.push({ path: `/books/${response.createBook}` });
    }
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <main>
    <div class="content">
      <BookForm
        v-if="user && user.role === 'librarian'"
        primary-button="Add"
        primary-button-class="success"
        :error-message="errorMessage"
        @primary-button-clicked="addBook"
      />
      <div v-else class="danger">Error: You must be connected and have required permissions to access this page.</div>
    </div>
  </main>
</template>
