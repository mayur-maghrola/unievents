
import React, { useState, useMemo } from 'react';
import { Event, Registration, User } from '../types';

interface DashboardProps {
  events: Event[];
  registrations: Registration[];
  currentUser: User | null;
  onRegister: (eventId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ events, registrations, currentUser, onRegister }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Only consider dates
    return events
      .filter(e => {
        const eventDate = new Date(e.date);
        const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             e.category.toLowerCase().includes(searchTerm.toLowerCase());
        // For dashboard, maybe we show all future events regardless of deadline for now,
        // but typically events are only shown if they are upcoming.
        return eventDate >= now && matchesSearch;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, searchTerm]);

  const isUserRegistered = (eventId: string) => {
    return registrations.some(r => r.eventId === eventId && r.userEmail === currentUser?.email);
  };

  const handleRowClick = (event: Event) => {
    setSelectedEvent(event);
  };

  // Helper to check if registration is closed due to deadline or limit
  const isRegistrationClosed = (event: Event) => {
    const now = new Date();
    if (event.registrationDeadline) {
      const deadline = new Date(event.registrationDeadline);
      deadline.setHours(23, 59, 59, 999);
      if (now > deadline) return 'deadline';
    }
    if (event.registrationLimit && event.registeredCount >= event.registrationLimit) {
      return 'limit';
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#003366] mb-2">Upcoming Campus Events</h1>
        <p className="text-gray-500">Explore and register for the latest happenings across CHARUSAT.</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            placeholder="Search events by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
          />
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-blue-50">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f8fafc]">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr. No.</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Name</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <tr 
                  key={event.id} 
                  onClick={() => handleRowClick(event)}
                  className="hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-[#003366]">{event.title}</div>
                    <div className="text-xs text-gray-400">{event.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="font-medium">{new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    <div className="text-xs">{event.time}</div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-500 italic">No upcoming events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedEvent(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl leading-6 font-bold text-[#003366]" id="modal-title">
                        {selectedEvent.title}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {selectedEvent.category}
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      <p className="text-sm text-gray-600 leading-relaxed">{selectedEvent.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase">Venue</p>
                          <p className="text-sm font-medium text-gray-700">{selectedEvent.venue}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase">Availability</p>
                          <p className="text-sm font-medium text-gray-700">
                            {selectedEvent.registrationLimit 
                              ? `${selectedEvent.registrationLimit - selectedEvent.registeredCount} / ${selectedEvent.registrationLimit} slots`
                              : "No limit"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase">Deadline</p>
                          <p className={`text-sm font-medium ${selectedEvent.registrationDeadline ? 'text-red-600' : 'text-gray-700'}`}>
                            {selectedEvent.registrationDeadline 
                              ? new Date(selectedEvent.registrationDeadline).toLocaleDateString()
                              : "No deadline"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {isUserRegistered(selectedEvent.id) ? (
                  <button type="button" disabled className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-green-100 text-green-700 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
                    Already Registered
                  </button>
                ) : isRegistrationClosed(selectedEvent) === 'deadline' ? (
                  <button type="button" disabled className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-100 text-red-700 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
                    Deadline Passed
                  </button>
                ) : isRegistrationClosed(selectedEvent) === 'limit' ? (
                  <button type="button" disabled className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-100 text-red-700 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
                    Registration Full
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      onRegister(selectedEvent.id);
                      setSelectedEvent(null);
                    }}
                    type="button" 
                    className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-[#003366] text-white text-base font-medium hover:bg-[#002244] focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Register Now
                  </button>
                )}
                <button 
                  onClick={() => setSelectedEvent(null)}
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 text-base font-medium hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
