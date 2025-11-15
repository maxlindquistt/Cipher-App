import CipherTool from "./components/cipherTool/cipherTool"
import InformationCard from "./components/informationCard/informationCard"
import './app.css'

function App() {
  return (
    <div>
      <h1>Welcome to the Cipher Tool</h1>
      
      <CipherTool />

      <div className="information-card-container">
        <InformationCard />
      </div>
    </div>
  )
}

export default App
