# Cineplus - Cinema Management System

## 📋 Overview
Cineplus is a complete cinema management system featuring:
- **Frontend**: Responsive web application with desktop and mobile versions
- **Backend**: C# API with object-oriented programming
- **Database**: SQL schema for data persistence
- **Machine Learning**: Audience prediction models
- **Configuration**: Python-based configuration management

## 🏗️ Project Structure

```
cineplus/
├── app/                    # Frontend Application
│   ├── cineplus.html       # Desktop version
│   ├── mobile.html         # Mobile version
│   ├── app.js             # Desktop JavaScript logic
│   ├── mobile_app.js      # Mobile JavaScript logic
│   ├── styles.css         # Desktop CSS styles
│   ├── mobile_styles.css  # Mobile CSS styles
│   └── package.json       # Frontend dependencies
├── api/                    # Backend API
│   ├── Models.cs          # C# data models
│   └── Startup.cs         # C# application startup
├── db/                     # Database
│   └── database_schema.sql # SQL database schema
├── ml/                     # Machine Learning
│   └── prediction.py      # Audience prediction model
├── docs/                   # Documentation
│   └── README.md          # Project documentation
├── config.py              # Python configuration file
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (for frontend)
- .NET SDK (for backend)
- Python 3.8+ (for ML and config)
- SQL Server or compatible database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cineplus
   ```

2. **Setup Python environment**
   ```bash
   pip install -r requirements.txt
   ```

3. **Setup frontend**
   ```bash
   cd app
   npm install
   npm start
   ```

4. **Setup backend**
   ```bash
   cd api
   dotnet build
   dotnet run
   ```

5. **Setup database**
   ```sql
   -- Run the schema from db/database_schema.sql
   ```

## 🎯 Features

### Frontend
- **Desktop App**: Full-featured cinema interface
- **Mobile App**: Optimized mobile experience
- **User Authentication**: Login and registration with email validation
- **Movie Selection**: Browse movies, select sessions and seats
- **Combo Purchase**: Add food and drink combos
- **Responsive Design**: Works on all devices

### Backend
- **REST API**: C# Web API
- **User Management**: Registration and authentication
- **Session Management**: Movie sessions and seat booking
- **Data Models**: Object-oriented design

### Database
- **Relational Schema**: SQL tables for users, movies, sessions, bookings
- **Data Integrity**: Foreign keys and constraints

### Machine Learning
- **Audience Prediction**: Predict movie attendance based on day and genre
- **Configurable Models**: Easy to extend with new algorithms

## 🔧 Configuration

All system configuration is managed through `config.py`:

```python
# Database settings
DATABASE_CONFIG = {
    'host': 'localhost',
    'database': 'cineplus_db'
}

# API settings
API_CONFIG = {
    'port': 8000
}

# Email validation domains
EMAIL_DOMAINS = ['.com', '.com.br']
```

## 📱 Usage

### Running the Application
1. Start the backend API
2. Serve the frontend files
3. Access through web browser

### Email Validation
User registration requires emails ending with `.com` or `.com.br`

### ML Predictions
Run predictions:
```bash
python ml/prediction.py
```

## 🧪 Testing

### Frontend Testing
- Open `app/cineplus.html` in browser
- Test user registration, login, movie selection
- Verify mobile responsiveness with `app/mobile.html`

### Backend Testing
- Use API endpoints for CRUD operations
- Test user authentication

### ML Testing
- Run prediction script with sample data
- Validate prediction accuracy

## 📚 Documentation

Detailed documentation available in `docs/README.md`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Cineplus Development Team

## 🙏 Acknowledgments

- UNIP PIM III Project
- Cinema industry inspiration