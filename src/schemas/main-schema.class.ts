export class MainSchema {
	protected static maxLength = 255;
	protected static maxLengthMessage =
		"Cannot exceed 255 characters.";
	protected static maxLengthArray = [
		this.maxLength,
		this.maxLengthMessage,
	];
}
