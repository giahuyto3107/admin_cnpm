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
        sidebars.classList.add("open");
    })
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
// Xóa sản phẩm 
function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    let index = products.findIndex(item => {
        return item.id == id;
    })
    if (confirm("Bạn có chắc muốn xóa?") == true) {
        products[index].status = 0;
        toast({ title: 'Success', message: 'Xóa sản phẩm thành công !', type: 'success', duration: 3000 });
    }
    localStorage.setItem("products", JSON.stringify(products));
    showProduct();
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
        data.content.forEach(discount => {
          const optionElement = document.createElement('option');
          optionElement.value = discount.id;
          optionElement.textContent = discount.name;
          selectElement.appendChild(optionElement);
        });
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }
getDataDiscount();
var indexCur;
function editProduct(id) {
    let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    let index = products.findIndex(item => {
        return item.id == id;
    })
    indexCur = index;
    document.querySelectorAll(".add-product-e").forEach(item => {
        item.style.display = "none";
    })
    document.querySelectorAll(".edit-product-e").forEach(item => {
        item.style.display = "block";
    })
    document.querySelector(".add-product").classList.add("open");
    //
    document.querySelector(".upload-image-preview").src = products[index].img;
    document.getElementById("ten-mon").value = products[index].title;
    document.getElementById("gia-moi").value = products[index].price;
    document.getElementById("mo-ta").value = products[index].desc;
    document.getElementById("chon-mon").value = products[index].category;
}

function getPathImage(path) {
    let patharr = path.split("/");
    return "/img/" + patharr[patharr.length - 1];
}

let btnUpdateProductIn = document.getElementById("update-product-button");
btnUpdateProductIn.addEventListener("click", (e) => {
    e.preventDefault();
    let products = JSON.parse(localStorage.getItem("products"));
    let idProduct = products[indexCur].id;
    let imgProduct = products[indexCur].img;
    let titleProduct = products[indexCur].title;
    let curProduct = products[indexCur].price;
    let descProduct = products[indexCur].desc;
    let categoryProduct = products[indexCur].category;
    let imgProductCur = getPathImage(document.querySelector(".upload-image-preview").src)
    let titleProductCur = document.getElementById("ten-mon").value;
    let curProductCur = document.getElementById("gia-moi").value;
    let descProductCur = document.getElementById("mo-ta").value;
    let categoryText = document.getElementById("chon-mon").value;

    if (imgProductCur != imgProduct || titleProductCur != titleProduct || curProductCur != curProduct || descProductCur != descProduct || categoryText != categoryProduct) {
        let productadd = {
            id: idProduct,
            title: titleProductCur,
            img: imgProductCur,
            category: categoryText,
            price: parseInt(curProductCur),
            desc: descProductCur,
            status: 1,
        };
        products.splice(indexCur, 1);
        products.splice(indexCur, 0, productadd);
        localStorage.setItem("products", JSON.stringify(products));
        toast({ title: "Success", message: "Sửa sản phẩm thành công!", type: "success", duration: 3000, });
        setDefaultValue();
        document.querySelector(".add-product").classList.remove("open");
        showProduct();
    } else {
        toast({ title: "Warning", message: "Sản phẩm của bạn không thay đổi!", type: "warning", duration: 3000, });
    }
});

let btnAddProductIn = document.getElementById("add-product-button");
btnAddProductIn.addEventListener("click", (e) => {
    e.preventDefault();
    let imgProduct = getPathImage(document.querySelector(".upload-image-preview").src)
    let tenMon = document.getElementById("ten-mon").value;
    let price = document.getElementById("gia-moi").value;
    let moTa = document.getElementById("mo-ta").value;
    let categoryText = document.getElementById("chon-mon").value;
    if(tenMon == "" || price == "" || moTa == "") {
        toast({ title: "Chú ý", message: "Vui lòng nhập đầy đủ thông tin sản phẩm!", type: "warning", duration: 3000, });
    } else {
        if(isNaN(price)) {
            toast({ title: "Chú ý", message: "Giá phải ở dạng số!", type: "warning", duration: 3000, });
        } else {
            let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
            let product = {
                id: createId(products),
                title: tenMon,
                img: imgProduct,
                category: categoryText,
                price: price,
                desc: moTa,
                status:1
            };
            products.unshift(product);
            localStorage.setItem("products", JSON.stringify(products));
            showProduct();
            document.querySelector(".add-product").classList.remove("open");
            toast({ title: "Success", message: "Thêm sản phẩm thành công!", type: "success", duration: 3000});
            setDefaultValue();
        }
    }
});

document.querySelector(".modal-close.product-form").addEventListener("click",() => {
    setDefaultValue();
})

function setDefaultValue() {
    document.querySelector(".upload-image-preview").src = "/pic/add-img.png";
    document.getElementById("ten-mon").value = "";
    document.getElementById("gia-moi").value = "";
    document.getElementById("mo-ta").value = "";
    document.getElementById("chon-mon").value = "Nike";
}

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

// On change Image
function uploadImage(el) {
    let path = "/img/" + el.value.split("\\")[2];
    document.querySelector(".upload-image-preview").setAttribute("src", path);
}


// Đổi trạng thái đơn hàng
function changeStatus(id, el) {
    let orders = JSON.parse(localStorage.getItem("order"));
    let order = orders.find((item) => {
        return item.id == id;
    });
    order.trangthai = 1;
    el.classList.remove("btn-chuaxuly");
    el.classList.add("btn-daxuly");
    el.innerHTML = "Đã xử lý";
    localStorage.setItem("order", JSON.stringify(orders));
    findOrder(orders);
}

// Format Date
function formatDate(date) {
    let fm = new Date(date);
    let yyyy = fm.getFullYear();
    let mm = fm.getMonth() + 1;
    let dd = fm.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + "/" + mm + "/" + yyyy;
}

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

// User
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
    // document.getElementById('phone').value = ""
    // document.getElementById('password').value = ""
    // document.querySelector('.form-message-name').innerHTML = '';
    // document.querySelector('.form-message-phone').innerHTML = '';
    // document.querySelector('.form-message-password').innerHTML = '';
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


