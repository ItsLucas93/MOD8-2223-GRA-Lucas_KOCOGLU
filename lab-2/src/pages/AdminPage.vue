<template>
  <div>
    <h1>Admin Page</h1>
    <button @click="clearLocalStorage">Clear Local Storage</button>
    <button @click="setSampleData">Set Sample Data</button>
    <div v-if="localStorageData">
      <h2>Local Storage Data:</h2>
      <pre>{{ localStorageData }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const books = ref([]);
    const localStorageKey = "books";

    fetch("src/storage/defaultModel.json")
      .then((response) => response.json())
      .then((data) => {
        books.value = data;
      })
      .catch((error) => console.error(error));

    const localStorageData = computed(() => {
      const data = localStorage.getItem(localStorageKey);
      return data ? JSON.parse(data) : [];
    });

    function clearLocalStorage() {
      localStorage.clear();
      window.location.reload();
    }

    function setSampleData() {
      localStorage.setItem(localStorageKey, JSON.stringify(books.value));
      console.log(JSON.stringify(books.value));
      window.location.reload();
    }

    return { clearLocalStorage, localStorageData, setSampleData };
  },
};
</script>
