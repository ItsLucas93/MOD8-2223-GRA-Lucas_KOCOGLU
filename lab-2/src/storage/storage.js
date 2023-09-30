function getBooks() {
  const data = localStorage.getItem("books");
  return data ? JSON.parse(data) : [];
}

function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

export { getBooks, saveBooks };
