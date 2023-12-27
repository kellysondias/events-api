import app from "./app";
import { connectDB } from "./database/connect.database";

class Server {
	private readonly port: number;

	constructor() {
		this.port = +process.env.PORT! ?? 3000;
	}

	async start() {
		try {
			await connectDB(`${process.env.MONGO_URI}`);
			app.listen(this.port, () =>
				console.log(
					`Server listening on port ${this.port}...`,
				),
			);
		} catch (error) {
			console.log(error);
		}
	}

	public static bootstrap(): Server {
		return new Server();
	}
}

Server.bootstrap().start();
