'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, updateProfile, logoutUser } from '@/actions/auth';
import { 
  User, Mail, Building, MapPin, Building2, Phone, Globe, Home, 
  CheckCircle2, AlertCircle, LogOut, Save, UserCircle, Loader2
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    async function loadUser() {
      const userData = await getCurrentUser();
      if (!userData) {
        window.location.href = '/services/fusion';
      } else {
        setUser(userData);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  async function handleUpdate(formData: FormData) {
    setUpdating(true);
    setStatus(null);
    try {
      const result = await updateProfile(formData);
      setStatus(result);
      if (result.success) {
        const freshUser = await getCurrentUser();
        setUser(freshUser);
      }
    } catch (error) {
      setStatus({ success: false, message: 'Update error occurred.' });
    } finally {
      setUpdating(false);
    }
  }

  async function handleLogout() {
    await logoutUser();
    window.location.href = '/services/fusion';
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 relative overflow-hidden font-sans">
      {/* Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/40">
              <UserCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Profile</h1>
              <p className="text-slate-400">Manage your Fusion account and billing data</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all border border-red-500/20 font-medium"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8">
          <form action={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <Section title="Personal Information">
              <Field label="First Name" name="firstName" defaultValue={user.firstName} icon={<User />} />
              <Field label="Last Name" name="lastName" defaultValue={user.lastName} icon={<User />} />
              <Field label="Username (Read-only)" name="displayName" defaultValue={user.displayName} icon={<UserCircle />} disabled />
              <Field label="Email Address (Read-only)" name="email" defaultValue={user.email} icon={<Mail />} disabled />
            </Section>

            <Section title="Billing Details">
              <Field label="Company Name" name="companyName" defaultValue={user.companyName} icon={<Building />} />
              <Field label="Phone Number" name="phone" defaultValue={user.phone} icon={<Phone />} />
              <Field label="Country" name="country" defaultValue={user.country} icon={<Globe />} />
              <Field label="City" name="city" defaultValue={user.city} icon={<Building2 />} />
              <Field label="Street" name="streetAddress" defaultValue={user.streetAddress} icon={<Home />} />
              <Field label="Zip Code" name="postcode" defaultValue={user.postcode} icon={<MapPin />} />
            </Section>

            <div className="md:col-span-2 flex flex-col gap-4 items-center border-t border-slate-800 pt-8 mt-4">
              {status && (
                <div className={`w-full max-w-md p-4 rounded-xl flex items-center gap-3 border ${status.success ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {status.success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span className="text-sm font-medium">{status.message}</span>
                </div>
              )}
              
              <button
                disabled={updating}
                type="submit"
                className="w-full max-w-sm bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 group"
              >
                {updating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white/90 pb-2 border-b border-slate-800/50">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function Field({ label, name, defaultValue, icon, disabled = false }: any) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-xs font-bold text-slate-500 tracking-wider uppercase ml-1 block">{label}</label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
          <span className="[&>svg]:w-4 [&>svg]:h-4">{icon}</span>
        </div>
        <input
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-900' : 'hover:border-slate-700'}`}
        />
      </div>
    </div>
  );
}
