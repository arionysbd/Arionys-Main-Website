import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import Aside from '@/components/Aside';

export default function ApiPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({ value: null });
  const [label, setLabel] = useState('');
  const [permissions, setPermissions] = useState({ read: true, write: true, hisab: true });
  const [keys, setKeys] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    try {
      const tokenValue = localStorage.getItem('Token');
      if (tokenValue) {
        setToken(tokenValue);
        setUser({ value: tokenValue });
        // UID is optional; server derives user from Authorization header
        try {
          const decoded = jwtDecode(tokenValue);
          const uid = decoded?.data?.id || decoded?.data?._id || decoded?.data?._doc?._id || null;
          setUserId(uid);
        } catch {}
      } else {
        router.push('/');
      }
    } catch (err) {
      router.push('/');
    }
  }, [router]);

  async function loadKeys() {
    if (!token) return;
    const res = await axios.get('/api/apikey', { headers: { Authorization: `Bearer ${token}` } });
    setKeys(res.data);
  }

  useEffect(() => { loadKeys(); }, [token]);

  async function createKey(ev) {
    ev.preventDefault();
    if (!token) {
      const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      Toast.fire({ icon: 'error', title: 'Not logged in. Please login.' });
      return;
    }
    const perms = [];
    if (permissions.read) perms.push('diary:read');
    if (permissions.write) perms.push('diary:write');
    if (permissions.hisab) perms.push('hisab:read');
    try {
      const res = await axios.post('/api/apikey', { label, permissions: perms }, { headers: { Authorization: `Bearer ${token}` } });
      const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      Toast.fire({ icon: 'success', title: 'API Key created' });
      setLabel('');
      await loadKeys();
    } catch (err) {
      const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      Toast.fire({ icon: 'error', title: 'Failed to create API Key' });
    }
  }

  async function deleteKey(id) {
    await axios.delete('/api/apikey', { params: { id }, headers: { Authorization: `Bearer ${token}` } });
    await loadKeys();
  }

  if (user.value === null) {
    return null;
  }

  return (
    <>
    <Aside />
    <div className="container py-8">
      <h1 className="text-2xl font-bold dark:text-gray-100">API Keys</h1>
      <p className="mb-4 dark:text-gray-300">Create and manage API keys to access your Diary data.</p>

      <form onSubmit={createKey} className="mb-6">
        <div className="flex gap-4 items-end">
          <div>
            <label className="text-xs font-semibold dark:text-gray-300">Label</label>
            <input value={label} onChange={e => setLabel(e.target.value)} type="text" className="dark:bg-gray-700 dark:text-gray-200 w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none" placeholder="e.g., Server A" />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 dark:text-gray-300"><input type="checkbox" checked={permissions.read} onChange={e => setPermissions(p => ({...p, read: e.target.checked}))} /> diary:read</label>
            <label className="flex items-center gap-2 dark:text-gray-300"><input type="checkbox" checked={permissions.write} onChange={e => setPermissions(p => ({...p, write: e.target.checked}))} /> diary:write</label>
            <label className="flex items-center gap-2 dark:text-gray-300"><input type="checkbox" checked={permissions.hisab} onChange={e => setPermissions(p => ({...p, hisab: e.target.checked}))} /> hisab:read</label>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Create Key</button>
        </div>
      </form>

      <div className="mt-4">
        <h2 className="text-xl font-semibold dark:text-gray-100">Your Keys</h2>
        <ul className="mt-2 space-y-2">
          {keys.map(k => (
            <li key={k.id} className="p-3 rounded border dark:border-gray-700 flex items-center justify-between">
              <div>
                <div className="dark:text-gray-100">{k.label || '(no label)'}</div>
                <div className="text-xs dark:text-gray-400">{k.key}</div>
                <div className="text-xs dark:text-gray-400">{k.permissions.join(', ')}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigator.clipboard.writeText(k.key)} className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded">Copy</button>
                <button onClick={() => deleteKey(k.id)} className="bg-red-500 text-white text-sm px-3 py-1 rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}