    const Cart = require('../modals/Cart');
    const {mutipleMongooseToObject} = require('../../util/mongoose')

    class SearchController {

        search(req, res, next) {
            const searchTerm = req.query.query; // Lấy từ query parameter
            // Thực hiện tìm kiếm sản phẩm dựa trên `searchTerm`
            // Sử dụng regex để tìm kiếm mô tả sản phẩm, tên sản phẩm, hoặc các thuộc tính khác
            Cart.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { origin: { $regex: searchTerm, $options: 'i' } },
                    // Thêm nhiều trường khác nếu cần thiết
                ]
            })
                .then(products => {
                    console.log('Từ khóa tìm kiếm:', searchTerm);
                    console.log('Sản phẩm:', products);
                    // Render trang với kết quả tìm kiếm
                    res.render('search', { products, searchTerm });
                })
                .catch(error => {
                    console.error('Lỗi khi tìm kiếm sản phẩm:', error);
                    // Xử lý lỗi nếu cần thiết
                    return next(error);
                });
        }
    }

    module.exports = new SearchController();