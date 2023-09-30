<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/books/add">Add Book</router-link> |
    <router-link to="/admin">Admin Page</router-link>
  </nav>
  <router-view />
</template>

<script>
export default {
  setup() {},
};
</script>

<style>
@import "./assets/base.css";

nav {
  background-color: var(--color-background);
  padding: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--color-border);
}
</style>
