import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { signUp } from "../controllers/sign-up.controller";
import { UserModel } from "../models/user.model";
import { hash } from "bcrypt";
import { validateAndRespond } from "../utils/validateAndRespond/validateAndRespond";
import { signInValidationSchema } from "../schemas/user.schema";

jest.mock("bcrypt");
jest.mock("../utils/validateAndRespond/index.ts");
jest.mock("../schemas/user.schema");
jest.mock("../models/user.model");
jest.mock("express");

describe("signUp()", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const req: Request = {
		body: {
			firstName: "John",
			lastName: "Doe",
			birthDate: "2023-12-28",
			city: "country",
			country: "country",
			email: "john@doe.com",
			password: "password",
			confirmPassword: "password",
		},
	} as never;

	const res: Response = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	} as never;

	it("should create a new user successfully", async () => {
		(validateAndRespond as jest.Mock).mockReturnValue(null);

		(hash as jest.Mock).mockResolvedValueOnce("hashed_password");

		await signUp(req, res);

		expect(validateAndRespond).toHaveBeenCalledWith(
			req.body,
			signInValidationSchema,
			res,
		);
		expect(UserModel.create).toHaveBeenCalledWith({
			...req.body,
			password: "hashed_password",
		});
		expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
		expect(res.json).toHaveBeenCalledWith({
			success: true,
			message: "User created",
		});
	});

	it("should handle validation errors", async () => {
		const falsyReq: Request = {
			body: {
				firstName: "John",
				lastName: "Doe",
				birthDate: "2023-12-28",
				city: "country",
				country: "country",
				email: "johndoe.com",
				password: "password",
				confirmPassword: "password",
			},
		} as never;

		const falsyRes: Response = {
			status: StatusCodes.BAD_REQUEST,
			json: jest.fn(),
		} as never;

		const validationError = {
			type: "Validation error",
			errors: [
				{ resource: "resource", message: "invalid resource" },
			],
		};

		(validateAndRespond as jest.Mock).mockResolvedValueOnce(
			validationError,
		);

		await signUp(falsyReq, falsyRes);

		expect(hash).not.toHaveBeenCalled();
		expect(UserModel.create).not.toHaveBeenCalled();
		expect(falsyRes.status).toBe(StatusCodes.BAD_REQUEST);
		expect(res.json).not.toHaveBeenCalled();
	});

	it("should handle internal server error", async () => {
		(validateAndRespond as jest.Mock).mockReturnValueOnce(null);

		(UserModel.create as jest.Mock).mockRejectedValueOnce(
			new Error("DB error"),
		);

		await expect(signUp(req, res)).rejects.toThrow("DB error");
	});
});
