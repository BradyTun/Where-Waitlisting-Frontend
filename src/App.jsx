import { useState, useEffect } from 'react'
import logo from './assets/logo.png'

function App() {
  const [view, setView] = useState('landing')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    meetupPlaces: [],
    frequency: '',
    interests: '',
    reason: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (localStorage.getItem('waitlist_submitted')) {
      setView('success')
    }
  }, [])

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name required'
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required'
    if (!formData.profession) newErrors.profession = 'Profession required'
    if (formData.meetupPlaces.length === 0) newErrors.meetupPlaces = 'Select at least one place'
    if (!formData.frequency) newErrors.frequency = 'Select frequency'
    if (!formData.interests) newErrors.interests = 'Interests required'
    if (!formData.reason) newErrors.reason = 'Reason required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        meetupPlaces: checked
          ? [...prev.meetupPlaces, value]
          : prev.meetupPlaces.filter(p => p !== value)
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const submitWaitlist = async (data) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const payload = {
      name: data.name,
      email: data.email,
      profession: data.profession,
      meetupPlaces: data.meetupPlaces,
      frequency: data.frequency,
      interests: data.interests,
      reason: data.reason
    };
    console.log('Payload:', payload);
    try {
      const response = await fetch(`${BASE_URL}/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);        localStorage.setItem('waitlist_submitted', 'true');        // alert('Successfully joined the waitlist!');
        return true;
      } else {
        const error = await response.json();
        console.error('Error:', error);
        alert('Failed to join waitlist: ' + (error.detail || 'Unknown error'));
        return false;
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const success = await submitWaitlist(formData)
    setLoading(false)
    if (success) {
      setView('success')
    }
  }

  if (view === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col items-center justify-center p-4 font-pixel">
        <div className="text-center animate-bounce">
          <h1 className="text-4xl md:text-6xl mb-4 glow">SUCCESS!</h1>
          <p className="text-lg md:text-xl mb-6">Welcome to the WHERE Beta Squad!</p>
          <p className="text-md mb-4">You've joined the waitlist. Get ready for AI-powered meetups!</p>
          <button onClick={() => setView('landing')} className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition transform hover:scale-105">
            Back to Home
          </button>
        </div>
        <div className="mt-8 text-6xl animate-pulse">🎉🚀</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#12002b] via-purple-900 to-blue-900 text-white flex flex-col items-center justify-center p-4 font-pixel">
      <div className="max-w-2xl w-full text-center mb-8">
        <img src={logo} alt="WHERE Logo" className="mx-auto mb-6 w-24 h-24 animate-pulse" />
        <h1 className="text-2xl md:text-4xl font-bold mb-4 glow">Meet People Who Get You</h1>
        <p className="text-sm md:text-lg mb-6">
          WHERE uses AI to connect you with people who share your interests — and chooses the best place and time for your first meetup.
        </p>
        <button onClick={() => setView('form')} className="bg-gradient-to-r from-pink-500 to-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-yellow-600 transition transform hover:scale-105 shadow-lg">
          Join the Waitlist
        </button>
      </div>

      {view === 'form' && (
        <div className="max-w-md w-full bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl shadow-2xl border-4 border-purple-500 font-sans relative overflow-hidden">
          <h2 className="text-xl font-bold mb-6 text-center glow font-pixel">Join WHERE Early Access – Quick Survey</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 glow font-semibold text-purple-300">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 text-white border-2 border-purple-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                required
              />
              {errors.name && <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.name}</p>}
            </div>
            <div>
              <label className="block mb-2 glow font-semibold text-purple-300">Email: ✉️</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="(We’ll send you early access and updates)"
                className="w-full p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 text-white border-2 border-purple-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                required
              />
              {errors.email && <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.email}</p>}
            </div>
            <div>
              <label className="block mb-2 glow font-semibold text-purple-300">Profession / What you do: 💼</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="(Helps us match you better with people who get you)"
                className="w-full p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 text-white border-2 border-purple-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
              />
              {errors.profession && <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.profession}</p>}
            </div>
            <div>
              <label className="block mb-2 glow font-semibold text-purple-300">Preferred meetup places: 📍</label>
              <div className="space-y-3 bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg border border-purple-400">
                {['Cafes ☕', 'Outdoors 🌳', 'Events / workshops 🎟️', 'Beer 🍺', 'Other'].map(place => (
                  <label key={place} className="flex items-center hover:text-yellow-400 transition-colors cursor-pointer p-2 rounded hover:bg-purple-600/20">
                    <input
                      type="checkbox"
                      value={place}
                      checked={formData.meetupPlaces.includes(place)}
                      onChange={handleChange}
                      className="mr-3 accent-purple-500 scale-125"
                    />
                    {place}
                  </label>
                ))}
              </div>
              {errors.meetupPlaces && <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.meetupPlaces}</p>}
            </div>
            <div>
              <label className="block mb-2 glow font-semibold text-purple-300">How often would you like AI to schedule meetups? ⏰</label>
              <div className="space-y-3 bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg border border-purple-400">
                {['Once a week', '2–3 times a month', 'Occasionally / whenever possible', 'Other'].map(freq => (
                  <label key={freq} className="flex items-center hover:text-yellow-400 transition-colors cursor-pointer p-2 rounded hover:bg-purple-600/20">
                    <input
                      type="radio"
                      name="frequency"
                      value={freq}
                      checked={formData.frequency === freq}
                      onChange={handleChange}
                      className="mr-3 accent-purple-500 scale-125"
                    />
                    {freq}
                  </label>
                ))}
              </div>
              {errors.frequency && <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.frequency}</p>}
            </div>
            <div>
              <label className="block mb-2 glow font-semibold text-purple-300">Other interests or hobbies: 🎨🎮🎵</label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="(Let us know what you love so we can match you better)"
                className="w-full p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 text-white border-2 border-purple-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 resize-none"
                rows="3"
              />
              {errors.interests && <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.interests}</p>}
            </div>
            <div>
              <label className="block mb-2 glow font-semibold text-purple-300">Why do you want to join WHERE? 🤔</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="(Short answer – helps us make the experience better for you)"
                className="w-full p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 text-white border-2 border-purple-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 resize-none"
                rows="3"
              />
              {errors.reason && <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.reason}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-green-500/50 font-sans">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default App
