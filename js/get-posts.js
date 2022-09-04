const loadNews = async (categoryId, categoryName) => {

  toggleSpinner(true);

  try {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();

    categoryNews(data.data, categoryName);

    // CATEGORY ACTIVE VIEW
    const categoryNavs = document.querySelectorAll('#news-category .nav-item .nav-link');
    for (let navLink of categoryNavs) {
      navLink.classList.remove('active');
    }
    const categoryNavId = getId(`categoyrNav${categoryId}`);
    categoryNavId.classList.add('active');
  } catch (error) {
    console.log(error);
  }

}

const categoryNews = (allnews, categoryName) => {
  const newsContent = getId('news-content');
  newsContent.textContent = "";

  try {
    // Total Found News
    const alert = getId('content-alert');
    alert.innerHTML = `
    <b class="primary-color">${allnews.length}</b> news found for ${categoryName}
  `
    alert.classList.remove('d-none');

    // NEWS DEFAULT SORTING BY TOTAL VIEW
    allnews.sort((a, b) => b.total_view - a.total_view);


    // GET ALL NEWS BY CATEGORY
    if (allnews.length > 0) {
      allnews.forEach(news => {
        const newsDate = new Date(news.author.published_date);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="single-news-content">
          <div class="card mb-3 py-2 px-2 px-md-3 py-md-3 border-0 rounded-3">
            <div class="row g-2">
              <div class="col-md-4 col-lg-3">
                <img src="${news.thumbnail_url}" class="img-fluid w-100 rounded-3" alt="${news.title}">
              </div>
              <div class="col-md-8 col-lg-9 py-md-2 px-md-4">
                <div class="card-body px-0 px-md-2 h-100 d-flex flex-column justify-content-center">
                  <a href="#" class="news-title" onclick="singleNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#singleNews">
                    <h2>${news.title}</h2>
                  </a>
                  <p class="news-description py-3 text-color">
                    ${news.details.slice(0, 240) + '...'}
                  </p>
                  <div class="single-content-extra-info">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="author-info d-flex align-items-center">
                        <img src="${news.author.img}" class="img-fluid rounded" alt="author">
                        <div class="ms-2 d-flex flex-column">
                          <span class="text-dark">${news.author.name ? news.author.name : "no-data"}</span>
                          <span class="date">${news.author.published_date ? newsDate.toLocaleDateString() : "no-data"}</span>
                        </div>
                      </div>
                      <div class="news-view">
                        <i class="fa-regular fa-eye"></i>
                        <span class="ps-2 fw-bold">${news.total_view ? news.total_view : "no-data"}</span>
                      </div>
                      <div class="news-rating d-none d-md-block">
                        <i class="fa-regular fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <div class="read-news">
                        <a href="#" onclick="singleNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#singleNews">
                          <button class="read-news-button">
                            <i class="fa-solid fa-arrow-right"></i>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

        newsContent.appendChild(div);
      })
    } else {
      newsContent.innerHTML = `
      <h2 class="py-4 text-center">No News Found for <span class="primary-color">${categoryName}</span></h2>
    `
    }
    toggleSpinner(false);
  } catch (error) {
    console.log(error);
  }
}

const singleNewsDetails = async (news_id) => {
  try {
    const getNews = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(getNews);
    const data = await res.json();
    const news = data.data[0];

    const newsDate = new Date(news.author.published_date);

    const newsDetails = getId('news-body');
    newsDetails.innerHTML = `
      <img src="${news.image_url}" class="img-fluid" alt="">
      <div class="single-content-extra-info my-3">
        <div class="d-flex justify-content-between align-items-center">
          <div class="author-info d-flex align-items-center">
            <img src="${news.author.img}" class="img-fluid rounded" alt="author">
            <div class="ms-2 d-flex flex-column">
              <span class="text-dark">${news.author.name ? news.author.name : "no-data"}</span>
              <span class="date">${news.author.published_date ? newsDate.toLocaleDateString() : "no-data"}</span>
            </div>
          </div>
          <div class="news-view">
            <i class="fa-regular fa-eye"></i>
            <span class="ps-2 fw-bold">${news.total_view ? news.total_view : "no-data"}</span>
          </div>
          <div class="news-rating d-none d-md-block">
            <i class="fa-regular fa-star-half-stroke"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
        </div>
      </div>
      <h4 class="py-2">${news.title}</h4>
      <div class="pb-2">${news.details}</div>
    `

  } catch (error) {
    console.log(error);
  }

}