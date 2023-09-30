<template>
  <div>
    <h1>{{ book.title }}</h1>
    <p>{{ book.author }}</p>
    <p>{{ book.pageCount }}</p>
    <book-form :initialBook="book" @submit="updateBook" buttonLabel="Save" />
    <button @click="deleteBook">Delete Book</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import BookForm from "@/components/BookForm.vue";
import { getBooks, saveBooks } from "@/storage/storage.js";

export default {
  components: { BookForm },
  setup() {
    const route = useRoute();
    const books = getBooks();
    const bookId = Number(route.params.id);
    const book = ref(books.find((searchedBook) => searchedBook.id === bookId));

    function updateBook(updatedBook) {
      const index = books.findIndex(
        (searchedBook) => searchedBook.id === bookId,
      );
      books[index] = {
        id: bookId,
        title: updatedBook.title,
        author: updatedBook.author,
        pageCount: updatedBook.pageCount,
      };
      saveBooks(books);
      window.location.reload();
    }

    function deleteBook() {
      const index = books.findIndex(
        (searchedBook) => searchedBook.id === bookId,
      );
      books.splice(index, 1);
      saveBooks(books);
      window.location.href = "/";
    }

    return { book, updateBook, deleteBook };
  },
};
</script>
