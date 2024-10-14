const express = require('express')
const app = express()
const dotenv = require('dotenv')
const body_parser = require('body-parser')
const cors = require('cors')
const db_connect = require('./utils/db')

dotenv.config()


app.use(express.json());
if (process.env.mode === 'production') {
    app.use(cors()); // Cho phép tất cả các miền trong môi trường sản xuất
} else {
    app.use(cors({
        origin: ["http://localhost:5173", "http://localhost:3000","https://news-backend-mu.vercel.app"], // Cho phép chỉ miền localhost:5174
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Thêm phương thức nếu cần
        allowedHeaders: ['Content-Type', 'Authorization'] // Cho phép các headers tùy chỉnh
    }));
}



app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/newsRoute'))
app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.port

db_connect()

app.listen(port, () => console.log(`server is running on port ${port}!`))