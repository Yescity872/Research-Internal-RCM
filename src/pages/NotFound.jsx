import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Only log if it's not a known preview or development route
    if (!location.pathname.includes('preview') && !location.pathname.includes('_next')) {
      console.warn("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #dbeafe 0%, white 50%, #f8fafc 100%)',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #dbeafe',
        backgroundColor: 'white',
        borderRadius: '0.5rem'
      }}>
        <div style={{ padding: '2rem' }}>
          <div style={{
            width: '5rem',
            height: '5rem',
            background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <svg 
              style={{ width: '2.5rem', height: '2.5rem', color: '#dc2626' }} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          
          <h1 style={{
            fontSize: '2.25rem',
            background: 'linear-gradient(to right, #dc2626, #ef4444)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            404
          </h1>
          <h2 style={{ fontSize: '1.25rem', color: '#374151', marginBottom: '1rem' }}>
            Page Not Found
          </h2>
          <p style={{ 
            color: '#4b5563', 
            marginBottom: '1.5rem', 
            lineHeight: '1.625',
            fontSize: '0.875rem'
          }}>
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          {location.pathname.includes('preview') && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              backgroundColor: '#dbeafe',
              border: '1px solid #bfdbfe',
              borderRadius: '0.5rem'
            }}>
              <p style={{ fontSize: '0.75rem', color: '#1d4ed8' }}>
                💡 It looks like you're trying to access a preview page. Please use the main dashboard instead.
              </p>
            </div>
          )}
          
          <button 
            onClick={() => navigate("/")}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
            onMouseOut={(e) => {
              e.target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
            }}
          >
            <svg 
              style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Return to Dashboard
          </button>
          
          <p style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280', 
            marginTop: '1rem' 
          }}>
            Error Path: {location.pathname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;