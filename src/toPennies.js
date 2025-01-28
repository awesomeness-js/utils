export default function toPennies(uglyMoney){

	if(!uglyMoney){ return 0; }
	if(uglyMoney.length == 0){ return 0; }

	// trim all whitespace from string
	uglyMoney = uglyMoney.replace(/\s/g,'');

	let hasDecimal = uglyMoney.includes(".");
	let cleanMoney_v1 = uglyMoney.replace(/\D/g,'');

	if(cleanMoney_v1.length == 0){ return 0; }

	let cleanMoney = cleanMoney_v1*1;

	if(!hasDecimal){ cleanMoney = cleanMoney * 100; }

	return cleanMoney;
};