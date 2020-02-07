const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let investment = 0;
let balance = 100;
let timePassed = 0;
let vestingRate = .02;
let millesecondsInAMonth = 1500;
let taxRate = .25;
let availableStocks = [
	{
		ticker: 'SP500',
		interestRate: 0,
		investment: 0,
	},
	{
		ticker: 'APPL',
		interestRate: 0,
		investment: 0,
	},
	{
		ticker: 'PROVO',
		interestRate: 0,
		investment: 0,
	},
	{
		ticker: 'OREM',
		interestRate: 0,
		investment: 0,
	}
];
let commands = [];

function askAQuestion() {
	rl.question('What would you like to do in this phase? ', (answer) => {
  		if (answer == 'invest') {
			askInvestmentQuestion();
			return;
		}
		if (answer == 'balance') {
			showBalance();
			askAQuestion();
			return;
		}
		if (answer == 'investments') {
			showInvestments();
			askAQuestion();
			return;
		}
		if (answer == 'withdraw') {
			askWithdrawQuestion();
			return;
		}
		if (answer == 'total') {
			showTotal();
		}
		if (answer == 'time') {
			console.log(`${timePassed} months have passed.`);
		}
		if (answer == 'pause') {
			console.log(`Pausing the passing of time`);
			clearInterval()
		}
		askAQuestion();
	});
}

function askInvestmentQuestion() {
	rl.question('How much would you like to invest? ', (answer) => {
		balance -= parseFloat(answer);
		investment += parseFloat(answer);
		showBalanceAndInvestments();
		askAQuestion();
	});
}

function askWithdrawQuestion() {
	rl.question('How much would you like to withdraw? ', (answer) => {
		investment -= parseFloat(answer);
		let tax = parseFloat(answer) * taxRate;
		console.log(`Withdrawal Tax: ${tax}`);
		balance += parseFloat(answer) - tax;
		showBalanceAndInvestments();
		askAQuestion();
	});
}

function showBalanceAndInvestments() {
	showBalance();
	showInvestments();
}

function showTotal() {
	console.log(`Total Assets: ${(balance + investment).toFixed(2)}`);
	showBalanceAndInvestments();
}

function showBalance() {
	console.log(`Current balance: ${balance.toFixed(2)}`);
}

function showInvestments() {
	console.log(`Current investments: ${investment.toFixed(2)}`);
}

function vest() {
	investment = investment + investment * vestingRate;
	timePassed++;
	//showInvestments();
}
  
setInterval(vest, millesecondsInAMonth);

askAQuestion();