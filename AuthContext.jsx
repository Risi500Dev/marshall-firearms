// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { getUser, createUser, isPseudoTaken } from '../firebase/services';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);         // Firebase Auth user
  const [profile, setProfile] = useState(null);   // Firestore profile
  const [loading, setLoading] = useState(true);
  const [needsPseudo, setNeedsPseudo] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const profile = await getUser(firebaseUser.uid);
        if (!profile) {
          setNeedsPseudo(true);
          setProfile(null);
        } else {
          setProfile(profile);
          setNeedsPseudo(false);
        }
      } else {
        setUser(null);
        setProfile(null);
        setNeedsPseudo(false);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const completeProfile = async (pseudo) => {
    if (!user) return;
    const taken = await isPseudoTaken(pseudo);
    if (taken) throw new Error('Ce pseudo est déjà pris.');
    await createUser(user.uid, user.email, pseudo);
    const newProfile = await getUser(user.uid);
    setProfile(newProfile);
    setNeedsPseudo(false);
  };

  const refreshProfile = async () => {
    if (user) {
      const p = await getUser(user.uid);
      setProfile(p);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, needsPseudo, loginWithGoogle, logout, completeProfile, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
