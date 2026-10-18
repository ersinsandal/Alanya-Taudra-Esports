'use client';
import React, { useState } from 'react';
import { updateApproverRoles } from '../actions';
import { Star, Loader2, Check } from 'lucide-react';

export default function TeamRolesClient({ teamId, initialRoles, availableRoles, isSuperAdmin }: any) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRoles);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // We will map system roles dynamically
  const roles = availableRoles.map((r: any) => ({
    id: r.name,
    label: r.displayName || r.name
  }));

  const handleToggle = (roleId: string) => {
    if (!isSuperAdmin) return;
    setSelectedRoles(prev => 
      prev.includes(roleId) ? prev.filter(r => r !== roleId) : [...prev, roleId]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      await updateApproverRoles(teamId, selectedRoles);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setIsModalOpen(false);
    } catch (error) {
      alert('Hata oluştu');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex items-center justify-between">
          <span className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500" /> Yetkiler</span>
        </h2>
        <p className="text-sm text-[#99999F] mb-4">
          Süper Adminler takıma daima oyuncu onaylayabilir. Ek olarak <strong>{selectedRoles.length} adet role</strong> oyuncu onaylama yetkisi verilmiş.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
           {Array.from(new Set(['SUPER_ADMIN', ...selectedRoles])).map(r => {
             const rl = roles.find((role: any) => role.id === r);
             const isSuper = r === 'SUPER_ADMIN';
             return (
               <span key={r} className={`px-2 py-1 rounded text-xs font-bold border ${isSuper ? 'bg-primary-red/5 text-primary-red/70 border-primary-red/10' : 'bg-primary-red/10 text-primary-red border-primary-red/20'}`}>
                 {rl ? rl.label : r} {isSuper && '(Sabit)'}
               </span>
             );
           })}
        </div>

        {isSuperAdmin ? (
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold transition-colors border border-white/10"
          >
            Yetkileri Düzenle
          </button>
        ) : (
          <div className="text-xs text-secondary text-center">Sadece Süper Adminler yetkileri düzenleyebilir.</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-panel border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Star className="w-5 h-5 text-primary-red" /> Yetkili Rolleri Seç
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-secondary hover:text-white transition-colors text-2xl font-bold">
                ×
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
              <p className="text-sm text-[#99999F] mb-4">
                Sistemdeki tüm roller aşağıda listelenmiştir. İşaretlediğiniz roller, bu resmi takımın başvurularını onaylayabilecektir.
              </p>
              {roles.map((role: any) => {
                const isSuperAdminRole = role.id === 'SUPER_ADMIN';
                const isChecked = isSuperAdminRole || selectedRoles.includes(role.id);
                
                return (
                  <label key={role.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${isSuperAdminRole ? 'opacity-70 cursor-not-allowed bg-primary-red/5 border-primary-red/20' : isChecked ? 'bg-primary-red/10 border-primary-red/30 cursor-pointer' : 'bg-[#111114] border-white/5 hover:border-white/10 cursor-pointer'}`}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${isChecked ? 'bg-primary-red border-primary-red' : 'border-secondary/50'}`}>
                      {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-white">{role.label}</span>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={isChecked}
                      disabled={isSuperAdminRole}
                      onChange={() => {
                        if (!isSuperAdminRole) handleToggle(role.id);
                      }}
                    />
                  </label>
                );
              })}
            </div>
            
            <div className="p-6 border-t border-white/5 flex gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold transition-colors">
                İptal
              </button>
              <button 
                onClick={handleSave} 
                disabled={loading}
                className="flex-1 px-4 py-2 bg-primary-red hover:bg-red-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
