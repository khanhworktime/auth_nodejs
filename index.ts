import * as DotEnv from 'dotenv';
import express, { Application } from 'express';
import commonConfigs from './src/configs/common';
import appRoutes from './src/routes';

DotEnv.config();

const app: Application = express();

const port: number = parseInt(process.env.PORT ?? '8080');

app.use(commonConfigs);
app.use(appRoutes);

app.listen(port, (): void => {
    console.log(`Server Running here 👉 http://localhost:${port}`);
});
