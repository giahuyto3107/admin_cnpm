"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "KHOA HỌC VỀ LỐI SỐNG",
          publisher_id: 2,
          // publisher: "NXB Nhã Nam",
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/khoahocveloisonge1702267101454.jpg?v=1705552510080",
          price: 320000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "BẬT MÍ BÍ MẬT VỀ… CƠ THỂ NGƯỜI",
          publisher_id: 2,
          // publisher: "NXB Nhã Nam",
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/batmibimatvecothenguoie1701225.jpg?v=1705552511220",
          price: 75000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "BẬT MÍ BÍ MẬT VỀ… VŨ TRỤ",
          publisher_id: 2,
          // publisher: "NXB Nhã Nam",
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/batmibimatvevutrue170122513045.jpg?v=1705552511303",
          price: 75000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "BẬT MÍ BÍ MẬT VỀ… ĐỘNG VẬT",
          publisher_id: 2,
          // publisher: "NXB Nhã Nam",
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/batmibimatvedongvate1701225118.jpg?v=1705552511390",
          price: 75000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "TIỀN BẨN VÀ NGỤY KHOA HỌC",
          publisher_id: 2,
          // publisher: "NXB Nhã Nam",
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/tienbane1700643281311.jpg?v=1705552511563",
          price: 209000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "XẾP HÌNH - SỰ KẾT ĐÔI THÚ VỊ GIỮA KHOA HỌC VÀ TÌNH DỤC",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/bonke1700191475292.jpg?v=1705552511960",
          price: 188000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "MỞ KHÓA VŨ TRỤ",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/mokhoavutrue1699525544285.jpg?v=1705552512620",
          price: 225000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "ĐỢT TUYỆT CHỦNG THỨ SÁU",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/dottuyetchungthu602.jpg?v=1705552512930",
          price: 129000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "CÙNG EM LÀM THÍ NGHIỆM KHOA HỌC - BÍ MẬT CỦA TRÁI ĐẤT",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/cungemlamthinghiemkhoahocbimat-33ce6194-47b0-4ebb-ae78-e90c07a05271.jpg?v=1705552538343",
          price: 99000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "CÙNG EM LÀM THÍ NGHIỆM KHOA HỌC - BÍ MẬT CỦA NƯỚC",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/cungemlamthinghiemkhoahocbimat-7002e81c-fb33-4b53-9fe5-c3548e3a9952.jpg?v=1705552538440",
          price: 99000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "LÍNH TRƠN - KHOA HỌC LẠ KỲ VỀ LOÀI NGƯỜI TRONG CHIẾN TRANH",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/linhtron02.jpg?v=1705552552157",
          price: 145000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "KHOA HỌC CHẲNG KHÓ - THEO ĐÀN CHIM DI TRÚ",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/theodanchimditru01.jpg?v=1705552554740",
          price: 45000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "CÙNG EM LÀM THÍ NGHIỆM KHOA HỌC - BÍ MẬT CỦA KHÔNG KHÍ",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/cungemlamthinghiemkhoahocbimat.jpg?v=1705552561820",
          price: 99000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "CHÓ VÀ MÈO DƯỚI LĂNG KÍNH KHOA HỌC",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/chovameoduoilangkinhkhoahoc01.jpg?v=1705552563317",
          price: 125000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "KHOA HỌC VỀ YOGA",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/khoahocveyoga04.jpg?v=1705552579253",
          price: 300000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "BỘ COOL SERIES - KHOA HỌC CỰC NGẦU",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/khoahoccucngau01.jpg?v=1705552587717",
          price: 89000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "BÁCH KHOA THƯ KHOA HỌC",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/bachkhoathukhoahoccover01.jpg?v=1705552590093",
          price: 359000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "KHOA HỌC VỀ NẤU ĂN",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/khoahocvenauanthescienceofcook.jpg?v=1696926511830",
          price: 350000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "KHOA HỌC KHẮP QUANH TA - THẾ GIỚI KỲ DIỆU",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/khoahockhapquanhtathegioikydie.jpg?v=1696926510470",
          price: 52000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "KHOA HỌC KHẮP QUANH TA - SIÊU GIÁC QUAN",
          // publisher: "NXB Nhã Nam"
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/khoahockhapquanhtasieugiacquan.jpg?v=1696926508977",
          price: 52000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "TỰ DO KHÔNG YÊU ĐƯƠNG",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/tudokhongyeuduong01e1702354592.jpg?v=1705552509630",
          price: 169000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "ĐỪNG THÁCH THỨC NHÂN TÍNH",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/dungthachthucnhantinhe17017442.jpg?v=1705552511057",
          price: 196000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "NÓI LUÔN CHO NÓ VUÔNG",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/noiluonchonovuong01-c056e832-71a2-4e89-a8a6-e7668b7c96fd.jpg?v=1705552511803",
          price: 108000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "TRẮC ẨN VỚI CHÍNH MÌNH",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/trac-an-voi-chinh-minh-01-e1706760468739.jpg?v=1706760478333",
          price: 158000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "CON NGƯỜI VÀ BIỂU TƯỢNG",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/connguoivabieutuongscaled.jpg?v=1696822770503",
          price: 450000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "DÁM SỐNG HƯỚNG NỘI VÀ CỰC KỲ NHẠY CẢM",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/damsonghuongnoivacuckynhaycam0.jpg?v=1696580408357",
          price: 99000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "TỚ ĐÃ TỪNG SỢ HÃI - LỜI KHUYÊN TỪ CHUYÊN GIA TÂM LÝ NỔI TIẾNG",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/todatungsohai01.jpg?v=1696565468437",
          price: 75000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "NGHIÊN CỨU PHÂN TÂM HỌC",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/nghiencuuphantamhocbia.jpg?v=1696477709100",
          price: 135000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "TƯ DUY NHƯ NHÀ TÂM LÝ HỌC",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/tuduynhunhatamlyhoc01.jpg?v=1705552104380",
          price: 139000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "CON QUÁI VẬT TRONG TÂM TRÍ – NHỮNG CA BỆNH TÂM LÝ OÁI OĂM",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/conquaivattrongtamtri01.jpg?v=1705552117193",
          price: 148000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "LÝ DO ĐỂ SỐNG TIẾP",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/ly-do-de-song-tiep-01.jpg?v=1694073355740",
          price: 115000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "XA MỘT CHÚT HƠN MỘT TRIỆU NĂM ÁNH SÁNG",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/xamotchute1700643306713.jpg?v=1705552511477",
          price: 155000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "GIA TỘC THẦN BÍ",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/full3giatocthanbi22e1697690185.jpg?v=1705552560057",
          price: 140000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "NHẮN GỬI TẤT CẢ CÁC EM, NHỮNG NGƯỜI TÔI ĐÃ YÊU",
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/nhanguitatcacacembiaaoe1697444.jpg?v=1705552576247",
          price: 128000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          name: "NHẮN GỬI MỘT TÔI, NGƯỜI ĐÃ YÊU EM",
          publisher_id: 2,
          // publisher: "NXB Nhã Nam",
          publisher_id: 2,
          image:
            "https://bizweb.dktcdn.net/100/363/455/products/nhanguimottoinguoidayeuem03.jpg?v=1705552576333",
          price: 128000,
          discount: 15,
          quantity: 100,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("products", null, {});
  },
};
