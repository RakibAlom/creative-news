const loadCategory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  allCategory(data.data.news_category);
}
const allCategory = (categories) => {
  const newsCategory = getId('news-category');
  for (let category of categories) {
    const li = document.createElement('li');
    li.classList.add('nav-item');
    li.innerHTML = `
      <a class="nav-link" href="#">${category.category_name}</a>
    `
    newsCategory.appendChild(li);
    console.log(newsCategory)
  }
}
loadCategory();