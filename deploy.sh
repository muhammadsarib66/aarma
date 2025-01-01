#!/bin/bash
#password = j3R#Q8p,jm73kCc,
# Step 1: Set up variables
SERVER_USER="root"
SERVER_IP="139.84.209.189"
REMOTE_DIR="/var/www/html"
LOCAL_BUILD_DIR="dist"
REACT_APP_DIR="/c/Users/Sarib Noor/Desktop/VERIOR/aarma"

# Step 2: Navigate to the React app directory and pull the latest code (if using Git)
echo "Navigating to the React app directory..."
cd $REACT_APP_DIR

echo "Pulling latest changes from Git repository..."
git pull origin main  # Change 'main' to your branch name if necessary

# Step 3: Build the React app
echo "Building the React app..."
npm install  
npm run build  

# Step 4: Copy build files to the server
echo "Copying build files to the server..."
scp -r $LOCAL_BUILD_DIR/* $SERVER_USER@$SERVER_IP:$REMOTE_DIR/dist/

# Step 5: Restart Nginx to apply changes
echo "Restarting Nginx..."
ssh $SERVER_USER@$SERVER_IP "sudo systemctl reload nginx"

echo "Deployment completed successfully!"