const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/duystore_db_dev');

        console.log('KẾT NỐI DATABASE THÀNH CÔNG !!!');
    } catch (error) {
        console.log('KẾT NỐI DATABASE THẤT BẠI !!!');
    }

}

module.exports = { connect };