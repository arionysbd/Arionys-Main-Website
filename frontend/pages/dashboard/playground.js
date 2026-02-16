import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import Aside from '@/components/Aside';

export default function PlaygroundPage() {
  const router = useRouter();
  const [user, setUser] = useState({ value: null });
  const [apiKey, setApiKey] = useState('');
  const [transactionType, setTransactionType] = useState('spend');
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');
  const [summary, setSummary] = useState(null);
  const [useRange, setUseRange] = useState(false);
  const [rangeDays, setRangeDays] = useState('');

  useEffect(() => {
    try {
      const token = localStorage.getItem('Token');
      if (token) {
        setUser({ value: token });
      } else {
        router.push('/');
      }
    } catch (err) {
      router.push('/');
    }
  }, [router]);

  async function createEntry(ev) {
    ev.preventDefault();
    try {
      const payload = { transactionType, reason, note, cost };
      if (date) payload.createdAt = date;
      const res = await axios.post('/api/v1/diary', payload, { headers: { 'x-api-key': apiKey } });
      const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      Toast.fire({ icon: 'success', title: 'Entry created' });
    } catch {
      const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      Toast.fire({ icon: 'error', title: 'Failed to create entry' });
    }
  }

  async function getSummary(ev) {
    ev.preventDefault();
    try {
      const params = { date: useRange && rangeDays ? String(rangeDays) : date };
      const res = await axios.get('/api/v1/hisab', { params, headers: { 'x-api-key': apiKey } });
      setSummary(res.data);
    } catch {
      setSummary(null);
      const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      Toast.fire({ icon: 'error', title: 'Failed to fetch summary' });
    }
  }

  if (user.value === null) {
    return null;
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const createdAtJsonFragment = date ? `,"createdAt":"${date}"` : '';
  const axiosCreatedAtLine = date ? `,\n  createdAt: '${date}'\n` : `\n`;
  const curlCreate = `curl -X POST ${origin}/api/v1/diary -H "Content-Type: application/json" -H "x-api-key: ${apiKey || '<YOUR_API_KEY>'}" -d '{"transactionType":"${transactionType}","reason":"${reason}","note":"${note}","cost":"${cost}"${createdAtJsonFragment}}'`;
  const axiosCreate = `import axios from 'axios'\nawait axios.post('/api/v1/diary', {\n  transactionType: '${transactionType}',\n  reason: '${reason}',\n  note: '${note}',\n  cost: '${cost}'${axiosCreatedAtLine}}, {\n  headers: { 'x-api-key': '${apiKey || '<YOUR_API_KEY>'}' }\n})`;
  const summaryQueryPart = `date=${useRange && rangeDays ? String(rangeDays) : (date || 'YYYY-MM-DD')}`;
  const curlSummary = `curl "${origin}/api/v1/hisab?${summaryQueryPart}" -H "x-api-key: ${apiKey || '<YOUR_API_KEY>'}"`;
  const axiosSummary = `import axios from 'axios'\nconst res = await axios.get('/api/v1/hisab', {\n  params: { date: ${useRange && rangeDays ? String(rangeDays) : `'${date || 'YYYY-MM-DD'}'`} },\n  headers: { 'x-api-key': '${apiKey || '<YOUR_API_KEY>'}' }\n})\nconsole.log(res.data)`;

  return (
    <>
    <Aside />
    <div className="container py-8">
      <h1 className="text-2xl font-bold dark:text-gray-100">API Playground</h1>
      <p className="mb-4 dark:text-gray-300">Test API endpoints using your API key.</p>

      <div className="mb-6">
        <label className="text-xs font-semibold dark:text-gray-300">API Key</label>
        <input value={apiKey} onChange={e => setApiKey(e.target.value)} type="text" className="dark:bg-gray-700 dark:text-gray-200 w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none" placeholder="Paste your API key" />
      </div>

      <form onSubmit={createEntry} className="mb-8">
        <h2 className="text-xl font-semibold dark:text-gray-100">Create Note / Hisab Entry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label className="text-xs font-semibold dark:text-gray-300">Transaction Type</label>
            <select value={transactionType} onChange={e => setTransactionType(e.target.value)} className="dark:bg-gray-700 dark:text-gray-200 w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none">
              <option value="spend">Debit</option>
              <option value="earn">Credit</option>
              <option value="borrowed">Borrowed</option>
              <option value="lent">Lent</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold dark:text-gray-300">Reason</label>
            <input value={reason} onChange={e => setReason(e.target.value)} type="text" className="dark:bg-gray-700 dark:text-gray-200 w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold dark:text-gray-300">Note</label>
            <input value={note} onChange={e => setNote(e.target.value)} type="text" className="dark:bg-gray-700 dark:text-gray-200 w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold dark:text-gray-300">Cost</label>
            <input value={cost} onChange={e => setCost(e.target.value)} type="number" className="dark:bg-gray-700 dark:text-gray-200 w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none" />
          </div>
        </div>
        <button className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Create</button>
      </form>

      <form onSubmit={getSummary}>
        <h2 className="text-xl font-semibold dark:text-gray-100">Daily Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label className="text-xs font-semibold dark:text-gray-300">Date (YYYY-MM-DD)</label>
            <input value={date} onChange={e => setDate(e.target.value)} type="date" className="dark:bg-gray-700 dark:text-gray-200 w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <input id="useRange" type="checkbox" checked={useRange} onChange={e => setUseRange(e.target.checked)} />
            <label htmlFor="useRange" className="text-xs font-semibold dark:text-gray-300">Use last N days</label>
          </div>
          {useRange && (
            <div>
              <label className="text-xs font-semibold dark:text-gray-300">Days (e.g., 10, 30)</label>
              <input value={rangeDays} onChange={e => setRangeDays(e.target.value)} type="number" min="1" className="dark:bg-gray-700 dark:text-gray-200 w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none" />
            </div>
          )}
        </div>
        <button className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Get Summary</button>
      </form>

      {summary && (
        <div className="mt-6 p-4 rounded border dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-gray-100">Summary for {summary.date}</h3>
          <p className="dark:text-gray-300">Total Spend: {summary.totalSpend}</p>
          <p className="dark:text-gray-300">Total Earn: {summary.totalEarn}</p>
          <p className="dark:text-gray-300">Total Profit: {summary.totalProfit}</p>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold dark:text-gray-100">Live API Examples</h2>
        <p className="mb-2 dark:text-gray-300">Examples update as you change inputs above.</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold dark:text-gray-100">Create Entry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-3 rounded border dark:border-gray-700">
              <div className="text-sm font-semibold dark:text-gray-300 mb-2">curl</div>
              <textarea readOnly value={curlCreate} className="w-full h-36 text-xs dark:bg-gray-800 dark:text-gray-200 p-2 rounded"></textarea>
            </div>
            <div className="p-3 rounded border dark:border-gray-700">
              <div className="text-sm font-semibold dark:text-gray-300 mb-2">axios</div>
              <textarea readOnly value={axiosCreate} className="w-full h-36 text-xs dark:bg-gray-800 dark:text-gray-200 p-2 rounded"></textarea>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold dark:text-gray-100">Daily Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-3 rounded border dark:border-gray-700">
              <div className="text-sm font-semibold dark:text-gray-300 mb-2">curl</div>
              <textarea readOnly value={curlSummary} className="w-full h-28 text-xs dark:bg-gray-800 dark:text-gray-200 p-2 rounded"></textarea>
            </div>
            <div className="p-3 rounded border dark:border-gray-700">
              <div className="text-sm font-semibold dark:text-gray-300 mb-2">axios</div>
              <textarea readOnly value={axiosSummary} className="w-full h-28 text-xs dark:bg-gray-800 dark:text-gray-200 p-2 rounded"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}