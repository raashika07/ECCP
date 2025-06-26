// src/pages/Profile.tsx
import { useEffect, useState, ChangeEvent } from 'react';
import api from '../utils/api';
import { Edit, Save } from 'lucide-react';          // icon library (already in Vite)

type Profile = {
  full_name?: string;
  phone?: string;
  dob?: string;
  address?: string;
  medical_notes?: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get<Profile>('/profile/me').then(r => setProfile(r.data));
  }, []);

  if (!profile) return <p className="p-6 text-center">Loading…</p>;

  const handle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setProfile({ ...profile!, [e.target.name]: e.target.value });

  const save = async () => {
    setSaving(true);
    await api.put('/profile/me', profile);
    setSaving(false);
    setEdit(false);
  };

  const Field = ({
    label,
    name,
    type = 'text',
  }: {
    label: string;
    name: keyof Profile;
    type?: string;
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-600 mb-1">
        {label}
      </label>
      {name === 'medical_notes' ? (
        <textarea
          name={name}
          disabled={!edit}
          rows={3}
          className="w-full rounded-lg border bg-white/50 p-2 disabled:bg-slate-100"
          value={profile![name] || ''}
          onChange={handle}
        />
      ) : (
        <input
          type={type}
          name={name}
          disabled={!edit}
          className="w-full rounded-lg border bg-white/50 p-2 disabled:bg-slate-100"
          value={profile![name] || ''}
          onChange={handle}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-sky-50 to-indigo-50 py-10">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-8">
        <h1 className="text-2xl font-semibold text-indigo-700 mb-6">
          Care Circle • My Profile
        </h1>

        <Field label="Full Name"      name="full_name" />
        <Field label="Phone"          name="phone"      />
        <Field label="Date of Birth"  name="dob"  type="date" />
        <Field label="Address"        name="address"    />
        <Field label="Medical Notes"  name="medical_notes" />

        <div className="mt-6 flex justify-end gap-3">
          {edit ? (
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              <Save size={16} /> {saving ? 'Saving…' : 'Save'}
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-indigo-700 hover:bg-indigo-50"
            >
              <Edit size={16} /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
