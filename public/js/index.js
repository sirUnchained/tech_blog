window.onload = () => {
  // getCategories();
  // getTags();
  getArticles();
};

async function getCategories() {
  const res = await fetch("http://localhost:4000/category/all");
  const categories = await res.json();
  insertCategories(categories);
}
function insertCategories(items = []) {
  const tabElem = document.querySelector(".tab");
  items.forEach((item, index) => {
    tabElem.insertAdjacentHTML(
      "beforeend",
      `
        <button
          class="tablinks"
          onclick="openCategory(event, 'cat0${item.id}')">
          ${item.name}
        </button>
    `
    );
  });
}
async function getTags() {
  const res = await fetch("http://localhost:4000/tag/all");
  const tags = await res.json();
}

async function getArticles(page = 1) {
  const res = await fetch(`http://localhost:4000/article/all/${page}`, {
    method: "POST",
  });
  const articles = await res.json();
  insertArticlesAndPaginate(articles);
}
function insertArticlesAndPaginate(articles) {
  const articlesElem = document.querySelector("#blog-list");
  const paginationElem = document.querySelector(".pagination");
  articlesElem.innerHTML = "";
  paginationElem.innerHTML = "";

  articles?.rows?.forEach((article) => {
    articlesElem.insertAdjacentHTML(
      "beforeend",
      `
            <div class="blog-box row">
              <div class="col-md-4">
                <div class="post-media">
                  <a href="http://localhost:4000/article/single/${
                    article.slug
                  }" title="">
                    <img
                      src="${
                        article.cover
                          ? article.cover
                          : "https://b-sample-work-space.storage.c2.liara.space/tech_blog/no-photo%20.jpg"
                      }"
                      alt=""
                      class="img-fluid"
                      style="height: 10rem;"
                    />
                    <div class="hovereffect"></div>
                  </a>
                </div>
                <!-- end media -->
              </div>
              <!-- end col -->

              <div class="blog-meta big-meta col-md-8">
                <h4>
                  <a href="http://localhost:4000/article/single/${
                    article.slug
                  }" title=""
                    >${article.title}</a
                  >
                </h4>
                <p>${article.description} <b>...</b> </p>
                <br />
                <small class="firstsmall"
                  ><a
                    class="bg-orange"
                    href="http://localhost:4000/category/${
                      article["category.id"]
                    }"
                    title=""
                    >${article["category.name"]}</a
                  ></small
                >
                <small
                  ><a href="#" title=""
                    >${article.createdAt.slice(0, 10)}</a
                  ></small
                >
                <small
                  ><a href="http://localhost:4000/user/profile/${
                    article["author.username"]
                  }" title=""
                    >by  ${article["author.username"]}</a
                  ></small
                >
              </div>
            </div>

            <hr class="invis" />
      `
    );
  });

  const navPaginate = Array(Math.ceil(articles?.count / 5)).fill(0);
  navPaginate.forEach((item, index) => {
    paginationElem.insertAdjacentHTML(
      "beforeend",
      `
          <li class="page-item">
            <a class="page-link" href="#" onClick="getArticles('${
              index + 1
            }')">${index + 1}</a>
          </li>
        `
    );
  });
}
