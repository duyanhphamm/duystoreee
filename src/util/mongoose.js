module.exports = {
    // Hàm xử lí array lỗi của handlesbar 
    mutipleMongooseToObject: function (mongoosesArray) {
        return mongoosesArray.map(function (mongooseArray) {
            return mongooseArray.toObject();
        })
    },

    // Hàm xử lí khi click vào sản phẩm
    mongooseToOject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};