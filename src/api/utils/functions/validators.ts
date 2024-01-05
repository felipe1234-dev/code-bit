function validateEmail(value: string) {
    if (!value) return false;
	const email =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return !!email.test(value.toLowerCase());
}

function validateUrl(value: string) {
	if (!value) return false;
	const regexQuery =
		'^((http|https)://)(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$';
	const url = new RegExp(regexQuery, 'i');
	return url.test(value);
}

function validatePhone(value: string) {
	if (!value) return false;
	return value.replace(/\D/g, '').length === 11;
}

function validateDate(value: any) {
	return value instanceof Date && !Number.isNaN(value.getTime());
}

export { validateEmail, validateUrl, validatePhone, validateDate };