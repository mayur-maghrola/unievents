
import React, { useState, useEffect, useMemo } from 'react';
import { Page, User, Event, Registration } from './types';
import Landing from './pages/Landing';
import Login from './pages/Login';
import RegisterStep1 from './pages/RegisterStep1';
import OTPVerification from './pages/OTPVerification';
import RegisterStep2 from './pages/RegisterStep2';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import MyRegisteredEvents from './pages/MyRegisteredEvents';
import MyEvents from './pages/MyEvents';

const App: React.FC = () => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('charusat_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Data State
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('charusat_events');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'Tech Fest 2024',
        description: 'Annual technical festival of CSPIT.',
        category: 'Technical',
        date: '2024-11-20',
        time: '10:00',
        venue: 'CSPIT Auditorium',
        registrationLimit: 200,
        registrationDeadline: '2024-11-15',
        createdBy: 'admin@charusat.edu.in',
        registeredCount: 45
      },
      {
        id: '2',
        title: 'Cultural Night',
        description: 'Night full of dance and music.',
        category: 'Cultural',
        date: '2024-12-05',
        time: '18:30',
        venue: 'University Ground',
        registrationLimit: 500,
        registrationDeadline: '2024-12-01',
        createdBy: 'student@charusat.edu.in',
        registeredCount: 120
      }
    ];
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('charusat_registrations');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistent Storage
  useEffect(() => {
    localStorage.setItem('charusat_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('charusat_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('charusat_registrations', JSON.stringify(registrations));
  }, [registrations]);

  // Auth Handlers
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  const navigate = (page: Page, id?: string) => {
    if (id) setEditingEventId(id);
    setCurrentPage(page);
  };

  // Content Rendering
  const renderContent = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={navigate} />;
      case 'login':
        return <Login onNavigate={navigate} onLogin={setCurrentUser} />;
      case 'register-step-1':
        return <RegisterStep1 onNavigate={navigate} onRegisterSuccess={(email) => setCurrentUser({ email, registrationCompleted: false })} />;
      case 'otp-verification':
        return <OTPVerification onNavigate={navigate} user={currentUser} />;
      case 'register-step-2':
        return <RegisterStep2 onNavigate={navigate} user={currentUser} onComplete={(userData) => setCurrentUser(userData)} />;
      case 'dashboard':
      case 'all-events':
        return (
          <Dashboard 
            events={events} 
            registrations={registrations}
            currentUser={currentUser}
            onRegister={(eventId) => {
              const newReg = {
                id: Math.random().toString(36).substr(2, 9),
                eventId,
                userEmail: currentUser?.email || '',
                registeredAt: new Date().toISOString()
              };
              setRegistrations(prev => [...prev, newReg]);
              setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e));
            }}
          />
        );
      case 'create-event':
        return (
          <CreateEvent 
            onNavigate={navigate} 
            currentUser={currentUser} 
            onSubmit={(eventData) => {
              const newEvent = { ...eventData, id: Math.random().toString(36).substr(2, 9), registeredCount: 0 };
              setEvents(prev => [...prev, newEvent]);
              navigate('dashboard');
            }}
          />
        );
      case 'edit-event':
        const eventToEdit = events.find(e => e.id === editingEventId);
        return (
          <CreateEvent 
            onNavigate={navigate} 
            currentUser={currentUser} 
            editData={eventToEdit}
            onSubmit={(eventData) => {
              setEvents(prev => prev.map(e => e.id === editingEventId ? { ...eventData, id: e.id, registeredCount: e.registeredCount } : e));
              navigate('my-events');
            }}
          />
        );
      case 'my-registered-events':
        return <MyRegisteredEvents events={events} registrations={registrations} currentUser={currentUser} />;
      case 'my-events':
        return (
          <MyEvents 
            events={events} 
            currentUser={currentUser} 
            onEdit={(id) => navigate('edit-event', id)}
            onDelete={(id) => setEvents(prev => prev.filter(e => e.id !== id))}
          />
        );
      default:
        return <Landing onNavigate={navigate} />;
    }
  };

  const showNavbar = !['landing', 'login', 'register-step-1', 'otp-verification', 'register-step-2'].includes(currentPage);

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar activePage={currentPage} onNavigate={navigate} onLogout={handleLogout} user={currentUser} />}
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-white border-t py-6 px-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} UniEvents. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
