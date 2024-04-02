const { Product, sequelize } = require("../models");

// Lấy tất cả sản phẩm
const getAllProductsServices = async (keyword = null) => {
  try {
    let query = `
      SELECT 
        products.id,
        products.name as product_name, 
        publishers.name as publisher_name, 
        products.image,
        products.price,
        products.discount,
        products.quantity,
        products.createdAt,
        products.updatedAt,
        (
          SELECT GROUP_CONCAT(category_id)
          FROM product_categories
          WHERE product_categories.product_id = products.id
        ) AS category_ids,
        (
          SELECT GROUP_CONCAT(author_id)
          FROM product_authors
          WHERE product_authors.product_id = products.id
        ) AS author_ids
      FROM 
        products 
      LEFT JOIN 
        product_categories ON products.id = product_categories.product_id
      LEFT JOIN
        product_authors ON products.id = product_authors.product_id
      INNER JOIN
        publishers ON products.publisher_id = publishers.id
      `;

    if (keyword) {
      query += ` WHERE products.name LIKE '%${keyword}%' `;
    }

    query += `
      GROUP BY 
        products.id, 
        product_name,
        publisher_name,
        products.image, 
        products.price, 
        products.discount, 
        products.quantity, 
        products.createdAt, 
        products.updatedAt
      LIMIT 200;
    `;

    const [products] = await sequelize.query(query);
    for (const product of products) {
      // Chuyển đổi category_ids từ chuỗi thành mảng
      if (product.category_ids !== null) {
        product.category_ids = product.category_ids
          .split(",")
          .map((id) => parseInt(id.trim()));
      } else {
        product.category_ids = [];
      }

      // Chuyển đổi author_ids từ chuỗi thành mảng
      if (product.author_ids !== null) {
        product.author_ids = product.author_ids
          .split(",")
          .map((id) => parseInt(id.trim()));
      } else {
        product.author_ids = [];
      }

      const soldQuantity = await getSoldQuantityProductByIdServices(product.id);
      product.sold_quantity = soldQuantity;
    }

    return { success: true, code: 200, content: products };
  } catch (error) {
    throw error;
  }
};

// Lấy chi tiết một sản phẩm
const getDetailProductByIdServices = async (id) => {
  try {
    const [product] = await sequelize.query(`
      SELECT 
        products.id,
        products.name product_name, 
        publishers.name publisher_name, 
        products.image,
        products.price,
        products.discount,
        products.quantity,
        products.createdAt,
        products.updatedAt,
        (
          SELECT GROUP_CONCAT(category_id)
          FROM product_categories
          WHERE product_categories.product_id = products.id
        ) AS category_ids,
        (
          SELECT GROUP_CONCAT(author_id)
          FROM product_authors
          WHERE product_authors.product_id = products.id
        ) AS author_ids
      FROM 
        products 
      LEFT JOIN 
        product_categories ON products.id = product_categories.product_id
      LEFT JOIN
        product_authors ON products.id = product_authors.product_id
      INNER JOIN
        publishers ON products.publisher_id = publishers.id
      WHERE products.id = ${id}
      GROUP BY 
        products.id, 
        product_name, 
        publisher_name, 
        products.image, 
        products.price, 
        products.discount, 
        products.quantity, 
        products.createdAt, 
        products.updatedAt
      LIMIT 1;
      `);

    if (product.length === 0) {
      return {
        success: false,
        code: 404,
        content: { message: "Không tìm thấy sản phẩm này" },
      };
    }

    // Chuyển đổi category_ids từ chuỗi thành mảng
    if (product[0].category_ids !== null) {
      product[0].category_ids = product[0].category_ids
        .split(",")
        .map((id) => parseInt(id.trim()));
    } else {
      product[0].category_ids = [];
    }

    // Chuyển đổi author_ids từ chuỗi thành mảng
    if (product[0].author_ids !== null) {
      product[0].author_ids = product[0].author_ids
        .split(",")
        .map((id) => parseInt(id.trim()));
    } else {
      product[0].author_ids = [];
    }

    const soldQuantity = await getSoldQuantityProductByIdServices(
      product[0].id
    );
    product[0].sold_quantity = soldQuantity;
    return { success: true, code: 200, content: product };
  } catch (error) {
    throw error;
  }
};

// Tạo mới một sản phẩm: Admin
const createNewProductServices = async (data) => {
  const {
    name,
    publisher_id,
    image,
    price,
    discount,
    category_ids,
    author_ids,
  } = data;
  try {
    const newProduct = await Product.create({
      name,
      publisher_id,
      image,
      price,
      discount,
    });

    if (category_ids?.length > 0) {
      category_ids.forEach(async (category_id) => {
        await sequelize.query(
          `INSERT INTO product_categories (product_id, category_id)
          VALUES (${newProduct.id}, ${category_id})`
        );
      });
    }

    if (author_ids?.length > 0) {
      author_ids.forEach(async (author_ids) => {
        await sequelize.query(
          `INSERT INTO product_authors (product_id, author_id)
          VALUES (${newProduct.id}, ${author_ids})`
        );
      });
    }

    return {
      success: true,
      code: 201,
      content: {
        message: "Sản phẩm đã được tạo thành công",
      },
    };
  } catch (error) {
    throw error;
  }
};

// Cập nhật sản phẩm: Admin
const updateProductServices = async (id, data) => {
  const {
    name,
    publisher_id,
    image,
    price,
    discount,
    category_ids,
    author_ids,
  } = data;
  try {
    const isExistProduct = await Product.findOne({ where: { id } });
    if (isExistProduct) {
      isExistProduct.name = name;
      isExistProduct.publisher_id = publisher_id;
      isExistProduct.image = image;
      isExistProduct.price = price;
      isExistProduct.discount = discount;
      await isExistProduct.save();

      // Xoá các thể loại của một loại sách, sau đó cập nhật lại
      await sequelize.query(
        `DELETE FROM product_categories WHERE product_id=${id}`
      );
      if (category_ids?.length > 0) {
        category_ids.forEach(async (category_id) => {
          await sequelize.query(
            `INSERT INTO product_categories (product_id, category_id)
            VALUES (${isExistProduct.id}, ${category_id})`
          );
        });
      }

      // Xoá các tác gỉa của một loại sách, sau đó cập nhật lại
      await sequelize.query(
        `DELETE FROM product_authors WHERE product_id=${id}`
      );
      if (author_ids?.length > 0) {
        author_ids.forEach(async (author_id) => {
          await sequelize.query(
            `INSERT INTO product_authors (product_id, author_id)
            VALUES (${isExistProduct.id}, ${author_id})`
          );
        });
      }

      return {
        success: true,
        code: 200,
        content: {
          message: "Sản phẩm đã được cập nhật thành công",
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: {
          message: "Hệ thống không tìm thấy sản phẩm",
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

// Xoá sản phẩm: Admin
const deleteProductServices = async (id) => {
  try {
    const isExistProduct = await Product.findOne({ where: { id } });
    if (isExistProduct) {
      // Xoá các thể loại thuộc về product, rồi sau đó mới xoá được product
      await sequelize.query(
        `DELETE FROM product_categories WHERE product_id=${id}`
      );
      // Xoá các tác giả thuộc về product, rồi sau đó mới xoá được product
      await sequelize.query(
        `DELETE FROM product_authors WHERE product_id=${id}`
      );

      await isExistProduct.destroy();
      return {
        success: true,
        code: 200,
        content: {
          message: "Sản phẩm đã được xoá thành công",
        },
      };
    } else {
      return {
        success: false,
        code: 404,
        content: { message: "Hệ thống không tìm thấy sản phẩm" },
      };
    }
  } catch (error) {
    throw error;
  }
};

// Cập nhật lại số lượng của sản phẩm: admin
const updateQuantityProductServices = async (id, inputQuantity) => {
  try {
    const product = await Product.findOne({ where: { id } });
    if (product) {
      product.quantity = product.quantity + inputQuantity;
      await product.save();
    }
  } catch (error) {
    throw error;
  }
};

// Lấy số lượng đã bán của sản phẩm bằng id sản phẩm
const getSoldQuantityProductByIdServices = async (id) => {
  try {
    const [soldQuantity] = await sequelize.query(`
        SELECT 
          SUM(bd.quantity) as sold_quantity
        FROM bills 
          b INNER JOIN bill_details bd ON b.id = bd.bill_id
        WHERE
           b.bill_status_id = 2 AND product_id = ${id}
    ;`);

    // Nếu không tìm thấy số lượng đã bán (tức là mảng rỗng) thì sẽ trả về 0
    if (soldQuantity.length == 0) {
      return 0;
    }

    return +soldQuantity[0].sold_quantity;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProductsServices,
  getDetailProductByIdServices,
  createNewProductServices,
  updateProductServices,
  deleteProductServices,
  updateQuantityProductServices,
};
