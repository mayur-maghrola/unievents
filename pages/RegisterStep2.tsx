
import React, { useState } from 'react';
import { Page, User } from '../types';

interface RegisterStep2Props {
  onNavigate: (page: Page) => void;
  user: User | null;
  onComplete: (user: User) => void;
}

const RegisterStep2: React.FC<RegisterStep2Props> = ({ onNavigate, user, onComplete }) => {
  const [fullName, setFullName] = useState('');
  const [institute, setInstitute] = useState('');
  const [department, setDepartment] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !institute || !department || !enrollmentId) {
      setError('All fields are required.');
      return;
    }

    if (!user) return;

    const completedUser: User = {
      ...user,
      fullName,
      institute,
      department,
      enrollmentId,
      registrationCompleted: true
    };

    onComplete(completedUser);
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Step 2: Profile Completion</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Almost there! Tell us a bit more about yourself.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Institute</label>
              <select
                required
                value={institute}
                onChange={(e) => setInstitute(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Institute</option>
                <option value="CSPIT">CSPIT</option>
                <option value="DEPSTAR">DEPSTAR</option>
                <option value="RPCP">RPCP</option>
                <option value="I2IM">I2IM</option>
                <option value="PDPIAS">PDPIAS</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                required
                placeholder="e.g. Computer Engineering"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Student Enrollment ID</label>
              <input
                type="text"
                required
                placeholder="e.g. 21CS001"
                value={enrollmentId}
                onChange={(e) => setEnrollmentId(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep2;
