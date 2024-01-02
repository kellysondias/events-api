import { ValidationError } from "joi";

export type ValidationResult = {
	error: ValidationError;
	warning?: ValidationError | undefined;
	value: unknown;
};