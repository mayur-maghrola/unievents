
import React from 'react';
import { Event, User } from '../types';

interface MyEventsProps {
  events: Event[];
  currentUser: User | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MyEvents: React.FC<MyEventsProps> = ({ events, currentUser, onEdit, onDelete }) => {
  const myEventsList = events.filter(e => e.createdBy === currentUser?.email);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#003366] mb-2">My Posted Events</h1>
        <p className="text-gray-500">Manage the events you have created.</p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-blue-50">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f8fafc]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Registrations</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {myEventsList.length > 0 ? (
              myEventsList.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-[#003366]">{event.title}</div>
                    <div className="text-xs text-gray-500">{event.date} at {event.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-bold text-blue-600 mr-2">{event.registeredCount}</span>
                      {event.registrationLimit ? (
                        <span className="text-gray-400">/ {event.registrationLimit}</span>
                      ) : (
                        <span className="text-gray-400">/ ∞</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button 
                      onClick={() => onEdit(event.id)}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        if(confirm('Are you sure you want to delete this event?')) {
                          onDelete(event.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-500 italic">You haven't posted any events yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEvents;
