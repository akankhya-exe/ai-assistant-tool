from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

app = Flask(__name__)

CORS(app)

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("No API key found. Please check your .env file.")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.5-flash')

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.json
    user_input = data.get('text', '')
    feature = data.get('feature', 'explain')
    
    if not user_input.strip():
        return jsonify({"error": "Input cannot be empty"}), 400
        
    prompts = {
        "explain": f"Explain the following concept simply, as if I am 5 years old:\n\n{user_input}",
        "summarize": f"Provide a concise, professional summary of the following text:\n\n{user_input}",
        "quiz": f"Generate 3 multiple-choice questions based on this text. Provide the correct answers at the bottom:\n\n{user_input}"
    }

    prompt = prompts.get(feature, prompts["explain"])
    
    try:
        response = model.generate_content(prompt)
        return jsonify({"response": response.text}), 200
        
    except Exception as e:
        # Catch any API errors (like rate limits or bad keys)
        return jsonify({"error": f"Failed to generate response: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)