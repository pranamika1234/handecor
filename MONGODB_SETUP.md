# MongoDB Setup Guide for Windows

## Option 1: Install MongoDB Community Edition (Recommended)

1. **Download MongoDB**
   - Go to https://www.mongodb.com/try/download/community
   - Select Windows
   - Download the MSI installer

2. **Install MongoDB**
   - Run the downloaded .msi file
   - Choose "Complete" installation
   - Install as a Service (check this option)
   - Install MongoDB Compass (optional GUI tool)

3. **Verify Installation**
   Open Command Prompt and run:
   ```cmd
   mongod --version
   ```

4. **Start MongoDB**
   MongoDB should start automatically as a service. If not:
   ```cmd
   net start MongoDB
   ```

## Option 2: Use MongoDB Atlas (Free Cloud Database)

If you don't want to install MongoDB locally, use MongoDB Atlas:

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Create a free M0 cluster
   - Choose a cloud provider and region
   - Wait for cluster to deploy (2-3 minutes)

3. **Configure Access**
   - Click "Database Access" → Add New Database User
   - Create username and password
   - Click "Network Access" → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

4. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password

5. **Update .env file**
   Edit `backend/.env`:
   ```
   PORT=4000
   MONGO_URI=mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/cartzio-handmade?retryWrites=true&w=majority
   ```

## Quick Start After Setup

```bash
# Backend
cd backend
npm run seed    # Load sample products
npm run dev     # Start backend server

# Frontend (new terminal)
cd frontend
npm run dev     # Start frontend server
```

Visit http://localhost:5173

## Troubleshooting

### MongoDB won't start
- Check if the service is running: `net start MongoDB`
- Or start manually: `mongod`

### Connection refused
- Make sure MongoDB is running
- Check if port 27017 is available
- Firewall might be blocking the connection

### Can't connect to MongoDB Atlas
- Check username/password in connection string
- Verify IP whitelist includes 0.0.0.0/0
- Check your internet connection
