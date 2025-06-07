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



  const handleAnalyze = async  () => {
    setIsAnalyzing(true)
    // Simulate API call with dummy data

    const url = `https://solguard-server-2.vercel.app/check-transfers/?address=${address}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setAnalysisResult(data);
    setIsAnalyzing(false)
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

