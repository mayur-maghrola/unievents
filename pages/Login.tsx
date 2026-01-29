
import React, { useState } from 'react';
import { Page, User } from '../types';

interface LoginProps {
  onNavigate: (page: Page) => void;
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('@charusat.edu.in')) {
      setError('Please use your official @charusat.edu.in email ID.');
      return;
    }

    if (password.length < 6) {
      setError('Invalid password.');
      return;
    }

    const mockUser: User = {
      email,
      registrationCompleted: true,
      fullName: 'John Doe',
      enrollmentId: '21CS001',
      institute: 'CSPIT',
      department: 'Computer Engineering'
    };
    
    onLogin(mockUser);
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="text-[#003366] font-extrabold text-4xl">Uni<span className="text-blue-600">Events</span></div>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900">Welcome Back</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl rounded-3xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">Official Email</label>
              <input
                type="email"
                required
                placeholder="name@charusat.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-5 py-4 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-5 py-4 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#003366] text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-[#002244] transition-all transform hover:scale-[1.01] active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <button onClick={() => onNavigate('register-step-1')} className="text-sm font-bold text-blue-600 hover:text-blue-800">
              New here? Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
