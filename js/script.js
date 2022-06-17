let businessTitle = document.getElementById("business-title");
let yourExperience = document.querySelector('#your-experience');
let travelForm = document.querySelector('#travel-form');
let yourPost = [];

travelForm.addEventListener('submit', createPost);
// deleteForm.addEventListener('.btn' , deletePost);
// travelForm.addEventListener('delete', deletePost);


function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then((data)=> {
    console.log(data);
    let postLayout = document.querySelector('#post-layout');
    yourPost = data;
  // console.log(yourPost);
  let postBody = "";
  yourPost.forEach(e => {
    // console.log(element)
    postBody += `<div class="col-md-4 mb-3">
    <div class="card h-100">
      <div class="card-body">
        <div class = "d-flex justify-content-start">
          <h6 class = "text-black">${e.id}</h6>
        </div>
        <h5 class="post-heading mb-4" id="my-business-title">${e.title}</h5>
        <p class="your-experience" id="my-your-experience">${e.body}</p>
        <div class="d-flex justify-content-between">
          <button class="btn btn-danger" onclick="deletePost(${e.id})">Delete</button>
          <button class="btn btn-primary" onclick="openNewPage(${e.id})">View</button>
          <button class="btn btn-warning" onClick="updatePost(${e.id})">Update</button>
        </div>
      </div>
    </div>
  </div>`

  postLayout.innerHTML = postBody;
    });
  });
}

getPosts();

// to create posts

function createPost(e){
  e.preventDefault();   // to prevent the page from refreshing
  let title = businessTitle.value;
  let body = yourExperience.value;
  console.log('Post Title' , title);
  fetch('https://jsonplaceholder.typicode.com/posts' , {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      body: body,
      userId: 5
    }),
    headers: {
      'Content-type':'application/json; charset=UTF-8' ,
    },
  })
  .then((response) => response.json())
  .then((data)=> {
    console.log('post' , data);
    console.log(yourPost);
    yourPost.unshift(data);
    console.log(yourPost);
    let postLayout = document.querySelector('#post-layout');

    let postBody = "";
  yourPost.forEach(e => {
    // console.log(element)
    postBody += `<div class="col-md-4 mb-3">
    <div class="card h-100">
      <div class="card-body">
        <div class = "d-flex justify-content-end">
          <h6 class = "text-danger">${e.id}</h6>
        </div>
        <h5 class="post-heading mb-4">${e.title}</h5>
        <p class="your-experience">${e.body}</p>
        <div class="d-flex justify-content-between">
          <button class="btn btn-danger" onclick="deletePost(${e.id})">Delete</button>
          <button class="btn btn-primary" onclick="openNewPage(${e.id})">View</button>
          <button class="btn btn-warning" onClick="updatePost(${e.id})">Update</button>
        </div>
      </div>
    </div>
  </div>`
  postLayout.innerHTML = postBody;
    // alert('Post Created');
  });
  })
}

// update posts

function updatePost(id) {

  let title = businessTitle.value;
  let body = yourExperience.value;

fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: id,
    title: title,
    body: body,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => {
    // let postHeading = document.querySelector('.post-heading');
  let postHeadings = document.querySelectorAll('.post-heading');
  let yourExperiences = document.querySelectorAll('.your-experience');
  console.log(postHeadings);
  postHeadings.forEach((postHeading , index) => {
    if (index + 1 === id){
      postHeading.innerHTML = data.title;
    }
  })
  yourExperiences.forEach((yourExperience , index) => {
    if (index + 1 === id){
     yourExperience.innerHTML = data.body;
    }
  })
  })
};

// to view

function openNewPage(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    localStorage.setItem('viewedPost', JSON.stringify(data));
    window.location.href = 'newpage.html'
});
}

// delete posts

function deletePost(id){
  console.log('postId' , id);
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
})
  // postBox = postBox.filter(post => post.id !== id);
  .then((response) => response.json())
  .then((data)=> {
    console.log('post' , data);
    console.log('user' , yourPost);
    // yourPost.pop(data);
    yourPost.splice((id -1) , 1);

    console.log(yourPost)
    let postBody = "";
  yourPost.forEach(e => {
    // console.log(element)
    postBody += `<div class="col-md-4 mb-3">
    <div class="card h-100">
      <div class="card-body">
        <div class = "d-flex justify-content-end">
          <h6 class = "text-danger">${e.id}</h6>
        </div>
        <h5 class="post-heading mb-4">${e.title}</h5>
        <p class="your-experience">${e.body}</p>
        <div class="d-flex justify-content-between">
          <button class="btn btn-danger" onclick="deletePost(${e.id})">Delete</button>
          <button class="btn btn-primary" onclick="openNewPage(${e.id})">View</button>
          <button class="btn btn-warning" onClick="updatePost(${e.id})">Update</button>
        </div>
      </div>
    </div>
  </div>`
  let postLayout = document.querySelector('#post-layout');
  postLayout.innerHTML = postBody;
    // alert('Post Created');
  });
  })
}
  