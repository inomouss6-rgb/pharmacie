import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onExitToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onExitToStore }) => {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Accepted master passwords
  const VALID_PASSWORDS = ['admin2026', 'vital2026', 'vitalpharma2026'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (VALID_PASSWORDS.includes(passcode.trim().toLowerCase())) {
      if (rememberMe) {
        localStorage.setItem('vital_admin_auth', 'authenticated');
      } else {
        sessionStorage.setItem('vital_admin_auth', 'authenticated');
      }
      setError(false);
      onLoginSuccess();
    } else {
      setError(true);
    }
  };

  const handleQuickFill = (code: string) => {
    setPasscode(code);
    setError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header strip */}
        <div className="bg-slate-950 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Portail Administrateur
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestion du Trafic, des Commandes & des Codes Coupons
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Code d'accès secret :
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Entrez votre mot de passe admin"
                  autoFocus
                  className="w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Code d'accès incorrect. Utilisez <strong>vital2026</strong> ou <strong>admin2026</strong>.</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Mémoriser ma session</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Ouvrir l'Espace Administrateur</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Access Helper */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500 mb-2">Mot de passe de démonstration :</p>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('vital2026')}
                className="px-3 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer border border-slate-200"
              >
                vital2026
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin2026')}
                className="px-3 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer border border-slate-200"
              >
                admin2026
              </button>
            </div>
          </div>

          {/* Exit to public storefront */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onExitToStore}
              className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4 cursor-pointer"
            >
              ← Retourner sur la boutique publique
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
