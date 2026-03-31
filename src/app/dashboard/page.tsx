'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, updateProfile, logoutUser, getAllUsers, updateUserDetails } from '@/actions/auth';
import { 
  User, Mail, Building, MapPin, Building2, Phone, Globe, Home, 
  CheckCircle2, AlertCircle, LogOut, Save, UserCircle, Loader2,
  ShieldCheck, Calendar, Users, ArrowRight, Table, ChevronDown, ChevronUp, Power, RefreshCw
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px]"></div>

      <div className="max-w-[1600px] mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg ring-1 ring-white/10">
              <UserCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">System Console</h1>
                {user.isAdmin && <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-black">Admin Mode</span>}
              </div>
              <p className="text-xs text-slate-400">Authenticated as: <span className="text-slate-200 font-mono">{user.email}</span></p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-red-500/10 text-slate-300 hover:text-red-400 rounded-xl transition-all border border-white/5 hover:border-red-500/20 font-bold text-xs group"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Profile Section (Narrower for Admin) */}
          <div className={`${user.isAdmin ? 'lg:col-span-4' : 'lg:col-span-12'} space-y-6 order-2 lg:order-1`}>
            <div className={`bg-slate-900/40 backdrop-blur-3xl border border-white/[0.05] rounded-[2rem] shadow-2xl overflow-hidden group pb-4 ${user.isAdmin ? 'p-6' : 'p-10'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em]">My Profile Info</h3>
                {!user.isAdmin && <ShieldCheck className="w-5 h-5 text-blue-500 opacity-20" />}
              </div>

              <form action={handleUpdate} className="space-y-6 relative z-10">
                <div className={`grid gap-4 ${user.isAdmin ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                  <Field label="First Name" name="firstName" defaultValue={user.firstName} icon={<User />} compact={user.isAdmin} />
                  <Field label="Last Name" name="lastName" defaultValue={user.lastName} icon={<User />} compact={user.isAdmin} />
                  
                  {!user.isAdmin && (
                    <Section title="Billing Details" noBorder>
                      <Field label="Company" name="companyName" defaultValue={user.companyName} icon={<Building />} />
                      <Field label="Phone" name="phone" defaultValue={user.phone} icon={<Phone />} />
                      <Field label="Country" name="country" defaultValue={user.country} icon={<Globe />} />
                      <Field label="Postcode" name="postcode" defaultValue={user.postcode} icon={<MapPin />} />
                    </Section>
                  )}
                </div>

                <div className="border-t border-white/5 pt-6 mt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-emerald-500 shadow-emerald-500/30 shadow-lg' : 'bg-red-500 shadow-red-500/30'}`}></div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      {user.subscriptionEnd ? `Valid until ${new Date(user.subscriptionEnd).toLocaleDateString()}` : 'No active subscription'}
                    </span>
                  </div>

                  {status && (
                    <div className={`p-3 mb-4 rounded-xl flex items-center gap-3 border text-xs font-bold animate-in zoom-in-95 ${status.success ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' : 'bg-red-500/5 text-red-500 border-red-500/10'}`}>
                      {status.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                      <span>{status.message}</span>
                    </div>
                  )}

                  <button
                    disabled={updating}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-xl transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2 group overflow-hidden"
                  >
                    {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Update My Data
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Admin Station (Wider and Dominant) */}
          {user.isAdmin && (
            <div className="lg:col-span-8 order-1 lg:order-2">
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
    <div className="bg-slate-900/60 backdrop-blur-3xl border border-blue-500/10 rounded-[2.5rem] shadow-2xl p-8 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20">
            <ShieldCheck className="w-7 h-7 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Active Registries</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">User Management Console</p>
          </div>
        </div>
        <button onClick={loadUsers} className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-blue-400 transition-colors">
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-3 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full opacity-30">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Synching Database</span>
          </div>
        ) : (
          users.map((u) => (
            <div key={u.id} className={`p-1 rounded-[2rem] transition-all duration-500 ${activeTab === u.id ? 'bg-blue-600/10 ring-1 ring-blue-500/20 shadow-2xl' : 'hover:bg-white/5 ring-1 ring-transparent'}`}>
              <div className="p-5">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1 cursor-pointer flex items-center gap-4" onClick={() => setActiveTab(activeTab === u.id ? null : u.id)}>
                    <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-slate-500 border border-white/5">
                      {activeTab === u.id ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-100 flex items-center gap-3">
                         {u.firstName} {u.lastName}
                         {!u.isActive && <span className="text-[8px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded border border-red-500/20 uppercase font-black tracking-tighter">Locked</span>}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{u.email}</p>
                    </div>
                  </div>
                  
                  {/* Premium Slider Toggle */}
                  <div className="flex items-center gap-4 bg-slate-950 p-2 rounded-2xl border border-white/5 shadow-inner">
                    <span className={`text-[9px] font-black uppercase tracking-tighter w-12 text-center ${u.isActive ? 'text-emerald-500' : 'text-slate-600'}`}>
                      {u.isActive ? 'Active' : 'Muted'}
                    </span>
                    <button 
                      disabled={updatingId === u.id}
                      onClick={() => handleToggle(u)}
                      className={`relative w-14 h-7 rounded-full transition-all duration-500 ${u.isActive ? 'bg-emerald-500/20' : 'bg-slate-800'}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-500 shadow-lg ${u.isActive ? 'left-8 bg-emerald-400' : 'left-1 bg-slate-400'}`}>
                        {updatingId === u.id && <Loader2 className="w-full h-full animate-spin p-1 opacity-50" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Expanded Details Card */}
                {activeTab === u.id && (
                  <div className="mt-8 pt-8 border-t border-white/5 animate-in slide-in-from-top-6 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                          <UserCircle className="w-4 h-4 text-slate-500" />
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identity Details</h5>
                        </div>
                        <div className="grid grid-cols-2 gap-6 bg-slate-950/50 p-5 rounded-3xl border border-white/5">
                           <ReadOnlyField label="Company" value={u.companyName} />
                           <ReadOnlyField label="Phone" value={u.phone} />
                           <ReadOnlyField label="Location" value={`${u.city}, ${u.country}`} />
                           <ReadOnlyField label="Join Date" value={new Date(u.createdAt).toLocaleDateString()} />
                           <div className="col-span-2">
                             <ReadOnlyField label="Street" value={u.streetAddress} />
                           </div>
                        </div>
                      </div>

                      <form action={(fd) => handleSubUpdate(u.id, fd)} className="space-y-6">
                        <input type="hidden" name="isActive" value={u.isActive ? 'on' : 'off'} />
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-400">Account Access Window</h5>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-600/5 p-5 rounded-3xl border border-blue-500/10">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-blue-500/60 uppercase tracking-widest">Starts From</label>
                            <input type="date" name="start" defaultValue={u.subscriptionStart ? new Date(u.subscriptionStart).toISOString().split('T')[0] : ''} className="w-full bg-slate-950 border border-white/5 rounded-xl p-2.5 text-[11px] focus:ring-2 focus:ring-blue-500/50 outline-none text-white" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-blue-500/60 uppercase tracking-widest">Expires On</label>
                            <input type="date" name="end" defaultValue={u.subscriptionEnd ? new Date(u.subscriptionEnd).toISOString().split('T')[0] : ''} className="w-full bg-slate-950 border border-white/5 rounded-xl p-2.5 text-[11px] focus:ring-2 focus:ring-blue-500/50 outline-none text-white" />
                          </div>
                        </div>
                        <button type="submit" disabled={updatingId === u.id} className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] uppercase font-black tracking-widest py-4 rounded-2xl transition-all shadow-2xl shadow-blue-900/30">
                          {updatingId === u.id ? 'Saving Registry...' : 'Update Validity'}
                        </button>
                      </form>

                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between opacity-50">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-blue-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Total Management Volume: {users.length}</span>
        </div>
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block">{label}</span>
      <span className="text-[11px] text-slate-200 block font-bold truncate leading-tight">{value || 'Not provided'}</span>
    </div>
  );
}

function Section({ title, children, noBorder }: any) {
  return (
    <div className={`space-y-6 ${!noBorder && 'border-t border-white/5 pt-6'}`}>
      <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function Field({ label, name, defaultValue, icon, disabled = false, compact = false }: any) {
  return (
    <div className="space-y-2 group">
      <label className={`text-[10px] font-black tracking-widest uppercase ml-1 block transition-colors ${disabled ? 'text-slate-600' : 'text-slate-500 group-focus-within:text-blue-500'}`}>{label}</label>
      <div className="relative">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${disabled ? 'text-slate-800' : 'text-slate-600 group-focus-within:text-blue-500'}`}>
          <span className={`${compact ? '[&>svg]:w-3.5 [&>svg]:h-3.5' : '[&>svg]:w-4.5 [&>svg]:h-4.5'}`}>{icon}</span>
        </div>
        <input
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`w-full ${compact ? 'pl-10 pr-4 py-2.5 text-xs' : 'pl-12 pr-6 py-4 text-sm'} bg-white/5 border border-white/[0.05] rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-bold ${disabled ? 'opacity-30 cursor-not-allowed bg-transparent border-dashed' : 'hover:border-white/10'}`}
        />
      </div>
    </div>
  );
}
