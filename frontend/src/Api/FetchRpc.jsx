import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// 1. Put your RPC URL here (I've removed your specific key)
const SOLANA_RPC_ENDPOINT =
	"https://solana-mainnet.g.alchemy.com/v2/yla5Mu4N7zGCWS5rsoS2t"

// 1 SOL = 1,000,000,000 Lamports
const LAMPORTS_PER_SOL = 1000000000

// 2. Create the data-fetching function
const fetchSolanaBalance = async (address) => {
	const body = {
		jsonrpc: "2.0",
		id: 1,
		method: "getBalance", // Using the simpler 'getBalance' method
		params: [address], // The dynamic address goes here
	}

	try {
		const response = await axios.post(SOLANA_RPC_ENDPOINT, body)

		// The balance is returned in 'lamports' (a tiny fraction of 1 SOL)
		const lamports = response.data.result.value

		// Convert lamports to SOL
		return lamports / LAMPORTS_PER_SOL
	} catch (error) {
		// Handle cases where the RPC call itself fails
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
		// The queryKey includes the walletAddress
		queryKey: ["solBalance", walletAddress],

		// The queryFn calls our async function
		queryFn: () => fetchSolanaBalance(walletAddress),

		// This is important: only run the query if 'walletAddress' exists
		enabled: !!walletAddress,
	})

	if (!walletAddress) {
		return <div>Enter a Solana address to check its balance.</div>
	}

	if (isLoading) {
		return <div>Checking balance...</div>
	}

	if (isError) {
		return <div>Error: {error.message}</div>
	}

	return (
		<div>
			<h3>Wallet: {walletAddress}</h3>
			<p>Balance: {balance.toFixed(4)} SOL</p>
		</div>
	)
}

