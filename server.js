const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');

const app = express();

app.use((req, res, next) => {
    res.setHeader('ngrok-skip-browser-warning', 'true');
    next();
});

app.use(bodyParser.json());
app.use(express.static('public'));

const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID',       
    key_secret: 'YOUR_KEY_SECRET' 
});

app.post('/create-order', async (req, res) => {
    try {
        const order = await razorpay.orders.create({
            amount: req.body.amount * 100,
            currency: 'INR',
            receipt: 'rcpt_' + Date.now()
        });
        res.json(order);
    } catch (err) {
        res.status(500).send('Error');
    }
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));