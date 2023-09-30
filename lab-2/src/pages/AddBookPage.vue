<template>
  <div>
    <book-form @submit="addBook" buttonLabel="Add" />
  </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import { getBooks, saveBooks } from "@/storage/storage";

export default {
  components: { BookForm },
  methods: {
    addBook(newBook) {
      const books = getBooks();
      newBook.id = books.sort((a, b) => a.id - b.id)[books.length - 1].id + 1;

      books.push(newBook);
      saveBooks(books);
      window.location.href = "/books/" + newBook.id;
    },
  },
};
</script>
