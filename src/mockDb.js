// mockDb.js - Simulates a backend with localStorage

const STORAGE_KEYS = {
    USERS: 'KODBANK_USERS',
    SESSION: 'token', // Updated to 'token' as per user request
};

// Initialize DB
const getStoredUsers = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
const saveUsers = (users) => localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getStoredUsers();

    if (users.find(u => u.username === userData.username || u.email === userData.email)) {
        throw { response: { data: { message: 'Username or Email already exists' } } };
    }

    const newUser = {
        ...userData,
        balance: 100000.00,
        role: 'Customer',
        pin: userData.pin || '0000'
    };

    users.push(newUser);
    saveUsers(users);

    return { data: { message: 'User registered successfully' } };
};

/**
 * Login user
 */
export const loginUser = async ({ username, password }) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getStoredUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        throw { response: { data: { message: 'Invalid username or password' } } };
    }

    const token = btoa(JSON.stringify({
        username: user.username,
        uid: user.uid,
        role: user.role,
        exp: Date.now() + 3600000
    }));

    localStorage.setItem(STORAGE_KEYS.SESSION, token);

    return { data: { token, message: 'Login successful' } };
};

/**
 * Get balance with PIN verification
 */
export const getBalance = async (token, pin) => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!session || session !== token) {
        throw { response: { data: { message: 'Invalid or expired token' } } };
    }

    try {
        const payload = JSON.parse(atob(session));
        if (payload.exp < Date.now()) {
            localStorage.removeItem(STORAGE_KEYS.SESSION);
            throw { response: { data: { message: 'Token expired' } } };
        }

        const users = getStoredUsers();
        const user = users.find(u => u.uid === payload.uid);

        if (!user) {
            throw { response: { data: { message: 'User not found' } } };
        }

        if (user.pin !== pin) {
            throw { response: { data: { message: 'Incorrect PIN' } } };
        }

        return { data: { balance: user.balance } };
    } catch (e) {
        throw { response: { data: { message: 'Invalid token or PIN' } } };
    }
};

/**
 * Deposit credits
 */
export const depositCredits = async (token, amount) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!session) throw { response: { data: { message: 'Unauthorized' } } };

    const payload = JSON.parse(atob(session));
    const users = getStoredUsers();
    const userIndex = users.findIndex(u => u.uid === payload.uid);

    if (userIndex === -1) throw { response: { data: { message: 'User not found' } } };

    users[userIndex].balance += parseFloat(amount);
    saveUsers(users);

    return { data: { balance: users[userIndex].balance, message: 'Deposit successful!' } };
};

export const getCurrentToken = () => localStorage.getItem(STORAGE_KEYS.SESSION);
export const logout = () => localStorage.removeItem(STORAGE_KEYS.SESSION);

export const getUserDetails = () => {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!session) return null;
    return JSON.parse(atob(session));
};
