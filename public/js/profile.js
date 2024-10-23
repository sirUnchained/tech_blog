window.onload = () => {
  getArticles();
};

async function getArticles(page = 1) {
  const authorID = document.querySelector("#blog-list").dataset.authorId;
  const res = await fetch(`http://localhost:4000/article/all/${page}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authorID }),
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
                    href="tech-category-01.html"
                    title=""
                    >${article["category.name"]}</a
                  ></small
                >
                <small
                  ><a href="tech-single.html" title=""
                    >${article.createdAt.slice(0, 10)}</a
                  ></small
                >
                <small
                  ><a href="tech-author.html" title=""
                    >by  ${article["author.username"]}</a
                  ></small
                >
              </div>
            </div>

            <hr class="invis" />
      `
    );
  });
  if (articles?.rows?.length == 0) {
    articlesElem.insertAdjacentHTML(
      "beforeend",
      `
            <div class="alert alert-danger">you have create no article.</div>

            <hr class="invis" />
      `
    );
  }

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
