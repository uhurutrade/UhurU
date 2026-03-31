'use client';

import { submitContactForm } from '@/actions/sendMail';
import { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Type, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<{ success?: boolean; message?: string; errors?: any } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAction(formData: FormData) {
    setLoading(true);
    setStatus(null);
    try {
      const result = await submitContactForm(formData);
      setStatus(result);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({ success: false, message: 'Ocurrió un error inesperado al enviar el mensaje.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-lg z-10">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 pb-4">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
              <Send className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Enviar Email Directo</h1>
            <p className="text-slate-400">Introduce los datos para enviar un email usando el servidor.</p>
          </div>

          <form action={handleAction} className="p-8 pt-4 space-y-6">
            <div className="space-y-4">
              {/* DESTINATARIO */}
              <div className="relative group">
                <label className="text-sm font-medium text-slate-300 mb-1.5 block">Para (Email de destino)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="ejemplo@google.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                  />
                </div>
              </div>

              {/* ASUNTO */}
              <div className="relative group">
                <label className="text-sm font-medium text-slate-300 mb-1.5 block">Asunto</label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    name="subject"
                    type="text"
                    required
                    placeholder="Escribe el asunto aquí..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                  />
                </div>
              </div>

              {/* CUERPO DEL MENSAJE */}
              <div className="relative group">
                <label className="text-sm font-medium text-slate-300 mb-1.5 block">Mensaje (Cuerpo)</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Escribe el contenido del email que quieres enviar..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-700 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {status && (
              <div className={`p-4 rounded-xl flex items-start gap-3 ${status.success ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {status.success ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                <div className="text-sm">
                  {status.message && <p>{status.message}</p>}
                  {status.errors && (
                    <ul className="list-disc list-inside mt-1 opacity-80">
                      {Object.entries(status.errors).map(([field, msgs]: any) => (msgs as string[]).map((m, i) => (
                        <li key={`${field}-${i}`}>{m}</li>
                      )))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Enviar ahora
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
