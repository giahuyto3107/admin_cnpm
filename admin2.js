
const postApi = 'http://localhost:8080/api/v1/products';
const perPage = 6; // Số lượng sản phẩm trên mỗi trang
let currentPage = 1; // Trang hiện tại

// Hàm hiển thị danh sách sản phẩm
function displayList(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Xóa danh sách hiện tại

  // Lấy chỉ số bắt đầu và kết thúc của sản phẩm trên trang hiện tại
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  // Lặp qua danh sách sản phẩm trên trang hiện tại và hiển thị
  for (let i = startIndex; i < endIndex && i < products.length; i++) {
    const product = products[i];
    let btnCtl = product.status == 1 ?
      `<button class="btn-delete" onclick="deleteProduct(${product.id})"><i class="material-symbols-outlined">
          delete
          </i></button>` :
      `<button class="btn-delete" onclick="changeStatusProduct(${product.id})"><i class="material-symbols-outlined">
      visibility
      </i></button>`;
    const productHtml = `
      <div class="list">
        <div class="list-left">
          <img src="${product.image}" alt="">
          <div class="list-info">
            <h4>${product.product_name}</h4>
            <p class="list-note">${product.quantity}</p>
            <span class="list-category">${product.publisher_name}</span>
          </div>
        </div>
        <div class="list-right">
          <div class="list-price">
            <span class="list-current-price">${vnd(product.price)}</span>
          </div>
          <div class="list-control">
            <div class="list-tool">
              <button class="btn-edit" onclick="editProduct(${product.id})">
                <i class="material-symbols-outlined">edit_note</i>
              </button>
              ${btnCtl}
            </div>
          </div>
        </div>
      </div>
    `;
    productList.innerHTML += productHtml;
  }
}

// Hàm thiết lập phân trang
function setupPagination(products) {
  const totalPages = Math.ceil(products.length / perPage); // Tổng số trang

  // Hiển thị các nút phân trang
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  // Tạo nút "Trang trước" (Previous)
  const previousBtn = document.createElement('button');
  previousBtn.innerHTML = 'Trang trước';
  previousBtn.disabled = currentPage === 1; // Disable nếu đang ở trang đầu tiên
  previousBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayList(products);
      setupPagination(products);
    }
  });
  pagination.appendChild(previousBtn);

  // Tạo các nút trang
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.innerHTML = i;
    pageBtn.className = currentPage === i ? 'active' : ''; // Đánh dấu trang hiện tại
    pageBtn.addEventListener('click', () => {
      currentPage = i;
      displayList(products);
      setupPagination(products);
    });
    pagination.appendChild(pageBtn);
  }

  // Tạo nút "Trang sau" (Next)
  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = 'Trang sau';
  nextBtn.disabled = currentPage === totalPages; // Disable nếu đang ở trang cuối cùng
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayList(products);
      setupPagination(products);
    }
  });
  pagination.appendChild(nextBtn);
}

const paginationContainer = document.getElementById('pagination');

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  paginationContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
      scrollToTop();
    }
  });

// Gửi yêu cầu lấy danh sách sản phẩm từ API
fetch(postApi)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const products = data.content;
    displayList(products);
    setupPagination(products);
  })
  .catch(error => {
    console.log('Lỗi:', error);
  });
// Hàm chuyển đổi định dạng giá tiền sang VND
function vnd(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Hàm xử lý khi nhấn nút chỉnh sửa sản phẩm
function editProduct(productId) {
  // Thực hiện các thao tác chỉnh sửa sản phẩm
  // ...
}
