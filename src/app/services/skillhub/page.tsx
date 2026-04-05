'use client';

import { useState, useEffect } from 'react';
import { registerUser, loginUser, requestPasswordReset } from '@/actions/auth';
import { 
  User, Mail, Lock, Building, MapPin, Building2, Phone, Globe, Home, 
  ShieldCheck, LogIn, UserPlus, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Shield, BookOpen, AlertTriangle, FileText
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import SubPageHeader from '@/components/uhuru/subpage-header';
import Logo from '@/components/uhuru/logo';

export default function SkillHubPage() {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string; errors?: any } | null>(null);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handlePrint = () => {
    const printContent = document.getElementById('skillhub-terms')?.innerHTML;
    if (!printContent) return;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>SkillHub Service Terms - Uhuru Trade Ltd</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; color: #000; }
            h2 { font-size: 1.5rem; margin-bottom: 1rem; }
            p, li { font-size: 0.9rem; line-height: 1.5; margin-bottom: 0.5rem; }
            h3 { font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
            .bg-primary\\/5 { background: #f3f4f6; padding: 1rem; border-radius: 8px; border: 1px solid #e5e7eb; }
            ul { margin-left: 1.5rem; }
            .footer-notes { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ccc; font-size: 0.8rem; color: #555; }
            .no-print { display: none !important; }
            svg { display: inline-block; width: 1em; height: 1em; margin-right: 0.5em; vertical-align: middle; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  async function handleAction(formData: FormData) {
    setLoading(true);
    setStatus(null);
    try {
      let result;
      if (view === 'login') result = await loginUser(formData);
      else if (view === 'register') result = await registerUser(formData);
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
      <SubPageHeader backHref="/services" backText="Back to Services" />
      {/* Background Orbs */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-slate-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02] dark:opacity-20 animate-pulse transition-all duration-1000"></div>
      <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-slate-500 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.03] dark:opacity-20 animate-pulse animation-delay-2000 transition-all duration-1000"></div>

      <div className="w-full max-w-3xl mx-auto z-10 mt-10 mb-20 px-4 flex flex-col gap-6 items-center justify-start relative">
        
        {/* Login/Register Form Card */}
        <div className="w-full max-w-2xl bg-[#f2f2f2] dark:bg-slate-900/60 backdrop-blur-2xl border border-[#c0c0c0] dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">
          
          {view !== 'forgot' && (
            <div className="flex border-b border-slate-800">
              <button 
                onClick={() => { setView('login'); setStatus(null); }}
                className={`flex-1 py-6 font-semibold flex items-center justify-center gap-2 transition-all ${view === 'login' ? 'bg-primary text-white shadow-inner' : 'text-black dark:text-white hover:text-primary hover:bg-slate-200 dark:hover:bg-slate-800/50'}`}
              >
                <LogIn className="w-5 h-5" /> Sign In
              </button>
              <button 
                onClick={() => { setView('register'); setStatus(null); }}
                className={`flex-1 py-6 font-semibold flex items-center justify-center gap-2 transition-all ${view === 'register' ? 'bg-primary text-white shadow-inner' : 'text-black dark:text-white hover:text-primary hover:bg-slate-200 dark:hover:bg-slate-800/50'}`}
              >
                <UserPlus className="w-5 h-5" /> Sign Up
              </button>
            </div>
          )}

          <div className="p-8 pb-4 text-center">
            {/* Uhuru Official Logo */}
            <div className="flex justify-center mb-6">
              <Logo />
            </div>

            {/* SkillHub Friendly Logo */}
            <div className="flex flex-col items-center mb-6">
              <div className="font-black tracking-tighter text-foreground flex items-center gap-0.5 leading-none" 
                   style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                <span className="text-4xl sm:text-7xl text-black dark:text-white transition-all duration-500">Skill</span>
                <span className="text-4xl sm:text-7xl text-primary drop-shadow-[0_0_20px_rgba(37,99,235,0.25)] sm:drop-shadow-[0_0_35px_rgba(37,99,235,0.3)] transition-all duration-500">Hub</span>
                <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-primary rounded-full mt-auto mb-1.5 sm:mb-2.5 animate-pulse ml-1.5 sm:ml-2"></div>
              </div>
              <p className="mt-4 text-xs sm:text-xl font-medium text-black dark:text-white tracking-wide text-center px-4">
                Get access to your Oracle Fusion instance for Learning
              </p>
            </div>
          </div>

          <form action={handleAction} className="p-8 pt-4 space-y-6">
            <div className={`grid gap-4 ${view === 'register' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              
              {view === 'register' && (
                <>
                  <Input name="firstName" label="First Name" icon={<User />} placeholder="Raúl" required />
                  <Input name="lastName" label="Last Name" icon={<User />} placeholder="Ortega" required />
                </>
              )}

              <Input name="email" label="Email Address" type="email" icon={<Mail />} placeholder="you@email.com" required />
              
                  {view !== 'forgot' && (
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1.5 px-1">
                        <label className="text-sm font-bold text-black dark:text-white tracking-wide">Password <span className="text-red-500">*</span></label>
                        {view === 'login' && (
                          <button 
                            type="button"
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
                          className="w-full pl-10 pr-4 py-3 bg-secondary/20 dark:bg-slate-900 border border-border dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/30 dark:placeholder:text-white/50 text-sm dark:text-white"
                        />
                      </div>
                    </div>
                  )}

              {view === 'register' && (
                <>
                  <Input name="companyName" label="Company (Optional)" icon={<Building />} placeholder="Uhuru Trade Ltd." />
                  <Input name="phone" label="Phone" icon={<Phone />} placeholder="+34 600 000 000" required />
                  <Input name="country" label="Country" icon={<Globe />} placeholder="Spain" required />
                  <Input name="city" label="City" icon={<Building2 />} placeholder="Madrid" required />
                  <Input name="streetAddress" label="Street Address" icon={<Home />} placeholder="Street Name 123" required />
                  <Input name="postcode" label="Zip Code" icon={<MapPin />} placeholder="28001" required />
                </>
              )}
            </div>

            {status && (
              <div className={`p-4 rounded-xl flex items-start gap-3 border shadow-sm ${status.success ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                {status.success ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                <div className="text-sm">
                  <p className="font-semibold uppercase-to-titlecase">
                    {status.message.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}
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
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary shrink-0" />
            <h2 className="text-lg lg:text-xl font-black text-black dark:text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
              SkillHub Service Terms
            </h2>
          </div>

          <div className="space-y-4 text-black/80 dark:text-white/80 leading-relaxed">
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 dark:border-primary/10">
              <p className="mb-2">
                <strong>Uhuru Trade Ltd</strong> provides temporary access to SkillHub Cloud Instances exclusively for educational, research, and professional development purposes. These "Vision Instances" are pre-configured environments designed to allow consultants and students to explore functional and technical capabilities of the SkillHub ERP/SCM/HCM ecosystem without the risks associated with production data.
              </p>
              <p>
                <strong>Uhuru Trade Ltd</strong> proporciona acceso temporal a instancias de SkillHub Cloud exclusivamente para fines educativos, de investigación y desarrollo profesional. Estas "instancias Vision" son entornos ya configurados que permiten explorar las capacidades del ecosistema SkillHub sin riesgos para los datos de producción.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-black dark:text-white mb-1.5 flex items-center gap-1.5 opacity-90">
                <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" /> 2. Permitted Use & Restrictions
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-1 opacity-80">
                <li>Access is granted for a fixed period (30/90 days) upon successful verification of the subscription.</li>
                <li>Users may perform configurations, testing, and training exercises within the functional scope of the provided license.</li>
                <li><strong>Strictly prohibited:</strong> Uploading real production data, PII (Personally Identifiable Information), or using the instance for commercial production.</li>
                <li>Any attempt to bypass security measures or share credentials with unauthorized third parties will result in immediate termination without refund.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black dark:text-white mb-1.5 flex items-center gap-1.5 opacity-90">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" /> 3. Liability & Data Integrity
              </h3>
              <p className="opacity-80">
                The provided instances are "sandbox" environments. Uhuru Trade Ltd does not guarantee the persistence of configurations or data uploaded by the user. Periodic maintenance, refreshes, or administrative resets may occur. Users are responsible for documenting their work externally. Uhuru Trade Ltd shall not be liable for any data loss, performance fluctuations, or service interruptions inherent to the cloud provider's infrastructure.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-black dark:text-white mb-1.5 flex items-center gap-1.5 opacity-90">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 4. Service Continuity
              </h3>
              <p className="opacity-80">
                Access credentials will remain active until the end of the contracted period. Upon expiration, the system will automatically revoke access and release the license to the general pool. Users wishing to continue must renew their subscription prior to the expiration date to ensure continuous access to the same instance (subject to availability).
              </p>
            </div>

            <div className="footer-notes pt-4 border-t border-[#c0c0c0] dark:border-slate-800 mt-6 text-[9px] sm:text-[10px] text-black dark:text-white space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-bold">© 2026 Uhuru Trade Ltd. - All Rights Reserved</p>
                  <p>Unit 13 Freeland Park Wareham Road, Lytchett Matravers BH16 6FA Poole – UK</p>
                </div>
              </div>
              
              <div className="no-print flex flex-wrap items-center gap-2 font-bold uppercase tracking-wider">
                <FileText className="w-3 h-3" />
                <button type="button" onClick={handlePrint} className="hover:text-primary transition-colors hover:underline cursor-pointer">Download PDF</button>
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
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/30 dark:placeholder:text-white/50 text-sm shadow-sm dark:shadow-none dark:text-white"
        />
      </div>
    </div>
  );
}
