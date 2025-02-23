const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const AUTH_FILE_PATH = path.join(__dirname, '../src/config/auth.json');

async function addUser(userData) {
  // Read current auth file
  const authData = JSON.parse(fs.readFileSync(AUTH_FILE_PATH, 'utf-8'));
  
  // Hash password with explicit salt rounds
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  // Verify the hash works
  const verified = await bcrypt.compare(userData.password, hashedPassword);
  console.log('Password verification test:', verified);
  
  // Create new user
  const newUser = {
    id: crypto.randomUUID(),
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName || '',
    password: hashedPassword,
    // Professional info
    company: userData.company || '',
    role: userData.role || '',
    industry: userData.industry || '',
    companySize: userData.companySize || '',
    department: userData.department || '',
    // Location info
    location: userData.location || '',
    timezone: userData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    // Business context
    interests: userData.interests || [],
    expertise: userData.expertise || [],
    businessGoals: userData.businessGoals || [],
    // Communication preferences
    preferences: {
      communicationStyle: userData.preferences?.communicationStyle || 'professional',
      riskTolerance: userData.preferences?.riskTolerance || 'moderate',
      primaryConcerns: userData.preferences?.primaryConcerns || [],
      notificationPreferences: userData.preferences?.notificationPreferences || 'email'
    }
  };
  
  // Add or update user
  const existingUserIndex = authData.users.findIndex(u => u.email === userData.email);
  if (existingUserIndex >= 0) {
    authData.users[existingUserIndex] = newUser;
  } else {
    authData.users.push(newUser);
  }
  
  // Save back to file
  fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(authData, null, 2));
  console.log(`User ${userData.email} has been added/updated successfully!`);
}

// Add a test user with rich profile information
addUser({
  email: 'henry@techstartup.co',
  password: 'Aika!',
  firstName: 'Henry',
  lastName: 'Chen',
  // Professional info
  company: 'TechStartup Inc.',
  role: 'Founder & CEO',
  industry: 'Software Development',
  companySize: '10-50',
  department: 'Executive',
  // Location info
  location: 'San Francisco, CA',
  timezone: 'America/Los_Angeles',
  // Business context
  interests: ['AI/ML', 'Startup Growth', 'Tech Innovation', 'Risk Management'],
  expertise: ['Software Development', 'Product Strategy', 'Team Leadership'],
  businessGoals: ['Scale Operations', 'Enhance Security', 'Optimize Insurance Coverage'],
  // Communication preferences
  preferences: {
    communicationStyle: 'direct',
    riskTolerance: 'moderate',
    primaryConcerns: ['cyber security', 'professional liability', 'business interruption'],
    notificationPreferences: 'email'
  }
});
