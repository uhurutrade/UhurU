'use client';

import { resetPassword } from '@/actions/auth';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  if (!token) {
    return (
      <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
        <AlertCircle className="w-10 h-10 mx-auto mb-4 opacity-50" />
        Invalid or missing reset token.
      </div>
    );
  }

  async function handleAction(formData: FormData) {
    setLoading(true);
    setStatus(null);
    try {
      const result = await resetPassword(formData);
      setStatus(result);
      if (result.success) {
        setTimeout(() => window.location.href = '/services/fusion', 3000);
      }
    } catch (error) {
      setStatus({ success: false, message: 'Error processing the request.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-xl">
          <ShieldCheck className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">New Password</h1>
        <p className="text-slate-400 text-sm mt-2">Enter your new secure password below.</p>
      </div>

      <form action={handleAction} className="space-y-6">
        <input type="hidden" name="token" value={token} />
        
        <div className="space-y-2 group">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400" />
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        {status && (
          <div className={`p-4 rounded-xl flex items-start gap-3 border shadow-sm ${status.success ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {status.success ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
            <p className="text-sm font-medium">{status.message}</p>
          </div>
        )}

        <button
          disabled={loading || status?.success}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              {status?.success ? 'Password Changed' : 'Update Password'}
              {!status?.success && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-0 -left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md z-10">
        <Suspense fallback={
          <div className="flex items-center justify-center p-12 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
