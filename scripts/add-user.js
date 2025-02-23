const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const AUTH_FILE_PATH = path.join(__dirname, '../src/config/auth.json');

async function addUser(email, password, firstName) {
  // Read current auth file
  const authData = JSON.parse(fs.readFileSync(AUTH_FILE_PATH, 'utf-8'));
  
  // Hash password with explicit salt rounds
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Verify the hash works
  const verified = await bcrypt.compare(password, hashedPassword);
  console.log('Password verification test:', verified);
  
  // Create new user
  const newUser = {
    id: crypto.randomUUID(),
    email,
    firstName,
    password: hashedPassword
  };
  
  // Add or update user
  const existingUserIndex = authData.users.findIndex(u => u.email === email);
  if (existingUserIndex >= 0) {
    authData.users[existingUserIndex] = newUser;
  } else {
    authData.users.push(newUser);
  }
  
  // Save back to file
  fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(authData, null, 2));
  console.log(`User ${email} has been added/updated successfully!`);
}

// Add a test user
addUser('tiaan@aiko.insure', 'Aika!', 'Tiaan');
