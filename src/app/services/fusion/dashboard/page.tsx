'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, updateProfile, logoutUser, getAllUsers, updateUserDetails } from '@/actions/auth';
import { 
  User, Mail, Building, MapPin, Building2, Phone, Globe, Home, 
  CheckCircle2, AlertCircle, LogOut, Save, UserCircle, Loader2,
  ShieldCheck, Calendar, Users, ArrowRight, Table, ChevronDown, ChevronUp, Power, RefreshCw, Hash
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

      <div className="max-w-[1700px] mx-auto z-10 relative">
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
              <p className="text-xs text-slate-400">Owner: <span className="text-slate-200 font-mono">{user.email}</span></p>
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
          
          {/* My Profile Section */}
          <div className={`${user.isAdmin ? 'lg:col-span-4' : 'lg:col-span-12'} space-y-6`}>
            <div className={`bg-slate-900/40 backdrop-blur-3xl border border-white/[0.05] rounded-[2rem] shadow-2xl overflow-hidden p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em]">Profile Records</h3>
                <Hash className="w-4 h-4 text-blue-500 opacity-20" />
              </div>

              <form action={handleUpdate} className="grid grid-cols-1 gap-5 relative z-10">
                <Section title="Identity" noBorder>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" name="firstName" defaultValue={user.firstName} icon={<User />} compact />
                    <Field label="Last Name" name="lastName" defaultValue={user.lastName} icon={<User />} compact />
                  </div>
                  <Field label="Contact Email" name="email" defaultValue={user.email} icon={<Mail />} compact disabled />
                </Section>

                <Section title="Professional & Location">
                  <Field label="Company" name="companyName" defaultValue={user.companyName} icon={<Building />} compact />
                  <Field label="Phone" name="phone" defaultValue={user.phone} icon={<Phone />} compact />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Country" name="country" defaultValue={user.country} icon={<Globe />} compact />
                    <Field label="City" name="city" defaultValue={user.city} icon={<Building2 />} compact />
                  </div>
                  <Field label="Address" name="streetAddress" defaultValue={user.streetAddress} icon={<Home />} compact />
                  <Field label="Zip Code" name="postcode" defaultValue={user.postcode} icon={<MapPin />} compact />
                </Section>

                <div className="border-t border-white/5 pt-6">
                  <div className="flex items-center gap-2 mb-4 bg-slate-950/50 p-3 rounded-xl border border-white/5">
                    <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-red-500'}`}></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      Validity: {user.subscriptionEnd ? new Date(user.subscriptionEnd).toLocaleDateString() : 'Inactive'}
                    </span>
                  </div>

                  {status && (
                    <div className={`p-4 mb-4 rounded-xl flex items-center gap-3 border text-xs font-bold animate-in slide-in-from-bottom-2 ${status.success ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' : 'bg-red-500/5 text-red-500 border-red-500/10'}`}>
                      {status.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                      <span>{status.message}</span>
                    </div>
                  )}

                  <button
                    disabled={updating}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-xl transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2"
                  >
                    {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Sync My Records
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Admin Station */}
          {user.isAdmin && (
            <div className="lg:col-span-8">
              <AdminPanel currentUserId={user.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ currentUserId }: { currentUserId: string }) {
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
    <div className="bg-slate-900/60 backdrop-blur-3xl border border-blue-500/10 rounded-[2.5rem] shadow-2xl p-6 md:p-8 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-blue-600/10 rounded-2xl border border-blue-500/10">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase">Registry Database</h2>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest">GLOBAL USERS LIST</p>
          </div>
        </div>
        <button onClick={loadUsers} className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-blue-400">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-3 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full opacity-30">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <span className="text-[10px] uppercase font-black tracking-widest">Fetching records...</span>
          </div>
        ) : (
          users.map((u) => (
            <div key={u.id} className={`p-1 rounded-[1.75rem] transition-all duration-300 ${activeTab === u.id ? 'bg-blue-600/10 ring-1 ring-blue-500/20' : 'hover:bg-white/5 ring-1 ring-transparent'}`}>
              <div className="p-4 flex flex-col">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1 cursor-pointer flex items-center gap-4" onClick={() => setActiveTab(activeTab === u.id ? null : u.id)}>
                    <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center text-slate-500 border border-white/5">
                      {activeTab === u.id ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm">{u.firstName} {u.lastName} {u.id === currentUserId && <span className="text-[8px] text-blue-400 font-black tracking-widest">(Me)</span>}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">{u.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-slate-950/80 p-1.5 px-3 rounded-2xl border border-white/5">
                    <span className={`text-[8px] font-black uppercase tracking-tighter ${u.isActive ? 'text-emerald-500' : 'text-slate-600'}`}>{u.isActive ? 'Active' : 'Locked'}</span>
                    <button onClick={() => handleToggle(u)} className={`relative w-10 h-5 rounded-full transition-all ${u.isActive ? 'bg-emerald-500/20' : 'bg-slate-800'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${u.isActive ? 'left-5.5 bg-emerald-400' : 'left-0.5 bg-slate-400'}`}></div>
                    </button>
                  </div>
                </div>

                {/* Expanded Card */}
                {activeTab === u.id && (
                  <div className="mt-6 pt-6 border-t border-white/5 space-y-6 animate-in slide-in-from-top-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-950/50 p-4 rounded-3xl border border-white/5">
                       <ReadOnlyItem label="Company" value={u.companyName} />
                       <ReadOnlyItem label="Phone" value={u.phone} />
                       <ReadOnlyItem label="Identity" value={`${u.firstName} ${u.lastName}`} />
                       <ReadOnlyItem label="Join Date" value={new Date(u.createdAt).toLocaleDateString()} />
                       <ReadOnlyItem label="Country" value={u.country} />
                       <ReadOnlyItem label="City" value={u.city} />
                       <ReadOnlyItem label="Postcode" value={u.postcode} />
                       <div className="col-span-2 md:col-span-1">
                        <ReadOnlyItem label="Street" value={u.streetAddress} />
                       </div>
                    </div>

                    <form action={(fd) => handleSubUpdate(u.id, fd)} className="bg-blue-600/5 p-5 rounded-3xl border border-blue-500/10 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <input type="hidden" name="isActive" value={u.isActive ? 'on' : 'off'} />
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-blue-500 uppercase">Valid From</label>
                        <input type="date" name="start" defaultValue={u.subscriptionStart ? new Date(u.subscriptionStart).toISOString().split('T')[0] : ''} className="w-full bg-slate-950 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-blue-500 uppercase">Valid Until</label>
                        <input type="date" name="end" defaultValue={u.subscriptionEnd ? new Date(u.subscriptionEnd).toISOString().split('T')[0] : ''} className="w-full bg-slate-950 border border-white/5 rounded-xl p-2.5 text-xs text-white" />
                      </div>
                      <div className="flex items-end">
                        <button type="submit" disabled={updatingId === u.id} className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[9px] uppercase font-black py-3 rounded-xl transition-all">Authorize Updates</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-4 h-4 text-blue-500" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Registry Count: {users.length}</span>
        </div>
      </div>
    </div>
  );
}

function ReadOnlyItem({ label, value }: any) {
  return (
    <div className="space-y-1">
      <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">{label}</span>
      <span className="text-[10px] text-slate-200 block font-bold truncate">{value || 'N/A'}</span>
    </div>
  );
}

function Section({ title, children, noBorder }: any) {
  return (
    <div className={`space-y-4 ${!noBorder && 'border-t border-white/5 pt-4'}`}>
      <h3 className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function Field({ label, name, defaultValue, icon, disabled = false, compact = false }: any) {
  return (
    <div className="space-y-1.5 group">
      <label className={`text-[9px] font-black tracking-widest uppercase ml-1 block ${disabled ? 'text-slate-600' : 'text-slate-500'}`}>{label}</label>
      <div className="relative">
        <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${disabled ? 'text-slate-800' : 'text-slate-600 group-focus-within:text-blue-500'}`}>
          <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>
        </div>
        <input
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/[0.05] rounded-xl text-[11px] font-bold ${disabled ? 'opacity-30' : 'focus:ring-2 focus:ring-blue-500/30'}`}
        />
      </div>
    </div>
  );
}
