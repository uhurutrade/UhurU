'use client';

import { useState, useEffect, useRef } from 'react';
import { registerUser, loginUser, requestPasswordReset } from '@/actions/auth';
import { 
  User, Mail, Lock, Building, MapPin, Building2, Phone, Globe, Home, 
  ShieldCheck, LogIn, UserPlus, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Shield, BookOpen, AlertTriangle, FileText,
  Users, Activity, Scale, CreditCard
} from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';
import Logo from '@/components/uhuru/logo';

export default function SkillHubPage() {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string; errors?: any } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleOpenTerms = () => {
    window.open('/services/skillhub/terms', 'SkillHubTerms', 'width=1200,height=900,menubar=no,toolbar=no,location=no,status=no');
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [view]);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);


  async function handleAction(formData: FormData) {
    setLoading(true);
    setStatus(null);
    try {
      // Manual Validation for English Messages
      const email = formData.get('email') as string;
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string;
      const password = formData.get('password') as string;

      const phone = formData.get('phone') as string;
      const country = formData.get('country') as string;
      const city = formData.get('city') as string;
      const streetAddress = formData.get('streetAddress') as string;
      const postcode = formData.get('postcode') as string;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        setStatus({ success: false, message: 'Please enter a valid email address.' });
        setLoading(false);
        return;
      }
      if (view === 'register') {
        if (!firstName || !lastName) {
          setStatus({ success: false, message: 'First and Last Name are required.' });
          setLoading(false);
          return;
        }
      }
      if (view !== 'forgot' && !password) {
        setStatus({ success: false, message: 'Password is required.' });
        setLoading(false);
        return;
      }

      let result;
      if (view === 'login') result = await loginUser(formData);
      else if (view === 'register') {
        const password = formData.get('password') as string;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\-_]).{8,}$/;
        if (!passwordRegex.test(password)) {
          setStatus({ 
            success: false, 
            message: 'Password must be at least 8 characters long and include: 1 Uppercase, 1 Number, and 1 Special Character.' 
          });
          setLoading(false);
          const pwdInput = formRef.current?.querySelector('input[name="password"]') as HTMLInputElement;
          if (pwdInput) pwdInput.value = '';
          return;
        }
        result = await registerUser(formData);
      }
      else result = await requestPasswordReset(formData);

      setStatus(result as any);
      if (result.success) {
        if (view === 'login' || view === 'register') {
          window.location.href = '/services/skillhub/dashboard';
        } else if (view === 'forgot') {
          // Wait 3 seconds and go back to login
          setTimeout(() => {
            setView('login');
            setStatus(null);
          }, 3000);
        }
      } else {
        // Clear password even on server-side errors (wrong pwd, duplicate email, etc.)
        const pwdInput = formRef.current?.querySelector('input[name="password"]') as HTMLInputElement;
        if (pwdInput) pwdInput.value = '';
      }
    } catch (error) {
      console.error('Auth error:', error);
      setStatus({ success: false, message: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#e5e5e5] dark:bg-background text-foreground flex flex-col relative overflow-hidden font-sans transition-colors duration-300 pb-20">
      <SubPageHeader backHref="/" backText="Back Home" />
      {/* Background Orbs */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-slate-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02] dark:opacity-20 animate-pulse transition-all duration-1000"></div>
      <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-slate-500 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.03] dark:opacity-20 animate-pulse animation-delay-2000 transition-all duration-1000"></div>

      <div className="w-full max-w-[1400px] mx-auto z-10 mt-6 md:mt-10 lg:mt-16 mb-20 px-4 md:px-6 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-start justify-center relative transition-all duration-700">
        
        {/* Login/Register Form Card */}
        <div className="w-full max-w-2xl lg:sticky lg:top-10 bg-[#f2f2f2] dark:bg-slate-900/60 backdrop-blur-2xl border border-[#c0c0c0] dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">
          
          {view !== 'forgot' && (
            <div className="flex border-b border-white/5 dark:border-slate-800">
              <button 
                onClick={() => { setView('login'); setStatus(null); }}
                className={`flex-1 py-5 sm:py-6 font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${view === 'login' ? 'bg-primary text-white shadow-inner' : 'text-slate-500 dark:text-white/60 hover:text-primary hover:bg-slate-200 dark:hover:bg-white/5'}`}
              >
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5" /> Sign In
              </button>
              <button 
                onClick={() => { setView('register'); setStatus(null); }}
                className={`flex-1 py-5 sm:py-6 font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${view === 'register' ? 'bg-primary text-white shadow-inner' : 'text-slate-500 dark:text-white/60 hover:text-primary hover:bg-slate-200 dark:hover:bg-white/5'}`}
              >
                <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" /> Sign Up
              </button>
            </div>
          )}

          <div className="p-6 sm:p-8 pb-4 text-center">
            {/* Uhuru Official Logo */}
            <div className="flex justify-center mb-6">
              <Logo />
            </div>

            {/* SkillHub Friendly Logo */}
            <div className="flex flex-col items-center mb-6">
              <div className="font-black tracking-tighter text-foreground flex items-center gap-0.5 leading-none" 
                   style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                <span className="text-5xl sm:text-7xl text-black dark:text-white transition-all duration-500">Skill</span>
                <span className="text-5xl sm:text-7xl text-primary drop-shadow-[0_0_20px_rgba(37,99,235,0.25)] sm:drop-shadow-[0_0_35px_rgba(37,99,235,0.3)] transition-all duration-500">Hub</span>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full mt-auto mb-1.5 sm:mb-2.5 animate-pulse ml-1.5 sm:ml-2"></div>
              </div>
              <p className="mt-4 text-sm sm:text-xl font-medium text-black dark:text-white tracking-wide text-center px-4 leading-relaxed">
                Get access to your Oracle Fusion instance for Learning
              </p>
            </div>
          </div>

          <form 
            ref={formRef} 
            onSubmit={(e) => {
              e.preventDefault();
              handleAction(new FormData(e.currentTarget));
            }}
            className="p-8 pt-4 space-y-6" 
            noValidate
          >
            <div className={`grid gap-4 ${view === 'register' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              
              {view === 'register' && (
                <>
                  <Input name="firstName" label="First Name" icon={<User />} placeholder="John" required />
                  <Input name="lastName" label="Last Name" icon={<User />} placeholder="Doe" required />
                </>
              )}

              <Input name="email" label="Email Address" type="email" icon={<Mail />} placeholder="john.doe@example.com" required />
              
                  {view !== 'forgot' && (
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1.5 px-1">
                        <label className="text-sm font-bold text-black dark:text-white tracking-wide">Password <span className="text-red-500">*</span></label>
                        {view === 'login' && (
                          <button 
                            type="button"
                            tabIndex={-1}
                            onClick={() => { setView('forgot'); setStatus(null); }}
                            className="text-[10px] font-black text-primary dark:text-primary-foreground tracking-widest hover:text-blue-600 transition-colors"
                          >
                            Forgot Password?
                          </button>
                        )}
                      </div>
                      <div className="relative group">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          name="password"
                          type="password"
                          required
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-black dark:border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/30 dark:placeholder:text-white/50 text-sm dark:text-white"
                        />
                      </div>
                      {view === 'register' && (
                        <p className="mt-1.5 ml-1 text-[10px] font-black text-red-600 dark:text-red-900/80 tracking-tight leading-none">
                          Min. 8 chars, 1 Uppercase, 1 Number & 1 Special Char
                        </p>
                      )}
                    </div>
                  )}

              {view === 'register' && (
                <>
                  <Input name="companyName" label="Company" icon={<Building />} placeholder="Global Solutions Ltd" />
                  <Input name="phone" label="Phone" icon={<Phone />} placeholder="+44 20 7946 0000" />
                  <Input name="country" label="Country" icon={<Globe />} placeholder="United Kingdom" />
                  <Input name="city" label="City" icon={<Building2 />} placeholder="London" />
                  <Input name="streetAddress" label="Street Address" icon={<Home />} placeholder="123 Baker Street" />
                  <Input name="postcode" label="Zip Code" icon={<MapPin />} placeholder="NW1 6XE" />
                </>
              )}
            </div>

            {status && (
              <div className={`p-4 rounded-xl flex items-start gap-3 border shadow-sm ${status.success ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                {status.success ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                <div className="text-sm">
                  <p className="font-semibold uppercase-to-titlecase">
                    {(status.message || 'Validation Error').toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}
                  </p>
                  {status.errors && (
                    <ul className="list-disc list-inside mt-1 opacity-80 decoration-border">
                      {Object.entries(status.errors).map(([f, ms]: any) => (ms as string[]).map((m, i) => <li key={i}>{m}</li>))}
                    </ul>
                  )}
                </div>
              </div>
            )}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-95 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
              style={{ fontFamily: 'var(--font-outfit), sans-serif', fontSize: '1.25rem' }}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {view === 'login' ? 'Enter Skill Hub' : view === 'register' ? 'Create Account' : 'Send Reset Link'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="p-8 pb-8 pt-0 text-center text-sm text-black dark:text-white">
            {view === 'forgot' ? (
              <button onClick={() => setView('login')} className="text-primary hover:underline font-bold uppercase text-xs tracking-widest bg-primary/5 px-4 py-2 rounded-lg border border-primary/10 transition-all hover:bg-primary/10">Back to Login</button>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xl font-medium text-black dark:text-white" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                <span>{view === 'login' ? "Don't have an account?" : 'Already a member?'}</span>
                <button 
                  onClick={() => setView(view === 'login' ? 'register' : 'login')} 
                  className="text-primary hover:underline font-bold transition-colors"
                >
                  {view === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Descriptive Text Panel BELOW login */}
        <div id="skillhub-terms" className="w-full max-w-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-[#c0c0c0] dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl text-[10px] sm:text-[11px] lg:text-xs">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary shrink-0" />
            <div className="flex flex-col">
               <h2 className="text-lg lg:text-xl font-black text-black dark:text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                 SKILLHUB TERMS OF SUBSCRIPTION
               </h2>
               <span className="text-[10px] font-bold text-primary mt-1 uppercase tracking-widest">Version 2026.1</span>
            </div>
          </div>

          <div className="space-y-6 text-black/80 dark:text-white/80 leading-relaxed">
            
            {/* 01. PARTIES AND NATURE OF SERVICE */}
            <div>
              <h3 className="font-bold text-black dark:text-white mb-2 flex items-center gap-1.5 opacity-90 text-[11px] sm:text-xs uppercase tracking-wider">
                <Users className="w-4 h-4 text-primary shrink-0" /> 01. Parties & Nature of Service
              </h3>
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 dark:border-primary/10 ml-1">
                <p className="mb-2">
                  This Agreement is entered into between <strong>Uhuru Trade Ltd.</strong> ("the Provider"), registered at Unit 13 Freeland Park, Wareham Road, Lytchett Matravers, BH16 6FA, Poole – UK, and the individual or entity acquiring the subscription ("the User").
                </p>
                <p>
                  SkillHub provides temporary access to SaaS environments ("Vision Instances" or "Sandboxes") of Oracle Fusion Cloud Release 13. Uhuru Trade Ltd. acts solely as a facilitator for educational and professional development purposes and is not the owner, developer, or official technical support for Oracle Corp.
                </p>
              </div>
            </div>

            {/* 02. LIMITED LICENSE AND EXCLUSIVE PURPOSE */}
            <div>
              <h3 className="font-bold text-black dark:text-white mb-2 flex items-center gap-1.5 opacity-90 text-[11px] sm:text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-primary shrink-0" /> 02. Limited License & Purpose
              </h3>
              <ul className="list-disc list-inside space-y-1.5 ml-2 opacity-80">
                <li><strong>Educational Purpose Only:</strong> Strictly limited to self-study, research, and training. Live business management or consulting is prohibited.</li>
                <li><strong>No Real Data & PII:</strong> Users must NOT upload real production data, actual financial records, or Personally Identifiable Information under any circumstances.</li>
                <li><strong>Non-Resale Clause:</strong> Sub-leasing, selling, or paid training sessions using these credentials is prohibited.</li>
              </ul>
            </div>

            {/* 03. SYSTEM INTEGRITY AND SECURITY */}
            <div>
              <h3 className="font-bold text-black dark:text-white mb-2 flex items-center gap-1.5 opacity-90 text-[11px] sm:text-xs uppercase tracking-wider">
                <Lock className="w-4 h-4 text-red-500 shrink-0" /> 03. System Integrity & Security
              </h3>
              <p className="opacity-80 ml-2 mb-2 font-semibold">Any violation of the following results in immediate account termination without refund:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2 opacity-80">
                <li><strong>Credentials:</strong> Sharing access credentials with third parties is strictly prohibited.</li>
                <li><strong>Security Modifications:</strong> Changing Master Passwords or bypassing license restrictions is prohibited.</li>
                <li><strong>Technical Access:</strong> Functional access only. Excludes SQL database access, server-level access, or network infrastructure control.</li>
              </ul>
            </div>

            {/* 04. AVAILABILITY, MAINTENANCE, AND COMPENSATION */}
            <div>
              <h3 className="font-bold text-black dark:text-white mb-2 flex items-center gap-1.5 opacity-90 text-[11px] sm:text-xs uppercase tracking-wider">
                <Activity className="w-4 h-4 text-amber-500 shrink-0" /> 04. Maintenance & Compensation
              </h3>
              <div className="space-y-2 opacity-80 ml-2">
                <p>The infrastructure is operated by Oracle Corp. and subject to their global maintenance:</p>
                <ul className="list-disc list-inside space-y-1.5 mt-2">
                  <li><strong>Scheduled Maintenance:</strong> 1 to 2 days per week for standard Oracle updates is expected.</li>
                  <li><strong>System Refreshes:</strong> Oracle may restore instances without notice. Any User data will be permanently lost.</li>
                  <li><strong>Interruption Compensation:</strong> If an outage prevents use for over 48 consecutive hours in a week, the Provider will compensate by adding equivalent inactive days to the end of the subscription.</li>
                </ul>
              </div>
            </div>

            {/* 05. LIMITATION OF LIABILITY (HOLD HARMLESS) */}
            <div>
              <h3 className="font-bold text-black dark:text-white mb-2 flex items-center gap-1.5 opacity-90 text-[11px] sm:text-xs uppercase tracking-wider">
                <Scale className="w-4 h-4 text-emerald-500 shrink-0" /> 05. Limitation of Liability
              </h3>
              <p className="opacity-80 ml-2">To the maximum extent permitted by UK laws, Uhuru Trade Ltd. shall not be liable for any loss of data, loss of profits, business interruption, or indirect damages.</p>
            </div>

            {/* 06. DELIVERY AND REFUND POLICY */}
            <div>
              <h3 className="font-bold text-black dark:text-white mb-2 flex items-center gap-1.5 opacity-90 text-[11px] sm:text-xs uppercase tracking-wider">
                <CreditCard className="w-4 h-4 text-blue-500 shrink-0" /> 06. Delivery & Refund Policy
              </h3>
              <ul className="list-disc list-inside space-y-1.5 ml-2 opacity-80">
                <li><strong>Provisioning:</strong> Credentials delivered via email within 24 hours of payment.</li>
                <li><strong>No Refunds:</strong> Due to the digital consumption of the service, no refunds are issued once credentials are dispatched.</li>
              </ul>
            </div>

            {/* 07. JURISDICTION AND GOVERNING LAW */}
            <div>
              <h3 className="font-bold text-black dark:text-white mb-2 flex items-center gap-1.5 opacity-90 text-[11px] sm:text-xs uppercase tracking-wider">
                <Globe className="w-4 h-4 text-indigo-500 shrink-0" /> 07. Jurisdiction
              </h3>
              <p className="opacity-80 ml-2">Governed by the laws of England and Wales. Disputes are subject to the exclusive jurisdiction of the courts of the United Kingdom.</p>
            </div>

            <div className="footer-notes pt-6 border-t border-[#c0c0c0] dark:border-slate-800 mt-8 text-[9px] sm:text-[10px] text-black dark:text-white space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-bold">© 2026 Uhuru Trade Ltd. - All Rights Reserved</p>
                  <p>Unit 13 Freeland Park Wareham Road, Lytchett Matravers BH16 6FA Poole – UK</p>
                </div>
              </div>
              
              <div className="no-print flex flex-wrap items-center gap-2 font-bold uppercase tracking-wider">
                <FileText className="w-3 h-3" />
                <button 
                  type="button" 
                  onClick={handleOpenTerms} 
                  className="hover:text-primary transition-colors hover:underline cursor-pointer"
                >
                  Download PDF
                </button>
              </div>

              <div className="no-print p-2 bg-[#e5e5e5] dark:bg-slate-950/50 rounded-lg leading-tight">
                We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you agree to our use of cookies. You can decline non-essential cookies. Read our Cookie Policy for more details.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Input({ name, label, icon, placeholder, type = 'text', required = false }: any) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-sm font-bold text-black dark:text-white tracking-wide ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
          <span className="[&>svg]:w-4 [&>svg]:h-4">{icon}</span>
        </div>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-black dark:border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/30 dark:placeholder:text-white/50 text-sm shadow-sm dark:shadow-none dark:text-white"
        />
      </div>
    </div>
  );
}
