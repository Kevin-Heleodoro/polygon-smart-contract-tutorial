const hre = require('hardhat');

const ContractJson = require('../artifacts/contracts/Greeter.sol/Greeter.json');

// ABI is the interface of the contract
const abi = ContractJson.abi;

async function main() {
	const alchemy = new hre.ethers.providers.AlchemyProvider(
		'maticmum',
		process.env.ALCHEMY_API_KEY
	);

	const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy);

	const Greeter = new hre.ethers.Contract(
		process.env.CONTRACT_ADDRESS,
		abi,
		userWallet
	);

	const setTx1 = await Greeter.setGreeting('This is your captain speaking.');
	await setTx1.wait();
	console.log(`before: ${await Greeter.greet()}`);

	const setTx2 = await Greeter.setGreeting(
		'We are approaching cruising altitude.'
	);
	await setTx2.wait();
	console.log(`after: ${await Greeter.greet()}`);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
