'use client';

import { useEffect, useState } from 'react';
import { 
  getCurrentUser, updateProfile, logoutUser, getAllUsers, 
  updateUserDetails, getAllLicenses, upsertLicense, deleteLicense 
} from '@/actions/auth';
import { 
  User, Mail, Building, MapPin, Building2, Phone, Globe, Home, 
  CheckCircle2, AlertCircle, LogOut, Save, UserCircle, Loader2,
  ShieldCheck, Calendar, Users, ArrowRight, Table, ChevronDown, ChevronUp, 
  Power, RefreshCw, Hash, Key, ExternalLink, Trash2, Plus, Lock, UserPlus, CreditCard, Activity
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

  const isVigente = user.isPaid && user.subscriptionEnd && new Date(user.subscriptionEnd) > new Date();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px]"></div>

      <div className="max-w-[1700px] mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg ring-1 ring-white/10 text-white">
              <UserCircle className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight uppercase tracking-widest">Oracle Hub</h1>
                {user.customerNumber && <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 uppercase font-black">ID: {user.customerNumber}</span>}
                {user.isAdmin && <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-black">ADMIN</span>}
              </div>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-red-500/10 text-slate-300 hover:text-red-400 rounded-xl transition-all border border-white/5 hover:border-red-500/20 font-bold text-xs"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Profile Column */}
          <div className={`${user.isAdmin ? 'lg:col-span-4' : 'lg:col-span-12'} space-y-6`}>
            {/* Status Card */}
            <div className={`p-6 rounded-[2rem] border transition-all duration-700 ${isVigente ? 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.05)]' : 'bg-red-500/5 border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.05)]'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Subscription Vigor</h4>
                  <p className={`text-lg font-black uppercase tracking-tighter ${isVigente ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isVigente ? 'System Active' : 'Access Suspended'}
                  </p>
                  {user.subscriptionEnd && (
                    <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-widest">
                      Valid Until: {new Date(user.subscriptionEnd).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className={`w-14 h-7 rounded-full relative transition-all duration-500 border border-white/10 ${isVigente ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-slate-800 shadow-inner'}`}>
                  <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-500 ${isVigente ? 'left-8' : 'left-1 opacity-20'}`} />
                </div>
              </div>
              {user.chosenPlan && (
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{user.chosenPlan}</span>
                </div>
              )}
            </div>

            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/[0.05] rounded-[2rem] shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">Profile Identity</h3>
                <ShieldCheck className="w-4 h-4 text-blue-500 opacity-20" />
              </div>

              <form action={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name" name="firstName" defaultValue={user.firstName} icon={<User />} compact />
                  <Field label="Last Name" name="lastName" defaultValue={user.lastName} icon={<User />} compact />
                </div>
                
                <div className="pt-2">
                  <Section title="Corporate Info" noBorder>
                    <Field label="Company" name="companyName" defaultValue={user.companyName} icon={<Building />} compact />
                    <Field label="Contact Phone" name="phone" defaultValue={user.phone} icon={<Phone />} compact />
                  </Section>
                </div>

                <div className="pt-2">
                  <Section title="Location Tracking">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Country" name="country" defaultValue={user.country} icon={<Globe />} compact />
                      <Field label="City" name="city" defaultValue={user.city} icon={<Building2 />} compact />
                    </div>
                    <Field label="Street Address" name="streetAddress" defaultValue={user.streetAddress} icon={<Home />} compact />
                    <Field label="Zip / Postcode" name="postcode" defaultValue={user.postcode} icon={<MapPin />} compact />
                  </Section>
                </div>

                <div className="pt-6">
                   {status && (
                    <div className={`p-4 mb-4 rounded-xl flex items-center gap-3 border text-xs font-bold animate-in zoom-in-95 ${status.success ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' : 'bg-red-500/5 text-red-500 border-red-500/10'}`}>
                      {status.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>{status.message}</span>
                    </div>
                  )}
                  <button
                    disabled={updating}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-xl transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2"
                  >
                    {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Synchronize Details
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Management Center (Admin) */}
          {user.isAdmin && (
            <div className="lg:col-span-8 h-[calc(100vh-160px)]">
              <AdminCenter currentUserId={user.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminCenter({ currentUserId }: { currentUserId: string }) {
  const [activeView, setActiveView] = useState<'students' | 'licenses'>('students');

  return (
    <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] shadow-2xl h-full flex flex-col overflow-hidden">
      <div className="flex border-b border-white/5 bg-slate-950/20">
        <TabButton 
          active={activeView === 'students'} 
          onClick={() => setActiveView('students')} 
          icon={<Users className="w-4 h-4" />} 
          label="Student Registry" 
        />
        <TabButton 
          active={activeView === 'licenses'} 
          onClick={() => setActiveView('licenses')} 
          icon={<Key className="w-4 h-4" />} 
          label="License Inventory" 
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
        {activeView === 'students' ? <StudentRegistry currentUserId={currentUserId} /> : <LicenseInventory />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-r border-white/5 ${active ? 'bg-blue-600/10 text-blue-400 border-b-2 border-b-blue-500' : 'text-slate-500 hover:bg-white/5'}`}
    >
      {icon} {label}
    </button>
  );
}

function StudentRegistry({ currentUserId }: { currentUserId: string }) {
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

  async function handleUpdateAccount(userId: string, formData: FormData) {
    setUpdatingId(userId);
    try {
      await updateUserDetails(userId, { 
        isActive: formData.get('isActive') === 'on',
        isPaid: formData.get('isPaid') === 'on',
        chosenPlan: formData.get('plan') as string,
        start: formData.get('start') as string, 
      });
      setActiveTab(null);
      loadUsers();
    } catch (e) { alert('Error updating'); }
    finally { setUpdatingId(null); }
  }

  if (loading) return <LoaderSpinner label="Exploring Student Database" />;

  return (
    <div className="space-y-4">
      {users.map((u) => {
        const isVigente = u.isPaid && u.subscriptionEnd && new Date(u.subscriptionEnd) > new Date();
        return (
          <div key={u.id} className={`p-1 rounded-[2rem] transition-all duration-300 ${activeTab === u.id ? 'bg-blue-600/10 ring-1 ring-blue-500/20 shadow-2xl' : 'hover:bg-white/5 ring-1 ring-transparent'}`}>
            <div className="p-4">
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1 cursor-pointer flex items-center gap-4" onClick={() => setActiveTab(activeTab === u.id ? null : u.id)}>
                  <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-slate-500 border border-white/5 shadow-inner">
                    {activeTab === u.id ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 flex items-center gap-3">
                       {u.firstName} {u.lastName}
                       {isVigente ? <span className="text-[10px] text-emerald-400 font-mono font-black border border-emerald-500/20 px-2 rounded-md bg-emerald-500/5 uppercase tracking-widest">Active</span> : <span className="text-[10px] text-slate-600 border border-white/5 px-2 rounded-md uppercase tracking-widest font-black">Suspended</span>}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{u.email} • {u.customerNumber ? `#${u.customerNumber}` : 'Pending'}</p>
                  </div>
                </div>
              </div>
              {activeTab === u.id && (
                <div className="mt-8 pt-8 border-t border-white/5 animate-in slide-in-from-top-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <form action={(fd) => handleUpdateAccount(u.id, fd)} className="space-y-8 bg-slate-950/40 p-8 rounded-3xl border border-white/5">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Subscription Plan</label>
                          <select name="plan" defaultValue={u.chosenPlan || ''} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white appearance-none focus:ring-2 focus:ring-blue-500/50">
                            <option value="">No Plan Selected</option>
                            <option value="Fusion One Month">Fusion One Month</option>
                            <option value="Fusion Three Months">Fusion Three Months</option>
                          </select>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Activation Date</label>
                          <input type="date" name="start" defaultValue={u.subscriptionStart ? new Date(u.subscriptionStart).toISOString().split('T')[0] : ''} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <ToggleInput label="Account Active" name="isActive" defaultChecked={u.isActive} />
                        <ToggleInput label="Payment Verified" name="isPaid" defaultChecked={u.isPaid} highlight />
                      </div>

                      <button type="submit" disabled={updatingId === u.id} className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] uppercase font-black tracking-widest py-4 rounded-xl transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2">
                         {updatingId === u.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                         Authorize Account Parameters
                      </button>
                    </form>

                    <div className="bg-slate-950/20 p-8 rounded-3xl border border-dashed border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                          <Activity className="w-5 h-5 text-slate-500" />
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Information Table</h5>
                        </div>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                          <ReadOnlyItem label="Corporate Org" value={u.companyName} />
                          <ReadOnlyItem label="Contact Link" value={u.phone} />
                          <ReadOnlyItem label="Country" value={u.country} />
                          <ReadOnlyItem label="City Location" value={u.city} />
                          <ReadOnlyItem label="Internal ID" value={u.customerNumber} />
                          <ReadOnlyItem label="Exp. Date" value={u.subscriptionEnd ? new Date(u.subscriptionEnd).toLocaleDateString() : 'Pending'} />
                          <div className="col-span-2">
                             <ReadOnlyItem label="Legal Address" value={u.streetAddress} />
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LicenseInventory() {
  const [licenses, setLicenses] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [lics, usrs] = await Promise.all([getAllLicenses(), getAllUsers()]);
      setLicenses(lics);
      setUsers(usrs);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    try {
      await upsertLicense(fd);
      setShowEditor(null);
      loadData();
    } catch (e) { alert('Error'); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this license permanentely?')) return;
    try {
      await deleteLicense(id);
      loadData();
    } catch (e) { alert('Error'); }
  }

  if (loading) return <LoaderSpinner label="Processing Asset Inventory" />;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Asset Inventory: {licenses.length}</h3>
        <button 
          onClick={() => setShowEditor({})}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-blue-900/20"
        >
          <Plus className="w-4 h-4" /> Deploy License
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {licenses.map((l) => (
          <div key={l.id} className="bg-slate-950/40 border border-white/5 rounded-3xl p-6 hover:border-blue-500/20 transition-all group overflow-hidden relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">Subscription Type</label>
                  <span className="text-sm font-black text-white">{l.subscription}</span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`w-2 h-2 rounded-full ${l.isAvailable ? 'bg-emerald-500 shadow-emerald-500/50 shadow-lg' : 'bg-slate-700'}`} />
                    <span className="text-[9px] font-bold text-slate-500 uppercase">{l.isAvailable ? 'Available' : 'Allocated'}</span>
                  </div>
                </div>
                <div>
                  <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">Assigned Student</label>
                  {l.assignedTo ? (
                    <div>
                      <span className="text-[11px] font-bold text-blue-400 block">{l.assignedTo.firstName} {l.assignedTo.lastName}</span>
                      <span className="text-[9px] text-slate-500 font-mono">{l.assignedTo.email}</span>
                    </div>
                  ) : <span className="text-[10px] text-slate-600 tracking-widest uppercase font-black">None Assigned</span>}
                </div>
                <div>
                  <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">Login Port</label>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-300 font-mono truncate max-w-[120px]">{l.username}</span>
                    <Lock className="w-3 h-3 text-slate-700" />
                  </div>
                </div>
                <div>
                  <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">Expires On</label>
                  <span className="text-[11px] font-bold text-slate-400">
                    {l.expiryDate ? new Date(l.expiryDate).toLocaleDateString() : 'Evergreen'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowEditor(l)} className="p-2.5 bg-white/5 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 rounded-xl transition-all border border-white/5"><Table className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(l.id)} className="p-2.5 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl transition-all border border-white/5"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEditor && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-2xl z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-[0_0_100px_rgba(30,58,138,0.2)] animate-in zoom-in-95 duration-300">
             <form onSubmit={handleSubmit}>
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-500"><Key className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-xl font-black text-white tracking-tight uppercase">{showEditor.id ? 'Modify License' : 'Deploy New License'}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Asset Parameters</p>
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-8">
                <input type="hidden" name="id" value={showEditor.id || ''} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Field label="Subscription Name" name="subscription" defaultValue={showEditor.subscription} icon={<Hash />} compact />
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Expiry Date</label>
                      <input type="date" name="expiryDate" defaultValue={showEditor.expiryDate ? new Date(showEditor.expiryDate).toISOString().split('T')[0] : ''} className="w-full pl-4 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-white" />
                    </div>
                    <Field label="URL Hub Link" name="urlLink" defaultValue={showEditor.urlLink} icon={<ExternalLink />} compact />
                    <div className="flex items-center gap-6 pt-2">
                       <ToggleInput label="Internal Available" name="isAvailable" defaultChecked={showEditor.isAvailable} />
                       <ToggleInput label="Uhuru Access" name="isAvailableUhuru" defaultChecked={showEditor.isAvailableUhuru} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Field label="Oracle SCM Username" name="username" defaultValue={showEditor.username} icon={<User />} compact />
                    <Field label="Oracle SCM Password" name="password" defaultValue={showEditor.password} icon={<Lock />} compact />
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Assign Student</label>
                      <select name="userId" defaultValue={showEditor.userId || ''} className="w-full pl-4 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold appearance-none text-white focus:ring-2 focus:ring-blue-500/50">
                        <option value="" className="bg-slate-900 border-none">Not Assigned</option>
                        {users.map(u => (
                          <option key={u.id} value={u.id} className="bg-slate-900">{u.firstName} {u.lastName}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <button type="button" onClick={() => setShowEditor(null)} className="flex-1 border border-white/5 text-slate-400 font-black text-[11px] uppercase py-5 rounded-2xl hover:bg-white/5">Cancel</button>
                   <button 
                    disabled={saving}
                    type="submit" 
                    className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3 group"
                  >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Parameters
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleInput({ label, name, defaultChecked, highlight }: any) {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-white/5 group">
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
      <button 
        type="button"
        onClick={() => setChecked(!checked)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${checked ? (highlight ? 'bg-blue-500 ring-2 ring-blue-500/20' : 'bg-emerald-500 ring-2 ring-emerald-500/20') : 'bg-slate-800'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md ${checked ? 'left-7' : 'left-1'}`} />
        <input type="hidden" name={name} value={checked ? 'on' : 'off'} />
      </button>
    </div>
  );
}

function LoaderSpinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 opacity-50 space-y-4">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">{label}</span>
    </div>
  );
}

function ReadOnlyItem({ label, value }: any) {
  return (
    <div className="space-y-1">
      <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest block">{label}</span>
      <span className="text-[10px] text-slate-300 block font-bold truncate leading-none uppercase">{value || 'Pending'}</span>
    </div>
  );
}

function Section({ title, children, noBorder }: any) {
  return (
    <div className={`space-y-4 ${!noBorder && 'border-t border-white/5 pt-6'}`}>
      <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function Field({ label, name, defaultValue, icon, disabled = false, compact = false }: any) {
  return (
    <div className="space-y-1.5 group">
      <label className={`text-[9px] font-black tracking-widest uppercase ml-1 block transition-colors ${disabled ? 'text-slate-750' : 'text-slate-500 group-focus-within:text-blue-500'}`}>{label}</label>
      <div className="relative">
        <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${disabled ? 'text-slate-850' : 'text-slate-600 group-focus-within:text-blue-500'}`}>
          <span className={`${compact ? '[&>svg]:w-3.5 [&>svg]:h-3.5' : '[&>svg]:w-4.5 [&>svg]:h-4.5'}`}>{icon}</span>
        </div>
        <input
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`w-full ${compact ? 'pl-9 pr-4 py-2.5 text-xs' : 'pl-11 pr-5 py-3.5 text-sm'} bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-bold ${disabled ? 'opacity-30 cursor-not-allowed bg-transparent border-dashed' : 'hover:border-white/20'}`}
        />
      </div>
    </div>
  );
}
