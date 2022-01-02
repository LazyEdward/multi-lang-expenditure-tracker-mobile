export const isPriceOnEntering = (price) => {
	return /^(-)?(\d*)(\.\d{0,2})?$/.test(price)
}