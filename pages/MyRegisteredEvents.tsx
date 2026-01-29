
import React from 'react';
import { Event, Registration, User } from '../types';

interface MyRegisteredEventsProps {
  events: Event[];
  registrations: Registration[];
  currentUser: User | null;
}

const MyRegisteredEvents: React.FC<MyRegisteredEventsProps> = ({ events, registrations, currentUser }) => {
  const myRegistrations = registrations.filter(r => r.userEmail === currentUser?.email);
  const registeredEvents = myRegistrations.map(r => {
    const event = events.find(e => e.id === r.eventId);
    return {
      ...event,
      registeredAt: r.registeredAt
    };
  }).filter(e => e.id !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#003366] mb-2">My Registered Events</h1>
        <p className="text-gray-500">Track the events you are participating in.</p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-blue-50">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f8fafc]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr. No.</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registeredEvents.length > 0 ? (
              registeredEvents.map((event, index) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-[#003366]">{event.title}</div>
                    <div className="text-xs text-gray-400">{event.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="font-medium">{new Date(event.date || '').toLocaleDateString()}</div>
                    <div className="text-xs">{event.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500 italic">You haven't registered for any events yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRegisteredEvents;
