import cors from 'cors';
import express, { Application } from 'express';
import bodyParser from 'body-parser';

const config: Application = express();
config.use(cors());
config.use(express.json());
config.use(bodyParser.urlencoded({ extended: true }));
config.use(bodyParser.json());

export default config;
