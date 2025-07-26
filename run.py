#!/usr/bin/env python3
"""
Figma Test Case Generator - Ready to Run Package
No environment variables needed - everything is built-in!
"""

import os
import sys

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app

if __name__ == '__main__':
    print("🚀 Starting Figma Test Case Generator...")
    print("📋 Built-in API keys included - no setup required!")
    print("🌐 Open your browser and go to: http://localhost:5000")
    print("🔧 Features: Fixed mode, Adaptive mode, AI mode")
    print("📝 Sample Figma file key: 0a5f17vyqWuJIHAuZoPOSp")
    print("-" * 50)
    
    app.run(host='0.0.0.0', port=5000, debug=True)