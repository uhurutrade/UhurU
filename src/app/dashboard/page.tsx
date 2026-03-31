'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, updateProfile, logoutUser, getAllUsers, updateUserDetails } from '@/actions/auth';
import { 
  User, Mail, Building, MapPin, Building2, Phone, Globe, Home, 
  CheckCircle2, AlertCircle, LogOut, Save, UserCircle, Loader2,
  ShieldCheck, Calendar, Users, ArrowRight, Table, ChevronDown, ChevronUp, Power
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
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px]"></div>

      <div className="max-w-[1500px] mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/30 ring-1 ring-white/10">
              <UserCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-white tracking-tight">My Account</h1>
                {user.isAdmin && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg border border-emerald-500/20 uppercase tracking-widest font-black">Admin Privileges</span>}
              </div>
              <p className="text-slate-400 mt-1">Configure your personal and professional profile details</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-red-500/10 text-slate-300 hover:text-red-400 rounded-2xl transition-all border border-white/5 hover:border-red-500/20 font-bold self-end md:self-auto group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Form Section */}
          <div className={`${user.isAdmin ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-8`}>
            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 grayscale pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck className="w-56 h-56" />
              </div>

              <form action={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                <Section title="Personal Info">
                  <Field label="First Name" name="firstName" defaultValue={user.firstName} icon={<User />} />
                  <Field label="Last Name" name="lastName" defaultValue={user.lastName} icon={<User />} />
                  <Field label="Account Email" name="email" defaultValue={user.email} icon={<Mail />} disabled />
                </Section>

                <Section title="Service Access">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Valid From" defaultValue={user.subscriptionStart ? new Date(user.subscriptionStart).toLocaleDateString() : 'Pending'} icon={<Calendar />} disabled />
                    <Field label="Valid To" defaultValue={user.subscriptionEnd ? new Date(user.subscriptionEnd).toLocaleDateString() : 'Pending'} icon={<Calendar />} disabled />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-red-500 shadow-lg shadow-red-500/50'}`}></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Account Status: {user.isActive ? 'Active' : 'Disabled'}</span>
                  </div>
                </Section>

                <Section title="Professional & Billing">
                  <Field label="Company" name="companyName" defaultValue={user.companyName} icon={<Building />} />
                  <Field label="Contact Phone" name="phone" defaultValue={user.phone} icon={<Phone />} />
                  <Field label="Country/Region" name="country" defaultValue={user.country} icon={<Globe />} />
                  <Field label="Postal Code" name="postcode" defaultValue={user.postcode} icon={<MapPin />} />
                  <div className="md:col-span-2 space-y-4">
                    <Field label="Legal City" name="city" defaultValue={user.city} icon={<Building2 />} />
                    <Field label="Street Address" name="streetAddress" defaultValue={user.streetAddress} icon={<Home />} />
                  </div>
                </Section>

                <div className="md:col-span-2 flex flex-col gap-6 items-center border-t border-white/5 pt-10 mt-6">
                  {status && (
                    <div className={`w-full max-w-lg p-5 rounded-2xl flex items-center gap-4 border animate-in zoom-in-95 duration-300 ${status.success ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' : 'bg-red-500/5 text-red-500 border-red-500/20'}`}>
                      {status.success ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <AlertCircle className="w-6 h-6 shrink-0" />}
                      <span className="text-sm font-bold">{status.message}</span>
                    </div>
                  )}
                  
                  <button
                    disabled={updating}
                    type="submit"
                    className="w-full max-w-md bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:opacity-50 text-white font-black text-sm uppercase tracking-widest py-5 rounded-2xl transition-all shadow-2xl shadow-blue-900/40 flex items-center justify-center gap-3 relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    {updating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                    Update Profiles
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Admin Station */}
          {user.isAdmin && (
            <div className="lg:col-span-5 sticky top-12">
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
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => { loadUsers(); }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleToggle(user: any) {
    setUpdatingId(user.id);
    try {
      await updateUserDetails(user.id, {
        isActive: !user.isActive,
        start: user.subscriptionStart ? new Date(user.subscriptionStart).toISOString().split('T')[0] : '',
        end: user.subscriptionEnd ? new Date(user.subscriptionEnd).toISOString().split('T')[0] : ''
      });
      loadUsers();
    } catch (e) { alert('Action failed'); }
    finally { setUpdatingId(null); }
  }

  async function handleSubUpdate(userId: string, formData: FormData) {
    setUpdatingId(userId);
    const start = formData.get('start') as string;
    const end = formData.get('end') as string;
    const isActive = formData.get('isActive') === 'on';
    
    try {
      await updateUserDetails(userId, { isActive, start, end });
      setActiveTab(null);
      loadUsers();
    } catch (e) {
      alert('Error updating user');
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="bg-slate-900/60 backdrop-blur-3xl border border-blue-500/10 rounded-[2.5rem] shadow-[0_0_80px_rgba(30,58,138,0.1)] p-8 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/5 rounded-2xl border border-blue-500/10">
            <ShieldCheck className="w-7 h-7 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Admin Station</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Maintenance & Access Console</p>
          </div>
        </div>
        <button onClick={loadUsers} className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-blue-400 transition-colors">
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full opacity-30">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <span className="text-xs font-black uppercase tracking-widest">Scanning Registry...</span>
          </div>
        ) : (
          users.map((u) => (
            <div key={u.id} className={`p-1 rounded-[1.75rem] transition-all duration-300 ${activeTab === u.id ? 'bg-blue-600/10 ring-1 ring-blue-500/20' : 'hover:bg-white/5 ring-1 ring-transparent'}`}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 cursor-pointer" onClick={() => setActiveTab(activeTab === u.id ? null : u.id)}>
                    <h4 className="font-black text-slate-100 flex items-center gap-2">
                       {u.firstName} {u.lastName}
                       {activeTab === u.id ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-slate-700" />}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-1">{u.email}</p>
                  </div>
                  
                  {/* Status Toggle Switch */}
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-black uppercase tracking-tighter ${u.isActive ? 'text-emerald-500' : 'text-red-500'}`}>
                      {u.isActive ? 'Live' : 'Locked'}
                    </span>
                    <button 
                      disabled={updatingId === u.id}
                      onClick={() => handleToggle(u)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-500 ${u.isActive ? 'bg-emerald-500/20 ring-1 ring-emerald-500/30' : 'bg-red-500/20 ring-1 ring-red-500/30'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-500 shadow-xl ${u.isActive ? 'left-7 bg-emerald-400' : 'left-1 bg-red-400'}`}>
                        {updatingId === u.id && <Loader2 className="w-full h-full animate-spin p-0.5 opacity-50" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Expanded Card */}
                {activeTab === u.id && (
                  <div className="mt-6 pt-6 border-t border-white/5 space-y-6 animate-in slide-in-from-top-4 duration-500">
                    {/* Read Only Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <ReadOnlyField label="Company" value={u.companyName} />
                      <ReadOnlyField label="Phone" value={u.phone} />
                      <ReadOnlyField label="Location" value={`${u.city}, ${u.country}`} />
                      <ReadOnlyField label="Address" value={u.streetAddress} />
                      <ReadOnlyField label="Joined" value={new Date(u.createdAt).toLocaleDateString()} />
                      <ReadOnlyField label="Zip" value={u.postcode} />
                    </div>

                    {/* Subscription Form */}
                    <form action={(fd) => handleSubUpdate(u.id, fd)} className="bg-slate-950/40 p-5 rounded-3xl border border-white/5 space-y-5">
                      <input type="hidden" name="isActive" value={u.isActive ? 'on' : 'off'} />
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Account Validity</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">Valid From</label>
                          <input type="date" name="start" defaultValue={u.subscriptionStart ? new Date(u.subscriptionStart).toISOString().split('T')[0] : ''} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">Valid Until</label>
                          <input type="date" name="end" defaultValue={u.subscriptionEnd ? new Date(u.subscriptionEnd).toISOString().split('T')[0] : ''} className="w-full bg-slate-900 border border-white/5 rounded-xl p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
                        </div>
                      </div>
                      <button type="submit" disabled={updatingId === u.id} className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] uppercase font-black tracking-widest py-3 rounded-xl transition-all shadow-xl shadow-blue-900/20">
                        {updatingId === u.id ? 'Applying...' : 'Authorize Changes'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Records: {users.length}</span>
        </div>
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter block">{label}</span>
      <span className="text-[11px] text-slate-300 block font-medium truncate">{value || 'None'}</span>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-black text-white/40 uppercase tracking-[0.2em]">{title}</h3>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

function Field({ label, name, defaultValue, icon, disabled = false }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black text-slate-500 tracking-[0.1em] uppercase ml-1 block group-focus-within:text-blue-400 transition-colors">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors">
          <span className="[&>svg]:w-4.5 [&>svg]:h-4.5">{icon}</span>
        </div>
        <input
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`w-full pl-12 pr-6 py-4 bg-white/5 border border-white/[0.05] rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm font-medium ${disabled ? 'opacity-40 cursor-not-allowed bg-transparent border-dashed' : 'hover:border-white/10'}`}
        />
      </div>
    </div>
  );
}

function RefreshCw({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
  );
}
