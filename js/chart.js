// Tạo biểu đồ với dữ liệu rỗng
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'polarArea',
  data: {
    labels: [],
    datasets: [{
      label: 'Số lượng',
      data: [],
      backgroundColor: [
        'rgba(255, 0, 0, 0.5)',
        'rgba(0, 0, 255, 0.5)',
        'rgba(255, 165, 0, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 106, 0, 0.5)'
      ],
      borderColor: [
        'rgba(255, 0, 0)',
        'rgba(0, 0, 255)',
        'rgba(255, 165, 0)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 106, 0, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true
  }
});

function updateChart() {
  let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
  let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : [];

  // Tạo một đối tượng để lưu trữ số lượng sản phẩm theo category
  let categoryCounts = {};

  // Tính tổng số lượng sản phẩm bán ra theo từng danh mục
  orderDetails.forEach(function(item) {
    let product = products.find(function(prod) {
      return prod.id === item.id;
    });
    if (product) {
      let category = product.category;
      if (categoryCounts[category] === undefined) {
        categoryCounts[category] = 0;
      }
      categoryCounts[category] += item.soluong;
    }
  });

  // Cập nhật dữ liệu và nhãn cho biểu đồ
  myChart.data.labels = Object.keys(categoryCounts);
  myChart.data.datasets[0].data = Object.values(categoryCounts);

  // Cập nhật biểu đồ
  myChart.update();
}

// Gọi hàm updateChart() để tính tổng số lượng sản phẩm bán ra theo danh mục và cập nhật biểu đồ
updateChart();



// Cập nhật dữ liệu vào biểu đồ

// Retrieve the revenue data for each month
// function createObj1() {
//   let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
//   let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []; 
//   let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : []; 
//   let result = [];
  
//   // Group order details by month
//   const orderDetailsByMonth = {};
//   orderDetails.forEach(item => {
//       const order = orders.find(order => order.id === item.madon);
//       const orderDate = new Date(order.thoigiandat);
//       const month = orderDate.getMonth();
//       const year = orderDate.getFullYear();
//       const key = `${month}-${year}`;
      
//       if (!orderDetailsByMonth[key]) {
//           orderDetailsByMonth[key] = [];
//       }
      
//       orderDetailsByMonth[key].push(item);
//   });
  
//   // Calculate total revenue for each month
//   for (const key in orderDetailsByMonth) {
//       const monthYear = key.split('-');
//       const monthIndex = parseInt(monthYear[0]);
//       const year = parseInt(monthYear[1]);
//       const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'long' });
//       const monthData = orderDetailsByMonth[key];
//       let revenue = 0;
      
//       monthData.forEach(item => {
//           const prod = products.find(product => product.id === item.id);
//           revenue += item.price * item.soluong;
//       });
      
//       result.push({
//           month: monthName,
//           year: year,
//           revenue: revenue
//       });
//   }
  
//   return result;
// }


// // Retrieve the revenue data for each week
// function createObj1() {
//   let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
//   let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []; 
//   let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : []; 
//   let result = [];
  
//   // Group order details by week
//   const orderDetailsByWeek = {};
//   orderDetails.forEach(item => {
//       const order = orders.find(order => order.id === item.madon);
//       const orderDate = new Date(order.thoigiandat);
//       const weekStart = new Date(2023, 10, 18); // Start date of the week (18/11/2023)
//       const timeDiff = Math.abs(orderDate.getTime() - weekStart.getTime());
//       const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
//       const weekNumber = Math.ceil(diffDays / 7);
//       const key = `Week ${weekNumber}`;
      
//       if (!orderDetailsByWeek[key]) {
//           orderDetailsByWeek[key] = [];
//       }
      
//       orderDetailsByWeek[key].push(item);
//   });
  
//   // Calculate total revenue for each week
//   for (const key in orderDetailsByWeek) {
//       const weekData = orderDetailsByWeek[key];
//       let revenue = 0;
      
//       weekData.forEach(item => {
//           const prod = products.find(product => product.id === item.id);
//           revenue += item.price * item.soluong;
//       });
      
//       result.push({
//           week: key,
//           revenue: revenue
//       });
//   }
  
//   return result;
// }

// Chart initialization
var ctx = document.getElementById('myChart2').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line', // Change the chart type to line for date-based data
  data: {
      labels: [], // Will be updated dynamically
      datasets: [{
          label: 'Profit',
          data: [], // Will be updated dynamically
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
      }]
  },
  options: {
      responsive: true
  }
});
// Retrieve the revenue data for each day
function createObj1() {
  let orders = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : [];
  let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []; 
  let orderDetails = localStorage.getItem("orderDetails") ? JSON.parse(localStorage.getItem("orderDetails")) : []; 
  let result = [];
  
  // Group order details by day
  const orderDetailsByDay = {};
  orderDetails.forEach(item => {
      const order = orders.find(order => order.id === item.madon);
      const orderDate = new Date(order.thoigiandat).toLocaleDateString(); // Convert to localized date string
      const key = orderDate;
      
      if (!orderDetailsByDay[key]) {
          orderDetailsByDay[key] = [];
      }
      
      orderDetailsByDay[key].push(item);
  });
  
  // Calculate total revenue for each day
  for (const key in orderDetailsByDay) {
      const dayData = orderDetailsByDay[key];
      let revenue = 0;
      
      dayData.forEach(item => {
          const prod = products.find(product => product.id === item.id);
          revenue += item.price * item.soluong;
      });
      
      result.push({
          day: key,
          revenue: revenue
      });
  }
  
  return result;
}

// Update the chart with revenue data
function updateChartWithRevenueData() {
  // Retrieve the revenue data for each day
  const data = createObj1();

  // Sort the data array by day in ascending order
  data.sort((a, b) => {
    const dateA = new Date(a.day);
    const dateB = new Date(b.day);
    return dateA - dateB;
  });

  // Extract the revenue values and day labels from the data array
  const revenueData = data.map(item => item.revenue);
  const dayLabels = data.map(item => item.day);

  // Update the chart data with the revenue values and day labels
  myChart.data.datasets[0].data = revenueData;
  myChart.data.labels = dayLabels;

  // Update the chart
  myChart.update();
}

// Update the chart with revenue data
updateChartWithRevenueData();




var ctx = document.getElementById('myChart1').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
        {
            label: 'Online',
            data: [],
            fill: false,
            borderColor: '#27ae60',
            tension: 0.1,
         }
        //,{
        //     label: 'Lock',
        //     data: [],
        //     fill: false,
        //     borderColor: 'rgb(226, 127, 35)',
        //     tension: 0.1,
        // }
      ]    
    }
});


// Lấy dữ liệu từ localStorage
const storedData = localStorage.getItem('accounts');
const accounts = JSON.parse(storedData);

// Tạo mảng chứa số lượng tài khoản hoạt động và bị khóa theo từng ngày
const accountData = {
  labels: [],
  onlineData: [],
  lockData: []
};

// Lấy tối đa 7 ngày gần nhất
const currentDate = new Date();
for (let i = 6; i >= 0; i--) {
  const date = new Date(currentDate);
  date.setDate(date.getDate() - i);
  const label = date.toLocaleDateString();
  accountData.labels.push(label);
  accountData.onlineData.push(0);
  accountData.lockData.push(0);
}

// Lặp qua danh sách tài khoản và cập nhật dữ liệu
accounts.forEach((account) => {
  const joinDate = new Date(account.join).toLocaleDateString();
  const index = accountData.labels.indexOf(joinDate);
  
  if (index !== -1) {
    if (account.status === 0) {
      accountData.lockData[index]++;
    } else {
      accountData.onlineData[index]++;
    }
  }
});

myChart.data.labels = accountData.labels;
myChart.data.datasets[0].data = accountData.onlineData;
myChart.data.datasets[0].label = 'Online';
myChart.data.datasets[0].borderColor = '#27ae60';

// myChart.data.datasets[1].data = accountData.lockData;
// myChart.data.datasets[1].label = 'Lock';
// myChart.data.datasets[1].borderColor = 'rgb(226, 127, 35)';

myChart.update();


