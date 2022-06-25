type ElementSizeUnits = "px" | "%" | "vh" | "vw" | "rem" | "em";

export type ElementSize = `${number}${ElementSizeUnits}`;

export type ElementMargins =
	| ElementSize
	| `${ElementSize} ${ElementSize}`
	| `${ElementSize} ${ElementSize} ${ElementSize}`
	| `${ElementSize} ${ElementSize} ${ElementSize} ${ElementSize}`;
