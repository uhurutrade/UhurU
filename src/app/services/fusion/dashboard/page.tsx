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
  Power, RefreshCw, Hash, Key, ExternalLink, Trash2, Plus, Lock, UserPlus, CreditCard, Activity, Copy, ClipboardCheck
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [renewalPlan, setRenewalPlan] = useState("");

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

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function handleUpdate(formData: FormData) {
    setStatus(null);

    // CHANGE DETECTION
    const rawData = Object.fromEntries(formData.entries());
    const fieldsToTrack = ['firstName', 'lastName', 'companyName', 'phone', 'country', 'city', 'streetAddress', 'postcode'];
    const hasChanges = fieldsToTrack.some(field => {
      const formValue = rawData[field]?.toString().trim();
      const userValue = (user[field] || '').toString().trim();
      return formValue !== userValue;
    });

    if (!hasChanges) {
      setStatus({ success: true, message: 'No changes detected.' });
      return;
    }

    setUpdating(true);
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

  const handlePayPlan = () => {
    const url = renewalPlan === "30" ? 'https://google.es' : 'https://amazon.es';
    const w = 800;
    const h = 700;
    const left = (window.screen.width / 2) - (w / 2);
    const top = (window.screen.height / 2) - (h / 2);
    
    window.open(
      url, 
      'PaymentGate', 
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
    );

    // Reset selection after clicking
    setRenewalPlan("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const isVigente = user.isAdmin || (user.isPaid && user.subscriptionEnd && new Date(user.subscriptionEnd) > new Date());

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
                {user.customerNumber && <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 uppercase font-black">ID: {user.customerNumber.toString().padStart(4,'0')}</span>}
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
          
          {!user.isAdmin && (
            <div className="lg:col-span-12 space-y-6 max-w-4xl mx-auto">
              {/* Status Card */}
              <div className={`p-8 rounded-[2.5rem] border transition-all duration-700 ${isVigente ? 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.05)]' : 'bg-red-500/5 border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.05)]'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1.5 px-1">Subscription Vigor</h4>
                    <p className={`text-2xl font-black tracking-tight ${isVigente ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isVigente ? 'Subscription Active' : 'Subscription not active'}
                    </p>
                    
                    {isVigente && (
                      <div className="mt-3 space-y-1.5">
                        <p className="text-xs text-emerald-500/60 uppercase font-bold tracking-widest flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" /> From: {user.subscriptionStart ? new Date(user.subscriptionStart).toLocaleDateString() : 'N/A'}
                        </p>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest flex items-center gap-2">
                          <ArrowRight className="w-3 h-3" /> To: {user.subscriptionEnd ? new Date(user.subscriptionEnd).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    )}

                    {!isVigente && (
                      <div className="mt-6 animate-in slide-in-from-top-2">
                         <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-3 px-1">Purchase License Renewal</label>
                         <select 
                           value={renewalPlan}
                           onChange={(e) => setRenewalPlan(e.target.value)}
                           className="w-full bg-slate-900/50 border border-white/20 rounded-2xl px-5 py-4 text-xs font-black text-slate-200 focus:ring-1 focus:ring-blue-500/50 outline-none appearance-none cursor-pointer hover:bg-slate-900 transition-all uppercase tracking-widest shadow-xl shadow-black/20">
                            <option value="">Select a renewal plan...</option>
                            <option value="30">Oracle Fusion 30 days (£59)</option>
                            <option value="90">Oracle Fusion 90 days (£140)</option>
                         </select>

                         {renewalPlan && (
                           <button 
                             onClick={handlePayPlan}
                             className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black uppercase tracking-widest py-5 rounded-2xl animate-in slide-in-from-top-4 duration-500 shadow-2xl shadow-emerald-950/40 flex items-center justify-center gap-3 group border border-white/40"
                            >
                              <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              Pay Plan
                           </button>
                         )}
                      </div>
                    )}
                  </div>

                  <div className="text-right pt-1 pr-1 opacity-40">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Authenticated Account</span>
                    <span className="text-lg font-black text-white tracking-[0.2em]">User ID: {user.customerNumber?.toString().padStart(4, '0')}</span>
                  </div>
                </div>
                {isVigente && user.chosenPlan && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-black uppercase text-emerald-500/60 tracking-widest">{user.chosenPlan}</span>
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
                    <Field label="User ID" name="customerNumber" defaultValue={user.customerNumber ? user.customerNumber.toString().padStart(4, '0') : '0000'} icon={<Hash />} disabled compact />
                    <Field label="Contact Email" name="email" defaultValue={user.email} icon={<Mail />} disabled compact />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
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
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Management Center (Admin) */}
          {user.isAdmin && (
            <div className="lg:col-span-12 h-[calc(100vh-160px)]">
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
  const [formStatus, setFormStatus] = useState<{ id: string; success: boolean; message: string } | null>(null);

  useEffect(() => { loadUsers(); }, []);

  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => setFormStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

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
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        companyName: formData.get('companyName') as string,
        phone: formData.get('phone') as string,
        country: formData.get('country') as string,
        city: formData.get('city') as string,
        streetAddress: formData.get('streetAddress') as string,
        postcode: formData.get('postcode') as string,
      });
      setFormStatus({ id: userId, success: true, message: 'Registry updated successfully' });
      setTimeout(() => {
         setActiveTab(null);
         loadUsers();
      }, 500);
    } catch (e: any) { 
      let msg = 'System update encountererd an error.';
      if (e.message === 'PLAN_AND_DATE_REQUIRED') {
        msg = 'Plan and Activation Date are required for verified payments';
      } else if (e.message === 'NO_LICENSES_AVAILABLE') {
        msg = 'CRITICAL: No available licenses found to assign!';
      }
      setFormStatus({ id: userId, success: false, message: msg });
    }
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
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-black text-[11px] font-mono leading-none">
                        {u.customerNumber ? u.customerNumber.toString().padStart(4,'0') : '—'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 flex items-center gap-3">
                        {u.firstName} {u.lastName}
                        {u.email === 'uhurutradeuk@gmail.com' ? 
                           <span className="text-[10px] text-blue-400 font-mono font-black border border-blue-500/20 px-4 rounded-md bg-blue-500/5 uppercase tracking-[0.2em]">ADMIN</span> :
                           isVigente ? 
                            <div className="flex flex-col">
                              <span className="text-[10px] text-emerald-400 font-mono font-black border border-emerald-500/20 px-2 rounded-md bg-emerald-500/5 uppercase tracking-widest text-center mb-1">Subscription Active</span>
                              <span className="text-[9px] text-emerald-500/50 font-mono text-center">F: {u.subscriptionStart ? new Date(u.subscriptionStart).toLocaleDateString() : 'N/A'} - T: {u.subscriptionEnd ? new Date(u.subscriptionEnd).toLocaleDateString() : 'N/A'}</span>
                            </div> : 
                            <span className="text-[10px] text-red-500 border border-red-500/20 px-2 rounded-md uppercase tracking-widest font-black bg-red-500/5 py-1">Subscription not active</span>
                        }
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{u.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              {activeTab === u.id && (
                <div className="mt-8 pt-8 border-t border-white/5 animate-in slide-in-from-top-4">
                  <form action={(fd) => handleUpdateAccount(u.id, fd)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6 bg-slate-950/40 p-8 rounded-3xl border border-white/5">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4 px-1">Account Parameters</h5>
                        
                        <div className="grid grid-cols-2 gap-6">
                           <Field label="First Name" name="firstName" defaultValue={u.firstName} icon={<User />} compact disabled />
                           <Field label="Last Name" name="lastName" defaultValue={u.lastName} icon={<User />} compact disabled />
                        </div>

                        {u.email !== 'uhurutradeuk@gmail.com' ? (
                          <>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Subscription Plan</label>
                                <select name="plan" defaultValue={u.chosenPlan || ''} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white appearance-none focus:ring-2 focus:ring-blue-500/50">
                                  <option value="">No Plan Selected</option>
                                  <option value="Oracle Fusion 30 days">Oracle Fusion 30 days (£59)</option>
                                  <option value="Oracle Fusion 90 days">Oracle Fusion 90 days (£140)</option>
                                </select>
                              </div>
                              <div className="space-y-3">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Activation Date</label>
                                <input type="date" name="start" defaultValue={u.subscriptionStart ? new Date(u.subscriptionStart).toISOString().split('T')[0] : ''} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white" />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6">
                              <ToggleInput label="Account Active" name="isActive" defaultChecked={u.isActive} />
                              <ToggleInput label="Payment Verified" name="isPaid" defaultChecked={u.isPaid} highlight />
                            </div>
                          </>
                        ) : (
                          <div className="p-6 bg-blue-600/5 border border-blue-500/10 rounded-2xl flex items-center justify-center gap-3">
                              <ShieldCheck className="w-5 h-5 text-blue-500" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Admin Account: Full Access Privileges</span>
                              <input type="hidden" name="isActive" value="on" />
                          </div>
                        )}

                        {formStatus && formStatus.id === u.id && (
                          <div className={`p-4 rounded-xl flex items-center gap-3 border text-[10px] font-black uppercase tracking-widest animate-in zoom-in-95 duration-300 ${formStatus.success ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' : 'bg-red-500/5 text-red-500 border-red-500/10'}`}>
                            {formStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            <span>{formStatus.message}</span>
                          </div>
                        )}

                        <div className="pt-8">
                          <button type="submit" disabled={updatingId === u.id} className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] uppercase font-black tracking-widest py-4 rounded-xl transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2">
                             {updatingId === u.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                             Update Student & Account Details
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-950/20 p-8 rounded-3xl border border-dashed border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Activity className="w-5 h-5 text-slate-500" />
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Corporate & Location Information</h5>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <Field label="Company" name="companyName" defaultValue={u.companyName} icon={<Building />} compact disabled />
                           <Field label="Phone" name="phone" defaultValue={u.phone} icon={<Phone />} compact disabled />
                           <Field label="Country" name="country" defaultValue={u.country} icon={<Globe />} compact disabled />
                           <Field label="City" name="city" defaultValue={u.city} icon={<Building2 />} compact disabled />
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                           <Field label="Street Address" name="streetAddress" defaultValue={u.streetAddress} icon={<Home />} compact disabled />
                           <Field label="Postcode" name="postcode" defaultValue={u.postcode} icon={<MapPin />} compact disabled />
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <div className="grid grid-cols-3 gap-4 opacity-70">
                                <ReadOnlyItem label="Customer ID" value={u.customerNumber ? u.customerNumber.toString().padStart(4,'0') : 'Pending'} />
                                <ReadOnlyItem label="Licence Number" value={u.licenses?.[0]?.subscription || 'None Assigned'} />
                                <ReadOnlyItem label="Expiration Date" value={u.subscriptionEnd ? new Date(u.subscriptionEnd).toLocaleDateString() : 'None Assigned'} />
                            </div>
                        </div>
                      </div>
                    </div>
                  </form>
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
                    <div className="grid grid-cols-2 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-2">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">Licence ID</span>
                        <p className="text-sm font-black text-white">{l.subscription}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-2 h-2 rounded-full ${l.isAvailable && !l.isAvailableUhuru ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`} />
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">
                            {l.isAvailable && !l.isAvailableUhuru ? 'Available' : 'Reserved'}
                          </span>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">URL Hub Link</span>
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-mono text-slate-400 truncate max-w-[100px]">{l.urlLink}</p>
                          <CopyButton text={l.urlLink} />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">SCM Username</span>
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-mono text-slate-300 truncate max-w-[100px]">{l.username}</p>
                          <CopyButton text={l.username} />
                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">SCM Pass</span>
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-mono text-slate-500 tracking-widest">••••••</p>
                          <CopyButton text={l.password} />
                        </div>
                      </div>

                      <div className="md:col-span-3">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">Assigned Student</span>
                        {l.assignedTo ? (
                          <div className="flex items-center gap-3">
                              <div>
                                <p className="text-[11px] font-black text-blue-400 uppercase tracking-tight truncate max-w-[110px]">
                                  {l.assignedTo.firstName} {l.assignedTo.lastName}
                                </p>
                                <p className="text-[8px] text-slate-600 font-mono italic truncate max-w-[100px]">{l.assignedTo.email}</p>
                              </div>
                              <span className="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-1 rounded font-black whitespace-nowrap">
                                ID: {l.assignedTo.customerNumber?.toString().padStart(4, '0')}
                              </span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-750 tracking-widest uppercase font-black">None Assigned</span>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">Expiration</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
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
        className={`group relative w-11 h-6 rounded-full transition-all duration-300 flex items-center ${checked ? (highlight ? 'bg-blue-500 ring-2 ring-blue-500/20' : 'bg-emerald-500 ring-2 ring-emerald-500/20') : 'bg-slate-800'}`}
      >
        <div className={`ml-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-md transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button 
      type="button"
      onClick={handleCopy} 
      className="p-1.5 bg-white/5 hover:bg-blue-500/10 rounded-lg transition-all text-slate-600 hover:text-blue-400 border border-transparent hover:border-blue-500/20"
      title="Click to copy"
    >
      {copied ? <ClipboardCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}
