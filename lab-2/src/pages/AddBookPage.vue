<template>
  <main>
    <h1>Add a book to your storage</h1>
    <fieldset>
      <legend>Add book</legend>
      <book-form @submit="addBook" buttonLabel="Add" />
    </fieldset>
  </main>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import { getBooks, saveBooks } from "@/storage/storage";

export default {
  components: { BookForm },
  methods: {
    addBook(newBook) {
      const books = getBooks();

      if (books.length === 0) {
        newBook.id = 1;
      } else {
        newBook.id = books.sort((a, b) => a.id - b.id)[books.length - 1].id + 1;
      }

      books.push(newBook);
      saveBooks(books);
      window.location.href = "/books/" + newBook.id;
    },
  },
};
</script>

<style>
main {
  max-width: 80vw;
  width: 80vw;
  margin: 0 auto;
  padding: 20px;
}
</style>
