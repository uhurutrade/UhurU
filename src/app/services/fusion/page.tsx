'use client';

import { useState } from 'react';
import { registerUser, loginUser, requestPasswordReset } from '@/actions/auth';
import { 
  User, Mail, Lock, Building, MapPin, Building2, Phone, Globe, Hash, Home, 
  ShieldCheck, LogIn, UserPlus, ArrowRight, CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';

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
      if (result.success && view === 'login') {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Auth error:', error);
      setStatus({ success: false, message: 'Ocurrió un error inesperado.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>

      <div className="w-full max-w-2xl z-10 my-10">
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">
          
          {view !== 'forgot' && (
            <div className="flex border-b border-slate-800">
              <button 
                onClick={() => { setView('login'); setStatus(null); }}
                className={`flex-1 py-6 font-semibold flex items-center justify-center gap-2 transition-all ${view === 'login' ? 'bg-blue-600 text-white shadow-inner' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
              >
                <LogIn className="w-5 h-5" /> Iniciar Sesión
              </button>
              <button 
                onClick={() => { setView('register'); setStatus(null); }}
                className={`flex-1 py-6 font-semibold flex items-center justify-center gap-2 transition-all ${view === 'register' ? 'bg-blue-600 text-white shadow-inner' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
              >
                <UserPlus className="w-5 h-5" /> Registrarse
              </button>
            </div>
          )}

          <div className="p-8 pb-4 text-center">
            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 shadow-xl shadow-blue-500/5">
              {view === 'forgot' ? <RefreshCw className="w-10 h-10 text-blue-400" /> : <ShieldCheck className="w-10 h-10 text-blue-400" />}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              {view === 'forgot' ? 'Recuperar Contraseña' : 'Oracle Fusion Services'}
            </h1>
            <p className="text-slate-400">
              {view === 'forgot' ? 'Te enviaremos un enlace a tu email' : 
               view === 'login' ? 'Accede a tus cursos y plataformas' : 
               'Crea tu cuenta de consultor Oracle Fusion'}
            </p>
          </div>

          <form action={handleAction} className="p-8 pt-4 space-y-6">
            <div className={`grid gap-4 ${view === 'register' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              
              {view === 'register' && (
                <>
                  <Input name="firstName" label="Primer Nombre" icon={<User />} placeholder="Raúl" required />
                  <Input name="lastName" label="Apellido" icon={<User />} placeholder="Ortega" required />
                  <Input name="displayName" label="Nombre de Usuario" icon={<Hash />} placeholder="raul.fusion" required />
                </>
              )}

              <Input name="email" label="Correo Electrónico" type="email" icon={<Mail />} placeholder="tu@email.com" required />
              
              {view !== 'forgot' && (
                <div className="relative">
                  <Input name="password" label="Contraseña" type="password" icon={<Lock />} placeholder="••••••••" required />
                  {view === 'login' && (
                    <button 
                      type="button"
                      onClick={() => { setView('forgot'); setStatus(null); }}
                      className="absolute right-0 -top-1 text-xs text-blue-400 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  )}
                </div>
              )}

              {view === 'register' && (
                <>
                  <Input name="companyName" label="Empresa (Opcional)" icon={<Building />} placeholder="Uhuru Trade Ltd." />
                  <Input name="phone" label="Teléfono" icon={<Phone />} placeholder="+34 600 000 000" required />
                  <Input name="country" label="País / Región" icon={<Globe />} placeholder="España" required />
                  <Input name="city" label="Ciudad" icon={<Building2 />} placeholder="Madrid" required />
                  <Input name="streetAddress" label="Dirección" icon={<Home />} placeholder="Calle Falsa 123" required />
                  <Input name="postcode" label="Código Postal" icon={<MapPin />} placeholder="28001" required />
                </>
              )}
            </div>

            {status && (
              <div className={`p-4 rounded-xl flex items-start gap-3 border shadow-sm ${status.success ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                {status.success ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                <div className="text-sm">
                  <p className="font-semibold">{status.message}</p>
                  {status.errors && (
                    <ul className="list-disc list-inside mt-1 opacity-80 decoration-slate-600">
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
                  {view === 'login' ? 'Entrar a Fusion' : view === 'register' ? 'Crear mi Cuenta' : 'Enviar Enlace'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="p-8 pt-0 text-center text-sm text-slate-500">
            {view === 'forgot' ? (
              <button onClick={() => setView('login')} className="text-blue-400 hover:underline font-medium">Volver al inicio de sesión</button>
            ) : (
              <>
                {view === 'login' ? '¿No tienes cuenta?' : '¿Ya eres miembro?'} 
                <button onClick={() => setView(view === 'login' ? 'register' : 'login')} className="text-blue-400 hover:underline ml-1 font-medium transition-colors">
                  {view === 'login' ? 'Regístrate aquí' : 'Inicia sesión ahora'}
                </button>
              </>
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
      <label className="text-sm font-semibold text-slate-500 group-focus-within:text-blue-400 transition-colors tracking-wider uppercase ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
          <span className="[&>svg]:w-4 [&>svg]:h-4">{icon}</span>
        </div>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-700 text-sm"
        />
      </div>
    </div>
  );
}
