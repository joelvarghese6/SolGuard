import { Loader } from "lucide-react"

interface AddressInputProps {
  address: string
  setAddress: (address: string) => void
  isAnalyzing: boolean
  isInputValid: boolean
  onAnalyze: () => void
}

export function AddressInput({ 
  address, 
  setAddress, 
  isAnalyzing, 
  isInputValid, 
  onAnalyze 
}: AddressInputProps) {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <h2 className='text-lg font-bold text-gray-800'>Analyze the address</h2>
        <p className='text-sm text-gray-600'>
          SolGuard uses the latest and greatest technology to analyze the address and tell you if it is safe to use.
        </p>
      </div>
      <div className='flex flex-col space-y-3'>
        <div className='relative'>
          <input 
            type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address or URL to check..."
            className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
          />
          {address && !isInputValid && (
            <p className='p-2 text-sm text-red-500'>
              Please enter a valid Solana address
            </p>
          )}
        </div>
        {isAnalyzing ? (
          <button 
            className='flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg space-x-2 transition-all duration-200' 
            disabled
          >
            <Loader className='w-4 h-4 animate-spin' />
            <span>Analyzing...</span>
          </button>
        ) : (
          <button 
            className={`px-4 py-3 rounded-lg transition-all duration-200 ${
              isInputValid 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`} 
            onClick={onAnalyze}
            disabled={!isInputValid}
          >
            Analyze the address
          </button>
        )}
      </div>
    </div>
  )
} 