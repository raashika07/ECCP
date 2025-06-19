import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{
    backgroundColor: '#3ab563',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' , textDecoration: 'none'}}>Elderly Care Coordination🌿</h1>

    <div style={{
      display: 'flex',
      gap: '4rem',        // adds space between links
      fontSize: '1.5rem'
    }}>
      <Link
  to="/Home"
  style={{
    color: 'white',
    textDecoration: 'Underline',
    padding: '0.25rem',
    transition: 'color 0.3s'
  }}
  onMouseEnter={(e) => e.currentTarget.style.color = '#ffd700'}
  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
>
  Home
</Link>

      <Link
  to="/login"
  style={{
    color: 'green',
    textDecoration: 'Underline',
    padding: '0.25rem',
    transition: 'color 0.3s'
  }}
  onMouseEnter={(e) => e.currentTarget.style.color = '#ffd700'}
  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
>
  Login
</Link>

     <Link
  to="/Register"
  style={{
    color: 'white',
    textDecoration: 'underline',
    padding: '0.25rem',
    transition: 'color 0.3s'
  }}
  onMouseEnter={(e) => e.currentTarget.style.color = '#ffd700'}
  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
>
  Register
</Link>

      <Link
  to="/Dashboard"
  style={{
    color: 'white',
    textDecoration: 'underline',
    padding: '0.25rem',
    transition: 'color 0.3s'
  }}
  onMouseEnter={(e) => e.currentTarget.style.color = '#ffd700'}
  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
>
  Dashboard
</Link>

    </div>
  </nav>
);

export default Navbar;
