  ShieldCheck, LogIn, UserPlus, ArrowRight, CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function FusionPage() {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string; errors?: any } | null>(null);

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
          window.location.href = '/services/fusion/dashboard';
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
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden font-sans transition-colors duration-300">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle className="h-10 w-10 bg-card/50 backdrop-blur-md border border-border shadow-xl hover:scale-110 transition-all rounded-xl" />
      </div>
      {/* Background Orbs */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>

      <div className="w-full max-w-2xl z-10 my-10">
        <div className="bg-card/30 dark:bg-slate-900/60 backdrop-blur-2xl border border-border/40 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">
          
          {view !== 'forgot' && (
            <div className="flex border-b border-slate-800">
              <button 
                onClick={() => { setView('login'); setStatus(null); }}
                className={`flex-1 py-6 font-semibold flex items-center justify-center gap-2 transition-all ${view === 'login' ? 'bg-blue-600 text-white shadow-inner' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
              >
                <LogIn className="w-5 h-5" /> Sign In
              </button>
              <button 
                onClick={() => { setView('register'); setStatus(null); }}
                className={`flex-1 py-6 font-semibold flex items-center justify-center gap-2 transition-all ${view === 'register' ? 'bg-blue-600 text-white shadow-inner' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
              >
                <UserPlus className="w-5 h-5" /> Sign Up
              </button>
            </div>
          )}

          <div className="p-8 pb-4 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-xl shadow-primary/5">
              {view === 'forgot' ? <RefreshCw className="w-10 h-10 text-primary" /> : <ShieldCheck className="w-10 h-10 text-primary" />}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              {view === 'forgot' ? 'Forgot Password' : 'Oracle Fusion Services'}
            </h1>
            <p className="text-slate-400">
              {view === 'forgot' ? "We'll send you a secure reset link" : 
               view === 'login' ? 'Access your courses and platforms' : 
               'Create your Oracle Fusion consultant account'}
            </p>
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
              
                  <div className="relative">
                    <div className="flex items-center justify-between mb-1.5 px-1">
                      <label className="text-sm font-semibold text-slate-500 tracking-wider uppercase">Password <span className="text-red-500">*</span></label>
                      {view === 'login' && (
                        <button 
                          type="button"
                          onClick={() => { setView('forgot'); setStatus(null); }}
                          className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors"
                        >
                          Forgot password?
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
                        className="w-full pl-10 pr-4 py-3 bg-secondary/20 dark:bg-slate-950/50 border border-border dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/30 text-sm"
                      />
                    </div>
                  </div>

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
                  <p className="font-semibold">{status.message}</p>
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
              className="w-full bg-blue-600 hover:bg-blue-500 hover:scale-[1.02] active:scale-95 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {view === 'login' ? 'Enter Fusion' : view === 'register' ? 'Create Account' : 'Send Reset Link'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="p-8 pb-8 pt-0 text-center text-sm text-slate-500">
            {view === 'forgot' ? (
              <button onClick={() => setView('login')} className="text-primary hover:underline font-bold uppercase text-[10px] tracking-widest bg-primary/5 px-4 py-2 rounded-lg border border-primary/10 transition-all hover:bg-primary/10">Back to Login</button>
            ) : (
              <span className="bg-secondary/40 dark:bg-slate-950/50 px-4 py-2 rounded-full border border-border dark:border-white/5 inline-block">
                {view === 'login' ? "Don't have an account?" : 'Already a member?'} 
                <button onClick={() => setView(view === 'login' ? 'register' : 'login')} className="text-primary hover:underline ml-2 font-black uppercase text-[10px] tracking-widest transition-colors">
                  {view === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Input({ name, label, icon, placeholder, type = 'text', required = false }: any) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-sm font-semibold text-muted-foreground group-focus-within:text-primary transition-colors tracking-wider uppercase ml-1">
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
          className="w-full pl-10 pr-4 py-3 bg-secondary/20 dark:bg-slate-950/50 border border-border dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/30 text-sm"
        />
      </div>
    </div>
  );
}
