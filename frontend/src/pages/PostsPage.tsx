import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../context/authStore';
import CreatePostForm from '../components/CreatePostForm'; // 👈

interface Post {
  id: number;
  message: string;
  createdAt: string;
  user: {
    alias: string;
  };
  likesCount: number;
}

export default function PostsPage() {
  const token = useAuthStore(state => state.token);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    if (!token) return;

    try {
      const res = await axios.get('http://localhost:3002/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const postsWithLikes = await Promise.all(
        res.data.map(async (post: any) => {
          const likesRes = await axios.get(`http://localhost:3002/likes/${post.id}/count`);
          return { ...post, likesCount: likesRes.data.likes };
        })
      );

      setPosts(postsWithLikes);
    } catch (error) {
      console.error('❌ Error al cargar publicaciones:', error);
    }
  };

  useEffect(() => {
    if (token) fetchPosts();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Publicaciones</h2>

      <CreatePostForm onPostCreated={fetchPosts} /> {/* 👈 Aquí se incluye */}

      {posts.map(post => (
        <div key={post.id} className="border p-4 mb-4 rounded shadow">
          <p className="mb-2"><strong>@{post.user.alias}:</strong> {post.message}</p>
          <p className="text-sm text-gray-500 mb-2">Publicado el {new Date(post.createdAt).toLocaleString()}</p>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => handleLike(post.id)}
          >
            ❤️ Like ({post.likesCount})
          </button>
        </div>
      ))}
    </div>
  );

  async function handleLike(postId: number) {
    try {
      await axios.post(`http://localhost:3002/likes/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
    } catch (error) {
      console.error('❌ Error al dar like:', error);
    }
  }
}
