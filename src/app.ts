import express, { Express, Router } from "express";
import "express-async-errors";
import "dotenv/config";
//import userRouter from "./routes/user.route";

class App {
	private expressApp: Express;

	constructor() {
		this.expressApp = express();
		this.config();
		this.routes();
	}

	private config() {
		this.expressApp.use(express.json());
	}

	private routes() {
		const router = Router();
		//router.use("/api/v1", userRouter);
		this.expressApp.use(router);
	}

	public getExpressApp(): Express {
		return this.expressApp;
	}
}

export default new App().getExpressApp();
