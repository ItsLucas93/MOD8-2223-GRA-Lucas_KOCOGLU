function getBooks() {
  const data = localStorage.getItem("books");
  if (!data) {
    localStorage.setItem("books", JSON.stringify([]));
  }
  return data ? JSON.parse(data) : [];
}

function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

export { getBooks, saveBooks };
