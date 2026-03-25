import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore'
import enDefault from '../locales/en.json'
import nlDefault from '../locales/nl.json'
import toast from 'react-hot-toast'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [activeTab, setActiveTab] = useState('portfolio')
  const [activeTextSection, setActiveTextSection] = useState('hero')
  const [instagramLinks, setInstagramLinks] = useState([])
  const [uploading, setUploading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [editingLang, setEditingLang] = useState('en')
  const [customTexts, setCustomTexts] = useState({ en: {}, nl: {} })

  useEffect(() => {
    if (localStorage.getItem('inkadmin') === 'true') {
      setIsAuthenticated(true)
    }

    const loadFirebaseData = async () => {
      try {
        // Load custom texts
        const docRef = doc(db, 'siteContent', 'dashboard')
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data.customTexts) setCustomTexts(data.customTexts)
        }

        // Load base64 portfolio images from new collection
        const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        const loadedImages = []
        querySnapshot.forEach((d) => {
          loadedImages.push({ id: d.id, url: d.data().base64 })
        })
        setInstagramLinks(loadedImages)
      } catch (e) {
        console.error('Firebase read error:', e)
      }
    }
    loadFirebaseData()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsAuthenticating(true)
    setError('')
    try {
      const docRef = doc(db, 'siteContent', 'auth')
      const docSnap = await getDoc(docRef)

      let currentPassword = 'admin123'
      if (docSnap.exists() && docSnap.data().password) {
        currentPassword = docSnap.data().password
      }

      if (password === currentPassword) {
        setIsAuthenticated(true)
        localStorage.setItem('inkadmin', 'true')
      } else {
        setError('Incorrect PIN')
      }
    } catch (err) {
      console.error(err)
      setError('Connection Error')
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault()
    if (!newPassword || newPassword.length < 4) {
      setError('New PIN must be at least 4 characters')
      return
    }

    setIsAuthenticating(true)
    setError('')
    try {
      const docRef = doc(db, 'siteContent', 'auth')
      const docSnap = await getDoc(docRef)

      let currentPassword = 'admin123'
      if (docSnap.exists() && docSnap.data().password) {
        currentPassword = docSnap.data().password
      }

      if (oldPassword === currentPassword) {
        await setDoc(docRef, { password: newPassword }, { merge: true })
        toast.success('Master PIN successfully updated!')
        setIsChangingPassword(false)
        setOldPassword('')
        setNewPassword('')
        setPassword('')
      } else {
        setError('Incorrect Old PIN')
      }
    } catch (err) {
      console.error(err)
      setError('Connection Error')
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('inkadmin')
  }

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          // Shrink width to 1200px strictly maximum
          const MAX_WIDTH = 1200
          let scaleSize = 1
          if (img.width > MAX_WIDTH) {
            scaleSize = MAX_WIDTH / img.width
          }
          canvas.width = img.width * scaleSize
          canvas.height = img.height * scaleSize

          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          // Compress strictly to high compression JPEG ratio saving space (~150kb)
          resolve(canvas.toDataURL('image/jpeg', 0.6))
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const base64Image = await compressImage(file)

      const docRef = await addDoc(collection(db, 'portfolio'), {
        base64: base64Image,
        createdAt: Date.now()
      })

      setInstagramLinks(prev => [{ id: docRef.id, url: base64Image }, ...prev])
    } catch (err) {
      toast.error('Error uploading image: ' + err.message)
      console.error(err)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleRemoveLink = async (idToRemove) => {
    try {
      await deleteDoc(doc(db, 'portfolio', idToRemove))
      setInstagramLinks(prev => prev.filter(img => img.id !== idToRemove))
    } catch (err) {
      toast.error('Error updating database: ' + err.message)
    }
  }

  const handleSaveTexts = async (e) => {
    e.preventDefault()
    try {
      await setDoc(doc(db, 'siteContent', 'dashboard'), { customTexts }, { merge: true })
      toast.success('All website texts saved successfully! Updates are live.')
    } catch (err) {
      console.error(err)
      toast.error('Failed to save! Please verify that "Firestore Database" is set up in Firebase.')
    }
  }

  const handleTextChange = (path, value) => {
    setCustomTexts(prev => {
      const newState = { ...prev }
      const langState = { ...(newState[editingLang] || {}) }

      const keys = path.split('.')
      let current = langState
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...(current[keys[i]] || {}) }
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value

      newState[editingLang] = langState
      return newState
    })
  }

  const getValue = (path) => {
    const keys = path.split('.')
    let customVal = customTexts[editingLang]
    let defaultVal = editingLang === 'en' ? enDefault : nlDefault

    for (const key of keys) {
      customVal = customVal?.[key]
      defaultVal = defaultVal?.[key]
    }
    return customVal !== undefined ? customVal : (defaultVal || '')
  }

  // Recursive renderer for deeply nested JSON objects
  const renderEditorFields = (obj, pathPrefix = '') => {
    return Object.keys(obj).map(key => {
      const currentPath = pathPrefix ? `${pathPrefix}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'string') {
        const isLongText = value.length > 60 || currentPath.includes('description') || currentPath.includes('p1') || currentPath.includes('p2') || currentPath.includes('text');
        return (
          <div key={currentPath} className="space-y-3 mb-8 bg-[#0a0a0a] p-6 border border-white/5">
            <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-cream-dim block break-all">
              {key.replace(/_/g, ' ')}
            </label>
            {isLongText ? (
              <textarea
                value={getValue(currentPath)}
                onChange={(e) => handleTextChange(currentPath, e.target.value)}
                rows={4}
                className="w-full bg-[#050505] border border-white/10 text-white p-4 focus:outline-none focus:border-white/40 transition-colors font-light text-sm"
              />
            ) : (
              <input
                type="text"
                value={getValue(currentPath)}
                onChange={(e) => handleTextChange(currentPath, e.target.value)}
                className="w-full bg-[#050505] border border-white/10 text-white p-4 focus:outline-none focus:border-white/40 transition-colors font-light text-sm"
              />
            )}
          </div>
        );
      } else if (typeof value === 'object' && value !== null) {
        // If it's an array (like reviews.list), handle it differently with indices
        const isArray = Array.isArray(value)
        return (
          <div key={currentPath} className="mt-8 mb-8 border-l-2 border-white/10 pl-6">
            <h4 className="text-white font-mono uppercase tracking-[0.3em] text-[10px] mb-6 inline-block text-crimson">
              {isArray ? `${key} Items` : `${key} Group`}
            </h4>
            {renderEditorFields(value, currentPath)}
          </div>
        );
      }
      return null;
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] px-6">
        <div className="w-full max-w-sm flex flex-col gap-6 p-10 border border-white/10 bg-black/50 backdrop-blur-md">
          <div className="text-center mb-6">
            <h1 className="text-white font-display text-4xl mb-2">Admin</h1>
            <p className="text-cream-dim text-[10px] uppercase font-mono tracking-[0.3em]">Restricted Access</p>
          </div>

          {!isChangingPassword ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Master PIN"
                  disabled={isAuthenticating}
                  className="w-full bg-[#0a0a0a] border border-white/20 text-white px-4 py-4 focus:outline-none focus:border-white/50 transition-colors font-mono tracking-widest text-center disabled:opacity-50"
                />
                {error && <p className="text-crimson text-xs mt-3 text-center tracking-widest uppercase font-mono">{error}</p>}
              </div>

              <button type="submit" disabled={isAuthenticating} className="w-full bg-white text-black py-4 font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-cream-dim transition-colors mt-2 disabled:opacity-50">
                {isAuthenticating ? 'Unlocking...' : 'Unlock Dashboard'}
              </button>

              <button type="button" onClick={() => { setIsChangingPassword(true); setError(''); setPassword(''); }} className="text-[10px] font-mono tracking-widest text-cream-dim hover:text-white uppercase transition-colors text-center mt-2">
                Change Master PIN?
              </button>
            </form>
          ) : (
            <form onSubmit={handleChangePasswordSubmit} className="flex flex-col gap-6">
              <div>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Old Master PIN"
                  disabled={isAuthenticating}
                  className="w-full bg-[#0a0a0a] border border-white/20 text-white px-4 py-4 mb-4 focus:outline-none focus:border-white/50 transition-colors font-mono tracking-widest text-center disabled:opacity-50"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Master PIN"
                  disabled={isAuthenticating}
                  className="w-full bg-[#0a0a0a] border border-white/20 text-white px-4 py-4 focus:outline-none focus:border-white/50 transition-colors font-mono tracking-widest text-center disabled:opacity-50"
                />
                {error && <p className="text-crimson text-xs mt-3 text-center tracking-widest uppercase font-mono">{error}</p>}
              </div>

              <button type="submit" disabled={isAuthenticating} className="w-full bg-white text-black py-4 font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-cream-dim transition-colors mt-2 disabled:opacity-50">
                {isAuthenticating ? 'Updating...' : 'Update Master PIN'}
              </button>

              <button type="button" onClick={() => { setIsChangingPassword(false); setError(''); setOldPassword(''); setNewPassword(''); }} className="text-[10px] font-mono tracking-widest text-cream-dim hover:text-white uppercase transition-colors text-center mt-2">
                Cancel / Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-[#050505] p-6 md:p-8 flex flex-col gap-6 md:gap-8 sticky top-0 md:min-h-screen z-40 bg-[#050505]/95 backdrop-blur-md">
        <div className="flex items-center justify-between md:block">
          <div>
            <h2 className="font-display text-2xl mb-1">Dashboard</h2>
            <p className="text-cream-dim text-[10px] font-mono tracking-widest uppercase text-emerald-500">Online & Synced</p>
          </div>
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        <nav className={`flex-col gap-2 flex-1 mt-4 md:mt-8 ${isMenuOpen ? 'flex' : 'hidden md:flex'}`}>
          <button
            type="button"
            onClick={() => { setActiveTab('portfolio'); setIsMenuOpen(false); }}
            className={`text-left px-4 py-3 text-[11px] font-mono tracking-[0.2em] uppercase transition-colors ${activeTab === 'portfolio' ? 'bg-white text-black' : 'text-cream-muted hover:bg-white/5'}`}
          >
            Portfolio Images
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('texts'); setIsMenuOpen(false); }}
            className={`text-left px-4 py-3 text-[11px] font-mono tracking-[0.2em] uppercase transition-colors ${activeTab === 'texts' ? 'bg-white text-black' : 'text-cream-muted hover:bg-white/5'}`}
          >
            Website Texts
          </button>
        </nav>

        <button
          type="button"
          onClick={() => { handleLogout(); setIsMenuOpen(false); }}
          className={`text-left px-4 py-3 text-[11px] font-mono tracking-[0.2em] uppercase text-crimson hover:bg-crimson/10 transition-colors mt-4 md:mt-0 ${isMenuOpen ? 'block' : 'hidden md:block'}`}
        >
          Lock & Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto max-h-screen">
        {activeTab === 'portfolio' && (
          <div className="max-w-4xl max-w-2xl">
            <div className="mb-12">
              <h3 className="font-display text-4xl mb-4">Manage Portfolio</h3>
              <p className="text-cream-muted text-sm font-light">
                Upload raw Image files (.jpg, .png) directly to your secure Firebase Storage bucket.
                This guarantees high-quality images without relying on restrictive third-party APIs.
              </p>
            </div>

            <div className="mb-16">
              <label
                className={`relative inline-flex items-center justify-center w-full md:w-auto px-12 py-5 font-mono text-[11px] tracking-[0.2em] uppercase border transition-colors cursor-pointer ${uploading ? 'bg-cream-dim text-black border-cream-dim' : 'bg-transparent text-white border-white/20 hover:border-white'}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                {uploading ? 'Uploading to Site... (Please Wait)' : 'Select Image to Upload'}
              </label>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-cream-dim mb-6">Live Gallery Assets ({instagramLinks.length})</h4>

              {instagramLinks.length === 0 && (
                <p className="text-white/30 text-sm font-light italic">No images proudly exhibited yet.</p>
              )}

              {/* Grid preview of images instead of just text links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {instagramLinks.map((item) => (
                  <div key={item.id} className="relative aspect-square bg-[#0a0a0a] border border-white/10 group overflow-hidden">
                    <img src={item.url} alt="Portfolio Item" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => handleRemoveLink(item.id)}
                        className="text-[10px] text-white bg-crimson px-4 py-2 font-mono uppercase tracking-widest hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'texts' && (
          <div className="max-w-6xl w-full">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
              <div>
                <h3 className="font-display text-4xl mb-4">Master Text Editor</h3>
                <p className="text-cream-muted text-sm font-light max-w-xl">
                  Select a section from the left to edit its specific texts. Switch languages on the right to edit translations.
                </p>
              </div>
              <div className="flex bg-[#0a0a0a] border border-white/20 p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingLang('en')}
                  className={`px-6 py-3 text-[10px] font-mono tracking-widest transition-colors ${editingLang === 'en' ? 'bg-white text-black' : 'text-cream-dim hover:text-white'}`}
                >
                  ENGLISH
                </button>
                <button
                  type="button"
                  onClick={() => setEditingLang('nl')}
                  className={`px-6 py-3 text-[10px] font-mono tracking-widest transition-colors ${editingLang === 'nl' ? 'bg-white text-black' : 'text-cream-dim hover:text-white'}`}
                >
                  DUTCH
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveTexts} className="pb-32 flex flex-col md:flex-row gap-12">

              {/* Internal Section Navigation */}
              <div className="flex overflow-x-auto md:flex-col gap-2 md:w-56 pb-4 md:pb-0 shrink-0 border-b md:border-b-0 border-white/5">
                <h4 className="hidden md:block text-[10px] font-mono tracking-[0.2em] uppercase text-cream-dim mb-4 px-4">Website Sections</h4>
                {Object.keys(enDefault).map(section => (
                  <button
                    key={section}
                    type="button"
                    onClick={() => setActiveTextSection(section)}
                    className={`whitespace-nowrap md:whitespace-normal text-left px-4 py-3 text-[11px] font-mono tracking-widest uppercase transition-colors ${activeTextSection === section ? 'bg-white/10 text-white border-b-2 md:border-b-0 md:border-l-2 border-white' : 'text-cream-muted hover:text-white hover:bg-white/5'}`}
                  >
                    {section}
                  </button>
                ))}
              </div>

              {/* Active Section Fields Editor */}
              <div className="flex-1 bg-[#050505] border border-white/5 p-8">
                <h4 className="font-display text-3xl mb-8 capitalize text-white border-b border-white/10 pb-6">
                  {activeTextSection} <span className="text-cream-dim font-mono text-[10px] tracking-widest uppercase ml-4 align-middle">Active Section</span>
                </h4>
                {renderEditorFields(enDefault[activeTextSection], activeTextSection)}
              </div>

              <div className="fixed bottom-0 right-0 left-0 md:left-64 bg-[#030303]/95 backdrop-blur-xl border-t border-white/10 p-6 flex justify-end z-50">
                <button type="submit" className="w-full md:w-auto px-16 bg-white text-black py-4 font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-cream-dim transition-colors shadow-2xl">
                  Deploy {editingLang.toUpperCase()} Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
