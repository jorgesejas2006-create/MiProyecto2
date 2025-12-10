
// Inicializar localStorage si no existe
if (!localStorage.getItem('posts')) {
  localStorage.setItem('posts', JSON.stringify(defaultPosts));
}

// ======= RENDER POSTS =======
function renderPosts(type) {
  const postsSection = document.querySelector('.posts');
  postsSection.innerHTML = '';

  const allPosts = JSON.parse(localStorage.getItem('posts'));
  const posts = allPosts[type];

  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.style.opacity = 0;

    // Construir HTML de comentarios
    const commentsHTML = post.comments.map(c => `<div class="comment"><strong>${c.user}:</strong> ${c.text}</div>`).join('');

    postDiv.innerHTML = `
      <div class="user-icon"></div>
      <div class="post-content">
        <h4>${post.user} • ${post.time}</h4>
        <p>${post.content}</p>
        <div class="post-actions">
          <span class="like-btn" data-index="${index}" data-type="${type}">${post.likes} ❤️</span>
          <span class="comment-btn" data-index="${index}" data-type="${type}">${post.comments.length} 💬</span>
        </div>
        <div class="comments">${commentsHTML}</div>
        <input type="text" class="comment-input" placeholder="Añadir un comentario...">
      </div>
    `;
    postsSection.appendChild(postDiv);

    // Animación de entrada
    setTimeout(() => postDiv.style.opacity = 1, 50);
  });

  addInteractionListeners();
}

// ======= BOTONES DE INTERACCIÓN =======
function addInteractionListeners() {
  const likeBtns = document.querySelectorAll('.like-btn');
  const commentBtns = document.querySelectorAll('.comment-btn');
  const commentInputs = document.querySelectorAll('.comment-input');

  likeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      const type = btn.dataset.type;
      const allPosts = JSON.parse(localStorage.getItem('posts'));
      allPosts[type][index].likes++;
      localStorage.setItem('posts', JSON.stringify(allPosts));
      renderPosts(type);
    });
  });

  // Agregar comentarios mediante input y Enter
  commentInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.trim() !== '') {
        const postDiv = input.closest('.post');
        const type = postDiv.querySelector('.like-btn').dataset.type;
        const index = postDiv.querySelector('.like-btn').dataset.index;
        const allPosts = JSON.parse(localStorage.getItem('posts'));

        allPosts[type][index].comments.push({ user: "Tú", text: input.value });
        localStorage.setItem('posts', JSON.stringify(allPosts));
        renderPosts(type);
      }
    });
  });
}

// ======= PESTAÑAS =======
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderPosts(tab.textContent.toLowerCase());
  });
});

// ======= INICIAL =======
const activeTab = document.querySelector('.tab.active');
if (activeTab) renderPosts(activeTab.textContent.toLowerCase());