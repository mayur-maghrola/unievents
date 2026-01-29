
import React, { useState, useEffect } from 'react';
import { Page, User } from '../types';

interface OTPVerificationProps {
  onNavigate: (page: Page) => void;
  user: User | null;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ onNavigate, user }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 300s = 5 minutes
  const [error, setError] = useState('');

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (timeLeft <= 0) {
      setError('OTP has expired. Please resend the code.');
      return;
    }

    // Static Demo: Any 6 digits work or '123456'
    if (otp === '123456') {
      onNavigate('register-step-2');
    } else if (otp.length === 6) {
      // Allow demo progression
      onNavigate('register-step-2');
    } else {
      setError('Invalid OTP. Please enter the 6-digit code.');
    }
  };

  const handleResend = () => {
    setTimeLeft(300);
    setError('');
    setOtp('');
    // Mock resend alert
    console.log('OTP resent to ' + user?.email);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Confirm OTP</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          A verification code was sent to <span className="font-semibold text-[#003366]">{user?.email || 'your email'}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl rounded-3xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleVerify}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            <div className="text-center">
              <label className="block text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wider">Verification Code</label>
              <input
                type="text"
                required
                maxLength={6}
                autoFocus
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                className="block w-full text-center text-4xl tracking-[0.5em] px-4 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-mono placeholder-gray-200"
              />
              
              <div className="mt-6 flex flex-col items-center">
                <div className={`text-lg font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-blue-600'}`}>
                   {formatTime(timeLeft)}
                </div>
                <p className="text-xs text-gray-400 mt-1 uppercase font-medium">Time remaining</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={timeLeft <= 0}
              className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-lg font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] ${timeLeft <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#003366] hover:bg-[#002244]'}`}
            >
              Confirm OTP
            </button>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={handleResend}
                className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Didn't get the code? Resend
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
