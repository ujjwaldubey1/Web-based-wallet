// ./Api/FetchRpc.jsx
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ethers } from "ethers" // Import ethers for formatting

// 1. Put your ETHEREUM RPC URL here
const ETHEREUM_RPC_ENDPOINT =
	"https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY"

// 2. Create the data-fetching function
const fetchEthereumBalance = async (address) => {
	const body = {
		jsonrpc: "2.0",
		id: 1,
		method: "eth_getBalance", // Ethereum's method
		params: [
			address, // The dynamic address
			"latest", // The block tag
		],
	}

	try {
		const response = await axios.post(ETHEREUM_RPC_ENDPOINT, body)

		// The balance is returned in 'Wei' (a hex string)
		const weiBalance = response.data.result

		// Convert Wei to Ether
		return ethers.utils.formatEther(weiBalance)
	} catch (error) {
		throw new Error(
			error.response?.data?.error?.message || "Failed to fetch balance"
		)
	}
}

// 3. Use it in your component
function WalletBalance({ walletAddress }) {
	const {
		data: balance,
		isLoading,
		isError,
		error,
	} = useQuery({
		// Query key is now for 'ethBalance'
		queryKey: ["ethBalance", walletAddress],
		queryFn: () => fetchEthereumBalance(walletAddress),
		enabled: !!walletAddress,
	})

	if (!walletAddress) {
		return <div></div> // Don't show anything if no address
	}
	if (isLoading) {
		return <div className="text-gray-400">Fetching balance...</div>
	}
	if (isError) {
		return <div className="text-red-400">Error: {error.message}</div>
	}

	return (
		<div>
			<label className="text-sm font-medium text-green-400">Balance</label>
			<p className="font-mono text-lg text-green-300">
				{/* Format to 6 decimal places */}
				{parseFloat(balance).toFixed(6)} ETH
			</p>
		</div>
	)
}

export default WalletBalance
