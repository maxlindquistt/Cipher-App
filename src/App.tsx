import { useState } from 'react'
import CipherTool from './components/cipherTool/cipherTool'
import InformationCard from './components/informationCard/informationCard'
import type { CipherId } from './components/cipherTypes'
import './app.css'

function App() {
  const [selectedCipher, setSelectedCipher] = useState<CipherId>('caesar')

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Cipher Tool</h1>
        <p className="app-subtitle">
          Encode and decode text with Caesar, Vigenère and Atbash ciphers.
        </p>
      </header>

      <main className="layout">
        <CipherTool
          selectedCipher={selectedCipher}
          onCipherChange={setSelectedCipher}
        />
        <InformationCard selectedCipher={selectedCipher} />
      </main>
    </div>
  )
}

export default App
