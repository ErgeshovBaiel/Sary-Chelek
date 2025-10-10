import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle,
  XCircle,
  Languages,
  Sparkles,
  Shield
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './RegistrationGate.scss'

function RegistrationGate ({ onRegistrationComplete }) {
  const { i18n } = useTranslation()
  const [step, setStep] = useState(1) // 1: Language selection, 2: Registration
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState({ text: '', type: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  const [authMode, setAuthMode] = useState('signup') // 'signup' | 'signin'

  useEffect(() => {
    // Calculate password strength
    if (form.password) {
      let strength = 0
      if (form.password.length >= 8) strength++
      if (/[a-z]/.test(form.password) && /[A-Z]/.test(form.password)) strength++
      if (/\d/.test(form.password)) strength++
      if (/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) strength++
      setPasswordStrength(strength)
    } else {
      setPasswordStrength(0)
    }
  }, [form.password])

  // Auto-clear success messages after 2 seconds
  useEffect(() => {
    if (message.type === 'success' && message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' })
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [message.type, message.text])

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (authMode === 'signup') {
      if (!form.name.trim()) {
        newErrors.name =
          selectedLanguage === 'kg'
            ? 'Аты-жөнүңүздү киргизиңиз'
            : 'Введите ваше имя'
      } else if (form.name.trim().length < 2) {
        newErrors.name =
          selectedLanguage === 'kg'
            ? 'Аты-жөнү 2 тамгадан кем болбошу керек'
            : 'Имя должно быть не менее 2 символов'
      }
    }

    if (!form.email.trim()) {
      newErrors.email =
        selectedLanguage === 'kg'
          ? 'Email дарегиңизди киргизиңиз'
          : 'Введите ваш email'
    } else if (!validateEmail(form.email)) {
      newErrors.email =
        selectedLanguage === 'kg'
          ? 'Email дареги туура эмес'
          : 'Неверный формат email'
    }

    if (!form.password) {
      newErrors.password =
        selectedLanguage === 'kg' ? 'Сырсөздү киргизиңиз' : 'Введите пароль'
    } else if (form.password.length < 8) {
      newErrors.password =
        selectedLanguage === 'kg'
          ? 'Сырсөз 8 тамгадан кем болбошу керек'
          : 'Пароль должен быть не менее 8 символов'
    }

    if (authMode === 'signup') {
      if (!form.confirmPassword) {
        newErrors.confirmPassword =
          selectedLanguage === 'kg'
            ? 'Сырсөздү ырастаңыз'
            : 'Подтвердите пароль'
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword =
          selectedLanguage === 'kg'
            ? 'Сырсөздөр дал келбейт'
            : 'Пароли не совпадают'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLanguageSelect = lang => {
    setSelectedLanguage(lang)
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
    const users = JSON.parse(localStorage.getItem('users')) || []
    setAuthMode(users.length > 0 ? 'signin' : 'signup')
    setTimeout(() => setStep(2), 600)
  }

  const switchLanguage = () => {
    const newLang = selectedLanguage === 'kg' ? 'ru' : 'kg'
    setSelectedLanguage(newLang)
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!validateForm()) {
      setMessage({
        text:
          selectedLanguage === 'kg'
            ? 'Маалыматтарды туура толтуруңуз'
            : 'Пожалуйста, исправьте ошибки',
        type: 'error'
      })
      return
    }

    setIsLoading(true)

    // Simulate auth (sign in/up)
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || []

      if (authMode === 'signin') {
        const existing = users.find(u => u.email === form.email)
        if (!existing) {
          setMessage({
            text:
              selectedLanguage === 'kg'
                ? 'Тиркелген аккаунт табылган жок'
                : 'Аккаунт не найден',
            type: 'error'
          })
          setIsLoading(false)
          return
        }
        if (existing.password !== form.password) {
          setMessage({
            text:
              selectedLanguage === 'kg'
                ? 'Сырсөз туура эмес'
                : 'Неверный пароль',
            type: 'error'
          })
          setIsLoading(false)
          return
        }
        localStorage.setItem('currentUser', JSON.stringify(existing))
        localStorage.setItem('isRegistered', 'true')
        i18n.changeLanguage(existing.language || selectedLanguage)
        setMessage({
          text:
            selectedLanguage === 'kg' ? 'Кирүү ийгиликтүү!' : 'Вход выполнен!',
          type: 'success'
        })
        setTimeout(() => {
          setIsLoading(false)
          onRegistrationComplete(existing)
        }, 1200)
      } else {
        if (users.find(u => u.email === form.email)) {
          setMessage({
            text:
              selectedLanguage === 'kg'
                ? 'Бул email катталган!'
                : 'Этот email уже зарегистрирован!',
            type: 'error'
          })
          setIsLoading(false)
        } else {
          const newUser = {
            name: form.name,
            email: form.email,
            password: form.password,
            language: selectedLanguage,
            createdAt: new Date().toISOString()
          }
          users.push(newUser)
          localStorage.setItem('users', JSON.stringify(users))
          localStorage.setItem('currentUser', JSON.stringify(newUser))
          localStorage.setItem('isRegistered', 'true')
          setMessage({
            text:
              selectedLanguage === 'kg'
                ? 'Ийгиликтүү катталдыңыз!'
                : 'You have successfully registered',
            type: 'success'
          })
          setTimeout(() => {
            setIsLoading(false)
            onRegistrationComplete(newUser)
          }, 2000)
        }
      }
    }, 900)
  }

  const getPasswordStrengthLabel = () => {
    const labelsKg = ['Алсыз', 'Орточо', 'Жакшы', 'Күчтүү']
    const labelsRu = ['Слабый', 'Средний', 'Хороший', 'Сильный']
    const labels = selectedLanguage === 'kg' ? labelsKg : labelsRu
    return labels[passwordStrength - 1] || labels[0]
  }

  const getPasswordStrengthColor = () => {
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#06b6d4']
    return colors[passwordStrength - 1] || '#ef4444'
  }

  return (
    <div className='registration-gate'>
      {/* Animated Background */}
      <div className='background-animation'>
        <div className='gradient-orb orb-1'></div>
        <div className='gradient-orb orb-2'></div>
        <div className='gradient-orb orb-3'></div>
        <div className='floating-shapes'>
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`shape shape-${i + 1}`}></div>
          ))}
        </div>
      </div>

      <AnimatePresence mode='wait'>
        {step === 1 && (
          <motion.div
            key='language-selection'
            className='language-selection'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className='welcome-content'
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                className='icon-wrapper'
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <Languages className='globe-icon' size={70} strokeWidth={1.5} />
                <Sparkles className='sparkle-icon' size={24} />
              </motion.div>

              <h1>Сары-Челек</h1>
              <p className='subtitle'>Кош келиңиз • Добро пожаловать</p>
              <p className='description'>Тилди тандаңыз • Выберите язык</p>
            </motion.div>

            <div className='language-buttons'>
              <motion.button
                className='language-btn kg-btn'
                onClick={() => handleLanguageSelect('kg')}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                initial={{ x: -120, opacity: 0, rotateY: -90 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
              >
                <div className='btn-glow'></div>
                <span className='flag'>🇰🇬</span>
                <div className='lang-info'>
                  <span className='lang-name'>Кыргызча</span>
                  <span className='lang-native'>Kyrgyz Language</span>
                </div>
                <div className='btn-arrow'>→</div>
              </motion.button>

              <motion.button
                className='language-btn ru-btn'
                onClick={() => handleLanguageSelect('ru')}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                initial={{ x: 120, opacity: 0, rotateY: 90 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
              >
                <div className='btn-glow'></div>
                <span className='flag'>🇷🇺</span>
                <div className='lang-info'>
                  <span className='lang-name'>Русский</span>
                  <span className='lang-native'>Russian Language</span>
                </div>
                <div className='btn-arrow'>→</div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key='registration-form'
            className='registration-form-container'
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className='registration-card'
              initial={{ scale: 0.9, rotateX: 10 }}
              animate={{ scale: 1, rotateX: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Language Switcher */}
              <motion.button
                className='lang-switcher'
                onClick={switchLanguage}
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Languages size={20} />
                <span>{selectedLanguage === 'kg' ? 'RU' : 'KG'}</span>
              </motion.button>

              <button className='back-btn' onClick={() => setStep(1)}>
                ← {selectedLanguage === 'kg' ? 'Артка' : 'Назад'}
              </button>

              <motion.div
                className='header-section'
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Shield className='shield-icon' size={40} />
                <h2>
                  {authMode === 'signin'
                    ? selectedLanguage === 'kg'
                      ? 'Кирүү'
                      : 'Вход'
                    : selectedLanguage === 'kg'
                    ? 'Катталуу'
                    : 'Регистрация'}
                </h2>
                <p className='form-subtitle'>
                  {authMode === 'signin'
                    ? selectedLanguage === 'kg'
                      ? 'Аккаунтуңуз менен кириңиз'
                      : 'Войдите в свой аккаунт'
                    : selectedLanguage === 'kg'
                    ? 'Сайтка кирүү үчүн катталыңыз'
                    : 'Зарегистрируйтесь для доступа к сайту'}
                </p>
              </motion.div>

              {/* Auth Mode Tabs */}
              <motion.div
                className='auth-tabs'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <button
                  type='button'
                  className={`tab ${authMode === 'signin' ? 'active' : ''}`}
                  onClick={() => setAuthMode('signin')}
                >
                  {selectedLanguage === 'kg' ? 'Кирүү' : 'Вход'}
                </button>
                <button
                  type='button'
                  className={`tab ${authMode === 'signup' ? 'active' : ''}`}
                  onClick={() => setAuthMode('signup')}
                >
                  {selectedLanguage === 'kg' ? 'Катталуу' : 'Регистрация'}
                </button>
              </motion.div>

              <form onSubmit={handleSubmit}>
                {authMode === 'signup' && (
                  <motion.div
                    className='input-group'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label>
                      {selectedLanguage === 'kg' ? 'Аты-жөнү' : 'Полное имя'}
                    </label>
                    <div
                      className={`input-wrapper ${
                        focusedField === 'name' ? 'focused' : ''
                      }`}
                    >
                      <User className='input-icon' size={20} />
                      <input
                        type='text'
                        name='name'
                        placeholder={
                          selectedLanguage === 'kg'
                            ? 'Аты-жөнүңүздү киргизиңиз'
                            : 'Введите ваше имя'
                        }
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        className={errors.name ? 'error' : ''}
                      />
                    </div>
                    {errors.name && (
                      <motion.span
                        className='error-message'
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <XCircle size={14} />
                        {errors.name}
                      </motion.span>
                    )}
                  </motion.div>
                )}

                <motion.div
                  className='input-group'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label>Email</label>
                  <div
                    className={`input-wrapper ${
                      focusedField === 'email' ? 'focused' : ''
                    }`}
                  >
                    <Mail className='input-icon' size={20} />
                    <input
                      type='email'
                      name='email'
                      placeholder={
                        selectedLanguage === 'kg'
                          ? 'Email дарегиңизди киргизиңиз'
                          : 'Введите ваш email'
                      }
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className={errors.email ? 'error' : ''}
                    />
                  </div>
                  {errors.email && (
                    <motion.span
                      className='error-message'
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <XCircle size={14} />
                      {errors.email}
                    </motion.span>
                  )}
                </motion.div>

                <motion.div
                  className='input-group'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label>
                    {selectedLanguage === 'kg' ? 'Сырсөз' : 'Пароль'}
                  </label>
                  <div
                    className={`input-wrapper ${
                      focusedField === 'password' ? 'focused' : ''
                    }`}
                  >
                    <Lock className='input-icon' size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      placeholder={
                        selectedLanguage === 'kg'
                          ? 'Сырсөздү киргизиңиз'
                          : 'Введите пароль'
                      }
                      value={form.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      className={errors.password ? 'error' : ''}
                    />
                    <button
                      type='button'
                      className='toggle-password'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.span
                      className='error-message'
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <XCircle size={14} />
                      {errors.password}
                    </motion.span>
                  )}

                  {form.password && !errors.password && (
                    <motion.div
                      className='password-strength'
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <div className='strength-bar'>
                        <motion.div
                          className='strength-fill'
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(passwordStrength / 4) * 100}%`,
                            backgroundColor: getPasswordStrengthColor()
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <span
                        className='strength-label'
                        style={{ color: getPasswordStrengthColor() }}
                      >
                        {getPasswordStrengthLabel()}
                      </span>
                    </motion.div>
                  )}
                </motion.div>

                {authMode === 'signup' && (
                  <motion.div
                    className='input-group'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label>
                      {selectedLanguage === 'kg'
                        ? 'Сырсөздү ырастоо'
                        : 'Подтвердите пароль'}
                    </label>
                    <div
                      className={`input-wrapper ${
                        focusedField === 'confirmPassword' ? 'focused' : ''
                      }`}
                    >
                      <Lock className='input-icon' size={20} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        placeholder={
                          selectedLanguage === 'kg'
                            ? 'Сырсөздү кайра киргизиңиз'
                            : 'Повторите пароль'
                        }
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField('')}
                        className={errors.confirmPassword ? 'error' : ''}
                      />
                      <button
                        type='button'
                        className='toggle-password'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <motion.span
                        className='error-message'
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <XCircle size={14} />
                        {errors.confirmPassword}
                      </motion.span>
                    )}
                  </motion.div>
                )}

                <motion.button
                  type='submit'
                  className={`submit-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  {isLoading ? (
                    <>
                      <span className='loader'></span>
                      <span>
                        {authMode === 'signin'
                          ? selectedLanguage === 'kg'
                            ? 'Кирүүдө...'
                            : 'Вход...'
                          : selectedLanguage === 'kg'
                          ? 'Катталууда...'
                          : 'Регистрация...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      <span>
                        {authMode === 'signin'
                          ? selectedLanguage === 'kg'
                            ? 'Кирүү'
                            : 'Войти'
                          : selectedLanguage === 'kg'
                          ? 'Катталуу'
                          : 'Зарегистрироваться'}
                      </span>
                    </>
                  )}
                </motion.button>
              </form>

              <AnimatePresence>
                {message.text && (
                  <motion.div
                    className={`message ${message.type}`}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    {message.type === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <XCircle size={20} />
                    )}
                    <span>{message.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RegistrationGate
