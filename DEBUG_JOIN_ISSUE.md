# Debugging Group Projects Join Issue

## Problem: Clicked join but no members show up

## Steps to Debug:

### 1. Check if you're logged in
- Look for the yellow warning message at the top of the page
- If you see "You are not logged in", you need to log in first

### 2. Open Browser Console
- Press F12 or right-click → Inspect → Console tab
- Look for debug messages when you click Join

### 3. Test the Join Process
1. Click "Join Project" on any project
2. Check console for:
   - "Current user data:" - should show user info
   - "User ID:" - should show your user ID
   - "Inserting participant record..." - should show the insert attempt
   - "Insert result:" - should show success data
   - Success alert should show your user ID

### 4. Test View Members
1. Click "👥 View Members" on a project
2. Check console for:
   - "Fetching participants..." - should show project ID
   - "Participants data:" - should show participant array
   - "Participants error:" - should be null if working

### 5. Check Database
- Go to Supabase Dashboard → Table Editor
- Look for `group_project_participants` table
- Check if records are being inserted

### 6. Common Issues:
- **Not logged in** → Log in first
- **Table doesn't exist** → Run the SQL file
- **RLS policies** → Check table permissions
- **Network issues** → Check internet connection

## Quick Test Script:
Include this file in your HTML and run `testParticipantsTable()` in console:
```javascript
// Copy the test-participants.js content and run in console
```

## Expected Results:
- Join should create a record in `group_project_participants`
- View Members should show participants with names and join dates
- Button should change to "✅ Joined" after joining