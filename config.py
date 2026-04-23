# Cineplus Configuration File
# This file contains all configurations for the Cineplus system

# Database Configuration
DATABASE_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'database': 'cineplus_db',
    'user': 'cineplus_user',
    'password': 'secure_password'
}

# API Configuration
API_CONFIG = {
    'host': '0.0.0.0',
    'port': 8000,
    'debug': True
}

# Frontend Configuration
FRONTEND_CONFIG = {
    'title': 'Cineplus - Cinema System',
    'version': '1.0.0',
    'author': 'Cineplus Team'
}

# ML Configuration
ML_CONFIG = {
    'model_path': 'ml/models/',
    'data_path': 'ml/data/',
    'prediction_threshold': 0.8
}

# Email Validation Rules
EMAIL_DOMAINS = ['.com', '.com.br']

# Logging Configuration
LOGGING_CONFIG = {
    'level': 'INFO',
    'file': 'logs/cineplus.log',
    'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
}

# Security Settings
SECURITY_CONFIG = {
    'secret_key': 'your-secret-key-here',
    'token_expiry': 3600,  # seconds
    'password_min_length': 8
}

# Cinema Settings
CINEMA_CONFIG = {
    'name': 'Cineplus',
    'location': 'São Paulo, Brazil',
    'total_seats': 100,
    'opening_hours': '10:00 - 22:00'
}

# Feature Flags
FEATURE_FLAGS = {
    'enable_reservations': True,
    'enable_ml_predictions': True,
    'enable_mobile_app': True,
    'enable_notifications': False
}