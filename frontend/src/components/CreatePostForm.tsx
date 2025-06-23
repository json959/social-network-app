import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../context/authStore';

interface CreatePostFormProps {
  onPostCreated: () => void;
}

export default function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [message, setContent] = useState('');
  const token = useAuthStore(state => state.token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("📤 Enviando publicación:", { message }, "con token:", token);
      await axios.post(
        'http://localhost:3002/posts/newPost',
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent('');
      onPostCreated(); // Para recargar publicaciones
    } catch (error) {
      console.error('❌ Error al crear publicación:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        className="w-full p-2 border rounded mb-2"
        value={message}
        onChange={(e) => setContent(e.target.value)}
        placeholder="¿Qué estás pensando?"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Publicar
      </button>
    </form>
  );
}
