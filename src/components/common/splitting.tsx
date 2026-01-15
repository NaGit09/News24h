import {Suspense} from 'react'
import LoadingSpinner from './loading-spinner.tsx'

const Splitting = ({children}: {children: React.ReactNode}) => {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      {children}
    </Suspense>
  )
}

export default Splitting