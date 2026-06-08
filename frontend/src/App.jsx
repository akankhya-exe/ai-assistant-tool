import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

function App() {
  const [input, setInput] = useState('')
  const [feature, setFeature] = useState('explain')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    // Graceful empty input handling
    if (!input.trim()) {
      alert("Please enter some text!")
      return
    }
    
    setLoading(true)
    
    // Add user message to the chat history array
    const userMessage = { role: 'user', text: input, type: feature }
    setHistory(prev => [...prev, userMessage])
    
    try {
      // Send data to your running Python backend
      const res = await fetch('http://127.0.0.1:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, feature: feature })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        // Add AI response to chat history
        setHistory(prev => [...prev, { role: 'ai', text: data.response }])
      } else {
        alert("API Error: " + data.error)
      }
    } catch (error) {
      alert("Error connecting to the backend server. Is python app.py running?")
    }
    
    setLoading(false)
    setInput('') // Clear the text area
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>My AI Tool 🚀</h1>
      
      {/* Chat History Container */}
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', height: '400px', overflowY: 'auto', marginBottom: '20px', backgroundColor: '#fafafa' }}>
        {history.length === 0 && <p style={{ color: '#888', textAlign: 'center', marginTop: '150px' }}>Select a feature and type a prompt to start!</p>}
        
        {history.map((msg, i) => (
          <div key={i} style={{ margin: '15px 0', padding: '15px', backgroundColor: msg.role === 'user' ? '#ffffff' : '#e3f2fd', border: '1px solid #eee', borderRadius: '8px' }}>
            {msg.role === 'user' ? 
              <strong>You ({msg.type}): {msg.text}</strong> : 
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            }
          </div>
        ))}
        {/* Loading Animation Bonus */}
        {loading && <div style={{ fontStyle: 'italic', color: '#666', marginTop: '10px' }}>AI is thinking... ⏳</div>}
      </div>

      {/* Input Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <select value={feature} onChange={e => setFeature(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          <option value="explain">Explain a Concept (ELI5)</option>
          <option value="summarize">Summarize Text</option>
          <option value="quiz">Generate Quiz Questions</option>
        </select>
        
        <textarea 
          value={input} 
          onChange={e => setInput(e.target.value)}
          placeholder="Type your text here..."
          rows="4"
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'vertical' }}
        />
        
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          style={{ padding: '15px', backgroundColor: loading ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'Generating...' : 'Submit to AI'}
        </button>
      </div>
    </div>
  )
}

export default App