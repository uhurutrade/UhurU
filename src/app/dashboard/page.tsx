'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, updateProfile, logoutUser, getAllUsers, updateSubscription } from '@/actions/auth';
import { 
  User, Mail, Building, MapPin, Building2, Phone, Globe, Home, 
  CheckCircle2, AlertCircle, LogOut, Save, UserCircle, Loader2,
  ShieldCheck, Calendar, Users, ArrowRight, Table
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]"></div>

      <div className="max-w-[1400px] mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/40">
              <UserCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                My Profile
                {user.isAdmin && <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20 uppercase tracking-tighter font-bold">Admin</span>}
              </h1>
              <p className="text-slate-400">Manage your Fusion account and billing data</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all border border-red-500/20 font-medium self-end md:self-auto"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form */}
          <div className={`${user.isAdmin ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-8`}>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <UserCircle className="w-48 h-48" />
              </div>

              <form action={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <Section title="Personal Information">
                  <Field label="First Name" name="firstName" defaultValue={user.firstName} icon={<User />} />
                  <Field label="Last Name" name="lastName" defaultValue={user.lastName} icon={<User />} />
                  <Field label="Email Address (Read-only)" name="email" defaultValue={user.email} icon={<Mail />} disabled />
                </Section>

                <Section title="Subscription Validity">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="From" name="subStart" defaultValue={user.subscriptionStart ? new Date(user.subscriptionStart).toLocaleDateString() : 'Not Set'} icon={<Calendar />} disabled />
                    <Field label="To" name="subEnd" defaultValue={user.subscriptionEnd ? new Date(user.subscriptionEnd).toLocaleDateString() : 'Not Set'} icon={<Calendar />} disabled />
                  </div>
                  <p className="text-[10px] text-slate-500 -mt-2">Protected field. Contact administrative support to update your subscription.</p>
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
                    className="w-full max-w-sm bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-3 group"
                  >
                    {updating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Admin Panel */}
          {user.isAdmin && (
            <div className="lg:col-span-5">
              <AdminPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubUpdate(formData: FormData) {
    const start = formData.get('start') as string;
    const end = formData.get('end') as string;
    if (!selectedUser) return;
    
    try {
      await updateSubscription(selectedUser.id, start, end);
      setSelectedUser(null);
      loadUsers();
    } catch (e) {
      alert('Error updating subscription');
    }
  }

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-blue-500/20 rounded-3xl shadow-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Admin Control</h2>
        </div>
        <button onClick={loadUsers} className="text-xs text-blue-400 hover:underline">Refresh List</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 opacity-50">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <span className="text-xs">Loading User Records...</span>
          </div>
        ) : (
          users.map((u) => (
            <div key={u.id} className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 hover:border-blue-500/30 transition-all group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{u.firstName} {u.lastName}</h4>
                  <p className="text-xs text-slate-500 font-mono">{u.email}</p>
                </div>
                <button 
                  onClick={() => setSelectedUser(u)}
                  className="p-2 bg-slate-900 hover:bg-blue-600 rounded-lg text-slate-400 hover:text-white transition-all shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800/50">
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-600 block mb-1">Sub From</label>
                  <span className="text-[11px] text-slate-400">{u.subscriptionStart ? new Date(u.subscriptionStart).toLocaleDateString() : 'Not set'}</span>
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-600 block mb-1">Sub To</label>
                  <span className="text-[11px] text-slate-400">{u.subscriptionEnd ? new Date(u.subscriptionEnd).toLocaleDateString() : 'Not set'}</span>
                </div>
              </div>

              {selectedUser?.id === u.id && (
                <form action={handleSubUpdate} className="mt-4 p-4 bg-blue-600/5 border border-blue-500/20 rounded-xl space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-blue-400 pl-1">Starting</label>
                      <input type="date" name="start" defaultValue={u.subscriptionStart ? new Date(u.subscriptionStart).toISOString().split('T')[0] : ''} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-blue-400 pl-1">Ending</label>
                      <input type="date" name="end" defaultValue={u.subscriptionEnd ? new Date(u.subscriptionEnd).toISOString().split('T')[0] : ''} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold py-2 rounded-lg transition-all">Update Dates</button>
                    <button type="button" onClick={() => setSelectedUser(null)} className="px-3 bg-slate-800 text-slate-400 text-[11px] py-2 rounded-lg hover:text-white transition-all">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800 text-center">
        <p className="text-[10px] text-slate-600 flex items-center justify-center gap-1.5 uppercase tracking-widest font-bold">
          <Users className="w-3.5 h-3.5" /> Total Records: {users.length}
        </p>
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
          className={`w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-900 border-dashed' : 'hover:border-slate-700'}`}
        />
      </div>
    </div>
  );
}
