#!/usr/bin/env python3
"""
Auto-installer for Figma Test Case Generator
Installs all required packages automatically
"""

import subprocess
import sys
import os

def install_packages():
    """Install required packages"""
    packages = [
        'flask',
        'requests',
        'gunicorn'
    ]
    
    print("📦 Installing required packages...")
    print("   This may take a few minutes...")
    
    for package in packages:
        print(f"   Installing {package}...")
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])
            print(f"   ✅ {package} installed successfully")
        except subprocess.CalledProcessError:
            print(f"   ❌ Failed to install {package}")
            return False
    
    return True

def create_directories():
    """Create required directories"""
    directories = [
        'templates',
        'static',
        'static/js',
        'static/css'
    ]
    
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"   📁 Created directory: {directory}")

if __name__ == '__main__':
    print("🚀 Figma Test Case Generator - Auto Installer")
    print("=" * 50)
    
    # Create directories
    print("📁 Creating project structure...")
    create_directories()
    
    # Install packages
    if install_packages():
        print()
        print("🎉 Installation completed successfully!")
        print("📋 Ready to run the application")
        print()
        print("Next steps:")
        print("   1. Run: python run.py")
        print("   2. Open browser: http://localhost:5000")
        print("   3. Use sample file key: 0a5f17vyqWuJIHAuZoPOSp")
    else:
        print()
        print("❌ Installation failed!")
        print("Please install packages manually:")
        print("   pip install flask requests gunicorn")