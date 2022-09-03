const categoryPost = async (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  const res = await fetch(url);
  const data = await res.json();
  allNews(data.data);
}

const allNews = (allnews) => {
  const newsContent = getId('news-content');

  allnews.forEach(news => {
    const div = document.createElement('div');
    console.log(news);
    div.innerHTML = `
      <!-- SINGLE NEWS START -->
        <div class="single-news-content">
          <div class="card mb-3 py-2 px-2 px-md-3 py-md-3 border-0 rounded-3">
            <div class="row g-2">
              <div class="col-md-4 col-lg-3">
                <img src="${news.thumbnail_url}" class="img-fluid w-100 rounded-3" alt="${news.title}">
              </div>
              <div class="col-md-8 col-lg-9 py-md-2 px-md-4">
                <div class="card-body px-0 px-md-2 h-100 d-flex flex-column justify-content-center">
                  <h2 class="news-title">${news.title}</h2>
                  <p class="news-description py-3 text-color">
                    From our favourite UK influencers to the best missives from Milan and the coolest New Yorkers, read
                    on some of the best fashion blogs out there, and for even more inspiration, do head to our separate
                    black fashion influencer round-up.

                    <br>

                    Fancy some shopping deals? Check out these amazing sales: Zara Black Friday, ASOS Black Friday,
                    Missoma Black Friday and Gucci Black Friday...
                  </p>
                  <div class="single-content-extra-info">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="author-info d-flex align-items-center">
                        <img src="./images/avator.png" class="img-fluid" alt="author">
                        <div class="ms-2 d-flex flex-column">
                          <span class="text-dark">Jane Cooper</span>
                          <span class="date">Jan 10, 2022</span>
                        </div>
                      </div>
                      <div class="news-view">
                        <i class="fa-regular fa-eye"></i>
                        <span class="ps-2 fw-bold">${news.total_view}</span>
                      </div>
                      <div class="news-rating d-none d-md-block">
                        <i class="fa-regular fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <div class="read-news">
                        <button class="read-news-button">
                          <i class="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- SINGLE NEWS END -->
    `;
    newsContent.appendChild(div);
  })

}