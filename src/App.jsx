import { useState, Component } from 'react';
import { T } from './Styles/Theme';
import GlobalStyles  from './Components/Layout/GlobalStyles';
import BottomNav     from './Components/Layout/BottomNav';
import XPToast       from './Components/Feedback/XPToast';
import HomeScreen    from './Screens/Home/HomeScreen';
import ReportScreen  from './Screens/Report/ReportScreen';
import RescueFeed    from './Screens/RescueFeed/RescueFeed';
import VetFinder     from './Screens/Vets/VetFinder';
import ProfileScreen from './Screens/Profile/ProfileScreen';

// ── Error Boundary ────────────────────────────────────────────────────────────
class ErrorBoundary extends Component {
  state = { error: null, info: null };
  componentDidCatch(error, info) {
    this.setState({ error, info });
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: '24px 16px', fontFamily: 'monospace', background: '#FFF0F0',
          minHeight: '100vh', color: '#C93B3B',
        }}>
          <div style={{
            background: '#fff', border: '2px solid #C93B3B', borderRadius: 12,
            padding: '20px', maxWidth: 430, margin: '0 auto',
          }}>
            <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>💥 React Crash</p>
            <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
              {this.state.error?.message}
            </p>
            <pre style={{
              fontSize: 10, background: '#FFF0F0', borderRadius: 8, padding: 10,
              overflowX: 'auto', whiteSpace: 'pre-wrap', color: '#600',
              maxHeight: 300, overflowY: 'auto',
            }}>
              {this.state.info?.componentStack}
            </pre>
            <button
              onClick={() => this.setState({ error: null, info: null })}
              style={{
                marginTop: 14, padding: '9px 18px', background: '#C93B3B',
                color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer',
                fontSize: 13, fontWeight: 700,
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab,      setTab]      = useState('home');
  const [xp,       setXp]       = useState(2450);
  const [toast,    setToast]    = useState(false);
  const [toastAmt, setToastAmt] = useState(0);
  const [userData] = useState({
    name:'Rahul Verma', area:'Sector 14, Noida', rescues:7, streak:12,
  });

  const awardXP = (amt) => {
    setXp(p => p + amt);
    setToastAmt(amt);
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };

  return (
    <div style={{
      maxWidth:430, margin:'0 auto', minHeight:'100vh',
      background:T.bg, position:'relative',
      fontFamily:"'Space Grotesk',sans-serif",
    }}>
      <GlobalStyles />
      <XPToast visible={toast} amount={toastAmt} />

      <div style={{ height:'calc(100vh - 60px)', overflowY:'auto' }}>
        <ErrorBoundary key={tab}>
          {tab === 'home'    && <HomeScreen    onNav={setTab} onXP={awardXP} userData={userData} xp={xp} />}
          {tab === 'report'  && <ReportScreen  onXP={awardXP} />}
          {tab === 'feed'    && <RescueFeed    onXP={awardXP} />}
          {tab === 'vets'    && <VetFinder />}
          {tab === 'profile' && <ProfileScreen xp={xp} userData={userData} />}
        </ErrorBoundary>
      </div>

      <BottomNav active={tab} onSelect={setTab} />
    </div>
  );
}
