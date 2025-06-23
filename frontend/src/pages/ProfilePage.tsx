// src/pages/ProfilePage.tsx
import { useEffect, useState } from 'react';
import { useAuthStore } from '../context/authStore';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const getProfile = useAuthStore((state) => state.getProfile);
  const token = useAuthStore((state) => state.token); // Acceder al token
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/'); // Redirige al login si no hay token
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error('Error al obtener perfil:', err);
        navigate('/'); // Redirige si hubo error (por ejemplo, token inválido)
      }
    };

    fetchProfile();
  }, [token, getProfile, navigate]);

  if (!profile) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h1>Bienvenido, {profile.nombres} {profile.apellidos}</h1>
      <p>Alias: {profile.alias}</p>
      <p>Fecha de nacimiento: {new Date(profile.fecha_nacimiento).toLocaleDateString()}</p>
    </div>
  );
};

export default ProfilePage;
