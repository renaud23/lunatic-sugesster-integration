async function prout() {
	const response = await fetch('/naf-rev2.json');
	const naf = await response.json();
	return Object.values(naf).map(function (rubrique) {
		const { code } = rubrique;
		return { ...rubrique, id: code };
	});
}

export default prout;
