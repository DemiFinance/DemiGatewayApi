const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const serviceProxy = {
    demiApi: createProxyMiddleware({target: 'https://localhost:3001', changeOrigin: true}),
    demiWeb: createProxyMiddleware({target: 'http://localhost:3002', changeOrigin: true}),
};

app.use('/', serviceProxy.demiApi);
app.use('/autopayrunner', serviceProxy.demiWeb);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
