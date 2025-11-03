import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { formatEther, isAddress } from "ethers"

const ETHEREUM_RPC_ENDPOINT =
	"https://eth-mainnet.g.alchemy.com/v2/yla5Mu4N7zGCWS5rsoS2t" // ← No trailing spaces!

const fetchEthereumBalance = async (address) => {
	if (!isAddress(address)) {
		throw new Error("Invalid Ethereum address")
	}

	const body = {
		jsonrpc: "2.0",
		id: 1,
		method: "eth_getBalance",
		params: [address, "latest"],
	}

	try {
		const response = await axios.post(ETHEREUM_RPC_ENDPOINT, body)
		const weiBalance = response.data.result

		if (weiBalance === undefined) {
			throw new Error("Invalid RPC response")
		}

		return formatEther(weiBalance) // ethers v6
	} catch (error) {
		console.error("Fetch balance error:", error)
		throw new Error(
			error.response?.data?.error?.message ||
				error.message ||
				"Failed to fetch balance"
		)
	}
}

function WalletBalance({ walletAddress, walletBalance }) {
	const address = walletAddress ?? walletBalance

	const {
		data: balance,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["ethBalance", address],
		queryFn: () => fetchEthereumBalance(address),
		enabled: !!address && isAddress(address),
	})

	if (!address) return <div></div>
	if (isLoading) return <div className="text-gray-400">Fetching balance...</div>
	if (isError) return <div className="text-red-400">Error: {error.message}</div>

	return (
		<div>
			<label className="text-sm font-medium text-green-400">Balance</label>
			<p className="font-mono text-lg text-green-300">
				{parseFloat(balance).toFixed(6)} ETH
			</p>
		</div>
	)
}

export default WalletBalance
