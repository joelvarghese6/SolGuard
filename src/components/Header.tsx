export function Header() {
  return (
    <header className='bg-gradient-to-r from-gray-800 via-blue-900 to-gray-800 text-white p-6 rounded-t-lg'>
      <div className='flex items-center space-x-3'>
        <div className='w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center'>
          <span className='text-xl font-bold'>SG</span>
        </div>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>SolGuard</h1>
          <p className='text-sm text-blue-200'>Protect yourself from phishing attacks</p>
        </div>
      </div>
    </header>
  )
} 