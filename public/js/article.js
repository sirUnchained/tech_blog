window.onload = () => {
  getComments(1);
};

async function getComments(page) {
  const res = await fetch(`http://localhost:4000/comment/all/${page}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ articleID: "<%= article.id %>" }),
  });
  const comments = await res.json();

  document.querySelector(
    "#comment-count"
  ).innerHTML = `${comments.count} Comments`;

  insertComments(comments);
}
function insertComments(comments) {
  const commentsElem = document.querySelector(".comments-list");
  commentsElem.innerHTML = "";
  comments?.rows.forEach((comment) => {
    commentsElem.insertAdjacentHTML(
      "beforeend",
      `
    <div class="media last-child">
                    <a class="media-left" href="#">
                      <img src="${
                        comment.user.profile
                          ? comment.user.profile
                          : "https://b-sample-work-space.storage.c2.liara.space/tech_blog/images.png"
                      }" alt="" class="rounded-circle">
                    </a>
                    <div class="media-body">
                      <div class="d-flex align-items-center position-relative">
                        <h4 class="media-heading user_name">
                          ${
                            comment.user.username
                          } <small>${comment.createdAt.slice(0, 10)}</small>
                        </h4>


                      </div>
                      <p>
                        ${comment.content}
                      </p>
                    </div>
                  </div>
    `
    );
  });

  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";
  const commentsCount = Array(Math.ceil(comments?.count / 5)).fill(0);
  commentsCount.forEach((item, index) => {
    pagination.insertAdjacentHTML(
      "beforeend",
      `
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="#"
                      onclick="getComments('${index + 1}')"
                      >${index + 1}</a
                    >
                  </li>
    `
    );
  });
}
