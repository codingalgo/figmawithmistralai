# Figma Test Case Generator - Ready to Run Package

Generate consistent test cases from Figma designs using AI - no setup required!

## Quick Start (Windows PC)

1. **Download this package** to your computer
2. **Open Command Prompt** in the package folder
3. **Run the installer**:
   ```cmd
   python install.py
   ```
4. **Start the application**:
   ```cmd
   python run.py
   ```
5. **Open your browser** and go to: `http://localhost:5000`

## Features

- **Fixed Mode**: Predefined test cases with consistent DFS navigation pattern
- **Adaptive Mode**: Element-based test case generation  
- **AI Mode**: Mistral AI powered intelligent test case generation
- **Built-in API keys**: No environment variables or configuration needed

## Sample Usage

Use this sample Figma file key to test: `0a5f17vyqWuJIHAuZoPOSp`

## Generated Test Cases Format

The application generates test cases in this format:
```
Navigate from splash to home, CLICK_COORDS, 540, 960, SLEEP, 2, CHECK, POPULAR RECIPES
Open menu from home, CLICK_COORDS, 74, 83, SLEEP, 2, CHECK, Popular recipes
Navigate to saved recipes from menu, CLICK, saved recipes, SLEEP, 2, CHECK, SAVED RECIPES
```

## File Structure

```
figma-test-generator/
├── install.py          # Auto-installer script
├── run.py             # Main application launcher
├── app.py             # Flask web application
├── figma_generator.py # Core logic for test generation
├── main.py            # Application entry point
├── templates/         # HTML templates
│   └── index.html
└── static/           # JavaScript and CSS files
    └── js/
        └── main.js
```

## Troubleshooting

- **Python not found**: Install Python 3.8+ from python.org
- **Package installation fails**: Run `pip install flask requests gunicorn` manually
- **Port 5000 in use**: Change port in `run.py` to another number like 5001

## API Integration

This package includes pre-configured API credentials for:
- Figma API (for design file access)
- Mistral AI API (for intelligent test generation)

No additional setup required - everything works out of the box!

---

Ready to generate professional test cases from your Figma designs!