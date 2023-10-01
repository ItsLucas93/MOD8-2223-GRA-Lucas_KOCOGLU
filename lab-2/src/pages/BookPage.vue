<template>
  <main>
    <div class="bookpage">
      <h1>{{ book.title }}</h1>
      <h4>by {{ book.author }} | (Number of page : {{ book.pageCount }})</h4>

      <fieldset>
        <legend>Book Info</legend>
        <book-form
          :initialBook="book"
          @submit="updateBook"
          buttonLabel="Save"
        />
        <div class="row">
          <button @click="deleteBook">Delete Book</button>
        </div>
      </fieldset>
    </div>
  </main>
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

<style>
div.bookpage {
  max-width: 80vw;
  width: 80vw;
  margin: 0 auto;
  padding: 20px;
}

h1,
h4 {
  text-align: center;
}

main h4 {
  color: var(--color-text-soft);
  font-style: italic;
}

fieldset {
  align-items: baseline;
  border-radius: 12px;
  border: 2px dashed var(--color-border);
  margin: 1vh 0 2vh 0;
  padding: 1em;
}

label {
  float: left;
  width: 25%;
}

label.required:after {
  content: " *";
  color: var(--color-required);
}

input[type="text"],
input[type="number"] {
  float: right;
  width: 75%;

  padding-block: 0;
  padding-inline: 0;

  padding: 0.5em 2em;
  display: inline-block;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-sizing: border-box;
}

legend {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 0;
}
</style>
