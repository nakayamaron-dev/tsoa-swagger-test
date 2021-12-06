// src/app.ts
import express, { Response as ExResponse, Request as ExRequest } from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";
import { UsersController } from "./users/usersController"
import swaggerUi from "swagger-ui-express";

export const app = express();
const user = new UsersController();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get('/users', async (_, res, next) => {
    try {
        const result = await user.getUser(1);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
  });

RegisterRoutes(app);