function renderSingle() {
  let newObject = localStorage.getItem('viewedPost')
  console.log(newObject);
  let post = JSON.parse(newObject)
  console.log(post)
//   // console.log(post.title)

 document.querySelector('.post-id').innerHTML = post.id
 document.querySelector('.your-experience').innerHTML = post.body
 document.querySelector('.post-heading').innerHTML = post.title

  // document.getElementById('post-id')
  // document.getElementById('post-title')
  // document.getElementById('post-body')
}

renderSingle();