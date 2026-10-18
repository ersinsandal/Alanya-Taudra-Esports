"use client";

import { useState } from "react";
import { MoreVertical, Trash2, Edit, Loader2 } from "lucide-react";
import { deleteUser } from "@/lib/actions/admin-users";
import { useRouter } from "next/navigation";

export function UserActionsMenu({ userId, username, isLast }: { userId: string, username: string, isLast?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`DİKKAT: ${username} adlı kullanıcıyı tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz!`)) {
      return;
    }

    setIsDeleting(true);
    setIsOpen(false);
    
    try {
      const res = await deleteUser(userId);
      if (res.success) {
        alert(`${username} başarıyla silindi.`);
        router.refresh();
      } else {
        alert(res.error || "Kullanıcı silinemedi.");
      }
    } catch (e) {
      alert("Hata oluştu.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        disabled={isDeleting}
        className="p-2 text-secondary hover:text-white transition-colors cursor-pointer"
      >
        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreVertical className="w-4 h-4" />}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className={`absolute right-0 w-48 bg-panel ${isLast ? "bottom-full mb-2" : "top-full mt-2"} border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden py-1`}>
            <button 
              onClick={() => {
                setIsOpen(false);
                router.push(`/admin/users/${userId}`);
              }}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Edit className="w-4 h-4" /> Detay / Düzenle
            </button>
            <button 
              onClick={handleDelete}
              className="w-full text-left px-4 py-2 text-sm text-primary-red hover:bg-primary-red/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" /> Kullanıcıyı Sil
            </button>
          </div>
        </>
      )}
    </div>
  );
}
