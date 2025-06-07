require('dotenv').config();
const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');
const app = express();

// Enable JSON parsing for request body
app.use(express.json());

// Initialize Solana connection with Helius RPC
if (!process.env.HELIUS_RPC_URL) {
    console.error('HELIUS_RPC_URL environment variable is not set');
    process.exit(1);
}

const connection = new Connection(process.env.HELIUS_RPC_URL);

// Helper function to add delay between requests
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Constants for SOL conversion
const LAMPORTS_PER_SOL = 1000000000;
const MAX_TRANSFER_AMOUNT = 0.00001 * LAMPORTS_PER_SOL; // 10,000 lamports

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/check-transfers', async (req, res) => {
    try {
        const { address } = req.body;

        if (!address) {
            return res.status(400).json({ error: 'Solana address is required' });
        }

        // Validate the Solana address
        let publicKey;
        try {
            publicKey = new PublicKey(address);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid Solana address' });
        }

        // Get the last 50 signatures
        const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 25 });

        // Get transaction details for each signature with throttling
        const transfers = [];
        for (const sig of signatures) {
            try {
                const tx = await connection.getTransaction(sig.signature, {
                    maxSupportedTransactionVersion: 0
                });

                // Check if the address is the sender (first account in the transaction)
                if (tx.transaction.message.accountKeys[0].toBase58() === address) {
                    // Calculate the amount sent (difference between pre and post balance)
                    const amount = tx.meta.preBalances[0] - tx.meta.postBalances[0];

                    // Only include if it's a positive amount (outgoing transfer) and less than MAX_TRANSFER_AMOUNT
                    if (amount > 0 && amount < MAX_TRANSFER_AMOUNT) {
                        transfers.push({
                            timestamp: new Date(tx.blockTime * 1000).toISOString(),
                            signature: sig.signature,
                            amount: amount,
                            amountInSol: amount / LAMPORTS_PER_SOL, // Add SOL amount for easier reading
                            recipient: tx.transaction.message.accountKeys[1].toBase58() // The recipient address
                        });
                    }
                }
                // Add a 100ms delay between requests to prevent rate limiting
                await delay(100);
            } catch (error) {
                console.error(`Error fetching transaction ${sig.signature}:`, error);
                // Continue with next transaction even if one fails
                continue;
            }
        }

        // Sort by timestamp (most recent first)
        const outgoingTransfers = transfers.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (outgoingTransfers.length === 0) {
            return res.json({
                trustScore: 100,
                starRating: 4,
                suspiciousActivities: []
            })
        } else if (outgoingTransfers.length < 3) {
            return res.json({
                trustScore: 50,
                starRating: 3,
                suspiciousActivities: [
                    {
                        description: `Some dusting attacks detected - ${outgoingTransfers.length}`,
                        threatLevel: "medium",
                        timestamp: new Date().toISOString()
                    }
                ]
            })
        }

        res.json({
            trustScore: 0,
            starRating: 0,
            suspiciousActivities: [
                {
                    description: `High amount of dusting attacks detected - ${outgoingTransfers.length}`,
                    threatLevel: "high",
                    timestamp: new Date().toISOString()
                }
            ]
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(3005, () => {
    console.log('Server is running on port 3005');
});

module.exports = app;

