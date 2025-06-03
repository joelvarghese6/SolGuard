import { useState } from "react"
import { isSolanaAddress } from "./utils/solana"
import { Header } from "./components/Header"
import { AddressInput } from "./components/AddressInput"
import { AnalysisResults } from "./components/AnalysisResults"
import { Footer } from "./components/Footer"
import { ArrowLeft } from "lucide-react"

type AnalysisResult = {
  trustScore: number
  starRating: number
  suspiciousActivities: {
    description: string
    threatLevel: 'high' | 'medium' | 'low'
    timestamp: string
  }[]
}

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [address, setAddress] = useState('')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate API call with dummy data
    setTimeout(() => {
      setAnalysisResult({
        trustScore: 65,
        starRating: 2,
        suspiciousActivities: [
          {
            description: "Account dusting detected - multiple small SOL transfers",
            threatLevel: "high",
            timestamp: "2024-03-15 14:30:00"
          },
          {
            description: "Suspicious token transfers to known scam addresses",
            threatLevel: "high",
            timestamp: "2024-03-14 09:15:00"
          },
          {
            description: "New wallet with rapid token accumulation",
            threatLevel: "low",
            timestamp: "2024-03-11 16:30:00"
          }
        ]
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  const handleBack = () => {
    setAnalysisResult(null)
    setAddress('')
  }

  const isInputValid = address.trim() !== '' && isSolanaAddress(address)

  return (
    <div className='w-[400px] bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg shadow-xl overflow-hidden'>
      <Header />
      
      <main className='p-6 space-y-6'>
        {analysisResult ? (
          <div className='space-y-4'>
            <button
              onClick={handleBack}
              className='flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              <span className='text-sm font-medium'>Back to Analysis</span>
            </button>
            <AnalysisResults result={analysisResult} />
          </div>
        ) : (
          <AddressInput 
            address={address}
            setAddress={setAddress}
            isAnalyzing={isAnalyzing}
            isInputValid={isInputValid}
            onAnalyze={handleAnalyze}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App

