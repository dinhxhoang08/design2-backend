'use strict';
const express = require('express');
const cron = require('node-cron');
const _fn = require('./func');

const app = express();
const port = process.env.PORT || 3000;

// Middleware và các route Express
app.get('/', (req, res) => {
    res.send('Web server đang hoạt động!');
});

// Hàm chứa logic của tác vụ bạn muốn chạy
async function runScheduledTask() {
    _fn.update_data_to_worker();
}

cron.schedule('*/1 * * * *', () => {
    runScheduledTask();
});

// Lắng nghe các yêu cầu HTTP để giữ cho server luôn hoạt động
app.listen(port, () => {
    console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});
