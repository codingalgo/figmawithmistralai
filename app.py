import os
import logging
from flask import Flask, render_template, request, jsonify
from figma_generator import SimpleFigmaTestGenerator

# Set up logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask app
app = Flask(__name__)
app.secret_key = "figma-test-generator-ready-to-run-2024"

# Built-in API credentials - ready to use without environment variables
FIGMA_TOKEN = "figd_k5A8jECZ26zBkrOW8FPt5YT7FaHe-Cia3ovUTLNS"
MISTRAL_API_KEY = "dvDVGrJeazVk52WNbg0Yrivi4vm77g00"

@app.route('/')
def index():
    """Main page with the test interface"""
    return render_template('index.html', 
                         figma_token=FIGMA_TOKEN[:20] + "..." if len(FIGMA_TOKEN) > 20 else FIGMA_TOKEN,
                         mistral_key=MISTRAL_API_KEY[:20] + "..." if len(MISTRAL_API_KEY) > 20 else MISTRAL_API_KEY)

@app.route('/generate', methods=['POST'])
def generate_test_cases():
    """Generate test cases from Figma file"""
    try:
        data = request.get_json()
        file_key = data.get('file_key', '').strip()
        generation_mode = data.get('mode', 'fixed')
        custom_instructions = data.get('instructions', '').strip()
        
        if not file_key:
            return jsonify({
                'success': False,
                'error': 'Figma file key is required'
            }), 400
        
        # Initialize the generator
        generator = SimpleFigmaTestGenerator(FIGMA_TOKEN, MISTRAL_API_KEY)
        
        # Extract elements from Figma
        app.logger.info(f"Extracting elements from Figma file: {file_key}")
        figma_data = generator.extract_figma_elements(file_key)
        
        # Generate test cases based on mode
        if generation_mode == 'fixed':
            app.logger.info("Generating fixed format test cases")
            test_cases = generator.generate_fixed_test_cases(
                figma_data['elements'], 
                figma_data['file_name']
            )
        elif generation_mode == 'adaptive':
            app.logger.info("Generating adaptive test cases")
            test_cases = generator.generate_adaptive_test_cases(
                figma_data['elements'], 
                figma_data['file_name']
            )
        else:  # ai mode
            app.logger.info("Generating AI test cases with Mistral")
            test_cases = generator.generate_test_cases_with_ai(
                figma_data['elements'], 
                figma_data['file_name'],
                custom_instructions
            )
        
        return jsonify({
            'success': True,
            'file_name': figma_data['file_name'],
            'total_elements': figma_data['total_elements'],
            'elements': figma_data['elements'][:10],  # Show first 10 elements for preview
            'test_cases': test_cases,
            'mode': generation_mode
        })
        
    except Exception as e:
        app.logger.error(f"Error generating test cases: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'Generation failed: {str(e)}'
        }), 500

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'figma_configured': bool(FIGMA_TOKEN and FIGMA_TOKEN != "demo_token"),
        'mistral_configured': bool(MISTRAL_API_KEY and MISTRAL_API_KEY != "demo_key")
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
