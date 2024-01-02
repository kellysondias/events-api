import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getEvent = (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json("working");
};
