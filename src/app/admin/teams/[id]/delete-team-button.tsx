'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteTeam } from './../actions';

export default function DeleteTeamButton({ teamId }: { teamId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Bu resmi takımı silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) return;
    setLoading(true);
    try {
      await deleteTeam(teamId);
      router.push('/admin/teams');
      router.refresh();
    } catch (error) {
      alert('Takım silinirken bir hata oluştu.');
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="ml-auto bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      Takımı Sil
    </button>
  );
}
