import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, XCircle, X } from 'lucide-react';
import './Auth.scss';

function Auth({ closeAuth }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [form, setForm] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Check if user is remembered
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            const user = JSON.parse(rememberedUser);
            setForm(prev => ({ ...prev, email: user.email }));
            setRememberMe(true);
        }
    }, []);

    useEffect(() => {
        // Calculate password strength
        if (form.password) {
            let strength = 0;
            if (form.password.length >= 8) strength++;
            if (/[a-z]/.test(form.password) && /[A-Z]/.test(form.password)) strength++;
            if (/\d/.test(form.password)) strength++;
            if (/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) strength++;
            setPasswordStrength(strength);
        } else {
            setPasswordStrength(0);
        }
    }, [form.password]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (isSignUp) {
            if (!form.name.trim()) {
                newErrors.name = 'Name is required';
            } else if (form.name.trim().length < 2) {
                newErrors.name = 'Name must be at least 2 characters';
            }
        }

        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(form.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (isSignUp && form.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (isSignUp) {
            if (!form.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (form.password !== form.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            setMessage({ text: 'Please fix the errors above', type: 'error' });
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (isSignUp) {
            // Sign Up
            if (users.find(u => u.email === form.email)) {
                setMessage({ text: 'This email is already registered!', type: 'error' });
            } else {
                const newUser = {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    createdAt: new Date().toISOString()
                };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                setMessage({ text: 'Sign Up successful! You can now Sign In.', type: 'success' });
                setForm({ name: '', email: '', password: '', confirmPassword: '' });
                setTimeout(() => {
                    setIsSignUp(false);
                    setMessage({ text: '', type: '' });
                }, 2000);
            }
        } else {
            // Sign In
            const user = users.find(u => u.email === form.email && u.password === form.password);
            if (user) {
                setMessage({ text: `Welcome back, ${user.name || user.email}!`, type: 'success' });
                
                // Handle remember me
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', JSON.stringify({ email: user.email }));
                } else {
                    localStorage.removeItem('rememberedUser');
                }
                
                // Store current user session
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                setForm({ name: '', email: '', password: '', confirmPassword: '' });
                
                // You can redirect or update app state here
                setTimeout(() => {
                    setMessage({ text: '', type: '' });
                }, 3000);
            } else {
                setMessage({ text: 'Invalid email or password!', type: 'error' });
            }
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setMessage({ text: '', type: '' });
        setErrors({});
        setForm({ name: '', email: form.email, password: '', confirmPassword: '' });
    };

    const getPasswordStrengthLabel = () => {
        const labels = ['Weak', 'Fair', 'Good', 'Strong'];
        return labels[passwordStrength - 1] || 'Weak';
    };

    const getPasswordStrengthColor = () => {
        const colors = ['#e53935', '#fb8c00', '#fdd835', '#43a047'];
        return colors[passwordStrength - 1] || '#e53935';
    };

    const isModal = !!closeAuth;

    return (
        <motion.div
            className={`auth-container ${isModal ? 'modal' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={isModal ? closeAuth : undefined}
        >
            <motion.div
                className="auth-card"
                key={isSignUp ? 'signup' : 'signin'}
                initial={{ scale: 0.8, rotateY: 90 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                onClick={(e) => e.stopPropagation()}
            >
                {isModal && (
                    <motion.button
                        className="close-btn"
                        onClick={closeAuth}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <X size={24} />
                    </motion.button>
                )}
                
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </motion.h2>
                
                <motion.p 
                    className="auth-subtitle"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {isSignUp ? 'Sign up to get started' : 'Sign in to continue'}
                </motion.p>

                <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {isSignUp && (
                            <motion.div
                                className="input-group"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="input-wrapper">
                                    <User className="input-icon" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className={errors.name ? 'error' : ''}
                                    />
                                </div>
                                {errors.name && (
                                    <motion.span 
                                        className="error-message"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {errors.name}
                                    </motion.span>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div 
                        className="input-group"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                className={errors.email ? 'error' : ''}
                            />
                        </div>
                        {errors.email && (
                            <motion.span 
                                className="error-message"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {errors.email}
                            </motion.span>
                        )}
                    </motion.div>

                    <motion.div 
                        className="input-group"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className={errors.password ? 'error' : ''}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <motion.span 
                                className="error-message"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {errors.password}
                            </motion.span>
                        )}
                        
                        {isSignUp && form.password && (
                            <motion.div 
                                className="password-strength"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <div className="strength-bar">
                                    <motion.div 
                                        className="strength-fill"
                                        initial={{ width: 0 }}
                                        animate={{ 
                                            width: `${(passwordStrength / 4) * 100}%`,
                                            backgroundColor: getPasswordStrengthColor()
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                <span 
                                    className="strength-label"
                                    style={{ color: getPasswordStrengthColor() }}
                                >
                                    {getPasswordStrengthLabel()}
                                </span>
                            </motion.div>
                        )}
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {isSignUp && (
                            <motion.div
                                className="input-group"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="input-wrapper">
                                    <Lock className="input-icon" size={20} />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        className={errors.confirmPassword ? 'error' : ''}
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <motion.span 
                                        className="error-message"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {errors.confirmPassword}
                                    </motion.span>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isSignUp && (
                        <motion.div 
                            className="remember-me"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span>Remember me</span>
                            </label>
                        </motion.div>
                    )}

                    <motion.button 
                        type="submit"
                        className="submit-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </motion.button>
                </form>

                <motion.p 
                    className="toggle-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <span onClick={toggleMode}>
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </span>
                </motion.p>

                <AnimatePresence>
                    {message.text && (
                        <motion.div 
                            className={`message ${message.type}`}
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            {message.type === 'success' ? (
                                <CheckCircle size={18} />
                            ) : (
                                <XCircle size={18} />
                            )}
                            <span>{message.text}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

export default Auth;
