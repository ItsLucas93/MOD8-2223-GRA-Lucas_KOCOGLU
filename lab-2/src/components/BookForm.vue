<template>
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <label for="title" class="required"> Title: </label>
      <input
        v-model="book.title"
        type="text"
        minlength="1"
        maxlength="100"
        name="title"
        required
      />
    </div>
    <div class="row">
      <label for="author" class="required"> Author: </label>
      <input
        v-model="book.author"
        type="text"
        minlength="1"
        maxlength="100"
        name="author"
        required
      />
    </div>
    <div class="row">
      <label for="pageCount" class="required"> Page Count: </label>

      <input
        v-model.number="book.pageCount"
        type="number"
        min="1"
        name="pageCount"
        required
      />
    </div>

    <div class="row returnMessage" v-if="!isValidTitle || !isValidAuthor || !isValidPageCount">
      <span class="returnMessage">Please fill all the fields correctly (No blank field).</span>
    </div>

    <div class="row">
      <button
        type="submit"
        :disabled="!isValidTitle || !isValidAuthor || !isValidPageCount"
      >
        {{ buttonLabel }}
      </button>
    </div>
  </form>
</template>

<script>
import { computed, ref } from "vue";

export default {
  emits: ["submit"],
  props: {
    initialBook: {
      type: Object,
      default: () => ({}),
    },
    buttonLabel: {
      type: String,
      default: "Submit",
    },
  },
  setup(props, { emit }) {
    let book = {};
    if (JSON.stringify(props.initialBook) !== JSON.stringify({})) {
      // If book already defined (like from BookPage.vue), use it
      book = ref({
        title: props.initialBook.title,
        author: props.initialBook.author,
        pageCount: props.initialBook.pageCount,
      });
    } else {
      // If book doesn't exist (like from AddBookPage.vue), create it
      book = ref({
        title: "",
        author: "",
        pageCount: 0,
      });
    }

    const isValidTitle = computed(
      () =>
        book.value.title.length <= 100 &&
        book.value.title.length !== 0 &&
        book.value.title.trim() !== "",
    );
    const isValidAuthor = computed(
      () =>
        book.value.author.length <= 100 &&
        book.value.author.length !== 0 &&
        book.value.author.trim() !== "",
    );
    const isValidPageCount = computed(() => book.value.pageCount > 0);

    /*
    // Used for debbug of Validation
    watchEffect(() => {
      console.log(
          'isValidTitle:', isValidTitle.value,
          'isValidAuthor:', isValidAuthor.value,
          'isValidPageCount:', isValidPageCount.value,
          'Disabled:', !isValidTitle.value || !isValidAuthor.value || !isValidPageCount.value
      );
    });
     */



    function handleSubmit() {
      if (
        !isValidTitle.value ||
        !isValidAuthor.value ||
        !isValidPageCount.value
      )
        return false;
      emit("submit", {
        title: book.value.title,
        author: book.value.author,
        pageCount: book.value.pageCount,
      });
    }

    return {
      book,
      handleSubmit,
      isValidTitle,
      isValidAuthor,
      isValidPageCount,
    };
  },
};
</script>

<style>

div.returnMessage {
}

span.returnMessage {
  color: var(--color-required);
  font-style: italic;
}
</style>
