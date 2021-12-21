export 	const parseCalculatorJsonParse = (obj) => {
	return Function('"use strict";return (' + obj + ")")();
};
