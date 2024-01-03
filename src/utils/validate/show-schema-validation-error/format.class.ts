export class Format {
	static resource = (resource: string, path: (string | number)[] | string) =>
		(resource && ", ") + `'${path}'`;

	static message = (message: string) => `${message} `;
}
