const loadCategory = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    allCategory(data.data.news_category);
  } catch (error) {
    console.log(error)
  }
}
const allCategory = (categories) => {
  const newsCategory = getId('news-category');
  try {
    categories.forEach(category => {
      const li = document.createElement('li');
      li.classList.add('nav-item');
      li.innerHTML = `
        <a class="nav-link" href="#" id="categoyrNav${category.category_id}" onclick="loadNews('${category.category_id}', '${category.category_name}')">${category.category_name}</a>
      `
      newsCategory.appendChild(li);
    })

    loadNews('01', 'Breaking News')

  } catch (error) {
    console.log(error)
  }
}

loadCategory();
