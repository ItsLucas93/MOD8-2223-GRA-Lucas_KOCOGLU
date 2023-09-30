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
    const localStorageKey = "books"; //

    const localStorageData = computed(() => {
      const data = localStorage.getItem(localStorageKey);
      return data ? JSON.parse(data) : [];
    });

    function clearLocalStorage() {
      localStorage.clear();
      window.location.reload();
    }

    function setSampleData() {
      const sampleData = [
        {
          id: 1,
          title: "Spy x Family | Mission: 1-5",
          author: "Tatsuya Endo",
          pageCount: 253,
        },
        {
          id: 2,
          title: "Spy x Family | Mission: 6-11 : Extra Mission: 1",
          author: "Tatsuya Endo",
          pageCount: 312,
        },
        {
          id: 3,
          title: "Spy x Family | Mission: 12-17",
          author: "Tatsuya Endo",
          pageCount: 189,
        },
        {
          id: 4,
          title: "Spy x Family | Mission: 18-23 : Extra Mission: 2",
          author: "Tatsuya Endo",
          pageCount: 432,
        },
        {
          id: 5,
          title: "Spy x Family | Mission: 24-29",
          author: "Tatsuya Endo",
          pageCount: 176,
        },
        {
          id: 6,
          title: "Spy x Family | Mission: 30-35 : Extra Mission: 3",
          author: "Tatsuya Endo",
          pageCount: 287,
        },
        {
          id: 7,
          title: "Spy x Family | Mission: 36-41",
          author: "Tatsuya Endo",
          pageCount: 511,
        },
        {
          id: 8,
          title: "Spy x Family | Mission: 42-47 : Extra Mission: 4",
          author: "Tatsuya Endo",
          pageCount: 349,
        },
        {
          id: 9,
          title: "Spy x Family | Mission: 48-53",
          author: "Tatsuya Endo",
          pageCount: 214,
        },
        {
          id: 10,
          title: "Spy x Family | Mission: 54-59 : Extra Mission: 5",
          author: "Tatsuya Endo",
          pageCount: 175,
        },
      ];
      localStorage.setItem(localStorageKey, JSON.stringify(sampleData));
      window.location.reload();
    }

    return { clearLocalStorage, localStorageData, setSampleData };
  },
};
</script>
