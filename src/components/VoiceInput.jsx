import { useState } from 'react'
import { parseVoiceCommand } from '../gemini'

function VoiceInput({ onResult }) {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState(null)

  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Please use Chrome browser for voice input!')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'ta-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.start()
    setListening(true)
    setTranscript('')
    setResult(null)

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript
      setTranscript(text)
      setListening(false)
      setProcessing(true)

      try {
        const parsed = await parseVoiceCommand(text)
        setResult(parsed)
        if (onResult) onResult(parsed)
      } catch (err) {
        alert('Could not understand. Please try again!')
      }

      setProcessing(false)
    }

    recognition.onerror = () => {
      setListening(false)
      setProcessing(false)
      alert('Could not hear you. Please try again!')
    }

    recognition.onend = () => {
      setListening(false)
    }
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-sky-700 mb-8">
      <h2 className="text-xl font-bold text-white mb-2">Voice Input</h2>
      <p className="text-slate-400 text-sm mb-4">
        Speak in Tamil or Hindi — example: "Rendu kilo sugar add pannu"
      </p>

      <button
        onClick={startListening}
        disabled={listening || processing}
        className={`px-6 py-3 rounded-xl font-bold text-white transition ${
          listening
            ? 'bg-red-500 animate-pulse cursor-not-allowed'
            : processing
            ? 'bg-yellow-500 cursor-not-allowed'
            : 'bg-sky-500 hover:bg-sky-600'
        }`}
      >
        {listening ? '🎙️ Listening...' : processing ? '⏳ Processing...' : '🎙️ Start Speaking'}
      </button>

      {transcript && (
        <div className="mt-4 bg-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs mb-1">You said:</p>
          <p className="text-white font-medium">{transcript}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 bg-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs mb-2">Gemini understood:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-slate-400">Action: <span className="text-sky-400 font-bold">{result.action}</span></p>
            <p className="text-slate-400">Product: <span className="text-white font-bold">{result.name}</span></p>
            <p className="text-slate-400">Quantity: <span className="text-white font-bold">{result.quantity} {result.unit}</span></p>
            {result.price > 0 && <p className="text-slate-400">Price: <span className="text-white font-bold">Rs.{result.price}</span></p>}
            {result.customer && <p className="text-slate-400">Customer: <span className="text-white font-bold">{result.customer}</span></p>}
          </div>
        </div>
      )}

    </div>
  )
}

export default VoiceInput