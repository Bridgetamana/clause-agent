# ClauseClarity

ClauseClarity is a secure AI agent designed to be a personal AI paralegal for freelancers, solopreneurs, and small businesses. It eliminates the fear and uncertainty of signing client contracts by providing intelligent, personalized contract analysis against your specific business rules.

## How It Works

### 1. **Teach It Your Rules**

Create a private "Company Playbook" with your non-negotiables:

- "I must be paid within 30 days"
- "Liability must be capped at contract value"
- "Early termination clause required"

### 2. **Upload a Contract**

Just drop in the PDF you received from a client. Our AI securely processes it without storing your sensitive documents.

### 3. **Get a Simple Report**

Receive a color-coded analysis:

- 🟢 **Green**: Clauses that comply with your rules
- 🟡 **Yellow**: Clauses needing attention
- 🔴 **Red**: Deal-breakers that violate your playbook

## Tech Stack

### Frontend

- **React 19** with Vite for lightning-fast development
- **TailwindCSS** for modern, responsive design
- **Auth0 React SDK** for secure authentication

### Backend

- **FastAPI** (Python) for high-performance API
- **Auth0** for authentication and authorization
- **JWT** token validation with RS256
- **Pydantic** for robust data validation

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.9+
- Auth0 account (free tier available)

### Frontend Setup

```bash
git clone https://github.com/Bridgetamana/clause-agent.git
cd clause-agent

# Install frontend dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python main.py
```

### Environment Configuration

Create `.env.local` in the root directory:

```env
# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-audience

# API Configuration
VITE_API_URL=http://localhost:8000

# Backend Configuration (backend/.env)
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_AUDIENCE=your-api-audience
CORS_ORIGINS=http://localhost:5173
PORT=8000
```

## 📄 License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file.
