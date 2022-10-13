var users = [
  {
    name: "Faris Skulj",
    email: "skuljfaris@gmail.com",
    address: "Varda bb",
    username: "fare",
    password: "1234",
  },
];

var guestPage = document.getElementById("guest-page");
var userPage = document.getElementById("user-page");

var user = {
  name: "",
  email: "",
  address: "",
  username: "",
  password: "",
};

var allBlogs = [];
var loggedUser = {};
var userLike = false;

(function isUserLogged() {
  var usersData = localStorage.getItem("loggedUser");
  if (usersData) {
    guestPage.style.display = "none";
    var user = JSON.parse(usersData);
    login(user.email, user.password);
    document.getElementById("pass").value = loggedUser.password;
    document.getElementById("mejl").value = loggedUser.email;
  } else {
    guestPage.style.display = "block";
    displayBlog();
  }
})();

function login(user1_email, user1_password) {
  var mejl = user1_email || document.getElementById("mejl").value;
  var pass = user1_password || document.getElementById("pass").value;
  var usersData = localStorage.getItem("users");
  if (usersData) {
    users = JSON.parse(usersData);
  }
  for (const user in users) {
    if (
      (mejl === users[user].email || mejl === users[user].username) &&
      pass === users[user].password
    ) {
      loggedUser = users[user];
      var div = document.getElementById("div1");
      var loginForm = document.getElementById("container");
      loginForm.style = "display:none;";
      div.style = "display:block;";
      var userAcc = document.getElementById("user-acc");
      userAcc.innerHTML = users[user].name;
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      var errorMsg = document.getElementById("error-msg");
      errorMsg.style = "display:none;";
    } else {
      var errorMsg = document.getElementById("error-msg");
      errorMsg.style = "display:block; color: red; font-size: 18px;";
    }
  }
  displayBlog();
}

function loginOnEnter(event) {
  if (event.keyCode === 13) {
    login();
  }
}

function logOut() {
  document.getElementById("mejl").value = "";
  document.getElementById("pass").value = "";
  var div = document.getElementById("div1");
  var loginForm = document.getElementById("container");
  loginForm.style = "display:flex;";
  div.style = "display:none;";
  var errorMsg = document.getElementById("error-msg");
  errorMsg.style = "display:none;";
  localStorage.removeItem("loggedUser");
  guestPage.style.display = "none";
  var errorMs = document.getElementById("complete-blog");
  errorMs.style = "display:none;";
}

function register() {
  var loginForm = document.getElementById("login-form");
  loginForm.style = "display:none;";
  var registerForm = document.getElementById("register-form");
  registerForm.style = "display:block;";
  var errorMs = document.getElementById("error-ms");
  errorMs.style = "display:none;";
}

function returnToLogin() {
  var loginForm = document.getElementById("login-form");
  loginForm.style = "display:block;";
  var registerForm = document.getElementById("register-form");
  registerForm.style = "display:none;";
  document.getElementById("mejl").value = "";
  document.getElementById("pass").value = "";
  var errorMsg = document.getElementById("error-msg");
  errorMsg.style = "display:none;";
}

function registerBtn() {
  user.name = document.getElementById("name").value;
  user.email = document.getElementById("signup-mejl").value;
  user.address = document.getElementById("address").value;
  user.username = document.getElementById("username").value;
  user.password = document.getElementById("signup-pass").value;

  if (user.name === "") {
    var errorMs = document.getElementById("error-ms");
    errorMs.innerHTML = "Insert your Name!";
    errorMs.style = "display:block; color: red; font-size: 18px;";
  } else if (user.email === "") {
    var errorMs = document.getElementById("error-ms");
    errorMs.innerHTML = "Insert your Email!";
    errorMs.style = "display:block; color: red; font-size: 18px;";
  } else if (user.address === "") {
    var errorMs = document.getElementById("error-ms");
    errorMs.innerHTML = "Insert your Address!";
    errorMs.style = "display:block; color: red; font-size: 18px;";
  } else if (user.username === "") {
    var errorMs = document.getElementById("error-ms");
    errorMs.innerHTML = "Insert your Username!";
    errorMs.style = "display:block; color: red; font-size: 18px;";
  } else if (user.password === "") {
    var errorMs = document.getElementById("error-ms");
    errorMs.innerHTML = "Insert your Password!";
    errorMs.style = "display:block; color: red; font-size: 18px;";
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("name").value = "";
    document.getElementById("signup-mejl").value = "";
    document.getElementById("address").value = "";
    document.getElementById("username").value = "";
    document.getElementById("signup-pass").value = "";
    returnToLogin();
  }
}

function postBlog() {
  var blogTitle = document.getElementById("blog-title").value;
  var blogStory = document.getElementById("blog-story").value;
  if (blogTitle === "") {
    var errorMs = document.getElementById("complete-blog");
    errorMs.innerHTML = "Type your blog title!";
    errorMs.style =
      "display:block; color: red; font-size: 18px; text-align: center;";
  } else if (blogStory === "") {
    var errorMs = document.getElementById("complete-blog");
    errorMs.innerHTML = "Type your blog description!";
    errorMs.style =
      "display:block; color: red; font-size: 18px; text-align: center;";
  } else {
    var blog = {
      blogTitle,
      blogStory,
      blogDate: new Date(),
      author: document.getElementById("user-acc").innerHTML,
      comments: [],
      likes: [],
      dislikes: [],
    };
    allBlogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(allBlogs));
    displayBlog();

    document.getElementById("blog-title").value = "";
    document.getElementById("blog-story").value = "";
    var errorMs = document.getElementById("complete-blog");
    errorMs.style = "display:none;";
  }
}

function displayBlog() {
  var blogsData = localStorage.getItem("blogs");
  if (blogsData) {
    allBlogs = JSON.parse(blogsData);
  }
  renderBlogs(allBlogs);
}

function guestSearchBlog() {
  var pretrazi = document.getElementById("blog-search1").value;
  var filterBlogs = [];
  for (var blog of allBlogs) {
    if (blog.blogTitle.toLowerCase().indexOf(pretrazi.toLowerCase()) > -1) {
      filterBlogs.push(blog);
    }
  }
  renderBlogs(filterBlogs);
}

function searchBlog() {
  var pretrazi = document.getElementById("blog-search").value;
  var filterBlogs = [];
  for (var blog of allBlogs) {
    if (blog.blogTitle.toLowerCase().indexOf(pretrazi.toLowerCase()) > -1) {
      filterBlogs.push(blog);
    }
  }
  renderBlogs(filterBlogs);
}

function renderBlogs(blogsForRender) {
  if (guestPage.style.display === "block")
    var blogPlace = document.getElementById("place-for-blog1");
  else {
    var blogPlace = document.getElementById("place-for-blog");
  }
  blogPlace.innerHTML = "";
  for (let i = 0; i < blogsForRender.length; i++) {
    var blogs = blogsForRender[i];
    var blogCard = document.createElement("div");
    blogCard.classList.add("col-sm-10", "col-lg-8");
    blogCard.style = "margin-bottom: 80px;";
    blogPlace.appendChild(blogCard);
    var h2 = document.createElement("h2");
    h2.style = "color:#ffc107; font-weight: bold; margin-bottom: 20px;";
    h2.innerHTML = blogs.blogTitle;
    blogCard.appendChild(h2);
    var div = document.createElement("div");
    div.classList.add("blog-style");
    blogCard.appendChild(div);
    var p = document.createElement("p");
    p.style.fontSize = "18px";
    p.innerHTML = blogs.blogStory;
    div.appendChild(p);
    var noviDiv = document.createElement("div");
    noviDiv.classList.add("novi-div");
    noviDiv.style = "display:flex;";
    div.appendChild(noviDiv);
    var span = document.createElement("span");
    span.innerHTML = `Author: <i style="font-weight:bold; letter-spacing: 1px; cursor:pointer;">${blogs.author}</i>`;
    noviDiv.appendChild(span);
    var datum = document.createElement("i");
    datum.style = "margin-left:auto;";
    datum.innerHTML = new Date(blogs.blogDate).toLocaleString();
    noviDiv.appendChild(datum);
    var likeDeleteArea = document.createElement("div");
    likeDeleteArea.style =
      "display:flex; justify-content:space-between; margin-top:10px;";
    likeDeleteArea.setAttribute("id", "like-delete-area");
    blogOfUser = document.getElementById("user-page");
    likeDeleteArea.appendChild(createLike(i, blogs));
    div.appendChild(likeDeleteArea);
    if (blogs.author === document.getElementById("user-acc").innerHTML) {
      createDeleteBtn(likeDeleteArea, i);
    }
    showComments(blogs, blogCard);
    blogCard.appendChild(createComment(blogs));
  }
}

function createComment(blog) {
  var div = document.createElement("div");
  div.style = "display:flex; justify-content:flex-end;";
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Leave comments...");
  input.placeholder.style = "color: #198754;";
  input.setAttribute("class", "put-comments");
  div.appendChild(input);
  input.addEventListener("keyup", function (event) {
    var valueComm = event.target.value;
    if (event.code !== "Enter") return;
    if (
      !(
        document.getElementById("mejl").value === "" ||
        document.getElementById("pass").value === ""
      )
    ) {
      var comm = {
        valueComm,
        commAuthor: document.getElementById("user-acc").innerHTML,
        commDate: new Date(),
      };
      if (!blog.comments) {
        blog.comments = [];
      }
      blog.comments.push(comm);
      localStorage.setItem("blogs", JSON.stringify(allBlogs));
      event.target.value = "";
      renderBlogs(allBlogs);
    } else {
      event.target.value = "";
      alert("You must be logged in to post a comment");
      logOut();
    }
  });
  return div;
}

function showComments(blog, elem) {
  var dov = document.createElement("div");
  dov.style =
    "margin:10px 0; display:flex; flex-direction:column-reverse; align-items: flex-end;";
  elem.appendChild(dov);
  for (let i = 0; i < blog.comments.length; i++) {
    var com = blog.comments[i];
    var divComm = document.createElement("div");
    divComm.classList.add("comm-style");
    dov.appendChild(divComm);
    var pComm = document.createElement("p");
    pComm.innerHTML = com.valueComm;
    divComm.appendChild(pComm);
    var commFooter = document.createElement("div");
    commFooter.style = "display:flex;";
    commFooter.classList.add("comm-footer");
    divComm.appendChild(commFooter);
    var spanComm = document.createElement("span");
    spanComm.innerHTML = `Author: <i style="font-weight:bold; letter-spacing: 1px;">${com.commAuthor}</i>`;
    commFooter.appendChild(spanComm);
    var iComm = document.createElement("i");
    iComm.innerHTML = new Date(com.commDate).toLocaleString();
    iComm.style = "margin-left:auto;";
    commFooter.appendChild(iComm);
    if (com.commAuthor === document.getElementById("user-acc").innerHTML) {
      deleteComments(divComm, i, blog);
    }
  }
}

function createDeleteBtn(elem, index) {
  var delBlog = document.createElement("button");
  delBlog.classList.add("btn", "btn-secondary");
  delBlog.innerHTML = "Delete blog &nbsp;" + '<i class="bi bi-trash3"></i>';
  elem.appendChild(delBlog);
  delBlog.addEventListener("click", function () {
    var yesNo = confirm("Do you want to delete the blog?");
    if (yesNo) {
      allBlogs.splice(index, 1);
      localStorage.setItem("blogs", JSON.stringify(allBlogs));
      renderBlogs(allBlogs);
    }
  });
}

function deleteComments(elem, index, blog) {
  var div = document.createElement("div");
  div.style = "display:flex; justify-content:flex-end; margin-top:10px;";
  elem.appendChild(div);
  var delBlog = document.createElement("button");
  delBlog.classList.add("btn", "btn-secondary");
  delBlog.style = "font-size:13px; padding: 4px 8px;";
  delBlog.innerHTML = "Delete comm &nbsp;" + '<i class="bi bi-trash3"></i>';
  div.appendChild(delBlog);
  delBlog.addEventListener("click", function () {
    var yesNo = confirm("Do you want to delete the comment?");
    if (yesNo) {
      blog.comments.splice(index, 1);
      localStorage.setItem("blogs", JSON.stringify(allBlogs));
      renderBlogs(allBlogs);
    }
  });
}

function createLike(index, blog) {
  var likeFill = "";
  if (
    blog.likes &&
    blog.likes.includes(document.getElementById("user-acc").innerHTML)
  ) {
    likeFill = "bi-hand-thumbs-up-fill" + " text-primary";
  } else likeFill = "bi-hand-thumbs-up";
  var dislikeFill = "";
  if (
    blog.dislikes &&
    blog.dislikes.includes(document.getElementById("user-acc").innerHTML)
  ) {
    dislikeFill = "bi-hand-thumbs-down-fill" + " text-danger";
  } else dislikeFill = "bi-hand-thumbs-down";
  var likeBox = document.createElement("div");
  likeBox.classList.add("like-box");
  likeBox.innerHTML = `<i data-id="${index}" onclick="likeBlog(event)" id="likee" class="bi ${likeFill}"></i>
    <span data-bs-toggle="tooltip" data-bs-placement="top" title="${
      blog.likes ? blog.likes.toString() : "Leave like"
    }" id="like-count" style="font-size:18px;">${
    blog.likes ? blog.likes.length : 0
  }</span> &nbsp; &nbsp; &nbsp;
    <i data-id="${index}" onclick="dislikeBlog(event)" id="dislikee" class="bi ${dislikeFill}"></i> 
    <span data-bs-toggle="tooltip" data-bs-placement="top" title="${
      blog.dislikes ? blog.dislikes.toString() : "Leave like"
    }" id="dislike-count" style="font-size:18px;">${
    blog.dislikes ? blog.dislikes.length : 0
  }</span>
    `;
  return likeBox;
}

function likeBlog(event) {
  var index = event.target.getAttribute("data-id");
  var blog = allBlogs[index];
  var loggedUserLike = document.getElementById("user-acc").innerHTML;
  if (!blog.likes) {
    blog.likes = [];
  }
  if (
    !(
      document.getElementById("mejl").value === "" ||
      document.getElementById("pass").value === ""
    )
  ) {
    if (blog.likes.includes(loggedUserLike)) userLike = true;
    else userLike = false;

    if (userLike === false) {
      userLike = true;
      blog.likes.push(loggedUserLike);
    } else {
      userLike = false;
      var ind = blog.likes.indexOf(loggedUserLike);
      blog.likes.splice(ind, 1);
    }
    localStorage.setItem("blogs", JSON.stringify(allBlogs));
    displayBlog(allBlogs);
  } else {
    alert("You must be logged in to leave likes");
    logOut();
  }
}

function dislikeBlog(event) {
  var index = event.target.getAttribute("data-id");
  var blog = allBlogs[index];
  var loggedUserLike = document.getElementById("user-acc").innerHTML;
  if (!blog.dislikes) {
    blog.dislikes = [];
  }
  if (
    !(
      document.getElementById("mejl").value === "" ||
      document.getElementById("pass").value === ""
    )
  ) {
    if (blog.dislikes.includes(loggedUserLike)) userDislike = true;
    else userDislike = false;

    if (userDislike === false) {
      userDislike = true;
      blog.dislikes.push(loggedUserLike);
    } else {
      userDislike = false;
      var ind = blog.dislikes.indexOf(loggedUserLike);
      blog.dislikes.splice(ind, 1);
    }
    localStorage.setItem("blogs", JSON.stringify(allBlogs));
    displayBlog(allBlogs);
  } else {
    alert("You must be logged in to leave dislikes");
    logOut();
  }
}
