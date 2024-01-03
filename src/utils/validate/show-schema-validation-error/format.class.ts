export class Format {
	static resource = (resource: string, path: string) =>
		(resource ? ", " : "") + `'${path}'`;

	static message = (message: string) => `${message} `;
}