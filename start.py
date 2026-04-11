#!/usr/bin/env python3
"""
Cineplus Startup Script
This script initializes all components of the Cineplus system.
"""

import os
import sys
import subprocess
import webbrowser
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible."""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8+ required")
        return False
    print("✅ Python version:", sys.version.split()[0])
    return True

def install_dependencies():
    """Install Python dependencies."""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        return False

def run_ml_prediction():
    """Run ML prediction demo."""
    try:
        result = subprocess.run([sys.executable, "ml/prediction.py"], capture_output=True, text=True)
        print("📊 ML Prediction Results:")
        print(result.stdout)
        return True
    except Exception as e:
        print("❌ ML prediction failed:", str(e))
        return False

def open_frontend():
    """Open frontend in browser."""
    frontend_path = Path("app/cineplus.html").absolute()
    if frontend_path.exists():
        webbrowser.open(f"file://{frontend_path}")
        print("🌐 Frontend opened in browser")
        return True
    else:
        print("❌ Frontend file not found")
        return False

def main():
    """Main startup function."""
    print("🎬 Starting Cineplus System...")
    print("=" * 50)

    # Check Python version
    if not check_python_version():
        return

    # Install dependencies
    if not install_dependencies():
        return

    # Run ML demo
    run_ml_prediction()

    # Open frontend
    open_frontend()

    print("=" * 50)
    print("🎉 Cineplus system ready!")
    print("📁 Project structure:")
    print("   ├── app/ (Frontend)")
    print("   ├── api/ (Backend)")
    print("   ├── db/ (Database)")
    print("   ├── ml/ (Machine Learning)")
    print("   └── config.py (Configuration)")

if __name__ == "__main__":
    main()