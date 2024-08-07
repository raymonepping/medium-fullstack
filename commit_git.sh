#!/bin/bash

# Navigate to the project directory
cd ./ || exit

# Get the current date
DD=$(date +'%d')
MM=$(date +'%m')
YYYY=$(date +'%Y')

# Define the commit message with the current date
COMMIT_MESSAGE="$DD/$MM/$YYYY - Updated configuration and fixed bugs"

# Check the status of your working directory
git status

# Stage all changes
git add .

# Commit the changes with the dynamically generated message
git commit -m "$COMMIT_MESSAGE"

# Push changes to the 'main' branch on the remote repository
git push origin main

# Start ssh-agent if not already running
if [ -z "$SSH_AUTH_SOCK" ]; then
    eval "$(ssh-agent -s)"
    ssh-add -A
fi

# Optionally, handle merging `main` into `master`
read -p "Do you want to merge 'main' into 'master'? (y/n): " merge_choice

if [ "$merge_choice" == "y" ]; then
    echo "Switching to master branch..."
    git checkout master
    
    echo "Pulling latest changes from remote master..."
    git pull origin master

    echo "Merging 'main' into 'master'..."
    git merge main
    
    echo "Pushing changes to remote master..."
    git push origin master

    # Switch back to the main branch
    echo "Switching back to main branch..."
    git checkout main
fi

# Optionally, update the `main` branch with the latest changes from `master`
read -p "Do you want to update 'main' with the latest changes from 'master'? (y/n): " update_choice

if [ "$update_choice" == "y" ]; then
    echo "Pulling latest changes from remote master into main..."
    git pull origin master
    
    echo "Pushing updated 'main' to remote..."
    git push origin main
fi
