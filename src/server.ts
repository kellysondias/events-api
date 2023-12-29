import { app } from "./app";
import { connectDB } from "./database/connect.database";

const port = process.env.PORT || 3000;

const start = async () => {
	app.listen(port, async () => {
		await connectDB(`${process.env.MONGO_URI}`).then(() =>
			console.log(`Server running on localhost:${port}...`),
		);
	});
};

start();
