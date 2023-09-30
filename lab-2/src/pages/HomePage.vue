<template>
  <div>
    <input v-model="searchQuery" placeholder="Search for books" />
    <ul v-if="filteredBooks.length">
      <li v-for="book in filteredBooks" :key="book.id">
        <book-item :book="book" />
      </li>
    </ul>
  </div>
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
      return books.value.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
      );
    });

    return { searchQuery, filteredBooks };
  },
};
</script>
