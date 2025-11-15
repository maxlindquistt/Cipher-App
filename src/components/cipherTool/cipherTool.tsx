import { useState, useEffect } from 'react'
import InputField from './components/inputField/inputField'
import OutputField from './components/outputField/outputField'
import EncodeOrDecodeOption from '../encodeOrDecodeOption/encodeOrDecodeOption'
import Dropdown from '../dropdown/dropdown'
import VigenereOptions from './components/vigenereOptions/vigenereOptions'
import CaesarOptions from './components/caesarOptions/caesarOptions'
import { Cipher } from '../../cipherModule/Cipher'
import './cipherTool.css'

function CipherTool() {
  const [vigenereKeyword, setVigenereKeyword] = useState('')
  const [caesarShift, setCaesarShift] = useState(3)
  const [cipherMode, setCipherMode] = useState<'encode' | 'decode'>('encode')
  const [selectedCipher, setSelectedCipher] = useState('caesar')
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  const cipherOptions = [
        { value: 'caesar', label: 'Caesar Cipher' },
        { value: 'vigenere', label: 'Vigenere Cipher' },
        { value: 'atbash', label: 'Atbash Cipher' }
  ]

  useEffect(() => {
    if (inputText) {
      const cipher = new Cipher()
      let result = ''
      
      switch (selectedCipher) {
        case 'caesar':
          result = cipherMode === 'encode'
            ? cipher.encryptCaesar(caesarShift, inputText)
            : cipher.decryptCaesar(caesarShift, inputText)
          break

        case 'vigenere':
          result = cipherMode === 'encode'
            ? cipher.encryptVigenere(vigenereKeyword, inputText)
            : cipher.decryptVigenere(vigenereKeyword, inputText)
          break

        case 'atbash':
          result = cipherMode === 'encode'
            ? cipher.encryptAtbash(inputText)
            : cipher.decryptAtbash(inputText)
          break
        default:
          result = ''
      }
      setOutputText(result)
    }
  }, [cipherMode, inputText, vigenereKeyword, caesarShift, selectedCipher])

  const handleCipherModeChange = (cipherMode: 'encode' | 'decode') => {
    setCipherMode(cipherMode)
  }

  const handleVigenereKeywordChange = (value: string) => {
    setVigenereKeyword(value)
  }

  const handleCaesarShiftChange = (value: number) => {
    setCaesarShift(value)
  }

  const handleInputChange = (value: string) => {
    setInputText(value)
  }

  return (
    <div className="cipher-tool">
      <InputField 
        value={inputText}
        onChange={(e) => handleInputChange(e.target.value)} 
        placeholder="Enter text"
      />
      <div className="options-section">
      <EncodeOrDecodeOption
        onChange={handleCipherModeChange}
        value={cipherMode}
      />
      <Dropdown 
        options={cipherOptions}
        value={selectedCipher}
        onChange={(e) => setSelectedCipher(e.target.value)}
      />

      {selectedCipher === 'vigenere' && (
        <VigenereOptions 
          keyword={vigenereKeyword}
          onKeywordChange={handleVigenereKeywordChange}
        />
      )}

      {selectedCipher === 'caesar' && (
        <CaesarOptions 
          shift={caesarShift}
          onShiftChange={handleCaesarShiftChange}
        />
      )}

      </div>
      <OutputField 
        value={outputText}
        readOnly
      />
    </div>
  )
}

export default CipherTool