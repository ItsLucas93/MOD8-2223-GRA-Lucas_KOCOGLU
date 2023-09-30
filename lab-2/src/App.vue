<template>
  <nav>
    <h4>Book Manager</h4>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/books/add">Add Book</router-link> |
      <router-link to="/admin">Admin Tools</router-link>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  setup() {},
};
</script>

<style>
@import "assets/css/base.css";

nav {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  width: 98%;
  text-align: right;
  background-color: var(--color-background);
  padding: 1%;
  margin-bottom: 2em;
  border-bottom: 2px solid var(--color-border);
}

nav h4 {
  margin: 1vh;
}

@media (max-width: 844px) {
  nav {
    flex-direction: column;
    text-align: center;
  }
}

nav h2 {
}
</style>
