window.onload = () => {
  getCategories();
  getTags();
};

async function getCategories() {
  const res = await fetch("http://localhost:4000/category/all");
  const categories = await res.json();
  console.log(categories);
  insertCategories(categories);
}
function insertCategories(items = []) {
  const elem = document.querySelector("#category-list");
  items.forEach((item) => {
    elem.insertAdjacentHTML(
      "beforeend",
      `
      <option value="${item.id}">${item.name}</option>
    `
    );
  });
}

async function getTags() {
  const res = await fetch("http://localhost:4000/tag/all");
  const tags = await res.json();
  insertTags(tags);
}
function insertTags(items = []) {
  const elem = document.querySelector("#tags-list");
  items.forEach((item) => {
    elem.insertAdjacentHTML(
      "beforeend",
      `
      <option value="${item.id}">${item.name}</option>
    `
    );
  });
}
