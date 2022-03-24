/**
 * Required External Modules
 */
import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import MSPClient from '@multisafepay/api-wrapper';


/**
 * App Variables
 */
const app = express();
const port = process.env.APPLICATION_PORT || '4001';
const __dirname = path.resolve();
const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:4000', 'https://dev-tech.com.ua', 'https://api.dev-tech.com.ua', 'https://test.dev-tech.com.ua', 'https://test-api.dev-tech.com.ua'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
/**
 *  App Configuration
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

/**
 * Routes Definitions
 */
const multiSafePayClient = new MSPClient('e142b8a6c282eae7130a5a417e899eff4c66b3de', { environment: 'test' });

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
