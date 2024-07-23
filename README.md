### stocks

## Setup
    1. RUN git clone https://github.com/RahulKumarPrajapati/stocks.git
    2. RUN cd stocks/client && npm i && npm start
    3. RUN cd ../server && npm i
    4. In .env file put your MONGO URI in MONGO_URI and your livecoinwatch api key in STOCK_API_KEY
    5. If you are changing PORT in .env make sure to change the port in client/src/shared/constant.js file as well
    6. RUN npx ts-node app.ts