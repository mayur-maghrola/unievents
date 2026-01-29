
import React, { useState, useEffect } from 'react';
import { Event, Page, User } from '../types';

interface CreateEventProps {
  onNavigate: (page: Page) => void;
  currentUser: User | null;
  onSubmit: (event: Omit<Event, 'id' | 'registeredCount'>) => void;
  editData?: Event;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onNavigate, currentUser, onSubmit, editData }) => {
  const [hasLimit, setHasLimit] = useState(false);
  const [hasDeadline, setHasDeadline] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    registrationLimit: 100,
    registrationDeadline: ''
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title,
        description: editData.description,
        category: editData.category,
        date: editData.date,
        time: editData.time,
        venue: editData.venue,
        registrationLimit: editData.registrationLimit || 100,
        registrationDeadline: editData.registrationDeadline || ''
      });
      setHasLimit(!!editData.registrationLimit);
      setHasDeadline(!!editData.registrationDeadline);
    }
  }, [editData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const submission: Omit<Event, 'id' | 'registeredCount'> = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      createdBy: currentUser.email
    };

    if (hasLimit) {
      submission.registrationLimit = formData.registrationLimit;
    }
    
    if (hasDeadline) {
      submission.registrationDeadline = formData.registrationDeadline;
    }

    onSubmit(submission);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-[#003366]">{editData ? 'Edit Event' : 'Create New Event'}</h1>
        <p className="text-gray-500 mt-2">Fill in the details to post your campus event.</p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Event Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Annual Hackathon 2024"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe what the event is about..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Venue</label>
              <input
                type="text"
                required
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Auditorium Hall A"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Registration Limit Toggle and Input */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="limit-toggle"
                  checked={hasLimit}
                  onChange={(e) => setHasLimit(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="limit-toggle" className="text-sm font-medium text-gray-700 select-none">
                  Set Registration Limit
                </label>
              </div>
              {hasLimit && (
                <div className="animate-fade-in">
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.registrationLimit}
                    onChange={(e) => setFormData({ ...formData, registrationLimit: parseInt(e.target.value) })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Limit"
                  />
                </div>
              )}
            </div>

            {/* Registration Deadline Toggle and Input */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="deadline-toggle"
                  checked={hasDeadline}
                  onChange={(e) => setHasDeadline(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="deadline-toggle" className="text-sm font-medium text-gray-700 select-none">
                  Set Registration Deadline
                </label>
              </div>
              {hasDeadline && (
                <div className="animate-fade-in">
                  <input
                    type="date"
                    required
                    value={formData.registrationDeadline}
                    onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#003366] text-white rounded-lg text-sm font-bold shadow-lg hover:bg-[#002244] transition-all"
            >
              {editData ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
