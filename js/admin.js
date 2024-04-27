function login() {
    fetch('http://localhost:8080/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@sgu.edu.vn',
        password: '123456',
      }),
    })
      .then(response => response.json())
      .then(data => {
        const accessToken = data.content.access_token;
        //LƯU TOKEN VÀO LOCAL STORAGE
        localStorage.setItem('accessToken', accessToken);
        console.log('Token saved to localStorage:', accessToken);
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  }

function getData() {
    // Lấy token từ localStorage
    const accessToken = localStorage.getItem('accessToken');
  
    // Kiểm tra xem có token trong localStorage hay không
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }
  
    fetch('http://localhost:8080/api/v1/products', {
      //SỬ DỤNG PHƯƠNG THỨC GET ĐỂ LẤY SẢN PHẨM
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data thành phần: ', data.content);
        return data.content;
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }

getData();

$(".menu-btn").click(function(){
    $(".sidebar").toggleClass("active");
})

const sidebars = document.querySelectorAll(".sidebar-list-item.tab-content");
const sections = document.querySelectorAll(".section");

for(let i = 0; i < sidebars.length; i++) {
    sidebars[i].onclick = function () {
        document.querySelector(".sidebar-list-item.active").classList.remove("active");
        document.querySelector(".section.active").classList.remove("active");
        sidebars[i].classList.add("active");
        sections[i].classList.add("active");
    };
}

const closeBtn = document.querySelectorAll('.section');
console.log(closeBtn[0])
for(let i=0;i<closeBtn.length;i++){
  closeBtn[i].addEventListener('click',(_e) => {
    sidebars[i].classList.add("open");
});
}

// Get amount product
function getAmoumtProduct() {
    fetch('http://localhost:8080/api/v1/products')
      .then(res => res.json())
      .then(data => {
        const amount = data.content.length;
        document.getElementById("amount-product").innerHTML = amount;
      })
      .catch(error => {
        console.log('Lỗi:', error);
      });
}

// Get amount user
function getAmoumtUser() {
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
    return accounts.filter(item => item.userType == 0).length;
}

// Get amount user
function getMoney() {
    let tongtien = 0;
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    orders.forEach(item => {
        tongtien += item.tongtien
    });
    return tongtien;
}

document.getElementById("amount-product").innerHTML = getAmoumtProduct();
document.getElementById("doanh-thu").innerHTML = vnd(getMoney());


// Doi sang dinh dang tien VND
function vnd(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function displayList(productAll) {
    // Lấy token từ localStorage
    const accessToken = localStorage.getItem('accessToken');
    // Kiểm tra xem có token trong localStorage hay không
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }
  
    fetch('http://localhost:8080/api/v1/products', {
      //SỬ DỤNG PHƯƠNG THỨC GET ĐỂ LẤY SẢN PHẨM
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        showProductArr(data.content);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
    
}

function displayListSearch(productAll, keyword) {
    // Lấy token từ localStorage
    const accessToken = localStorage.getItem('accessToken');
    // Kiểm tra xem có token trong localStorage hay không
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }
  
    const url = `http://localhost:8080/api/v1/products?search=${encodeURIComponent(keyword)}`;
  
    fetch(url, {
      // SỬ DỤNG PHƯƠNG THỨC GET ĐỂ LẤY SẢN PHẨM
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        showProductArr(data.content);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }

  function fetchDataCategory(id) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }
  
    fetch(`http://localhost:8080/api/v1/categories/category/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
    })
      .then(response => response.json())
      .then(categoryData => {
        console.log(categoryData.content.name)
        return categoryData.content.name;
      })
      .catch(error => {
        console.error('Failed to fetch category data:', error);
      });
  }
// Hiển thị danh sách sản phẩm 
function showProductArr(arr) {
    let productHtml = "";
    if (arr.length == 0) {
      productHtml = `<div class="no-result"><div class="no-result-i"><i class="material-symbols-outlined">
      warning
      </i></div><div class="no-result-h">Không có sản phẩm để hiển thị</div></div>`;
    } else {
      arr.forEach(product => {
        let btnCtl = product.status == 1 ?
          `<button class="btn-delete" onclick="deleteProduct(${product.id})"><i class="material-symbols-outlined">
              delete
              </i></button>` :
          `<button class="btn-delete" onclick="changeStatusProduct(${product.id})"><i class="material-symbols-outlined">
          visibility
          </i></button>`;
        productHtml += `
          <div class="list">
            <div class="list-left">
              <img src="${product.image}" alt="">
              <div class="list-info">
                <h4>${product.product_name}</h4>
                <p class="list-note">${product.publisher_name}</p>
                <span class="list-category">${product.category_names}</span>
              </div>
            </div>
            <div class="list-right">
              <div class="list-price">
                <span class="list-current-price">${vnd(product.price)}</span>                   
              </div>
              <div class="list-control">
                <div class="list-tool">
                  <button class="btn-edit" onclick="editProduct(${product.id})"><i class="material-symbols-outlined">
                  edit_note
                  </i></button>
                  ${btnCtl}
                </div>                       
              </div>
            </div> 
          </div>`;
      });
    }
    document.getElementById("show-product").innerHTML = productHtml;
}

function showProduct() {
    let selectOp = document.getElementById('the-loai').value;
    let valeSearchInput = document.getElementById('form-search-product').value;
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
  
    let result;
  
    if (valeSearchInput === "") {
      result = products;
      displayList(result);
    } else {
      displayListSearch(result,valeSearchInput);
    }
  }
  
function cancelSearchProduct() {
    document.getElementById('the-loai').value = "Tất cả";
    document.getElementById('form-search-product').value = "";
    displayList(products, perPage, currentPage);
    setupPagination(products, perPage, currentPage);
}

window.onload = showProduct();

function createId(arr) {
    let id = arr.length;
    let check = arr.find((item) => item.id == id);
    while (check != null) {
        id++;
        check = arr.find((item) => item.id == id);
    }
    return id;
}


function deleteProduct(id) {
  if (confirm("Bạn có chắc muốn xóa?")) {
    // Lấy token từ localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Kiểm tra xem có token trong localStorage hay không
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }

    fetch(`http://localhost:8080/api/v1/products/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        location.reload();
        // Xử lý kết quả tìm kiếm đơn hàng ở đây
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }
}


function changeStatusProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    let index = products.findIndex(item => {
        return item.id == id;
    })
    if (confirm("Bạn có chắc chắn muốn hủy xóa?") == true) {
        products[index].status = 1;
        toast({ title: 'Success', message: 'Khôi phục sản phẩm thành công !', type: 'success', duration: 3000 });
    }
    localStorage.setItem("products", JSON.stringify(products));
    showProduct();
}

function getDataCategories() {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }
    
    fetch('http://localhost:8080/api/v1/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then(data => {
        const selectElement = document.getElementById('chon-mon');
        
        // Xóa các phần tử cũ trong thẻ <select>
        selectElement.innerHTML = '';
        
        // Tạo các phần tử <option> mới dựa trên dữ liệu danh mục
        data.content.forEach(category => {
          const optionElement = document.createElement('option');
          optionElement.value = category.id;
          optionElement.textContent = category.name;
          selectElement.appendChild(optionElement);
        });
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }
  getDataCategories();

  function getDataAuthors() {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }
    
    fetch('http://localhost:8080/api/v1/authors', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then(data => {
        const selectElement = document.getElementById('author_ids');
        
        // Xóa các phần tử cũ trong thẻ <select>
        selectElement.innerHTML = '';
        
        // Tạo các phần tử <option> mới dựa trên dữ liệu danh mục
        data.content.forEach(author => {
          const optionElement = document.createElement('option');
          optionElement.value = author.id;
          optionElement.textContent = author.name;
          selectElement.appendChild(optionElement);
        });
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }
getDataAuthors();

function getDataPublisher() {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }
    
    fetch('http://localhost:8080/api/v1/publishers/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then(data => {
        const selectElement = document.getElementById('publisher_id');
        
        // Xóa các phần tử cũ trong thẻ <select>
        selectElement.innerHTML = '';
        
        // Tạo các phần tử <option> mới dựa trên dữ liệu danh mục
        data.content.forEach(publisher => {
          const optionElement = document.createElement('option');
          optionElement.value = publisher.id;
          optionElement.textContent = publisher.name;
          selectElement.appendChild(optionElement);
        });
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
}
getDataPublisher();

  function getDataDiscount() {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }
    
    fetch('http://localhost:8080/api/v1/discounts/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch discount');
        }
        return response.json();
      })
      .then(data => {
        const selectElement = document.getElementById('discount');
        
        // Xóa các phần tử cũ trong thẻ <select>
        selectElement.innerHTML = '';
        
        // Tạo các phần tử <option> mới dựa trên dữ liệu danh mục
        data.content.discountList.forEach(discount => {
          const optionElement = document.createElement('option');
          optionElement.value = discount.discount_code;
          optionElement.textContent = discount.discount_code;
          selectElement.appendChild(optionElement);
        });
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }
getDataDiscount();


function editProduct(id) {
  document.querySelector(".add-product").classList.add("open");
  document.querySelectorAll(".add-product-e").forEach(item => {
    item.style.display = "none"
  });
  document.querySelectorAll(".edit-product-e").forEach(item => {
    item.style.display = "block"
  });

  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

      
      const productInput = document.getElementById('ten-mon');
      const publisherInput = document.getElementById('publisher_id');
      const categoryInput = document.getElementById('chon-mon');
      const priceInput = document.getElementById('gia-moi');
      const discountInput = document.getElementById('discount');
      const authorInput = document.getElementById('author_ids');
      const imgInput = document.getElementById('up-hinh-anh');

      const updateProduct = document.getElementById('update-product-button');
      updateProduct.addEventListener('click', () => {


        const file = imgInput.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const fileContent = e.target.result;

    const selectedCategories = Array.from(categoryInput.selectedOptions).map(option => option.value);
    const selectedAuthors = Array.from(authorInput.selectedOptions).map(option => option.value);

          const updatedDataProduct = {
            name: productInput.value,
          publisher_id: publisherInput.value,
          image: fileContent,
          price: priceInput.value,
          discount: discountInput.value,
          category_ids: selectedCategories,
          author_ids: selectedAuthors
          };

          // Gửi yêu cầu PUT để cập nhật danh mục
          fetch(`http://localhost:8080/api/v1/products/product/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              token: accessToken,
            },
            body: JSON.stringify(updatedDataProduct),
          })
            .then(response => response.json())
            .then(updatedCategory => {
              
            })
            .catch(error => {
              console.error('Lỗi khi cập nhật danh mục:', error);
            });
        };

        reader.readAsDataURL(file);
      });
  
}



let btnAddProductIn = document.getElementById("add-product-button");

function addProduct(event) {
  event.preventDefault();

  const productInput = document.getElementById('ten-mon');
  const publisherInput = document.getElementById('publisher_id');
  const categoryInput = document.getElementById('chon-mon');
  const priceInput = document.getElementById('gia-moi');
  const discountInput = document.getElementById('discount');
  const authorInput = document.getElementById('author_ids');
  const imgInput = document.getElementById('up-hinh-anh');
  const file = imgInput.files[0];
  
  if (!file) {
    console.error('Không có file được chọn.');
    alert('Không có file được chọn, xin hãy chọn file để tiếp tục');
    return;
  }

  convertImageToBase64(file, base64Data => {
    if (!base64Data) {
      console.error('Lỗi khi chuyển đổi hình ảnh.');
      return;
    }
    
    console.log(productInput.value);
    console.log(categoryInput.value);
    console.log(authorInput.value);

    const selectedCategories = Array.from(categoryInput.selectedOptions).map(option => option.value);
    const selectedAuthors = Array.from(authorInput.selectedOptions).map(option => option.value);

    const newProduct = {
      name: productInput.value,
      publisher_id: publisherInput.value,
      image: base64Data,
      price: priceInput.value,
      discount: discountInput.value,
      category_ids: selectedCategories,
      author_ids: selectedAuthors
    };

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }

    fetch('http://localhost:8080/api/v1/products/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': accessToken,
      },
      body: JSON.stringify(newProduct)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi khi gửi yêu cầu.');
        }
        return response.json();
      })
      .then(data => {
        location.reload();
      })
      .catch(error => {
        // Xử lý lỗi nếu có
      });
  });
}

btnAddProductIn.addEventListener('click', addProduct);
// document.querySelector(".modal-close.product-form").addEventListener("click",() => {
//     setDefaultValue();
// })

// function setDefaultValue() {
//     document.querySelector(".upload-image-preview").src = "/pic/add-img.png";
//     document.getElementById("ten-mon").value = "";
//     document.getElementById("gia-moi").value = "";
//     document.getElementById("mo-ta").value = "";
//     document.getElementById("chon-mon").value = "Nike";
// }





// Open Popup Modal
let btnAddProduct = document.getElementById("btn-add-product");
btnAddProduct.addEventListener("click", () => {
    document.querySelectorAll(".add-product-e").forEach(item => {
        item.style.display = "block";
    })
    document.querySelectorAll(".edit-product-e").forEach(item => {
        item.style.display = "none";
    })
    document.querySelector(".add-product").classList.add("open");
});

// Close Popup Modal
let closePopup = document.querySelectorAll(".modal-close");
let modalPopup = document.querySelectorAll(".modal");

for (let i = 0; i < closePopup.length; i++) {
    closePopup[i].onclick = () => {
        modalPopup[i].classList.remove("open");
    };
}




// // Đổi trạng thái đơn hàng
// function changeStatus(id, el) {
//     let orders = JSON.parse(localStorage.getItem("order"));
//     let order = orders.find((item) => {
//         return item.id == id;
//     });
//     order.trangthai = 1;
//     el.classList.remove("btn-chuaxuly");
//     el.classList.add("btn-daxuly");
//     el.innerHTML = "Đã xử lý";
//     localStorage.setItem("order", JSON.stringify(orders));
//     findOrder(orders);
// }


// Show order
function showOrder(arr) {
    let orderHtml = "";
    if(arr.length == 0) {
        orderHtml = `<td colspan="6">Không có dữ liệu</td>`
    } else {
        arr.forEach((item) => {
            let status = item.trangthai == 0 ? `<span class="status-no-complete">Chưa xử lý</span>` : `<span class="status-complete">Đã xử lý</span>`;
            let date = formatDate(item.thoigiandat);
            orderHtml += `
            <tr>
            <td>${item.id}</td>
            <td>${item.khachhang}</td>
            <td>${date}</td>
            <td>${vnd(item.tongtien)}</td>                               
            <td>${status}</td>
            <td class="control">
            <button class="btn-detail" id="" onclick="detailOrder('${item.id}')"><i class="material-symbols-outlined">
            visibility
            </i> Chi tiết</button>
            </td>
            </tr>      
            `;
        });
    }
    document.getElementById("showOrder").innerHTML = orderHtml;
}

let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
window.onload = showOrder(orders);

// Get Order Details
function getOrderDetails(madon) {
    let orderDetails = localStorage.getItem("orderDetails") ?
        JSON.parse(localStorage.getItem("orderDetails")) : [];
    let ctDon = [];
    orderDetails.forEach((item) => {
        if (item.madon == madon) {
            ctDon.push(item);
        }
    });
    return ctDon;
}

// Show Order Detail
function detailOrder(id) {
    document.querySelector(".modal.detail-order").classList.add("open");
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let products = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("products")) : [];
    // Lấy hóa đơn 
    let order = orders.find((item) => item.id == id);
    // Lấy chi tiết hóa đơn
    let ctDon = getOrderDetails(id);
    let spHtml = `<div class="modal-detail-left"><div class="order-item-group">`;

    ctDon.forEach((item) => {
        let detaiSP = products.find(product => product.id == item.id);
        spHtml += `<div class="order-product">
            <div class="order-product-left">
                <img src="${detaiSP.img}" alt="">
                <div class="order-product-info">
                    <h4>${detaiSP.title}</h4>
                    <p class="order-product-quantity">SL: ${item.soluong}<p>
                </div>
            </div>
            <div class="order-product-right">
                <div class="order-product-price">
                    <span class="order-product-current-price">${vnd(item.price)}</span>
                </div>                         
            </div>
        </div>`;
    });
    spHtml += `</div></div>`;
    spHtml += `<div class="modal-detail-right">
        <ul class="detail-order-group">
            <li class="detail-order-item">
                <span class="detail-order-item-left"><i class="material-symbols-outlined">
                calendar_today
                </i> Ngày đặt hàng</span>
                <span class="detail-order-item-right">${formatDate(order.thoigiandat)}</span>
            </li>
            <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="material-symbols-outlined">
            person
            </i> Người nhận</span>
            <span class="detail-order-item-right">${order.nguoinhan}</span>
            </li>
            <li class="detail-order-item">
            <span class="detail-order-item-left"><i class="material-symbols-outlined">
            call
            </i> Số điện thoại</span>
            <span class="detail-order-item-right">${order.sdtnhan}</span>
            </li>
            <li class="detail-order-item tb">
                <span class="detail-order-item-t"><i class="material-symbols-outlined">
                location_on
                </i> Địa chỉ nhận</span>
                <p class="detail-order-item-b">${order.diachi}</p>
            </li>
        </ul>
    </div>`;
    document.querySelector(".modal-detail-order").innerHTML = spHtml;

    let classDetailBtn = order.trangthai == 0 ? "btn-chuaxuly" : "btn-daxuly";
    let textDetailBtn = order.trangthai == 0 ? "Chưa xử lý" : "Đã xử lý";
    document.querySelector(
        ".modal-detail-bottom"
    ).innerHTML = `<div class="modal-detail-bottom-left">
        <div class="price-total">
            <span class="thanhtien">Thành tiền</span>
            <span class="price">${vnd(order.tongtien)}</span>
        </div>
    </div>
    <div class="modal-detail-bottom-right">
        <button class="modal-detail-btn ${classDetailBtn}" onclick="changeStatus('${order.id}',this)">${textDetailBtn}</button>
    </div>`;
}

// Find Order
function findOrder() {
    let tinhTrang = parseInt(document.getElementById("tinh-trang").value);
    let ct = document.getElementById("form-search-order").value;
    let timeStart = document.getElementById("time-start").value;
    let timeEnd = document.getElementById("time-end").value;
    
    if (timeEnd < timeStart && timeEnd != "" && timeStart != "") {
        alert("Lựa chọn thời gian sai !");
        return;
    }
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let result = tinhTrang == 2 ? orders : orders.filter((item) => {
        return item.trangthai == tinhTrang;
    });
    result = ct == "" ? result : result.filter((item) => {
        return (item.khachhang.toLowerCase().includes(ct.toLowerCase()) || item.id.toString().toLowerCase().includes(ct.toLowerCase()));
    });

    if (timeStart != "" && timeEnd == "") {
        result = result.filter((item) => {
            return new Date(item.thoigiandat) >= new Date(timeStart).setHours(0, 0, 0);
        });
    } else if (timeStart == "" && timeEnd != "") {
        result = result.filter((item) => {
            return new Date(item.thoigiandat) <= new Date(timeEnd).setHours(23, 59, 59);
        });
    } else if (timeStart != "" && timeEnd != "") {
        result = result.filter((item) => {
            return (new Date(item.thoigiandat) >= new Date(timeStart).setHours(0, 0, 0) && new Date(item.thoigiandat) <= new Date(timeEnd).setHours(23, 59, 59)
            );
        });
    }
    showOrder(result);
}

function cancelSearchOrder(){
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    document.getElementById("tinh-trang").value = 2;
    document.getElementById("form-search-order").value = "";
    document.getElementById("time-start").value = "";
    document.getElementById("time-end").value = "";
    showOrder(orders);
}


// Create Object Thong ke
function createObj() {
    let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []; 
    let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : []; 
    let result = [];
    orderDetails.forEach(item => {
        // Lấy thông tin sản phẩm
        let prod = products.find(product => {return product.id == item.id;});
        let obj = new Object();
        obj.id = item.id;
        obj.madon = item.madon;
        obj.price = item.price;
        obj.quantity = item.soluong;
        obj.category = prod.category;
        obj.title = prod.title;
        obj.img = prod.img;
        obj.time = (orders.find(order => order.id == item.madon)).thoigiandat;
        result.push(obj);
    });
    return result;
}

// Filter 
function thongKe(mode) {
    let categoryTk = document.getElementById("the-loai-tk").value;
    let ct = document.getElementById("form-search-tk").value;
    let timeStart = document.getElementById("time-start-tk").value;
    let timeEnd = document.getElementById("time-end-tk").value;
    if (timeEnd < timeStart && timeEnd != "" && timeStart != "") {
        alert("Lựa chọn thời gian sai !");
        return;
    }
    let arrDetail = createObj();
    let result = categoryTk == "Tất cả" ? arrDetail : arrDetail.filter((item) => {
        return item.category == categoryTk;
    });

    result = ct == "" ? result : result.filter((item) => {
        return (item.title.toLowerCase().includes(ct.toLowerCase()));
    });

    if (timeStart != "" && timeEnd == "") {
        result = result.filter((item) => {
            return new Date(item.time) > new Date(timeStart).setHours(0, 0, 0);
        });
    } else if (timeStart == "" && timeEnd != "") {
        result = result.filter((item) => {
            return new Date(item.time) < new Date(timeEnd).setHours(23, 59, 59);
        });
    } else if (timeStart != "" && timeEnd != "") {
        result = result.filter((item) => {
            return (new Date(item.time) > new Date(timeStart).setHours(0, 0, 0) && new Date(item.time) < new Date(timeEnd).setHours(23, 59, 59)
            );
        });
    }    
    showThongKe(result,mode);
}

// Show số lượng sp, số lượng đơn bán, doanh thu
function showOverview(arr){
    document.getElementById("quantity-product").innerText = arr.length;
    document.getElementById("quantity-order").innerText = arr.reduce((sum, cur) => (sum + parseInt(cur.quantity)),0);
    document.getElementById("quantity-sale").innerText = vnd(arr.reduce((sum, cur) => (sum + parseInt(cur.doanhthu)),0));
}

function showThongKe(arr,mode) {
    let orderHtml = "";
    let mergeObj = mergeObjThongKe(arr);
    showOverview(mergeObj);

    switch (mode){
        case 0:
            mergeObj = mergeObjThongKe(createObj());
            showOverview(mergeObj);
            document.getElementById("the-loai-tk").value = "Tất cả";
            document.getElementById("form-search-tk").value = "";
            document.getElementById("time-start-tk").value = "";
            document.getElementById("time-end-tk").value = "";
            break;
        case 1:
            mergeObj.sort((a,b) => parseInt(a.quantity) - parseInt(b.quantity))
            break;
        case 2:
            mergeObj.sort((a,b) => parseInt(b.quantity) - parseInt(a.quantity))
            break;
    }
    for(let i = 0; i < mergeObj.length; i++) {
        orderHtml += `
        <tr>
        <td>${i + 1}</td>
        <td><div class="prod-img-title"><img class="prd-img-tbl" src="${mergeObj[i].img}" alt=""><p>${mergeObj[i].title}</p></div></td>
        <td>${mergeObj[i].quantity}</td>
        <td>${vnd(mergeObj[i].doanhthu)}</td>
        <td><button class="btn-detail product-order-detail" data-id="${mergeObj[i].id}"><i class="material-symbols-outlined">
        visibility
        </i> Chi tiết</button></td>
        </tr>      
        `;
    }
    document.getElementById("showTk").innerHTML = orderHtml;
    document.querySelectorAll(".product-order-detail").forEach(item => {
        let idProduct = item.getAttribute("data-id");
        item.addEventListener("click", () => {           
            detailOrderProduct(arr,idProduct);
        })
    })
}

showThongKe(createObj())

function mergeObjThongKe(arr) {
    let result = [];
    arr.forEach(item => {
        let check = result.find(i => i.id == item.id) // Không tìm thấy gì trả về undefined

        if(check){
            check.quantity = parseInt(check.quantity)  + parseInt(item.quantity);
            check.doanhthu += parseInt(item.price) * parseInt(item.quantity);
        } else {
            const newItem = {...item}
            newItem.doanhthu = newItem.price * newItem.quantity;
            result.push(newItem);
        }
        
    });
    return result;
}

function detailOrderProduct(arr,id) {
    let orderHtml = "";
    arr.forEach(item => {
        if(item.id == id) {
            orderHtml += `<tr>
            <td>${item.madon}</td>
            <td>${item.quantity}</td>
            <td>${vnd(item.price)}</td>
            <td>${formatDate(item.time)}</td>
            </tr>      
            `;
        }
    });
    document.getElementById("show-product-order-detail").innerHTML = orderHtml
    document.querySelector(".modal.detail-order-product").classList.add("open")
}



// TAI KHOAN
let updateUser = document.getElementById("btn-update-user")
let updateRole = document.getElementById("btn-update-role")
let addUser=document.getElementById("signup-register-button")
document.querySelector(".modal.signup-user .modal-close").addEventListener("click",() => {
    signUpUserFormReset();
})

function openCreateUser() {
  document.querySelector(".signup-register").classList.add("open");
  document.querySelectorAll(".edit-register-e").forEach(item => {
      item.style.display = "none"
  })
  document.querySelectorAll(".add-register-e").forEach(item => {
      item.style.display = "block"
  })
}
function addAccount(event) {


  const emailInput = document.getElementById('email-input');
  const passInput = document.getElementById('pass-input');
    const newUser = {
      email: emailInput.value,
      password: passInput.value
    };

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }

    fetch('http://localhost:8080/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': accessToken,
      },
      body: JSON.stringify(newUser)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi khi gửi yêu cầu.');
        }
        return response.json();
      })
      .then(data => {
        location.reload();
      })
      .catch(error => {
      });
};
addUser.addEventListener('click', addAccount);



function signUpUserFormReset() {
    document.getElementById('fullname-user').value = ""
}

function convertRole(roleId) {
  let role = '';
  switch (roleId) {
    case 1:
      role = 'Người quản lí';
      break;
    case 2:
      role = 'Nhân viên';
      break;
    case 3:
      role = 'Khách hàng';
      break;
    default:
      role = 'Không xác định';
      break;
  }
  return role;
}


function showUserArr(arr) {
    let userHtml = '';
    if(arr.length == 0) {
      userHtml = `<td colspan="5">Không có dữ liệu</td>`
    } else {
        arr.forEach((user, index) => {
  
            userHtml += ` <tr>
            <td>${user.id}</td>
            <td><img src="${user.image}" alt="Không" style="width: 150px; height: 150px;"></td>
            <td>${user.fullname}</td>
            <td>${user.address}</td>
            <td>${user.email}</td>
            <td>${user.phone_number}</td>
            <td>${convertRole(user.role_id)}</td>
            <td class="control control-table">
            <button class="btn-edit" id="edit-user" onclick='editUser(${user.id})' ><i class="material-symbols-outlined">
            edit_note
            </i></button>
            <button class="btn-edit" id="edit-pass-user" onclick='editPassUser(${user.id})' ><i class="material-symbols-outlined">
            barcode
            </i></button>
            <button class="btn-edit" id="edit-role-user" onclick="editRoleUser(${user.id})">
            <i class="material-symbols-outlined">cloud</i>
        </button>
            <button class="btn-delete" id="delete-user" onclick="deleteUser(${user.id})"><i class="material-symbols-outlined">
            delete
            </i></button>
            </td>
        </tr>`
        })
    }
    document.getElementById('show-user').innerHTML = userHtml;
}

function showUser() {
  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  fetch('http://localhost:8080/api/v1/users', {
    // SỬ DỤNG PHƯƠNG THỨC GET ĐỂ LẤY SẢN PHẨM
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.content);
    showUserArr(data.content);


    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
    
}

window.onload = showUser();

function editRoleUser(id) {
  document.querySelector(".signup-role").classList.add("open");
  document.querySelectorAll(".add-role-e").forEach(item => {
    item.style.display = "none";
  });
  document.querySelectorAll(".edit-role-e").forEach(item => {
    item.style.display = "block";
  });

  const roleSelection = document.getElementById('role-select');
  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  // Lắng nghe sự kiện onchange khi có tùy chọn được chọn
  roleSelection.addEventListener('change', () => {
    // Lấy giá trị của tùy chọn đã chọn
    const selectedValue = roleSelection.value;

    // In giá trị đã chọn
    console.log(selectedValue);
  });

  // Lắng nghe sự kiện onclick cho phần tử có id là "btn-update-role"
  const updateRoleButton = document.getElementById('btn-update-role');
  updateRoleButton.addEventListener('click', () => {
    // Lấy giá trị chức vụ đã chọn
    const roleID = roleSelection.value;

    // Tạo đối tượng dữ liệu được cập nhật
    const updatedData = {
      role_id: roleID
    };

    fetch(`http://localhost:8080/api/v1/users/user/change-role/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': accessToken,
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Chức vụ đã được cập nhật:', data.content);
        // Tải lại trang sau khi hoàn thành yêu cầu PUT
        location.reload();
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật chức vụ:', error);
      });
  });
}

function editPassUser(id) {
  document.querySelector(".signup-pass").classList.add("open");
  document.querySelectorAll(".add-pass-e").forEach(item => {
    item.style.display = "none";
  });
  document.querySelectorAll(".edit-pass-e").forEach(item => {
    item.style.display = "block";
  });

  // Lấy token từ localStorage
  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  // Lấy giá trị mật khẩu mới từ phần tử input
  const newPassword = document.getElementById('password-input').value;

  // Tạo đối tượng dữ liệu được cập nhật
  const updatedData = {
    password: newPassword
  };

  // Lắng nghe sự kiện onclick cho phần tử có id là "btn-update-pass"
  const updatePassButton = document.getElementById('btn-update-pass');
  updatePassButton.addEventListener('click', () => {
    // Gửi yêu cầu PATCH để cập nhật mật khẩu
    fetch(`http://localhost:8080/api/v1/users/change-password/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Mật khẩu đã được cập nhật:', data);
        // Tải lại trang sau khi hoàn thành yêu cầu PATCH
        location.reload();
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật mật khẩu:', error);
      });
  });
}




function deleteUser(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
      // Lấy token từ localStorage
      const accessToken = localStorage.getItem('accessToken');

      // Kiểm tra xem có token trong localStorage hay không
      if (!accessToken) {
        console.error('Token not found in localStorage');
        return;
      }

      fetch(`http://localhost:8080/api/v1/users/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: accessToken,
        },
      })
        .then(response => response.json())
        .then(data => {
          location.reload();
          // Xử lý kết quả tìm kiếm đơn hàng ở đây
        })
        .catch(error => {
          console.error('Failed to fetch data:', error);
        });
    }
}


function editUser(id) {
  document.querySelector(".signup-user").classList.add("open");
  document.querySelectorAll(".add-user-e").forEach(item => {
    item.style.display = "none"
  });
  document.querySelectorAll(".edit-user-e").forEach(item => {
    item.style.display = "block"
  });


  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  // Gửi yêu cầu GET để tìm kiếm danh mục bằng ID
  fetch(`http://localhost:8080/api/v1/users/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("fullname-user").value = data.content.fullname;
      document.getElementById("address-user").value = data.content.address;
      document.getElementById("email-user").value = data.content.email;
      document.getElementById("sdt-user").value = data.content.phone_number;

      const nameInputUser = document.getElementById('fullname-user');
      const imageInputUser = document.getElementById('up-hinh-anh-user');
      const addressInputUser = document.getElementById('address-user');
      const emailInputUser = document.getElementById('email-user');
      const sdtInputUser = document.getElementById('sdt-user');

      updateUser.addEventListener('click', () => {
        const file = imageInputUser.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const fileContent = e.target.result;


          const updatedDataUser = {
            fullname: nameInputUser.value,
            image: fileContent,
            address: addressInputUser.value,
            email: emailInputUser.value,
            phone_number: sdtInputUser.value
          };

          // Gửi yêu cầu PUT để cập nhật danh mục
          fetch(`http://localhost:8080/api/v1/users/user/info-update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              token: accessToken,
            },
            body: JSON.stringify(updatedDataUser),
          })
            .then(response => response.json())
            .then(updatedCategory => {
              location.reload();
            })
            .catch(error => {
              console.error('Lỗi khi cập nhật danh mục:', error);
            });
        };

        reader.readAsDataURL(file);
      });
    })
    .catch(error => {
      console.error('Lỗi khi tìm kiếm danh mục:', error);
    });
}




// THE LOAI
let addCategoryBtn = document.getElementById('signup-category-button');
let updateCategory = document.getElementById("btn-update-category")

document.querySelector(".modal.signup-category .modal-close").addEventListener("click",() => {
    signUpCategoryFormReset();
})

function openCreateCategory() {
    document.querySelector(".signup-category").classList.add("open");
    document.querySelectorAll(".edit-category-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".add-category-e").forEach(item => {
        item.style.display = "block"
    })
}

function signUpCategoryFormReset() {
    document.getElementById('fullname-category').value = ""
}

function showCategoryArr(arr) {
    let categoryHtml = '';
    if(arr.length == 0) {
      categoryHtml = `<td colspan="5">Không có dữ liệu</td>`
    } else {
        arr.forEach((category, index) => {
  
            categoryHtml += ` <tr>
            <td>${category.id}</td>
            <td><img src="${category.image}" alt="${category.name}" style="width: 150px; height: 150px;"></td>
            <td>${category.name}</td>
            <td class="control control-table">
            <button class="btn-edit" id="edit-category" onclick='editCategory(${category.id})' ><i class="material-symbols-outlined">
            edit_note
            </i></button>
            <button class="btn-delete" id="delete-category" onclick="deleteCategory(${category.id})"><i class="material-symbols-outlined">
            delete
            </i></button>
            </td>
        </tr>`
        })
    }
    document.getElementById('show-category').innerHTML = categoryHtml;
}

function showCategory() {
  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  fetch('http://localhost:8080/api/v1/categories', {
    // SỬ DỤNG PHƯƠNG THỨC GET ĐỂ LẤY SẢN PHẨM
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.content);
    showCategoryArr(data.content);


    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
    
}

window.onload = showCategory();

function deleteCategory(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
      // Lấy token từ localStorage
      const accessToken = localStorage.getItem('accessToken');

      // Kiểm tra xem có token trong localStorage hay không
      if (!accessToken) {
        console.error('Token not found in localStorage');
        return;
      }

      fetch(`http://localhost:8080/api/v1/categories/category/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: accessToken,
        },
      })
        .then(response => response.json())
        .then(data => {
          location.reload();
          // Xử lý kết quả tìm kiếm đơn hàng ở đây
        })
        .catch(error => {
          console.error('Failed to fetch data:', error);
        });
    }
}


function editCategory(id) {
  document.querySelector(".signup-category").classList.add("open");
  document.querySelectorAll(".add-category-e").forEach(item => {
    item.style.display = "none"
  });
  document.querySelectorAll(".edit-category-e").forEach(item => {
    item.style.display = "block"
  });

  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  // Gửi yêu cầu GET để tìm kiếm danh mục bằng ID
  fetch(`http://localhost:8080/api/v1/categories/category/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("fullname-category").value = data.content.name;
      
      const nameInputCategory = document.getElementById('fullname-category');
      const imageInputCategory = document.getElementById('up-hinh-anh-category');

      updateCategory.addEventListener('click', () => {
        const file = imageInputCategory.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const fileContent = e.target.result;


          const updatedDataCategory = {
            name: nameInputCategory.value,
            image: fileContent
          };

          // Gửi yêu cầu PUT để cập nhật danh mục
          fetch(`http://localhost:8080/api/v1/categories/category/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              token: accessToken,
            },
            body: JSON.stringify(updatedDataCategory),
          })
            .then(response => response.json())
            .then(updatedCategory => {
              location.reload();
            })
            .catch(error => {
              console.error('Lỗi khi cập nhật danh mục:', error);
            });
        };

        reader.readAsDataURL(file);
      });
    })
    .catch(error => {
      console.error('Lỗi khi tìm kiếm danh mục:', error);
    });
}


function convertImageToBase64(file, callback) {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    callback(reader.result);
  });

  reader.addEventListener("error", () => {
    console.error("Lỗi khi đọc file.");
    callback(null);
  });

  reader.readAsDataURL(file);
}


function addCategory(event) {
  event.preventDefault();

  const nameInput = document.getElementById('fullname-category');
  const imgInput = document.getElementById('up-hinh-anh-category');
  const file = imgInput.files[0];
    if (!file) {
    console.error('Không có file được chọn.');
    alert('Không có file được chọn, xin hãy chọn file để tiếp tục');
    return;
  }

  convertImageToBase64(file, base64Data => {
    if (!base64Data) {
      console.error('Lỗi khi chuyển đổi hình ảnh.');
      return;
    }

    const newCategory = {
      name: nameInput.value,
      image: base64Data,
    };

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }

    fetch('http://localhost:8080/api/v1/categories/category', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': accessToken,
      },
      body: JSON.stringify(newCategory)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi khi gửi yêu cầu.');
        }
        return response.json();
      })
      .then(data => {
        location.reload();
      })
      .catch(error => {
  console.error('Lỗi khi gửi yêu cầu:', error);
  alert('Thêm sản phẩm thất bại');
      });
});
}
addCategoryBtn.addEventListener('click', addCategory);





// // Khuyến mãi 
let addDiscountBtn = document.getElementById('signup-discount-button');
let updateDiscount = document.getElementById('btn-update-discount');

document.querySelector(".modal.signup-discount .modal-close").addEventListener("click",() => {
    signUpDiscountFormReset();
})

function openCreateDiscount() {
    document.querySelector(".signup-discount").classList.add("open");
    document.querySelectorAll(".edit-discount-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".add-discount-e").forEach(item => {
        item.style.display = "block"
    })
}

function signUpDiscountFormReset() {
    document.getElementById('fullname-km').value = "";
    document.getElementById('value-km').value = "";
    document.getElementById('loai-km').value = "";
    document.getElementById('start-km').value = "";
    document.getElementById('end-km').value = ""
}

function showDiscountArr(arr) {
  let discountHtml = '';
  if (arr.length == 0) {
      discountHtml = `<td colspan="5">Không có dữ liệu</td>`;
  } else {
      arr.forEach((discount, index) => {
          let tinhtrang = discount.status == 0 ? `<span class="status-no-complete">Bị khóa</span>` : `<span class="status-complete">Hoạt động</span>`;
          discountHtml += ` <tr>
          <td>${discount.discount_code}</td>
          <td>${discount.discount_value}</td>
          <td>${discount.type}</td>
          <td>${discount.begin_date}</td>
          <td>${discount.finish_date}</td>
          <td class="control control-table">
          <button class="btn-edit" id="edit-discount" onclick="editDiscount('${discount.discount_code}')"><i class="material-symbols-outlined">
          edit_note
          </i></button>
          <button class="btn-delete" id="delete-discount" onclick="deleteDiscount('${discount.discount_code}')"><i class="material-symbols-outlined">
          delete
          </i></button>
          </td>
      </tr>`;
      });
  }
  document.getElementById('show-discount').innerHTML = discountHtml;
}


function showDiscount() {
  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  fetch('http://localhost:8080/api/v1/discounts/', {
    // SỬ DỤNG PHƯƠNG THỨC GET ĐỂ LẤY SẢN PHẨM
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {
    showDiscountArr(data.content.discountList);
    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
}

window.onload = showDiscount();

function deleteDiscount(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
      // Lấy token từ localStorage
      const accessToken = localStorage.getItem('accessToken');

      // Kiểm tra xem có token trong localStorage hay không
      if (!accessToken) {
        console.error('Token not found in localStorage');
        return;
      }

      fetch(`http://localhost:8080/api/v1/discounts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: accessToken,
        },
      })
        .then(response => response.json())
        .then(data => {
          location.reload();
          // Xử lý kết quả tìm kiếm đơn hàng ở đây
        })
        .catch(error => {
          console.error('Failed to fetch data:', error);
        });
    }
}

function editDiscount(id) {
    document.querySelector(".signup-discount").classList.add("open");
    document.querySelectorAll(".add-discount-e").forEach(item => {
      item.style.display = "none";
  });
  
  document.querySelectorAll(".edit-discount-e").forEach(item => {
      item.style.display = "block";
  });


    const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  // Gửi yêu cầu GET để tìm kiếm danh mục bằng ID
  fetch(`http://localhost:8080/api/v1/discounts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {

      const nameInputDiscount = document.getElementById('fullname-km');
const valueInputDiscount = document.getElementById('value-km');
const typeInputDiscount = document.getElementById('loai-km');
const startInputDiscount = document.getElementById('start-km');
const endInputDiscount = document.getElementById('end-km');

    document.getElementById("fullname-km").value =  data.content.discount.discount_code;
    document.getElementById("value-km").value =  data.content.discount.discount_value;
    document.getElementById("loai-km").value =  data.content.discount.type;
    document.getElementById("start-km").value =  data.content.discount.begin_date;

    document.getElementById("end-km").value =  data.content.discount.finish_date;
    let updateDiscount = document.getElementById('btn-update-discount');
      updateDiscount.addEventListener('click', () => {

        const updatedDataDiscount = {
          discount_code: nameInputDiscount.value,
          discount_value: valueInputDiscount.value,
          type: typeInputDiscount.value,
          begin_date: startInputDiscount.value,
          finish_date: endInputDiscount.value
        };
        // Gửi yêu cầu PUT để cập nhật danh mục
        fetch(`http://localhost:8080/api/v1/discounts/discounts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            token: accessToken,
          },
          body: JSON.stringify(updatedDataDiscount),
        })
          .then(response => response.json())
          .then(updatedCategory => {
            // location.reload();
          })
          .catch(error => {
            console.error('Lỗi khi cập nhật danh mục:', error);
          });
      });
    })
    .catch(error => {
      console.error('Lỗi khi tìm kiếm danh mục:', error);
    });

}


function addDiscount(event) {
  event.preventDefault();

  const nameInputDiscount = document.getElementById('fullname-km');
  const valueInputDiscount = document.getElementById('value-km');
  const typeInputDiscount = document.getElementById('loai-km');
  const startInputDiscount = document.getElementById('start-km');
  const endInputDiscount = document.getElementById('end-km');

  if (nameInputDiscount.value.length == 0) {
    alert('Vui lòng nhập họ và tên');
    nameInputDiscount.focus();
    return; 
  } else if (nameInputDiscount.value.length < 3) {
    nameInputDiscount.value = '';
    alert('Vui lòng nhập họ và tên lớn hơn 3 kí tự');
    return; 
  }


  
    const newDiscount = {
      discount_code: nameInputDiscount.value,
      discount_value: valueInputDiscount.value,
      type: typeInputDiscount.value,
      begin_date: startInputDiscount.value,
      finish_date: endInputDiscount.value
    };

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }

    fetch(' http://localhost:8080/api/v1/discounts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': accessToken,
      },
      body: JSON.stringify(newDiscount)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi khi gửi yêu cầu.');
        }
        return response.json();
      })
      .then(data => {
        location.reload();
      })
      .catch(error => {
      });
};
addDiscountBtn.addEventListener('click', addDiscount);

// PHIEU NHAP 
let addEntryBtn = document.getElementById('signup-entry-button');
let updateEntry = document.getElementById("btn-update-entry")

document.querySelector(".modal.signup-entry .modal-close").addEventListener("click",() => {
    signUpEntryFormReset();
})

function openCreateEntry() {
    document.querySelector(".signup-entry").classList.add("open");
    document.querySelectorAll(".edit-entry-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".add-entry-e").forEach(item => {
        item.style.display = "block"
    })
}

function signUpEntryFormReset() {
    document.getElementById('staff_id').value = "";
    document.getElementById('supplier_id').value = "";
}

let entrySlipDetailsCount = 1;

function addEntrySlipDetailsField(event) {
  event.preventDefault();

  const additionalEntrySlipDetails = document.getElementById('additional_entry_slip_details');

  const newEntrySlipDetails = document.createElement('div');
  newEntrySlipDetails.classList.add('form-group');
  newEntrySlipDetails.innerHTML = `
      <br>
      <div class="form-group">
      <label for="product_id_${entrySlipDetailsCount}">Sản phẩm:</label>
      <select id="product_id_${entrySlipDetailsCount}" name="product_id[]">
        <!-- Thêm các tùy chọn vào đây -->
      </select>
      <span class="form-message"></span>
      </div>

      <label for="entry_slip_details_${entrySlipDetailsCount}" class="form-label">Giá nhập:</label>
      <input type="text" id="entry_slip_details_${entrySlipDetailsCount}" name="entry_slip_details[]" class="form-control">
      
      <label for="quantity_${entrySlipDetailsCount}" class="form-label">Số lượng:</label>
      <input type="text" id="quantity_${entrySlipDetailsCount}" name="quantity[]" class="form-control">

      <span class="form-message"></span>
  `;

  additionalEntrySlipDetails.appendChild(newEntrySlipDetails);

  entrySlipDetailsCount++;

  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }
  
  fetch('http://localhost:8080/api/v1/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    })
    .then(data => {
      const selectElement = newEntrySlipDetails.querySelector('select[name="product_id[]"]');
      
      // Xóa các phần tử cũ trong thẻ <select>
      selectElement.innerHTML = '';
      
      // Tạo các phần tử <option> mới dựa trên dữ liệu danh mục
      data.content.forEach(product => {
        const optionElement = document.createElement('option');
        optionElement.value = product.id;
        optionElement.textContent = product.product_name;
        selectElement.appendChild(optionElement);
      });
    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
}

function getDataStaff() {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  fetch('http://localhost:8080/api/v1/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    })
    .then(data => {
      const selectElement = document.getElementById('staff_id');

      // Xóa các phần tử cũ trong thẻ <select>
      selectElement.innerHTML = '';

      // Tạo các phần tử <option> mới dựa trên dữ liệu danh mục
      data.content.forEach(staff => {
        // Lọc chỉ lấy staff với role_id là 1 hoặc 2
        if (staff.role_id === 1 || staff.role_id === 2) {
          const optionElement = document.createElement('option');
          optionElement.value = staff.id;
          optionElement.textContent = staff.fullname;
          selectElement.appendChild(optionElement);
        }
      });
    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
}
getDataStaff();

function getDataSupplier() {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }
  
  fetch('http://localhost:8080/api/v1/suppliers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    })
    .then(data => {
      const selectElement = document.getElementById('supplier_id');
      
      // Xóa các phần tử cũ trong thẻ <select>
      selectElement.innerHTML = '';
      
      // Tạo các phần tử <option> mới dựa trên dữ liệu danh mục
      data.content.suppliersList.forEach(supplier => {
        const optionElement = document.createElement('option');
        optionElement.value = supplier.name;
        optionElement.textContent = supplier.name;
        selectElement.appendChild(optionElement);
      });
    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
}
getDataSupplier();


function formattedDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

function showEntryArr(arr) {
  let entryHtml = '';
  if (arr.length == 0) {
      entryHtml = `<td colspan="5">Không có dữ liệu</td>`;
  } else {
      arr.forEach((entry, index) => {
          let tinhtrang = entry.status == 0 ? `<span class="status-no-complete">Bị khóa</span>` : `<span class="status-complete">Hoạt động</span>`;
;
          entryHtml += ` <tr>
          <td>${entry.id}</td>
          <td>${entry.staff_id}</td>
          <td>${entry.supplier_name}</td>
          <td>${formattedDate(entry.date_entry)}</td>
          <td>${vnd(entry.total_price)}</td>
          <td class="control control-table">
          <button class="btn-edit" id="edit-entry" onclick='searchDetailEntryByID(${entry.id})' ><i class="material-symbols-outlined">
          edit_note
          </i></button>
          <button class="btn-delete" id="delete-entry" onclick="deleteEntry(${entry.id})"><i class="material-symbols-outlined">
          delete
          </i></button>
          </td>
      </tr>`;
      });
  }
  document.getElementById('show-entry').innerHTML = entryHtml;
}

function showDetailEntryArr(arr) {
  let entryHtml = '';
  if (arr.length == 0) {
      entryHtml = `<td colspan="5">Không có dữ liệu</td>`;
  } else {
      arr.forEach((entry, index) => {
          let tinhtrang = entry.status == 0 ? `<span class="status-no-complete">Bị khóa</span>` : `<span class="status-complete">Hoạt động</span>`;
;
          entryHtml += ` <tr>
          <td>${entry.product_id}</td>
          <td>${entry.entry_price}</td>
          <td>${entry.quantity}</td>
      </tr>`;
      });
  }
  document.getElementById('show-detail-entry').innerHTML = entryHtml;
}

function showEntry() {
  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  fetch('http://localhost:8080/api/v1/entry_slips/', {
    // SỬ DỤNG PHƯƠNG THỨC GET ĐỂ LẤY SẢN PHẨM
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {
    console.log(data.content)
    showEntryArr(data.content);


    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
    
}

window.onload = showEntry();

// function deleteSupplier(id) {
//     if (confirm("Bạn có chắc muốn xóa?")) {
//       // Lấy token từ localStorage
//       const accessToken = localStorage.getItem('accessToken');

//       // Kiểm tra xem có token trong localStorage hay không
//       if (!accessToken) {
//         console.error('Token not found in localStorage');
//         return;
//       }

//       fetch(`http://localhost:8080/api/v1/suppliers/supplier/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           token: accessToken,
//         },
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Xóa thành công');
//           console.log('Kết quả tìm kiếm bằng mã:', data.content.suppliersList);
//           location.reload();
//           // Xử lý kết quả tìm kiếm đơn hàng ở đây
//         })
//         .catch(error => {
//           console.error('Failed to fetch data:', error);
//         });
//     }
// }

function searchDetailEntryByID(id) {
   document.querySelector(".signup-detail-entry").classList.add("open");
   document.querySelectorAll(".add-detail-entry-e").forEach(item => {
     item.style.display = "none"
})
 document.querySelectorAll(".edit-detail-entry-e").forEach(item => {
     item.style.display = "block"
 })

  // Lấy token từ localStorage
  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  fetch(`http://localhost:8080/api/v1/entry_slips/entry_slip_details/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
     showDetailEntryArr(data.content.entrySlipDetails);

    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
}


function addEntry(event) {
  event.preventDefault();

  const staffInputEntry = document.getElementById('staff_id');
  const supplierInputEntry = document.getElementById('supplier_id');

  console.log("staffInputEntry value:", staffInputEntry.value);
  console.log("supplierInputEntry value:", supplierInputEntry.value);

  // Khởi tạo mảng detailEntrySlip rỗng
  const detailEntrySlip = [];

  // Sử dụng vòng lặp forEach để lặp qua các phần tử dựa trên entrySlipDetailsCount
  let totalPrice = 0;

  for (let i = 1; i < entrySlipDetailsCount; i++) {
    // Lấy giá trị của product_id, entry_slip_details và quantity từ các phần tử tương ứng
    const productID = document.getElementById(`product_id_${i}`).value;
    const entryPrice = document.getElementById(`entry_slip_details_${i}`).value;
    const quantity = document.getElementById(`quantity_${i}`).value;
  
    console.log(`product_id_${i} value:`, productID);
    console.log(`entry_slip_details_${i} value:`, entryPrice);
    console.log(`quantity_${i} value:`, quantity);
  
    // Tạo một đối tượng chi tiết phiếu nhập mới với thông tin đã lấy được
    const entryDetail = {
      product_id: productID,
      entry_price: entryPrice,
      quantity: quantity
    };
  
    // Đẩy đối tượng chi tiết phiếu nhập vào mảng detailEntrySlip
    detailEntrySlip.push(entryDetail);
  
    // Tính tổng giá trị
    const parsedEntryPrice = parseFloat(entryPrice);
    const parsedQuantity = parseFloat(quantity);
    const itemTotalPrice = parsedEntryPrice * parsedQuantity;
    totalPrice += itemTotalPrice;
  }
  
  console.log("detailEntrySlip:", detailEntrySlip);
  console.log("totalPrice:", totalPrice);

  const currentDate = new Date();
  const dateEntry = currentDate.toISOString().split('T')[0]; // Lấy ngày tháng năm từ currentDate

  const newEntry = {
    staff_id: staffInputEntry.value,
    date_entry:dateEntry,
    total_price: totalPrice,
    supplier_name: supplierInputEntry.value,
    entry_slip_details: detailEntrySlip // Đưa mảng detailEntrySlip vào trong đối tượng newEntry
  };

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  fetch('http://localhost:8080/api/v1/entry_slips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': accessToken,
    },
    body: JSON.stringify(newEntry)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Lỗi khi gửi yêu cầu.');
      }
      return response.json();
    })
    .then(data => {
      location.reload();
    })
    .catch(error => {
      // Xử lý lỗi nếu có
    });
}

addEntryBtn.addEventListener('click', addEntry);



// // NHÀ CUNG CẤP
let addSupplierBtn = document.getElementById('signup-supplier-button');
let updateSupplier = document.getElementById("btn-update-supplier")

document.querySelector(".modal.signup-supplier .modal-close").addEventListener("click",() => {
    signUpSupplierFormReset();
})

function openCreateSupplier() {
    document.querySelector(".signup-supplier").classList.add("open");
    document.querySelectorAll(".edit-supplier-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".add-supplier-e").forEach(item => {
        item.style.display = "block"
    })
}

function signUpSupplierFormReset() {
    document.getElementById('fullname-ncc').value = "";
    document.getElementById('email-ncc').value = "";
    document.getElementById('sdt-ncc').value = "";
}

function showSupplierArr(arr) {
  let supplierHtml = '';
  if (arr.length == 0) {
      supplierHtml = `<td colspan="5">Không có dữ liệu</td>`;
  } else {
      arr.forEach((supplier, index) => {
          let tinhtrang = supplier.status == 0 ? `<span class="status-no-complete">Bị khóa</span>` : `<span class="status-complete">Hoạt động</span>`;
          supplierHtml += ` <tr>
          <td>${supplier.id}</td>
          <td>${supplier.name}</td>
          <td>${supplier.email}</td>
          <td>${supplier.phone_number}</td>
          <td class="control control-table">
          <button class="btn-edit" id="edit-supplier" onclick='editSupplier(${supplier.id})' ><i class="material-symbols-outlined">
          edit_note
          </i></button>
          <button class="btn-delete" id="delete-supplier" onclick="deleteSupplier(${supplier.id})"><i class="material-symbols-outlined">
          delete
          </i></button>
          </td>
      </tr>`;
      });
  }
  document.getElementById('show-supplier').innerHTML = supplierHtml;
}
function showSupplier() {
  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  fetch('http://localhost:8080/api/v1/suppliers', {
    // SỬ DỤNG PHƯƠNG THỨC GET ĐỂ LẤY SẢN PHẨM
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {

    showSupplierArr(data.content.suppliersList);


    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
    
}

window.onload = showSupplier();

function deleteSupplier(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
      // Lấy token từ localStorage
      const accessToken = localStorage.getItem('accessToken');

      // Kiểm tra xem có token trong localStorage hay không
      if (!accessToken) {
        console.error('Token not found in localStorage');
        return;
      }

      fetch(`http://localhost:8080/api/v1/suppliers/supplier/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: accessToken,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Xóa thành công');
          console.log('Kết quả tìm kiếm bằng mã:', data.content.suppliersList);
          location.reload();
          // Xử lý kết quả tìm kiếm đơn hàng ở đây
        })
        .catch(error => {
          console.error('Failed to fetch data:', error);
        });
    }
}

function editSupplier(id) {
    document.querySelector(".signup-supplier").classList.add("open");
    document.querySelectorAll(".add-supplier-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".edit-supplier-e").forEach(item => {
        item.style.display = "block"
    })

    const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  // Gửi yêu cầu GET để tìm kiếm danh mục bằng ID
  fetch(`http://localhost:8080/api/v1/suppliers/supplier/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {


    document.getElementById("fullname-ncc").value =  data.content.supplier.name;
    const nameInputSupplier = document.getElementById('fullname-ncc');

    document.getElementById("email-ncc").value =  data.content.supplier.email;
    const emailInputSupplier = document.getElementById('email-ncc');
    
    document.getElementById("sdt-ncc").value =  data.content.supplier.phone_number;
    const sdtInputSupplier = document.getElementById('sdt-ncc');

      updateSupplier.addEventListener('click', () => {

        if (nameInputSupplier.value.length == 0) {
          alert('Vui lòng nhập họ và tên');
          nameInputSupplier.focus();
          return; 
          } else if (nameInputSupplier.value.length < 3) {
            nameInputSupplier.value = '';
          alert('Vui lòng nhập họ và tên lớn hơn 3 kí tự');
          return; 
          }

        const updatedDataSupplier = {
          name: nameInputSupplier.value,
          email: emailInputSupplier.value,
          phone_number: sdtInputSupplier.value
        };
        // Gửi yêu cầu PUT để cập nhật danh mục
        fetch(`http://localhost:8080/api/v1/suppliers/supplier/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            token: accessToken,
          },
          body: JSON.stringify(updatedDataSupplier),
        })
          .then(response => response.json())
          .then(updatedCategory => {
            location.reload;
          })
          .catch(error => {
            console.error('Lỗi khi cập nhật danh mục:', error);
          });
      });
    })
    .catch(error => {
      console.error('Lỗi khi tìm kiếm danh mục:', error);
    });

}


function addSupplier(event) {
  event.preventDefault();

  const nameInputSupplier = document.getElementById('fullname-ncc');
  const emailInputSupplier = document.getElementById('email-ncc');
  const sdtInputSupplier = document.getElementById('sdt-ncc');

  if (nameInputSupplier.value.length == 0) {
    alert('Vui lòng nhập họ và tên');
    nameInputSupplier.focus();
    return; 
  } else if (nameInputSupplier.value.length < 3) {
    nameInputSupplier.value = '';
    alert('Vui lòng nhập họ và tên lớn hơn 3 kí tự');
    return; 
  }

  if (emailInputSupplier.value.length == 0) {
    alert('Vui lòng nhập họ và tên');
    emailInputSupplier.focus();
    return; 
  } else if (emailInputSupplier.value.length < 3) {
    emailInputSupplier.value = '';
    alert('Vui lòng nhập họ và tên lớn hơn 3 kí tự');
    return; 
  }

  if (sdtInputSupplier.value.length == 0) {
    alert('Vui lòng nhập họ và tên');
    sdtInputSupplier.focus();
    return; 
  } else if (sdtInputSupplier.value.length < 3) {
    sdtInputSupplier.value = '';
    alert('Vui lòng nhập họ và tên lớn hơn 3 kí tự');
    return; 
  }
  
    const newSupplier = {
      name: nameInputSupplier.value,
      email: emailInputSupplier.value,
      phone_number:sdtInputSupplier.value
    };

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }

    fetch('http://localhost:8080/api/v1/suppliers/supplier', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': accessToken,
      },
      body: JSON.stringify(newSupplier)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi khi gửi yêu cầu.');
        }
        return response.json();
      })
      .then(data => {
        location.reload();
      })
      .catch(error => {
      });
};
addSupplierBtn.addEventListener('click', addSupplier);


// // NHÀ XUẤT BẢN
let addPublisherBtn = document.getElementById('signup-publisher-button');
let updatePublisher = document.getElementById("btn-update-publisher")

document.querySelector(".modal.signup-publisher .modal-close").addEventListener("click",() => {
    signUpPublisherFormReset();
})

function openCreatePublisher() {
    document.querySelector(".signup-publisher").classList.add("open");
    document.querySelectorAll(".edit-publisher-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".add-publisher-e").forEach(item => {
        item.style.display = "block"
    })
}

function signUpPublisherFormReset() {
    document.getElementById('fullname-nxb').value = ""
}

function showPublisherArr(arr) {
    let publisherHtml = '';
    if(arr.length == 0) {
      publisherHtml = `<td colspan="5">Không có dữ liệu</td>`
    } else {
        arr.forEach((publisher, index) => {
            let tinhtrang = publisher.status == 0 ? `<span class="status-no-complete">Bị khóa</span>` : `<span class="status-complete">Hoạt động</span>`;
            publisherHtml += ` <tr>
            <td>${publisher.id}</td>
            <td>${publisher.name}</td>
            <td class="control control-table">
            <button class="btn-edit" id="edit-publisher" onclick='editPublisher(${publisher.id})' ><i class="material-symbols-outlined">
            edit_note
            </i></button>
            <button class="btn-delete" id="delete-publisher" onclick="deletePublisher(${publisher.id})"><i class="material-symbols-outlined">
            delete
            </i></button>
            </td>
        </tr>`
        })
    }
    document.getElementById('show-publisher').innerHTML = publisherHtml;
}

function showPublisher() {
  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  fetch('http://localhost:8080/api/v1/publishers/', {
    // SỬ DỤNG PHƯƠNG THỨC GET ĐỂ LẤY SẢN PHẨM
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {

    showPublisherArr(data.content);


    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
    
}

window.onload = showPublisher();

function deletePublisher(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
      // Lấy token từ localStorage
      const accessToken = localStorage.getItem('accessToken');

      // Kiểm tra xem có token trong localStorage hay không
      if (!accessToken) {
        console.error('Token not found in localStorage');
        return;
      }

      fetch(`http://localhost:8080/api/v1/publishers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: accessToken,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Xóa thành công');
          console.log('Kết quả tìm kiếm bằng mã:', data.content);
          location.reload();
          // Xử lý kết quả tìm kiếm đơn hàng ở đây
        })
        .catch(error => {
          console.error('Failed to fetch data:', error);
        });
    }
}

function editPublisher(id) {
    document.querySelector(".signup-publisher").classList.add("open");
    document.querySelectorAll(".add-publisher-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".edit-publisher-e").forEach(item => {
        item.style.display = "block"
    })
    
    const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  // Gửi yêu cầu GET để tìm kiếm danh mục bằng ID
  fetch(`http://localhost:8080/api/v1/publishers/publisher/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {

      document.getElementById("fullname-nxb").value =  data.content.name;
      const nameInputPublisher = document.getElementById('fullname-nxb');

      updatePublisher.addEventListener('click', () => {

        if (nameInputPublisher.value.length == 0) {
          alert('Vui lòng nhập họ và tên');
          nameInputPublisher.focus();
          return; 
          } else if (nameInputPublisher.value.length < 3) {
            nameInputPublisher.value = '';
          alert('Vui lòng nhập họ và tên lớn hơn 3 kí tự');
          return; 
          }

        const updatedDataPublisher = {
          name: nameInputPublisher.value,
        };
        // Gửi yêu cầu PUT để cập nhật danh mục
        fetch(`http://localhost:8080/api/v1/publishers/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            token: accessToken,
          },
          body: JSON.stringify(updatedDataPublisher),
        })
          .then(response => response.json())
          .then(updatedCategory => {
            location.reload;
          })
          .catch(error => {
            console.error('Lỗi khi cập nhật danh mục:', error);
          });
      });
    })
    .catch(error => {
      console.error('Lỗi khi tìm kiếm danh mục:', error);
    });

}


function addPublisher(event) {
  event.preventDefault();

  const nameInput = document.getElementById('fullname-nxb');
  if (nameInput.value.length == 0) {
    alert('Vui lòng nhập họ và tên');
    nameInput.focus();
    return; 
  } else if (nameInput.value.length < 3) {
    nameInput.value = '';
    alert('Vui lòng nhập họ và tên lớn hơn 3 kí tự');
    return; 
  }
  
    const newPublisher = {
      name: nameInput.value,
    };

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }

    fetch('http://localhost:8080/api/v1/publishers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': accessToken,
      },
      body: JSON.stringify(newPublisher)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi khi gửi yêu cầu.');
        }
        return response.json();
      })
      .then(data => {
        location.reload();
      })
      .catch(error => {
      });
};
addPublisherBtn.addEventListener('click', addPublisher);




// TAC GIA
let addAuthorBtn = document.getElementById('signup-author-button');
let updateAuthor = document.getElementById("btn-update-author")

document.querySelector(".modal.signup-author .modal-close").addEventListener("click",() => {
    signUpAuthorFormReset();
})

function openCreateAuthor() {
    document.querySelector(".signup-author").classList.add("open");
    document.querySelectorAll(".edit-author-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".add-author-e").forEach(item => {
        item.style.display = "block"
    })
}

function signUpAuthorFormReset() {
    document.getElementById('fullname').value = ""
}

function showAuthorArr(arr) {
    let authorHtml = '';
    if(arr.length == 0) {
        authorHtml = `<td colspan="5">Không có dữ liệu</td>`
    } else {
        arr.forEach((author, index) => {
            let tinhtrang = author.status == 0 ? `<span class="status-no-complete">Bị khóa</span>` : `<span class="status-complete">Hoạt động</span>`;
            authorHtml += ` <tr>
            <td>${author.id}</td>
            <td>${author.name}</td>
            <td class="control control-table">
            <button class="btn-edit" id="edit-author" onclick='editAuthor(${author.id})' ><i class="material-symbols-outlined">
            edit_note
            </i></button>
            <button class="btn-delete" id="delete-author" onclick="deleteAuthor(${author.id})"><i class="material-symbols-outlined">
            delete
            </i></button>
            </td>
        </tr>`
        })
    }
    document.getElementById('show-author').innerHTML = authorHtml;
}

function showAuthor() {
  const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  fetch('http://localhost:8080/api/v1/authors', {
    // SỬ DỤNG PHƯƠNG THỨC GET ĐỂ LẤY SẢN PHẨM
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {

    showAuthorArr(data.content);


    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
    
}

window.onload = showAuthor();

function deleteAuthor(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
      // Lấy token từ localStorage
      const accessToken = localStorage.getItem('accessToken');

      // Kiểm tra xem có token trong localStorage hay không
      if (!accessToken) {
        console.error('Token not found in localStorage');
        return;
      }

      fetch(`http://localhost:8080/api/v1/authors/author/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: accessToken,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Xóa thành công');
          console.log('Kết quả tìm kiếm bằng mã:', data.content);
          location.reload();
          // Xử lý kết quả tìm kiếm đơn hàng ở đây
        })
        .catch(error => {
          console.error('Failed to fetch data:', error);
        });
    }
}

let indexFlag;
function editAuthor(id) {
    document.querySelector(".signup-author").classList.add("open");
    document.querySelectorAll(".add-author-e").forEach(item => {
        item.style.display = "none"
    })
    document.querySelectorAll(".edit-author-e").forEach(item => {
        item.style.display = "block"
    })
    
    const accessToken = localStorage.getItem('accessToken');

  // Kiểm tra xem có token trong localStorage hay không
  if (!accessToken) {
    console.error('Token not found in localStorage');
    return;
  }

  // Gửi yêu cầu GET để tìm kiếm danh mục bằng ID
  fetch(`http://localhost:8080/api/v1/authors/author/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: accessToken,
    },
  })
    .then(response => response.json())
    .then(data => {

      document.getElementById("fullname").value =  data.content.name;
      const nameInput = document.getElementById('fullname');

      updateAuthor.addEventListener('click', () => {

        if (nameInput.value.length == 0) {
          alert('Vui lòng nhập họ và tên');
          nameInput.focus();
          return; 
          } else if (nameInput.value.length < 3) {
         nameInput.value = '';
          alert('Vui lòng nhập họ và tên lớn hơn 3 kí tự');
          return; 
          }

        const updatedData = {
          name: nameInput.value,
        };
        // Gửi yêu cầu PUT để cập nhật danh mục
        fetch(`http://localhost:8080/api/v1/authors/author/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            token: accessToken,
          },
          body: JSON.stringify(updatedData),
        })
          .then(response => response.json())
          .then(updatedCategory => {
            location.reload;
          })
          .catch(error => {
            console.error('Lỗi khi cập nhật danh mục:', error);
          });
      });
    })
    .catch(error => {
      console.error('Lỗi khi tìm kiếm danh mục:', error);
    });

}


function addAuthor(event) {
  event.preventDefault();

  const nameInput = document.getElementById('fullname');
  if (nameInput.value.length == 0) {
    alert('Vui lòng nhập họ và tên');
    nameInput.focus();
    return; 
  } else if (nameInput.value.length < 3) {
    nameInput.value = '';
    alert('Vui lòng nhập họ và tên lớn hơn 3 kí tự');
    return; 
  }
  
    const newAuthor = {
      name: nameInput.value,
    };

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Token not found in localStorage');
      return;
    }

    fetch('http://localhost:8080/api/v1/authors/author', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': accessToken,
      },
      body: JSON.stringify(newAuthor)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi khi gửi yêu cầu.');
        }
        return response.json();
      })
      .then(data => {
        location.reload();
      })
      .catch(error => {
      });
};


addAuthorBtn.addEventListener('click', addAuthor);


document.getElementById("logout-acc").addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem("currentuser");
    window.location = "/";
})


