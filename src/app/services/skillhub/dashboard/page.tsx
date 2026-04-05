'use client';

import { useEffect, useState } from 'react';
import { 
  getCurrentUser, updateProfile, logoutUser, getAllUsers, 
  updateUserDetails, getAllLicenses, upsertLicense, deleteLicense,
  reassignStudentLicense, syncAllLicensesStatus
} from '@/actions/auth';
import { 
  User, Mail, Building, MapPin, Building2, Phone, Globe, Home, 
  CheckCircle2, AlertCircle, LogOut, Save, UserCircle, Loader2,
  ShieldCheck, Calendar, Users, ArrowRight, Table, ChevronDown, ChevronUp, 
  Power, RefreshCw, Hash, Key, ExternalLink, Trash2, Plus, Lock, UserPlus, CreditCard, Activity, Copy, ClipboardCheck, AlertTriangle, ShieldAlert
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { ContractingTerms } from '@/components/uhuru/ContractingTerms';
import SubPageHeader from '@/components/uhuru/subpage-header';
import SkillHubHeader from '@/components/uhuru/skillhub-header';


export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [renewalPlan, setRenewalPlan] = useState("");
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [termsVisited, setTermsVisited] = useState(false);
  const [globalNotification, setGlobalNotification] = useState<{ success: boolean; message: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (globalNotification) {
      const timer = setTimeout(() => setGlobalNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [globalNotification]);

  useEffect(() => {
    async function load() {
      const data = await getCurrentUser();
      if (!data) window.location.href = '/services/skillhub';
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
        window.location.href = '/services/skillhub';
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
    
    const hasChanges = 
      formData.get('firstName') !== user.firstName ||
      formData.get('lastName') !== user.lastName ||
      formData.get('phone') !== user.phone ||
      formData.get('companyName') !== (user.companyName || '') ||
      formData.get('country') !== user.country ||
      formData.get('city') !== user.city ||
      formData.get('postcode') !== user.postcode ||
      formData.get('streetAddress') !== user.streetAddress;
    
    if (!hasChanges) {
      setUpdating(false);
      setGlobalNotification({ success: true, message: 'No changes to update' });
      setTimeout(() => setGlobalNotification(null), 3000);
      return;
    }

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
    window.location.href = '/services/skillhub';
  }

  const handleOpenTerms = () => {
    const w = 900;
    const h = 800;
    const left = (window.screen.width / 2) - (w / 2);
    const top = (window.screen.height / 2) - (h / 2);
    
    window.open(
      '/services/skillhub/terms', 
      'ContractingTerms', 
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
    );
    setTermsVisited(true);
  };

  const handlePayPlan = () => {
    if (!hasReadTerms) return;
    let url = 'https://checkout.revolut.com/pay/d2d7728d-2252-4b68-8fcd-a752815d4b75'; // Default 30
    if (renewalPlan === "7") url = 'https://checkout.revolut.com/pay/46502838-0b67-420d-a1d9-fd34bfe14e88';
    else if (renewalPlan === "30") url = 'https://checkout.revolut.com/pay/d2d7728d-2252-4b68-8fcd-a752815d4b75';
    else if (renewalPlan === "90") url = 'https://checkout.revolut.com/pay/9ddb9c6a-6764-4a60-93b7-d2b742ca02a8';
    
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
    <div className="min-h-screen bg-[#e5e5e5] dark:bg-background text-foreground relative overflow-hidden font-sans transition-colors duration-300">
      <SubPageHeader backHref="/" backText="Back Home" />
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-400 dark:bg-primary/5 rounded-full blur-[140px] opacity-[0.02] dark:opacity-100 pointer-events-none transition-all duration-1000"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-500 dark:bg-blue-600/5 rounded-full blur-[140px] opacity-[0.03] dark:opacity-100 pointer-events-none transition-all duration-1000 animation-delay-2000"></div>

      <SkillHubHeader user={user} />

      <div className="max-w-[1700px] mx-auto z-10 relative p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {!user.isAdmin && (
            <div className="lg:col-span-12 space-y-6 max-w-4xl mx-auto">
              {/* Status Card */}
              <div className={`p-8 rounded-[2.5rem] border transition-all duration-700 ${isVigente ? 'bg-[#f2f2f2] dark:bg-emerald-500/5 border-[#c0c0c0] dark:border-emerald-500/20 shadow-xl dark:shadow-[0_0_50px_rgba(16,185,129,0.05)]' : 'bg-[#f2f2f2] dark:bg-red-500/5 border-[#c0c0c0] dark:border-red-500/20 shadow-xl dark:shadow-[0_0_50px_rgba(239,68,68,0.05)]'}`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div>
                    <h4 className="text-[10px] font-black text-black dark:text-white/60 tracking-widest mb-1.5 px-1">Subscription Status</h4>
                    <p className={`text-2xl font-black tracking-tight ${isVigente ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {isVigente ? 'Subscription Active' : 'Subscription Inactive'}
                    </p>
                    
                    {isVigente && (
                      <div className="mt-3 space-y-1.5 px-1 pt-2 border-t border-emerald-500/10">
                        <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 tracking-normal flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> From: {user.subscriptionStart ? new Date(user.subscriptionStart).toISOString().split('T')[0].split('-').reverse().join('-') : 'N/A'}
                        </p>
                        <p className="text-sm font-black text-black dark:text-white tracking-normal flex items-center gap-2">
                          <ArrowRight className="w-3.5 h-3.5" /> To: {user.subscriptionEnd ? new Date(user.subscriptionEnd).toISOString().split('T')[0].split('-').reverse().join('-') : 'N/A'}
                        </p>
                      </div>
                    )}

                    {!isVigente && (
                      <div className="mt-6 animate-in slide-in-from-top-2">
                         <label className="text-[9px] font-black text-black dark:text-white tracking-widest block mb-3 px-1">Purchase License Renewal</label>
                         <select 
                           value={renewalPlan}
                           onChange={(e) => setRenewalPlan(e.target.value)}
                           className="w-full bg-white dark:bg-slate-900/50 border border-slate-950/20 dark:border-white/20 rounded-2xl px-5 py-4 text-xs font-black text-foreground focus:ring-1 focus:ring-primary/50 outline-none appearance-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-all tracking-wide shadow-xl shadow-black/20">
                            <option value="" className="text-foreground">Select Oracle Fusion Plan...</option>
                            <option value="7" className="text-foreground">Oracle Fusion 7 days (£18)</option>
                            <option value="30" className="text-foreground">Oracle Fusion 30 days (£59)</option>
                            <option value="90" className="text-foreground">Oracle Fusion 90 days (£140)</option>
                         </select>

                         {renewalPlan && (
                           <div className="mt-6 space-y-4 animate-in slide-in-from-top-4 duration-500">
                             <div className="bg-white dark:bg-slate-950/40 border border-slate-950/10 dark:border-white/5 rounded-2xl p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <input 
                                      type="checkbox" 
                                      id="accept-terms"
                                      disabled={!termsVisited}
                                      checked={hasReadTerms}
                                      onChange={(e) => setHasReadTerms(e.target.checked)}
                                      className={`mt-1 w-4 h-4 rounded border-slate-950/20 dark:border-white/20 bg-white dark:bg-slate-900 accent-emerald-500 ${termsVisited ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'}`}
                                    />
                                  <label htmlFor="accept-terms" className={`text-[10px] font-bold tracking-widest leading-relaxed select-none ${termsVisited ? 'text-black dark:text-white cursor-pointer' : 'text-black/40 dark:text-black dark:text-white/40 cursor-not-allowed'}`}>
                                    I have read and accept the <button type="button" onClick={handleOpenTerms} className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-300 underline underline-offset-4 font-black">Contracting Terms & Conditions</button> of SkillHub instances.
                                  </label>
                                </div>
                                <button 
                                  onClick={handlePayPlan}
                                  disabled={!hasReadTerms}
                                  className={`w-full text-foreground text-[11px] font-black uppercase tracking-widest py-5 rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 group border border-slate-950/20 dark:border-white/40 ${hasReadTerms ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40' : 'bg-slate-200 dark:bg-slate-800 opacity-50 cursor-not-allowed grayscale'}`}
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

                  <div className="md:text-right pt-4 md:pt-1 md:pr-1 border-t md:border-t-0 border-black/50 dark:border-white/5 mt-4 md:mt-0">
                    <span className="text-xs font-black text-black dark:text-white tracking-normal block mb-1">Authenticated Account</span>
                    <span className="text-xl font-black text-black dark:text-white tracking-tight">User ID: {String(user.customerNumber || 0).padStart(4, '0')}</span>
                  </div>
                </div>
                {isVigente && user.chosenPlan && (
                  <div className="mt-4 pt-4 border-t border-black/50 dark:border-white/5 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-500/60 tracking-normal">
                      {user.chosenPlan === "7" ? "Oracle Fusion 7 Days" : 
                       user.chosenPlan === "30" ? "Oracle Fusion 30 Days" : 
                       user.chosenPlan === "90" ? "Oracle Fusion 90 Days" : 
                       `Oracle Fusion ${user.chosenPlan}`}
                    </span>
                  </div>
                )}
              </div>

              {isVigente && (
                <div className="bg-[#f2f2f2] dark:bg-slate-900/60 backdrop-blur-3xl border border-[#c0c0c0] dark:border-primary/20 rounded-[2rem] shadow-2xl p-6 mb-6 animate-in slide-in-from-top-4 duration-700 focus-within:border-primary/40 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-border dark:border-slate-950/10 dark:border-white/5 pb-4">
                     <h3 className="text-xs font-black text-primary dark:text-blue-400 tracking-normal flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Oracle Fusion Access Credentials
                     </h3>
                  </div>
                  <div className="space-y-4">
                     <CredentialField label="Oracle Fusion URL" value={user.licenses?.[0]?.urlLink} icon={<ExternalLink />} setGlobalNotification={setGlobalNotification} />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CredentialField label="Oracle Fusion Username" value={user.licenses?.[0]?.username} icon={<User />} setGlobalNotification={setGlobalNotification} />
                        <CredentialField label="Oracle Fusion Password" value={user.licenses?.[0]?.password} icon={<Lock />} setGlobalNotification={setGlobalNotification} />
                     </div>
                  </div>
                </div>
              )}

              <div className="bg-[#f2f2f2] dark:bg-slate-900/40 backdrop-blur-3xl border border-[#c0c0c0] dark:border-white/[0.05] rounded-[2rem] shadow-2xl p-6 transition-all">
                <div className="flex items-center justify-between mb-6 border-b border-border dark:border-slate-950/10 dark:border-white/5 pb-4">
                  <h3 className="text-base font-black text-black dark:text-white tracking-normal">Profile Identity</h3>
                  <ShieldCheck className="w-4 h-4 text-primary opacity-20" />
                </div>

                <form action={handleUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField name="firstName" label="First Name" defaultValue={user.firstName} icon={<User />} required />
                    <InputField name="lastName" label="Last Name" defaultValue={user.lastName} icon={<User />} required />
                    <InputField name="email" label="Email" defaultValue={user.email} icon={<Mail />} required readOnly />
                    <InputField name="phone" label="Phone" defaultValue={user.phone} icon={<Phone />} />
                  </div>
                  
                  <div className="border-t border-slate-950/10 dark:border-white/5 pt-6">
                    <h4 className="text-base font-black text-black dark:text-white tracking-normal mb-4">Billing Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField name="companyName" label="Company" defaultValue={user.companyName} icon={<Building />} />
                      <div className="md:col-span-2">
                        <InputField name="streetAddress" label="Address" defaultValue={user.streetAddress} icon={<Home />} />
                      </div>
                      <InputField name="city" label="City" defaultValue={user.city} icon={<Building2 />} />
                      <InputField name="postcode" label="Zip Code" defaultValue={user.postcode} icon={<MapPin />} />
                      <div className="md:col-span-2">
                        <InputField name="country" label="Country" defaultValue={user.country} icon={<Globe />} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      disabled={updating}
                      type="submit"
                      className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-black text-xs tracking-normal rounded-xl transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group disabled:opacity-50"
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
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-500 flex items-center gap-3 
          ${globalNotification.message === 'Copied' ? 'bg-white dark:bg-slate-950 border-slate-950/10 dark:border-white/10 text-foreground' : 
            globalNotification.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 
            'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'}`}>
          {globalNotification.message === 'Copied' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : 
           globalNotification.success ? <CheckCircle2 className="w-5 h-5" /> : 
           <AlertCircle className="w-5 h-5" />}
          <span className="text-sm font-black tracking-wide">
            {globalNotification.message.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}
          </span>
        </div>
      )}
    </div>
  );
}

function InputField({ name, label, defaultValue, placeholder, icon, readOnly = false, required = false }: any) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-xs font-black tracking-normal ml-1 block text-black dark:text-white">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black dark:text-white/40 group-focus-within:text-primary transition-colors">
          <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>
        </div>
        <input
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          className={`w-full pl-9 pr-4 py-3 bg-black/5 dark:bg-slate-950/50 border border-black dark:border-white/20 rounded-xl font-bold text-foreground dark:text-white transition-all focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 text-xs ${readOnly ? 'opacity-90 cursor-default' : 'group-hover:bg-black/10 dark:group-hover:bg-slate-900/50'}`}
        />
      </div>
    </div>
  );
}

function CredentialField({ label, value, icon, setGlobalNotification }: { label: string; value?: string; icon: React.ReactNode; setGlobalNotification?: any }) {
  const onCopy = () => {
    if (setGlobalNotification) {
      setGlobalNotification({ success: true, message: 'Copied' });
      setTimeout(() => setGlobalNotification(null), 1000);
    }
  };

  return (
    <div className="space-y-1.5 group">
      <label className="text-xs font-black tracking-normal ml-1 block text-black dark:text-white">{label}</label>
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black dark:text-white/40">
            <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>
          </div>
          <input
            readOnly
            value={value || 'Refreshing...'}
            className="w-full pl-9 pr-4 py-3 bg-black/5 dark:bg-slate-950/50 border border-black dark:border-white/20 rounded-xl font-bold text-foreground dark:text-white cursor-default focus:outline-none text-xs"
          />
        </div>
        <CopyButton text={value || ''} onCopy={onCopy} />
      </div>
    </div>
  );
}

function CopyButton({ text, onCopy }: { text: string; onCopy?: any }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <button 
      type="button"
      onClick={handleCopy} 
      className={`px-4 py-3 rounded-xl border border-slate-950/10 dark:border-white/10 font-black text-xs tracking-normal transition-all ${copied ? 'bg-emerald-500 text-foreground border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground'}`}
    >
      {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function AdminCenter({ currentUserId, setGlobalNotification }: { currentUserId: string, setGlobalNotification: any }) {
  const [activeView, setActiveView] = useState<'students' | 'licenses'>('students');

  return (
    <div className="bg-[#f2f2f2] dark:bg-slate-900/60 backdrop-blur-3xl border border-black dark:border-white/[0.05] rounded-[2.5rem] shadow-2xl h-full flex flex-col overflow-hidden">
      <div className="flex overflow-x-auto border-b border-black dark:border-white/5 bg-black/5 dark:bg-slate-950/20 no-scrollbar">
        <TabButton active={activeView === 'students'} onClick={() => setActiveView('students')} icon={<Users className="w-5 h-5" />} label="Users" />
        <TabButton active={activeView === 'licenses'} onClick={() => setActiveView('licenses')} icon={<Table className="w-5 h-5" />} label="License Inventory" />
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
      className={`flex items-center gap-3 px-8 py-5 text-[12px] font-black lowercase-to-titlecase tracking-[0.05em] transition-all border-r border-black/10 dark:border-white/5 ${active ? 'bg-primary/5 text-primary' : 'text-black dark:text-white hover:bg-black/5 font-bold'}`}
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
    const result = await updateUserDetails(userId, formData);
    
    if (result.success) {
      setGlobalNotification({ success: true, message: 'Student information updated' });
      const data = await getAllUsers();
      setUsers(data);
    } else {
      setGlobalNotification({ success: false, message: result.message });
      setTimeout(() => setGlobalNotification(null), 5000);
    }
  }

  async function handleForceReassign(userId: string) {
     const result = await reassignStudentLicense(userId);
     if (result.success) {
        setGlobalNotification({ success: true, message: 'License rotated successfully' });
        const data = await getAllUsers();
        setUsers(data);
     } else {
        setGlobalNotification({ success: false, message: result.message });
        setTimeout(() => setGlobalNotification(null), 3000);
     }
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary dark:text-primary" /></div>;

  return (
    <div className="space-y-4">
      {users.map((u) => {
        const isVigente = u.isPaid && u.subscriptionEnd && new Date(u.subscriptionEnd) > new Date();
        return (
          <div key={`${u.id}-${u.chosenPlan}-${u.subscriptionEnd}`} className={`p-1 rounded-[2rem] transition-all duration-300 ${activeTab === u.id ? 'bg-white dark:bg-primary/5 ring-1 ring-primary/10 shadow-2xl' : 'hover:bg-black/5 dark:bg-white/5 ring-1 ring-transparent'}`}>
            <div className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 cursor-pointer flex items-center gap-3 md:gap-4" onClick={() => setActiveTab(activeTab === u.id ? null : u.id)}>
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-black dark:text-white border border-border/50 shadow-inner shrink-0">
                    {activeTab === u.id ? <ChevronUp className="w-5 h-5 text-primary dark:text-primary-foreground" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 overflow-hidden">
                    <div className="flex items-center gap-2">
                       <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-200 dark:bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                         <span className="text-primary dark:text-primary-foreground font-black text-[10px] md:text-[11px] font-mono leading-none">
                           {u.customerNumber ? u.customerNumber.toString().padStart(4,'0') : '—'}
                         </span>
                       </div>
                       <div className="md:hidden overflow-hidden">
                          <h4 className="font-black text-black dark:text-foreground text-sm sm:text-base truncate flex items-center gap-3">
                             <div className="flex flex-col">
                               <span className={`text-[11px] font-black tracking-normal shrink-0 ${u.isPaid ? 'text-emerald-700 dark:text-emerald-500' : 'text-red-700 dark:text-red-500'}`}>
                                 {u.isPaid ? 'Active Plan' : 'Inactive Plan'}
                               </span>
                               {u.isPaid && (
                                 <span className={`text-[11px] font-black tracking-normal shrink-0 ${u.licenses?.length > 0 ? 'text-emerald-700 dark:text-emerald-500' : 'text-amber-700 dark:text-amber-500'}`}>
                                   {u.licenses?.length > 0 ? 'Assigned' : 'Unassigned'}
                                 </span>
                               )}
                             </div>
                             {u.firstName} {u.lastName}
                             {u.isAdmin && <span className="text-[8px] text-primary dark:text-primary-foreground font-black border border-primary/20 px-1 rounded bg-primary/5">ADM</span>}
                          </h4>
                          <p className="text-[11px] text-black dark:text-white font-mono truncate">{u.email}</p>
                       </div>
                    </div>
                    <div className="hidden md:block overflow-hidden">
                      <h4 className="font-black text-black dark:text-foreground flex items-center gap-4 truncate text-base">
                        <span className={`text-[11px] font-black tracking-normal shrink-0 ${u.isPaid ? 'text-emerald-700 dark:text-emerald-500' : 'text-red-700 dark:text-red-500'}`}>
                           {u.isPaid ? 'Active Plan' : 'Inactive Plan'}
                        </span>
                        {u.isPaid && (
                          <span className={`text-[9px] font-black tracking-[0.05em] shrink-0 ${u.licenses?.length > 0 ? 'text-emerald-700 dark:text-emerald-500' : 'text-amber-700 dark:text-amber-500 animate-pulse'}`}>
                             {u.licenses?.length > 0 ? 'Assigned' : 'Unassigned'}
                          </span>
                        )}
                        <span>{u.firstName} {u.lastName}</span>
                        <span className="text-[10px] text-black dark:text-white font-mono font-medium ml-2">({u.email})</span>
                        {u.isAdmin && <span className="text-[10px] text-primary dark:text-primary-foreground font-mono font-black border border-primary/20 px-4 rounded-md bg-primary/5 uppercase tracking-[0.2em]">ADMIN</span>}
                      </h4>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 md:gap-6 pl-14 md:pl-0">
                    <div className="text-right whitespace-nowrap">
                       <div className="flex items-center gap-2">
                         <span className="text-[10px] font-black text-black dark:text-white uppercase tracking-[0.2em]">Ends</span>
                         <span className="text-sm font-black text-black dark:text-white font-mono tracking-tight bg-black/5 dark:bg-white/5 px-3 py-1 rounded-lg border border-black/5 dark:border-white/10">
                           {u.subscriptionEnd ? new Date(u.subscriptionEnd).toISOString().split('T')[0].split('-').reverse().join('-') : 'N/A'}
                         </span>
                       </div>
                    </div>
                </div>
              </div>

              {activeTab === u.id && (
                <div className="mt-8 pt-8 border-t border-slate-950/10 dark:border-white/5 animate-in slide-in-from-top-4 duration-500">
                  <form action={(fd) => handleUpdateStudent(u.id, fd)} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-4 space-y-6">
                       <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-950/10 dark:border-white/5">
                          <label className="text-sm font-black text-black dark:text-primary-foreground tracking-normal block mb-4">Account Status</label>
                          <div className="space-y-4">
                            <label className="flex items-center justify-between cursor-pointer group">
                              <span className="text-[11px] font-black text-black dark:text-foreground group-hover:text-primary transition-colors">Access Active</span>
                              <input 
                                type="checkbox" 
                                name="isActive" 
                                defaultChecked={u.isActive} 
                                disabled={u.email === 'uhurutradeuk@gmail.com'}
                                className={`w-5 h-5 rounded-md border-black/20 dark:border-white/20 accent-primary ${u.email === 'uhurutradeuk@gmail.com' ? 'bg-slate-950/50 cursor-not-allowed opacity-50' : 'bg-slate-950'}`} 
                              />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer group">
                              <span className="text-[11px] font-black text-black dark:text-foreground group-hover:text-primary transition-colors">Payment Verified</span>
                              <input 
                                type="checkbox" 
                                name="isPaid" 
                                defaultChecked={u.isPaid} 
                                onChange={(e) => {
                                  const form = e.target.form;
                                  if (!form) return;
                                  const formData = new FormData(form);
                                  const start = formData.get('start');
                                  const plan = formData.get('chosenPlan');
                                  
                                  if (e.target.checked && (!start || !plan || plan === "")) {
                                    e.target.checked = false;
                                    setGlobalNotification({ success: false, message: 'Select Start Date & Plan First' });
                                  }
                                }}
                                className="w-5 h-5 rounded-md border-2 border-black/20 bg-white/10 dark:bg-white/10 accent-primary cursor-pointer hover:bg-white/20 transition-all shadow-sm" 
                              />
                            </label>
                            <label className="flex items-center justify-between">
                               <div className="flex items-center gap-2">
                                 <span className="text-[11px] font-black text-black dark:text-foreground">Licence Assigned</span>
                                 {u.licenses?.length > 0 && (
                                   <span className="text-[11px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 font-black">
                                     {u.licenses[0].purchaseOrder}
                                   </span>
                                 )}
                               </div>
                               <input type="checkbox" disabled checked={u.licenses?.length > 0} className="w-5 h-5 rounded-md border-black/20 dark:border-white/10 bg-black/40 accent-emerald-500 cursor-not-allowed" />
                            </label>
                            <div className="pt-2 flex justify-center">
                               <button 
                                 type="button" 
                                 onClick={() => handleForceReassign(u.id)}
                                 className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all group"
                               >
                                 <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                                 Rotate Asset
                               </button>
                            </div>
                          </div>
                       </div>

                       <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-950/10 dark:border-white/5">
                          <label className="text-sm font-black text-black dark:text-primary-foreground tracking-normal block mb-4">Assignment Period</label>
                          <div className="space-y-4">
                            <div>
                               <label className="text-[11px] font-black text-black dark:text-white tracking-normal mb-1 block">Start Date</label>
                               <input type="date" name="start" defaultValue={u.subscriptionStart ? new Date(u.subscriptionStart).toISOString().split('T')[0] : ''} className="w-full bg-white dark:bg-slate-950/50 border border-slate-950/10 dark:border-white/20 rounded-xl px-4 py-3 text-xs text-black dark:text-white" />
                            </div>
                            <div>
                               <label className="text-[11px] font-black text-black dark:text-white tracking-normal mb-1 block">Selected Plan</label>
                               <select name="chosenPlan" defaultValue={u.chosenPlan || ""} className="w-full bg-white dark:bg-slate-950/50 border border-slate-950/10 dark:border-white/20 rounded-xl px-4 py-3 text-xs text-black dark:text-white">
                                  <option value="">No Plan</option>
                                  <option value="7">Oracle Fusion 7 days</option>
                                  <option value="30">Oracle Fusion 30 days</option>
                                  <option value="90">Oracle Fusion 90 days</option>
                               </select>
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-black dark:text-white tracking-normal mb-1 block flex items-center gap-1">
                                  <Activity className="w-2.5 h-2.5" /> Adjust License Duration
                                </label>
                                <select name="addDays" defaultValue="0" className="w-full bg-white dark:bg-slate-950/50 border border-slate-950/10 dark:border-white/20 rounded-xl px-4 py-3 text-xs text-black dark:text-white">
                                   <option value="0">Keep Current Expiry</option>
                                   <option value="1">+1 Extra Day</option>
                                   <option value="2">+2 Extra Days</option>
                                   <option value="3">+3 Extra Days</option>
                                   <option value="-1">-1 Day Less</option>
                                   <option value="-2">-2 Days Less</option>
                                   <option value="-3">-3 Days Less</option>
                                </select>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="md:col-span-8">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputAdmin name="firstName" label="First Name" defaultValue={u.firstName} readOnly={u.id !== currentUserId} required />
                          <InputAdmin name="lastName" label="Last Name" defaultValue={u.lastName} readOnly={u.id !== currentUserId} required />
                          <InputAdmin name="email" label="Email" defaultValue={u.email} readOnly required />
                          <InputAdmin name="phone" label="Phone" defaultValue={u.phone} readOnly={u.id !== currentUserId} />
                          <InputAdmin name="companyName" label="Company" defaultValue={u.companyName} readOnly={u.id !== currentUserId} />
                           <div className="sm:col-span-2">
                              <InputAdmin name="streetAddress" label="Address" defaultValue={u.streetAddress} readOnly={u.id !== currentUserId} />
                           </div>
                           <InputAdmin name="city" label="City" defaultValue={u.city} readOnly={u.id !== currentUserId} />
                           <InputAdmin name="postcode" label="Zip Code" defaultValue={u.postcode} readOnly={u.id !== currentUserId} />
                           <div className="sm:col-span-2">
                             <InputAdmin name="country" label="Country" defaultValue={u.country} readOnly={u.id !== currentUserId} />
                           </div>
                       </div>
                       
                       <div className="mt-8 flex justify-end gap-3">
                          <button type="button" onClick={() => setActiveTab(null)} className="px-6 py-3 text-[10px] font-black uppercase text-black dark:text-white hover:text-primary transition-colors">Cancel</button>
                          <button 
                            type="submit" 
                            className="px-10 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl flex items-center gap-3 bg-primary dark:bg-primary hover:bg-primary/90 text-white shadow-primary/40 border border-slate-950/20 dark:border-white/20"
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

function InputAdmin({ name, label, defaultValue, readOnly, required = false }: any) {
  return (
    <div>
      <label className="text-[11px] font-black text-black dark:text-white tracking-normal mb-1 block">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      <input 
        name={name} 
        defaultValue={defaultValue} 
        readOnly={readOnly}
        required={required}
        className={`w-full bg-slate-50 dark:bg-slate-950/50 border border-black dark:border-white/20 rounded-xl px-4 py-3 text-xs text-foreground dark:text-white focus:ring-1 focus:ring-primary outline-none transition-all ${readOnly ? 'opacity-90 cursor-not-allowed bg-slate-100' : 'hover:bg-white dark:hover:bg-slate-900/50'}`} 
      />
    </div>
  );
}

function LicenseInventory({ setGlobalNotification }: { setGlobalNotification: any }) {
  const [licenses, setLicenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getAllLicenses();
      setLicenses(data);
      setLoading(false);
    }
    load();
  }, []);

  async function handleAction(formData: FormData) {
    const result = await upsertLicense(formData);
    if (!result.success) {
      setGlobalNotification({ success: false, message: result.message || 'Error updating license' });
      setTimeout(() => setGlobalNotification(null), 3000);
      return;
    }
    setGlobalNotification({ success: true, message: 'License updated' });
    const data = await getAllLicenses();
    setLicenses(data);
    setEditingId(null);
  }

  async function handleDelete(id: string) {
    await deleteLicense(id);
    setGlobalNotification({ success: true, message: 'License deleted' });
    const data = await getAllLicenses();
    setLicenses(data);
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary dark:text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center mb-4">
        <div className="flex items-center gap-3">
           <button 
             onClick={async () => {
               setUpdating(true);
               await syncAllLicensesStatus();
               const data = await getAllLicenses();
               setLicenses(data);
               setUpdating(false);
               setGlobalNotification({ success: true, message: 'All URLs verified' });
             }}
             disabled={updating}
             className="bg-black/5 dark:bg-white/5 hover:bg-white/10 text-black dark:text-foreground text-[11px] font-black tracking-widest px-6 py-2.5 rounded-xl transition-all border border-slate-950/20 dark:border-white/10 flex items-center gap-2 disabled:opacity-50"
           >
             {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
             Health Url
           </button>
           <button onClick={() => setEditingId('new')} className="bg-primary dark:bg-primary hover:bg-primary/90 text-white text-[11px] font-black tracking-widest px-6 py-2.5 rounded-xl transition-all shadow-xl shadow-primary/40 flex items-center gap-2 border border-slate-950/20 dark:border-white/20">
             <Plus className="w-4 h-4" /> Add Licence
           </button>
        </div>
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 border border-red-500/30 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl shadow-red-950/20 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-red-500/20">
                <AlertTriangle className="w-8 h-8 text-red-700 dark:text-red-500" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-3 tracking-tight">Delete License?</h3>
              <p className="text-black dark:text-white text-sm leading-relaxed mb-8 text-[11px]">
                ¿Está seguro de que desea borrar la licencia? Si se borra, se desasignará de cualquier estudiante asignado.
              </p>
              <div className="flex gap-4">
                 <button 
                  onClick={() => {
                    handleDelete(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="flex-1 px-6 py-4 bg-red-600 hover:bg-red-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-red-900/40 border border-slate-950/10 dark:border-white/10"
                 >
                   Delete Asset
                 </button>
                 <button 
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-8 py-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-foreground text-[11px] font-black uppercase tracking-widest rounded-xl transition-all border border-slate-950/10 dark:border-white/5"
                 >
                   Cancel
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className="space-y-3">
        {editingId === 'new' && (
          <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-primary/30 shadow-2xl animate-in slide-in-from-top-4 duration-500 mb-6">
             <LicenseForm onSave={handleAction} onCancel={() => setEditingId(null)} />
          </div>
        )}

        {licenses.map(l => (
          <div key={l.id} className={`group p-1 rounded-[2rem] transition-all duration-300 ${editingId === l.id ? 'bg-white dark:bg-primary/5 ring-1 ring-primary/10 shadow-2xl' : 'hover:bg-black/5 dark:bg-white/5 ring-1 ring-transparent'}`}>
            <div className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 flex flex-wrap items-center gap-4 cursor-pointer" onClick={() => setEditingId(editingId === l.id ? null : l.id)}>
                   <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-black dark:text-white border border-border/50 shadow-inner shrink-0">
                     {editingId === l.id ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5" />}
                   </div>
                   <div className="flex items-center gap-3 shrink-0">
                     <div className="w-20 h-10 rounded-xl bg-slate-200 dark:bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="text-foreground font-black text-xs font-mono tracking-tighter">
                          {l.purchaseOrder || '—'}
                        </span>
                     </div>
                     <span className={`text-[11px] font-black ${l.isAvailable ? 'text-emerald-700 dark:text-emerald-500' : 'text-red-600'}`}>
                        {l.isAvailable ? 'Working' : 'Occupied'}
                     </span>
                   </div>
                   <div className="flex-1 overflow-hidden">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h4 className="font-bold text-foreground text-sm truncate max-w-full sm:max-w-[300px] text-black dark:text-white">{l.urlLink}</h4>
                        {l.assignedTo && (
                          <div className="flex items-center gap-2 text-[11px] font-black font-mono">
                             <span className="text-foreground">ID: {String(l.assignedTo.customerNumber || 0).padStart(4, '0')}</span>
                             <span className="text-yellow-700 dark:text-yellow-500 tracking-widest">Assigned</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-[10px] font-mono text-black dark:text-white flex items-center gap-1.5">
                           <span className="text-[10px] font-black tracking-normal">User:</span> {l.username}
                        </p>
                        <p className="text-[10px] font-mono text-black dark:text-white flex items-center gap-1.5">
                           <span className="text-[10px] font-black tracking-normal">Pass:</span> {l.password}
                        </p>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-2 pl-14 md:pl-0">
                   <button onClick={() => setEditingId(editingId === l.id ? null : l.id)} className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground/60 hover:bg-slate-900 dark:hover:bg-primary hover:text-white transition-all border border-slate-950/10 dark:border-white/10 group/btn">
                      {editingId === l.id ? <ChevronUp className="w-4 h-4" /> : <RefreshCw className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />}
                   </button>
                   <button onClick={() => setDeleteConfirmId(l.id)} className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-foreground/60 hover:bg-red-600 hover:text-white transition-all border border-slate-950/10 dark:border-white/10">
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>

              {editingId === l.id && (
                <div className="mt-8 pt-8 border-t border-slate-950/10 dark:border-white/5 animate-in slide-in-from-top-4 duration-500">
                   <LicenseForm license={l} onSave={handleAction} onCancel={() => setEditingId(null)} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LicenseForm({ license, onSave, onCancel }: any) {
  return (
    <form action={onSave} className="bg-white dark:bg-slate-950 p-6 rounded-3xl border border-primary/30 shadow-2xl animate-in zoom-in-95 duration-300 space-y-4 col-span-full">
      <input type="hidden" name="id" value={license?.id || ''} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div>
            <label className="text-[11px] font-black text-black dark:text-white tracking-normal mb-1 block">Purchase Order</label>
            <input 
              name="purchaseOrder" 
              defaultValue={license?.purchaseOrder || ""} 
              placeholder="00000-0"
              maxLength={7}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length > 5) {
                  value = value.slice(0, 5) + '-' + value.slice(5, 6);
                }
                e.target.value = value;
              }}
              className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/20 rounded-xl px-4 py-3 text-xs text-black dark:text-white"
              required 
            />
            <p className="text-[8px] text-black dark:text-white mt-1 uppercase font-bold tracking-tighter">Fixed Format: 00000-0</p>
         </div>
         <div>
            <label className="text-[11px] font-black text-black dark:text-white tracking-normal mb-1 block">Oracle Fusion Url</label>
            <input name="urlLink" defaultValue={license?.urlLink || ""} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/20 rounded-xl px-4 py-3 text-xs text-black dark:text-white" required />
         </div>
         <div>
            <label className="text-[11px] font-black text-black dark:text-white tracking-normal mb-1 block">Expiry</label>
            <input type="date" name="expiryDate" defaultValue={license?.expiryDate ? new Date(license.expiryDate).toISOString().split('T')[0] : ''} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/20 rounded-xl px-4 py-3 text-xs text-black dark:text-white" />
         </div>
         <div>
            <label className="text-[11px] font-black text-black dark:text-white tracking-normal mb-1 block">Oracle Fusion Username</label>
            <input name="username" defaultValue={license?.username || ""} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/20 rounded-xl px-4 py-3 text-xs text-black dark:text-white" required />
         </div>
         <div>
            <label className="text-[11px] font-black text-black dark:text-white tracking-normal mb-1 block">Oracle Fusion Password</label>
            <input name="password" defaultValue={license?.password || ""} className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/20 rounded-xl px-4 py-3 text-xs text-black dark:text-white" required />
         </div>
         <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/5">
            <label className="flex items-center gap-4 cursor-pointer group">
               <input type="checkbox" name="isAvailable" defaultChecked={license ? license.isAvailable : true} className="w-5 h-5 rounded border-slate-200 dark:border-white/20 bg-white dark:bg-slate-950 accent-primary" />
               <span className="text-[11px] font-black text-black dark:text-white group-hover:text-primary tracking-normal transition-colors">Asset Working</span>
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-4 cursor-pointer group shrink-0">
                 <input type="checkbox" name="isAvailableUhuru" disabled defaultChecked={license ? license.isAvailableUhuru : false} className="w-5 h-5 rounded border-slate-200 dark:border-white/20 bg-white dark:bg-slate-950 accent-emerald-500 cursor-not-allowed" />
                 <span className="text-[11px] font-black text-black dark:text-white group-hover:text-black dark:group-hover:text-foreground tracking-normal transition-colors">Assigned</span>
              </label>
              {license?.assignedTo && (
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-black uppercase tracking-tighter whitespace-nowrap">
                  Id: {String(license.assignedTo.customerNumber || 0).padStart(4, '0')}
                </span>
              )}
            </div>
         </div>
         {/* Hidden since user said "me sobra" but logic needs it for now */}
         <input type="hidden" name="userId" value={license?.userId || ""} />
         <input type="hidden" name="lastUserId" value={license?.lastUserId || ""} />
         <input type="hidden" name="subscription" value={license?.subscription || "SkillHub 30 days (£59)"} />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/5">
         <button type="button" onClick={onCancel} className="px-6 py-3 text-[10px] font-black uppercase text-black dark:text-white/60 hover:text-primary transition-colors">Cancel</button>
         <button type="submit" className="bg-primary dark:bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest px-10 py-3 rounded-xl transition-all shadow-xl shadow-primary/40 border border-slate-200 dark:border-white/20 flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Licence
         </button>
      </div>
    </form>
  );
}
