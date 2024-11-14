const axios = require("axios");

const initiateMpesaPush = async (req, res) => {
    const { phoneNumber, amount } = req.body;
    
    try {
        const token = await getMpesaToken();
        const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
                BussinessShortCode: "174379",
                Password: Buffer.from("174379" + process.env.MPESA_CONSUMER_KEY + "timestamp").toString("base64"),
                Timestamp: "timestamp",
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: phoneNumber,
                PartyB: "174379",
                PhoneNumber: phoneNumber,
                CallBackUrl: process.env.CALLBACK_URL,
                AccountReference: "Wifi Billing",
                TransactionDesc: "Payment for wifi access"

            },
            { headers: { Authorization: `Bearer ${token}`}}

        );
        res.status(200).json({ message: "Payment initiated", data: response.data });

    } catch (error) {
        res.status(500).json({ error: "Error initiating payment" });
    }
};

const getMpesaToken = async () => {
    const respose = await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
            auth: { username: process.env.MPESA_CONSUMER_KEY, password: process.env.MPESA_CONSUMER_SECRET }
        
        }

    );
    return response.data.access_token;
};

module.exports = { initiateMpesaPush };

