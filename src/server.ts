import app from "./app";
import { connectDB } from "./database/connect.database";

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB(`${process.env.MONGO_URI}`);
		app.listen(port, () =>
			console.log(`Server listening on port ${port}...`),
		);
	} catch (error) {
		console.log(error);
	}
};

start();
