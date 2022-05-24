export const getVersion = (vm) => {
	return vm.$u.get('/api/appVersion/getwgtversion');
}
export const isnew = (vm) => {
	return vm.$u.get('/api/appVersion/open/isnew');
}