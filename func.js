const http = require('http');

const CLOUDFLARE_WORKER_URL = process.env.CLOUDFLARE_WORKER_URL||'https://your-cloudflare-worker-url/update';

// Giả lập việc thay đổi dữ liệu trong DB
function update_data_to_worker() {
    return new Promise((resolve)=>{
        // Trong thực tế, bạn sẽ thay đổi dữ liệu sau một hành động nào đó (ví dụ: người dùng gửi tin nhắn)
        const newData = {
            message: "Dữ liệu mới đã được thêm vào lúc: " + new Date().toISOString()
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(CLOUDFLARE_WORKER_URL, options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
                resolve();
            });
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
            resolve();
        });

        // Gửi dữ liệu cập nhật tới Cloudflare Worker
        req.write(JSON.stringify(newData));
        req.end();

        console.log('Đã gửi thông báo cập nhật dữ liệu tới Cloudflare Worker.');
    });
}
module.exports = {
    update_data_to_worker,
}
