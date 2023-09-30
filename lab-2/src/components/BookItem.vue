<template>
  <router-link :to="`/books/${book.id}`">{{ book.title }}</router-link>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
};
</script>
