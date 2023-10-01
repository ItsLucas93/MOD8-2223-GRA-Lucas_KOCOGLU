<template>
  <main>
    <h1>Search for your book !</h1>
    <input
      v-model="searchQuery"
      placeholder="Search for books"
      class="search-bar"
    />
    <div id="result-search" v-show="searchQuery">
      <ul v-if="filteredBooks.length">
        <li v-for="book in filteredBooks" :key="book.id">
          <book-item :book="book" />
        </li>
      </ul>
    </div>
    <div id="recommanded-book" v-if="recommandedBooks.length">
      <h1>Recommanded books :</h1>
      <ul v-if="recommandedBooks.length">
        <li v-for="book in recommandedBooks" :key="book.id">
          <book-item :book="book" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { ref, computed } from "vue";
import BookItem from "@/components/BookItem.vue";
import { getBooks } from "@/storage/storage";

export default {
  components: { BookItem },
  setup() {
    const searchQuery = ref("");
    const books = ref(getBooks());

    const filteredBooks = computed(() => {
      const results = books.value.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
      );
      return results.slice(0, 5);
    });

    let recommandedBooks = [];
    for (
      let i = 0;
      i < books.value.length && recommandedBooks.length < 3;
      i++
    ) {
      try {
        if (Math.round(Math.random()) === 1) {
          recommandedBooks.push(books.value[i]);
        }
      } catch (e) {}
    }

    return { searchQuery, filteredBooks, recommandedBooks };
  },
};
</script>
<style scoped>
main {
  max-width: 80vw;
  width: 80vw;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
}

input.search-bar {
  width: 100%;
  padding: 1em;
  margin-bottom: 0;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  outline: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  padding: 1em;
  border-bottom: 1px solid var(--color-border);
}

ul li:last-child {
  border-bottom: none;
}

@media (max-width: 844px) {
  main {
    font-size: 18px;
  }
}
</style>
