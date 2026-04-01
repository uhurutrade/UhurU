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
  Power, RefreshCw, Hash, Key, ExternalLink, Trash2, Plus, Lock, UserPlus, CreditCard, Activity, Copy, ClipboardCheck, AlertTriangle, ShieldAlert
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { ContractingTerms } from '@/components/uhuru/ContractingTerms';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [renewalPlan, setRenewalPlan] = useState("");
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [globalNotification, setGlobalNotification] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getCurrentUser();
      if (!data) window.location.href = '/services/fusion';
      else setUser(data);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    let timeout: any;
    const resetTimer = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(async () => {
        await logoutUser();
        window.location.href = '/services/fusion';
      }, 30 * 60 * 1000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
    
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  async function handleUpdate(formData: FormData) {
    if (!user) return;
    setUpdating(true);
    const result = await updateProfile(user.id, formData);
    setUpdating(false);
    if (result.success) {
      setGlobalNotification({ success: true, message: 'Profile updated successfully' });
      const data = await getCurrentUser();
      setUser(data);
      setTimeout(() => setGlobalNotification(null), 3000);
    } else {
      setGlobalNotification({ success: false, message: result.message || 'Error updating profile' });
      setTimeout(() => setGlobalNotification(null), 3000);
    }
  }

  async function handleLogout() {
    await logoutUser();
    window.location.href = '/services/fusion';
  }

  const handlePayPlan = () => {
    if (!hasReadTerms) return;
    const url = renewalPlan === "30" 
      ? 'https://checkout.revolut.com/payment-link/5e7fc3a4-1313-4072-974b-9328a667b616' 
      : 'https://amazon.es';
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
    setHasReadTerms(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const isVigente = user.isAdmin || (user.isPaid && user.subscriptionEnd && new Date(user.subscriptionEnd) > new Date());

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 relative overflow-hidden font-sans transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1700px] mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg ring-1 ring-white/10 text-white">
              <UserCircle className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-foreground tracking-tight uppercase tracking-widest">Oracle Hub</h1>
                {user.customerNumber && <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 uppercase font-black">ID: {user.customerNumber.toString().padStart(4,'0')}</span>}
                {user.isAdmin && <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-black">ADMIN</span>}
              </div>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle className="h-10 w-10 bg-secondary/50 hover:bg-secondary rounded-xl transition-all border border-border" />
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 bg-secondary/50 hover:bg-red-500/10 text-foreground hover:text-red-400 rounded-xl transition-all border border-border font-bold text-xs h-10"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {!user.isAdmin && (
            <div className="lg:col-span-12 space-y-6 max-w-4xl mx-auto">
              {/* Status Card */}
              <div className={`p-8 rounded-[2.5rem] border transition-all duration-700 ${isVigente ? 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.05)]' : 'bg-red-500/5 border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.05)]'}`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
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
                           <div className="mt-6 space-y-4 animate-in slide-in-from-top-4 duration-500">
                             <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6">
                                <div className="flex items-start gap-4 mb-4">
                                  <input 
                                    type="checkbox" 
                                    id="accept-terms"
                                    checked={hasReadTerms}
                                    onChange={(e) => setHasReadTerms(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-white/20 bg-slate-900 accent-emerald-500 cursor-pointer"
                                  />
                                  <label htmlFor="accept-terms" className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed cursor-pointer select-none">
                                    I have read and accept the <button type="button" onClick={() => setShowTerms(true)} className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 font-black">Contracting Terms & Conditions</button> of Oracle Fusion instances.
                                  </label>
                                </div>
                                <button 
                                  onClick={handlePayPlan}
                                  disabled={!hasReadTerms}
                                  className={`w-full text-white text-[11px] font-black uppercase tracking-widest py-5 rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 group border border-white/40 ${hasReadTerms ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/40' : 'bg-slate-800 opacity-50 cursor-not-allowed grayscale'}`}
                                 >
                                   <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                   Pay Plan
                                </button>
                             </div>
                           </div>
                         )}
                      </div>
                    )}
                  </div>

                  <div className="md:text-right pt-4 md:pt-1 md:pr-1 opacity-40 border-t md:border-t-0 border-border/50 dark:border-white/5 mt-4 md:mt-0">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Authenticated Account</span>
                    <span className="text-lg font-black text-foreground tracking-[0.2em]">User ID: {user.customerNumber?.toString().padStart(4, '0')}</span>
                  </div>
                </div>
                {isVigente && user.chosenPlan && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-black uppercase text-emerald-500/60 tracking-widest">{user.chosenPlan}</span>
                  </div>
                )}
              </div>

              {isVigente && (
                <div className="bg-card/40 dark:bg-slate-900/60 backdrop-blur-3xl border border-blue-500/10 dark:border-blue-500/20 rounded-[2rem] shadow-2xl p-6 mb-6 animate-in slide-in-from-top-4 duration-700">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-border dark:border-white/5 pb-4">
                     <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Oracle Fusion Access Credentials
                     </h3>
                  </div>
                  <div className="space-y-4">
                     <CredentialField label="Oracle Fusion Portal URL" value={user.licenses?.[0]?.urlLink} icon={<ExternalLink />} />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CredentialField label="Oracle Fusion Username" value={user.licenses?.[0]?.username} icon={<User />} />
                        <CredentialField label="Oracle Fusion Password" value={user.licenses?.[0]?.password} icon={<Lock />} />
                     </div>
                  </div>
                </div>
              )}

              <div className="bg-card/30 dark:bg-slate-900/40 backdrop-blur-3xl border border-border/50 dark:border-white/[0.05] rounded-[2rem] shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6 border-b border-border dark:border-white/5 pb-4">
                  <h3 className="text-xs font-black text-foreground/40 uppercase tracking-widest">Profile Identity</h3>
                  <ShieldCheck className="w-4 h-4 text-primary opacity-20" />
                </div>

                <form action={handleUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField name="firstName" label="First Name" defaultValue={user.firstName} icon={<User />} />
                    <InputField name="lastName" label="Last Name" defaultValue={user.lastName} icon={<User />} />
                    <InputField name="email" label="Email" defaultValue={user.email} icon={<Mail />} readOnly />
                    <InputField name="phone" label="Phone" defaultValue={user.phone} icon={<Phone />} />
                  </div>
                  
                  <div className="border-t border-white/5 pt-6">
                    <h4 className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-4">Location & Corporate</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField name="companyName" label="Company" defaultValue={user.companyName} icon={<Building />} />
                      <InputField name="country" label="Country" defaultValue={user.country} icon={<Globe />} />
                      <InputField name="city" label="City" defaultValue={user.city} icon={<Building2 />} />
                      <InputField name="postcode" label="Zip Code" defaultValue={user.postcode} icon={<MapPin />} />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      disabled={updating}
                      type="submit"
                      className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[11px] tracking-widest rounded-xl transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group disabled:opacity-50"
                    >
                      {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                      Update Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {user.isAdmin && (
            <div className="lg:col-span-12">
               <AdminCenter currentUserId={user.id} setGlobalNotification={setGlobalNotification} />
            </div>
          )}

        </div>
      </div>

      {/* Notifications */}
      {globalNotification && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-500 flex items-center gap-3 ${globalNotification.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {globalNotification.success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="text-sm font-black uppercase tracking-widest">{globalNotification.message}</span>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl border border-white/10 flex flex-col">
            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar-light">
               <ContractingTerms />
            </div>
            <div className="p-6 bg-slate-900 border-t border-white/10 flex justify-between items-center gap-4">
               <p className="text-[10px] text-slate-500 font-mono font-black uppercase tracking-widest">Global Provisioning Agreement v2.4</p>
               <button 
                 onClick={() => { setShowTerms(false); setHasReadTerms(true); }}
                 className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-emerald-950/40 border border-white/20"
               >
                 Accept & Close
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({ name, label, defaultValue, placeholder, icon, readOnly = false }: any) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-[9px] font-black tracking-widest uppercase ml-1 block text-slate-500">{label}</label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors">
          <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>
        </div>
        <input
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-slate-200 transition-all focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 text-[11px] ${readOnly ? 'opacity-50 cursor-not-allowed bg-transparent' : 'group-hover:bg-white/10'}`}
        />
      </div>
    </div>
  );
}

function CredentialField({ label, value, icon }: { label: string; value?: string; icon: React.ReactNode }) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-[9px] font-black tracking-widest uppercase ml-1 block text-slate-500">{label}</label>
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600">
            <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>
          </div>
          <input
            readOnly
            value={value || 'Provisioning Asset...'}
            className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-slate-200 cursor-default focus:outline-none text-[11px]"
          />
        </div>
        <CopyButton text={value || ''} />
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
      className={`px-4 py-3 rounded-xl border border-white/10 font-black text-[9px] uppercase tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
    >
      {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function AdminCenter({ currentUserId, setGlobalNotification }: { currentUserId: string, setGlobalNotification: any }) {
  const [activeView, setActiveView] = useState<'students' | 'licenses'>('students');

  return (
    <div className="bg-card/40 dark:bg-slate-900/60 backdrop-blur-3xl border border-border/50 dark:border-white/[0.05] rounded-[2.5rem] shadow-2xl h-full flex flex-col overflow-hidden">
      <div className="flex overflow-x-auto border-b border-border dark:border-white/5 bg-secondary/20 dark:bg-slate-950/20 no-scrollbar">
        <TabButton active={activeView === 'students'} onClick={() => setActiveView('students')} icon={<Users className="w-4 h-4" />} label="Student Registry" />
        <TabButton active={activeView === 'licenses'} onClick={() => setActiveView('licenses')} icon={<Table className="w-4 h-4" />} label="License Inventory" />
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto max-h-[700px] custom-scrollbar focus:outline-none">
        {activeView === 'students' && <StudentRegistry currentUserId={currentUserId} setGlobalNotification={setGlobalNotification} />}
        {activeView === 'licenses' && <LicenseInventory setGlobalNotification={setGlobalNotification} />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-r border-border dark:border-white/5 ${active ? 'bg-primary/10 text-primary border-b-2 border-b-primary' : 'text-muted-foreground hover:bg-secondary/40 font-bold'}`}
    >
      {icon} {label}
    </button>
  );
}

function StudentRegistry({ currentUserId, setGlobalNotification }: { currentUserId: string, setGlobalNotification: any }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getAllUsers();
      setUsers(data); // No filtering out admin, show everyone
      setLoading(false);
    }
    load();
  }, [currentUserId]);

  async function handleUpdateStudent(userId: string, formData: FormData) {
    const result = await updateUserDetails(userId, {
      isActive: formData.get('isActive') === 'on',
      start: formData.get('start') as string,
      chosenPlan: formData.get('chosenPlan') as string,
      isPaid: formData.get('isPaid') === 'on',
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      companyName: formData.get('companyName') as string,
      phone: formData.get('phone') as string,
      country: formData.get('country') as string,
      city: formData.get('city') as string,
      streetAddress: formData.get('streetAddress') as string,
      postcode: formData.get('postcode') as string
    });
    
    if (result.success) {
      setGlobalNotification({ success: true, message: 'Student information updated' });
      const data = await getAllUsers();
      setUsers(data.filter((u:any) => u.id !== currentUserId));
    }
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;

  return (
    <div className="space-y-4">
      {users.map((u) => {
        const isVigente = u.isPaid && u.subscriptionEnd && new Date(u.subscriptionEnd) > new Date();
        return (
          <div key={u.id} className={`p-1 rounded-[2rem] transition-all duration-300 ${activeTab === u.id ? 'bg-blue-600/5 ring-1 ring-blue-500/10 shadow-2xl' : 'hover:bg-white/5 ring-1 ring-transparent'}`}>
            <div className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 cursor-pointer flex items-center gap-3 md:gap-4" onClick={() => setActiveTab(activeTab === u.id ? null : u.id)}>
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground border border-border/50 shadow-inner shrink-0">
                    {activeTab === u.id ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 overflow-hidden">
                    <div className="flex items-center gap-2">
                       <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                         <span className="text-blue-400 font-black text-[10px] md:text-[11px] font-mono leading-none">
                           {u.customerNumber ? u.customerNumber.toString().padStart(4,'0') : '—'}
                         </span>
                       </div>
                       <div className="md:hidden overflow-hidden">
                          <h4 className="font-bold text-foreground text-sm truncate flex items-center gap-2">
                             {u.firstName} {u.lastName}
                             {u.isAdmin && <span className="text-[8px] text-blue-400 font-black border border-blue-500/20 px-1 rounded bg-blue-500/5">ADM</span>}
                          </h4>
                          <p className="text-[9px] text-slate-500 font-mono truncate">{u.email}</p>
                       </div>
                    </div>
                    <div className="hidden md:block overflow-hidden">
                      <h4 className="font-bold text-foreground flex items-center gap-3 truncate">
                        {u.firstName} {u.lastName}
                        {u.isAdmin ? 
                           <span className="text-[10px] text-blue-400 font-mono font-black border border-blue-500/20 px-4 rounded-md bg-blue-500/5 uppercase tracking-[0.2em]">ADMIN</span> :
                           isVigente && <span className="text-[10px] text-emerald-400 font-mono font-black border border-emerald-500/20 px-2 rounded-md bg-emerald-500/5 uppercase tracking-widest">Active</span>
                        }
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono truncate">{u.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 md:gap-6 pl-14 md:pl-0">
                   <div className="text-right hidden sm:block">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">Status</p>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isVigente ? 'text-emerald-500' : 'text-red-500/50'}`}>
                        {isVigente ? 'Vigente' : 'Expirada'}
                      </span>
                   </div>
                   <div className="w-px h-8 bg-white/5 hidden sm:block" />
                   <div className="text-right">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">Ends</p>
                      <span className="text-[10px] font-black text-slate-400 font-mono">
                        {u.subscriptionEnd ? new Date(u.subscriptionEnd).toLocaleDateString() : 'N/A'}
                      </span>
                   </div>
                </div>
              </div>

              {activeTab === u.id && (
                <div className="mt-8 pt-8 border-t border-white/5 animate-in slide-in-from-top-4 duration-500">
                  <form action={(fd) => handleUpdateStudent(u.id, fd)} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-4 space-y-6">
                       <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                          <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-4">Account Status</label>
                          <div className="space-y-4">
                            <label className="flex items-center justify-between cursor-pointer group">
                              <span className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors">Access Active</span>
                              <input type="checkbox" name="isActive" defaultChecked={u.isActive} className="w-5 h-5 rounded-md border-white/20 bg-slate-950 accent-blue-500" />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer group">
                              <span className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors">Payment Verified</span>
                              <input type="checkbox" name="isPaid" defaultChecked={u.isPaid} className="w-5 h-5 rounded-md border-white/20 bg-slate-950 accent-emerald-500" />
                            </label>
                          </div>
                       </div>

                       <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                          <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-4">Assignment Period</label>
                          <div className="space-y-4">
                            <div>
                               <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Start Date</label>
                               <input type="date" name="start" defaultValue={u.subscriptionStart ? new Date(u.subscriptionStart).toISOString().split('T')[0] : ''} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white" />
                            </div>
                            <div>
                               <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Selected Plan</label>
                               <select name="chosenPlan" defaultValue={u.chosenPlan || ""} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white">
                                  <option value="">No Plan</option>
                                  <option value="Oracle Fusion 30 days (£59)">30 Days</option>
                                  <option value="Oracle Fusion 90 days (£140)">90 Days</option>
                               </select>
                            </div>
                          </div>
                       </div>
                    </div>

                    <div className="md:col-span-8">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputAdmin name="firstName" label="First Name" defaultValue={u.firstName} />
                          <InputAdmin name="lastName" label="Last Name" defaultValue={u.lastName} />
                          <InputAdmin name="email" label="Email" defaultValue={u.email} readOnly />
                          <InputAdmin name="phone" label="Phone" defaultValue={u.phone} />
                          <InputAdmin name="companyName" label="Company" defaultValue={u.companyName} />
                          <InputAdmin name="country" label="Country" defaultValue={u.country} />
                          <InputAdmin name="city" label="City" defaultValue={u.city} />
                          <InputAdmin name="postcode" label="Zip Code" defaultValue={u.postcode} />
                          <div className="sm:col-span-2">
                             <InputAdmin name="streetAddress" label="Address" defaultValue={u.streetAddress} />
                          </div>
                       </div>
                       
                       <div className="mt-8 flex justify-end gap-3">
                          <button type="button" onClick={() => setActiveTab(null)} className="px-6 py-3 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors">Cancel</button>
                          <button 
                            type="submit" 
                            className="px-10 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40 border border-white/20"
                          >
                            <Save className="w-4 h-4" /> Save Student Data
                          </button>
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

function InputAdmin({ name, label, defaultValue, readOnly }: any) {
  return (
    <div>
      <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">{label}</label>
      <input 
        name={name} 
        defaultValue={defaultValue} 
        readOnly={readOnly}
        className={`w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none transition-all ${readOnly ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:bg-slate-950'}`} 
      />
    </div>
  );
}

function LicenseInventory({ setGlobalNotification }: { setGlobalNotification: any }) {
  const [licenses, setLicenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getAllLicenses();
      setLicenses(data);
      setLoading(false);
    }
    load();
  }, []);

  async function handleAction(formData: FormData) {
    await upsertLicense(formData);
    setGlobalNotification({ success: true, message: 'License updated' });
    const data = await getAllLicenses();
    setLicenses(data);
    setEditingId(null);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure?')) return;
    await deleteLicense(id);
    setGlobalNotification({ success: true, message: 'License deleted' });
    const data = await getAllLicenses();
    setLicenses(data);
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-black uppercase text-slate-100 tracking-widest flex items-center gap-2">
           <Hash className="w-4 h-4 text-blue-500" /> Registry Entries
        </h3>
        <button onClick={() => setEditingId('new')} className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all shadow-xl shadow-blue-900/30 flex items-center gap-2 border border-white/20">
          <Plus className="w-4 h-4" /> Add Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {editingId === 'new' && (
          <LicenseForm onSave={handleAction} onCancel={() => setEditingId(null)} />
        )}
        {licenses.map(l => (
          <div key={l.id} className="bg-slate-900/50 border border-white/5 rounded-[2rem] p-6 hover:border-blue-500/20 transition-all duration-500 group">
            {editingId === l.id ? (
              <LicenseForm license={l} onSave={handleAction} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                   <div>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">{l.subscription}</p>
                      <p className="text-sm font-bold text-slate-100 truncate max-w-[200px]">{l.urlLink}</p>
                   </div>
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingId(l.id)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"><RefreshCw className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(l.id)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                   <div>
                      <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">User</label>
                      <p className="text-[11px] font-bold text-slate-300 font-mono truncate">{l.username}</p>
                   </div>
                   <div>
                      <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Status</label>
                      <span className={`text-[10px] font-black uppercase ${l.isAvailable ? 'text-emerald-500' : 'text-red-500/50'}`}>
                        {l.isAvailable ? 'Free' : 'Occupied'}
                      </span>
                   </div>
                </div>
                
                {l.assignedTo && (
                  <div className="mt-2 bg-blue-600/10 p-3 rounded-xl border border-blue-500/10">
                     <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Current Assignee</p>
                     <p className="text-[10px] font-black text-slate-100">{l.assignedTo.firstName} {l.assignedTo.lastName} (ID: {l.assignedTo.customerNumber.toString().padStart(4,'0')})</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LicenseForm({ license, onSave, onCancel }: any) {
  return (
    <form action={onSave} className="bg-slate-950 p-6 rounded-3xl border border-blue-500/30 shadow-2xl animate-in zoom-in-95 duration-300 space-y-4 col-span-full">
      <input type="hidden" name="id" value={license?.id || ''} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div>
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Plan Class</label>
            <select name="subscription" defaultValue={license?.subscription || "Oracle Fusion 30 days (£59)"} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white">
               <option value="Oracle Fusion 30 days (£59)">30 Days</option>
               <option value="Oracle Fusion 90 days (£140)">90 Days</option>
            </select>
         </div>
         <div>
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Portal URL</label>
            <input name="urlLink" defaultValue={license?.urlLink || ""} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white" required />
         </div>
         <div>
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Expiry</label>
            <input type="date" name="expiryDate" defaultValue={license?.expiryDate ? new Date(license.expiryDate).toISOString().split('T')[0] : ''} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white" />
         </div>
         <div>
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Username</label>
            <input name="username" defaultValue={license?.username || ""} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white" required />
         </div>
         <div>
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Password</label>
            <input name="password" defaultValue={license?.password || ""} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white" required />
         </div>
         <div className="flex items-center gap-6 pt-4">
            <label className="flex items-center gap-2 cursor-pointer group">
               <input type="checkbox" name="isAvailable" defaultChecked={license ? license.isAvailable : true} className="w-5 h-5 rounded border-white/20 bg-slate-900 accent-blue-500" />
               <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest transition-colors">Free</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
               <input type="checkbox" name="isAvailableUhuru" defaultChecked={license ? license.isAvailableUhuru : true} className="w-5 h-5 rounded border-white/20 bg-slate-900 accent-emerald-500" />
               <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest transition-colors">Uhuru Free</span>
            </label>
         </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
         <button type="button" onClick={onCancel} className="px-6 py-3 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors">Cancel</button>
         <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest px-10 py-3 rounded-xl transition-all shadow-xl shadow-blue-900/40 border border-white/20 flex items-center gap-2">
            <Save className="w-4 h-4" /> Finalize Asset
         </button>
      </div>
    </form>
  );
}
