import React, { useState, useEffect } from 'react';
import { 
  Lock, LogOut, UploadCloud, Trash2, CheckCircle2, 
  AlertCircle, Loader2, Plus, Image as ImageIcon 
} from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, addDoc, deleteDoc, doc, 
  onSnapshot, query, orderBy, serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import Logo from './Logo';

export default function AdminPortal({ isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('residential');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [scope, setScope] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Upload Status
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Projects List
  const [liveProjects, setLiveProjects] = useState([]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Sync Live Projects for Deletion/Management
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLiveProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setAuthError('Invalid credentials. Check email and password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Image File Picker
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Upload Project via Cloudinary + Firestore
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setStatusMsg({ type: 'error', text: 'Please select a project photo to upload.' });
      return;
    }

    setIsUploading(true);
    setStatusMsg({ type: '', text: '' });
    setUploadProgress(20);

    try {
      // 1. Direct Browser Upload to Cloudinary (Free tier, zero card, no database pausing)
      const cloudinaryData = new FormData();
      cloudinaryData.append('file', imageFile);
      cloudinaryData.append('upload_preset', 'rosabe_uploads');
      cloudinaryData.append('cloud_name', 'nlb731pk');

      setUploadProgress(45);

      const res = await fetch('https://api.cloudinary.com/v1_1/nlb731pk/image/upload', {
        method: 'POST',
        body: cloudinaryData,
      });

      const fileData = await res.json();
      if (!res.ok) {
        throw new Error(fileData.error?.message || 'Failed to upload photo to Cloudinary.');
      }

      setUploadProgress(80);
      const imageUrl = fileData.secure_url;

      // 2. Save Document to Firebase Firestore
      await addDoc(collection(db, 'projects'), {
        title,
        category,
        categoryLabel: category.charAt(0).toUpperCase() + category.slice(1),
        location,
        duration: duration || 'Completed',
        scope: scope || 'Turnkey Construction',
        description,
        image: imageUrl,
        createdAt: serverTimestamp(),
      });

      setUploadProgress(100);

      // Reset Form State
      setTitle('');
      setLocation('');
      setDuration('');
      setScope('');
      setDescription('');
      setImageFile(null);
      setImagePreview(null);
      setIsUploading(false);
      setStatusMsg({ type: 'success', text: 'Project published live successfully!' });
      setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: err.message || 'Error saving project data.' });
      setIsUploading(false);
    }
  };

  // Delete Project
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project from the website?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (err) {
        alert('Could not delete project: ' + err.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl text-slate-900 border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#0b1329] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-md">
              <div className="w-8 h-6 flex items-center justify-center">
                <svg viewBox="0 0 100 80" className="w-full h-full">
                  <polygon points="10,65 30,22 45,22 25,65" fill="#EAA316" />
                  <polygon points="46,12 60,12 75,65 62,65" fill="#1E293B" />
                  <rect x="8" y="68" width="80" height="3" fill="#EAA316" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base tracking-wide">
                Rosabe Admin Studio
              </h3>
              <p className="text-[11px] text-amber-400">
                {user ? `Logged in: ${user.email}` : 'Authorized Personnel Only'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <button
                onClick={() => signOut(auth)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white px-2 py-1 text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!user ? (
            /* Login Form */
            <div className="max-w-sm mx-auto py-10 space-y-5">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Project Manager Login</h4>
                <p className="text-xs text-slate-500">
                  Enter your admin credentials to manage live portfolio items.
                </p>
              </div>

              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="bensonwaweru4@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Log In to Studio'}
                </button>
              </form>
            </div>
          ) : (
            /* Admin Upload & Management Interface */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Upload New Project Form */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-amber-500" />
                    Upload New Project
                  </h4>
                  <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Cloudinary CDN Active
                  </span>
                </div>

                {statusMsg.text && (
                  <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                    statusMsg.type === 'success' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{statusMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Project Title *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 4-Bedroom Luxury Maisonette"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="renovation">Renovation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Location *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Ruiru, Kiambu"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Duration</label>
                      <input
                        type="text"
                        placeholder="e.g. 8 Months"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Scope of Works</label>
                      <input
                        type="text"
                        placeholder="e.g. Full Turnkey Structural & Finishes"
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Description *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Brief details regarding materials, architecture, engineering specs..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Photo File Dropzone */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Project Photo *</label>
                    <div className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-4 text-center cursor-pointer bg-slate-50 transition relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {imagePreview ? (
                        <div className="flex items-center gap-3 justify-center">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-16 h-12 object-cover rounded-lg border border-slate-200" 
                          />
                          <span className="text-xs font-bold text-slate-700 truncate max-w-[200px]">
                            {imageFile?.name}
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1 text-slate-500">
                          <UploadCloud className="w-7 h-7 mx-auto text-amber-500" />
                          <p className="font-semibold text-slate-700 text-xs">Tap to select photo</p>
                          <p className="text-[10px]">JPG, PNG, or WEBP up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {isUploading && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-600">
                        <span>Uploading to Cloudinary CDN...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full transition-all duration-200" 
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 rounded-lg text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Publishing to Website...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4 text-amber-400" />
                        <span>Publish Project Live</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column: Manage Live Uploaded Projects */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-200 lg:pl-6 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-amber-500" />
                    Uploaded Projects ({liveProjects.length})
                  </h4>
                </div>

                {liveProjects.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-6 text-center">
                    No custom uploads yet. Website is displaying default portfolio items.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    {liveProjects.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 transition"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-10 object-cover rounded-lg shrink-0 border border-slate-200"
                          />
                          <div className="truncate">
                            <h5 className="font-bold text-xs text-slate-900 truncate">{p.title}</h5>
                            <span className="text-[10px] text-amber-600 font-bold uppercase">{p.category}</span>
                            <span className="text-[10px] text-slate-400 ml-1.5">• {p.location}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0 ml-2"
                          title="Delete from website"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}