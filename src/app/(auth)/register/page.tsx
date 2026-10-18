'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Globe, 
  Check, 
  Loader2, 
  X, 
  School, 
  GraduationCap, 
  Eye, 
  EyeOff, 
  Swords, 
  Users, 
  Trophy, 
  Crown, 
  Tv 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { alanyaSchools } from '@/lib/data/schools';
import { register } from '@/lib/actions/auth';

const purposeOptions = [
  {
    id: 'Rekabetçi Espor',
    title: 'Rekabetçi Espor',
    description: 'Turnuvalarda ve liglerde profesyonel olarak yarışmak',
    icon: Swords,
  },
  {
    id: 'Takım & Kadro',
    title: 'Takım & Kadro',
    description: 'Bir espor takımına katılmak veya yeni takım arkadaşları bulmak',
    icon: Users,
  },
  {
    id: 'Okul / Kampüs Ligi',
    title: 'Okul / Kampüs Ligi',
    description: 'Alanya Okul Ligi veya Campus Clash turnuvalarında okulumu temsil etmek',
    icon: GraduationCap,
  },
  {
    id: 'Turnuva Katılımı',
    title: 'Turnuva Katılımı',
    description: 'Ödüllü resmi ATE turnuvalarında ve etkinliklerinde yer almak',
    icon: Trophy,
  },
  {
    id: 'Takım Kaptanı / Kurucu',
    title: 'Takım Kaptanı / Kurucu',
    description: 'Kendi espor takımını kurup yönetmek',
    icon: Crown,
  },
  {
    id: 'İçerik Üreticisi & Medya',
    title: 'İçerik Üreticisi & Medya',
    description: 'Yayın, klip, edit veya espor medyası üretmek',
    icon: Tv,
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: '', // 'alanya' or 'other'
    city: '',
    country: 'Turkey',
    userType: '',
    schoolId: '',
    universityId: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    birthDate: '',
    discord: '',
    purposes: ['Rekabetçi Espor'] as string[],
    password: '',
    confirmPassword: '',
    purpose: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
  const [ateId, setAteId] = useState('');

  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const steps = [
    { id: 1, name: 'HOŞGELDİN' },
    { id: 2, name: 'KONUM' },
    { id: 3, name: 'BİLGİLER' },
    { id: 4, name: 'HEDEFLER' },
    { id: 5, name: 'HAZIR' },
  ];

  const handleNext = () => setStep(prev => prev + 1);

  const checkUsername = async (username: string) => {
    if (username.length < 3 || username.length > 20) {
      setUsernameStatus('unavailable');
      return;
    }
    setUsernameStatus('checking');
    try {
      const res = await fetch(`/api/auth/check-username?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        setUsernameStatus(data.available ? 'available' : 'unavailable');
      } else {
        setUsernameStatus('available');
      }
    } catch {
      setUsernameStatus('available');
    }
  };

  const handleRegister = async () => {
    if (!formData.password || formData.password.length < 8) {
      alert("Şifreniz en az 8 karakter olmalıdır.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Şifreler birbiriyle uyuşmuyor. Lütfen iki alana da aynı şifreyi giriniz.");
      return;
    }

    setLoading(true);
    try {
      const isHighSchool = formData.userType.includes('Lise');
      const isUni = formData.userType.includes('Üniversite');
      const isGrad = formData.userType.includes('Mezun');
      const isWork = formData.userType.includes('Çalış');
      const studentStatus = isHighSchool ? 'HIGH_SCHOOL' : isUni ? 'UNIVERSITY' : isGrad ? 'GRADUATED' : isWork ? 'WORKING' : 'OTHER';

      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || '',
        birthDate: formData.birthDate,
        isAlanya: formData.location === 'alanya',
        city: formData.city || '',
        country: formData.country,
        studentStatus,
        schoolId: isHighSchool ? formData.schoolId : undefined,
        universityId: isUni ? formData.universityId : undefined,
        discordUsername: formData.discord || undefined,
        purpose: formData.purposes.length > 0 ? formData.purposes : ['Rekabetçi Espor'],
      });

      if (result.success && result.data) {
        setAteId(result.data.ateId);
        setStep(5);
      } else {
        console.error(result.error);
        alert(result.error || "Kayıt olurken bir hata oluştu. Bilgilerinizi kontrol edip tekrar deneyin.");
      }
    } catch (error) {
      console.error(error);
      alert("Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#050505] px-4 py-8 text-[#F7F7F7] relative z-10">
      {/* Progress Bar */}
      <div className="w-full max-w-4xl mb-12 flex justify-between items-center px-4 overflow-x-auto">
        {steps.map((s, idx) => (
          <div key={s.id} className="flex items-center">
            <div className={`flex items-center text-xs font-medium space-x-2 ${step === s.id ? 'text-[#FF1F2D]' : step > s.id ? 'text-[#22C55E]' : 'text-[#99999F]'}`}>
              <span className="font-space">{`0${s.id}`} {s.name}</span>
              {step > s.id && <Check className="w-4 h-4" />}
            </div>
            {idx < steps.length - 1 && (
              <div className="w-8 h-px bg-white/10 mx-4" />
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* STEP 1: HOŞGELDİN */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center space-y-8"
            >
              <div className="mx-auto relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
                <Image
                  src="/ate-logo.png"
                  alt="ATE Logo"
                  width={180}
                  height={180}
                  className="w-32 md:w-40 h-auto object-contain drop-shadow-[0_0_35px_rgba(208,0,0,0.5)]"
                  priority
                />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold font-space text-white">ATE dünyasına katıl.</h1>
                <p className="text-xl text-[#99999F]">
                  Oyuncu ol, takımını kur, turnuvalara katıl ve dijital arenada yerini al.
                </p>
              </div>

              <button
                onClick={handleNext}
                className="mt-8 px-12 py-4 bg-[#D00000] text-white font-bold rounded-lg hover:bg-[#FF1F2D] transition-colors text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(208,0,0,0.3)]"
              >
                ATE ID OLUŞTUR
              </button>
            </motion.div>
          )}

          {/* STEP 2: KONUM */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold font-space text-white">Neredesin?</h2>
                <p className="text-sm text-[#99999F] mt-2">Alanya ve Toroslar e-spor ağı için yerel entegrasyon.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, location: 'alanya', city: 'Alanya'})}
                  className={`flex flex-col items-center p-8 rounded-xl border-2 transition-all ${
                    formData.location === 'alanya' ? 'border-[#D00000] bg-[#D00000]/10 shadow-[0_0_20px_rgba(208,0,0,0.2)]' : 'border-white/10 bg-[#111114] hover:bg-white/5'
                  }`}
                >
                  <MapPin className="w-12 h-12 text-[#D00000] mb-4" />
                  <span className="text-xl font-bold font-space">Alanya'dayım</span>
                  <span className="text-xs text-[#99999F] mt-2 text-center">48 lise ve üniversite espor ağına doğrudan erişim</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({...formData, location: 'other'})}
                  className={`flex flex-col items-center p-8 rounded-xl border-2 transition-all ${
                    formData.location === 'other' ? 'border-[#D00000] bg-[#D00000]/10 shadow-[0_0_20px_rgba(208,0,0,0.2)]' : 'border-white/10 bg-[#111114] hover:bg-white/5'
                  }`}
                >
                  <Globe className="w-12 h-12 text-[#99999F] mb-4" />
                  <span className="text-xl font-bold font-space">Alanya Dışındayım</span>
                  <span className="text-xs text-[#99999F] mt-2 text-center">Türkiye geneli veya uluslararası topluluk katılımı</span>
                </button>
              </div>

              {formData.location === 'other' && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <input
                    type="text"
                    placeholder="Şehir"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full rounded-md border border-white/10 bg-[#111114] px-4 py-3 text-white focus:border-[#D00000] focus:outline-none"
                  />
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full rounded-md border border-white/10 bg-[#111114] px-4 py-3 text-white focus:border-[#D00000] focus:outline-none"
                  >
                    <option className="bg-[#050505] text-white" value="Turkey">Türkiye</option>
                    <option className="bg-[#050505] text-white" value="Other">Diğer Ülke</option>
                  </select>
                </div>
              )}

              <div className="flex justify-between pt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 text-white/70 hover:text-white"
                >
                  Geri
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.location}
                  className="px-8 py-3 bg-[#D00000] text-white font-medium rounded-lg hover:bg-[#FF1F2D] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Devam Et
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SENİ TANIYALIM (OKUL SEÇİMİ VE ŞİFRE DAHİL) */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold font-space text-white">Seni Tanıyalım</h2>
                <p className="text-sm text-[#99999F] mt-1">Öğrencilik durumunu ve hesap bilgilerini eksiksiz gir.</p>
              </div>
              
              {/* Kullanıcı Tipi Seçimi */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#99999F] mb-3">
                  Eğitim / Meslek Durumunuz *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Lise öğrencisiyim', 'Üniversite öğrencisiyim', 'Mezunum', 'Çalışıyorum', 'Diğer'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData, 
                          userType: type,
                          schoolId: type !== 'Lise öğrencisiyim' ? '' : formData.schoolId,
                          universityId: type !== 'Üniversite öğrencisiyim' ? '' : formData.universityId,
                        });
                      }}
                      className={`p-3 text-sm text-center rounded-lg border font-medium transition-all ${
                        formData.userType === type ? 'border-[#D00000] bg-[#D00000]/20 text-white shadow-sm' : 'border-white/10 bg-[#111114] text-[#99999F] hover:bg-white/5'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* LİSE SEÇİM ALANI */}
              {formData.userType === 'Lise öğrencisiyim' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border border-[#D00000]/40 bg-[#111114] space-y-2 shadow-lg"
                >
                  <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                    <School className="w-5 h-5 text-[#D00000]" />
                    <span>Lisenizi Seçiniz (Alanya MEB Ağı) *</span>
                  </div>
                  <p className="text-xs text-[#99999F] mb-2">
                    Okulunuzun espor takımına katılabilir veya okulunuz adına turnuvalarda yarışabilirsiniz.
                  </p>
                  <select
                    value={formData.schoolId}
                    onChange={(e) => setFormData({...formData, schoolId: e.target.value})}
                    required
                    className="w-full rounded-md border border-white/20 bg-[#050505] px-4 py-3 text-white focus:border-[#D00000] focus:ring-1 focus:ring-[#D00000] focus:outline-none"
                  >
                    <option className="bg-[#050505] text-white" value="">-- Lise Seçiniz (48 Alanya Lisesi) --</option>
                    {alanyaSchools.map((school) => (
                      <option className="bg-[#050505] text-white" key={school.name} value={school.name}>
                        {school.name} ({school.type === 'PUBLIC' ? 'Resmi' : 'Özel'})
                      </option>
                    ))}
                    <option className="bg-[#050505] text-white" value="Diger">Diğer / Alanya Dışındaki Bir Lise</option>
                  </select>
                </motion.div>
              )}

              {/* ÜNİVERSİTE SEÇİM ALANI */}
              {formData.userType === 'Üniversite öğrencisiyim' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border border-[#D00000]/40 bg-[#111114] space-y-2 shadow-lg"
                >
                  <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                    <GraduationCap className="w-5 h-5 text-[#D00000]" />
                    <span>Üniversitenizi Seçiniz (Campus Clash Ağı) *</span>
                  </div>
                  <p className="text-xs text-[#99999F] mb-2">
                    Üniversitenizin espor kulübü ve Campus Clash turnuva ağı ile eşleşeceksiniz.
                  </p>
                  <select
                    value={formData.universityId}
                    onChange={(e) => setFormData({...formData, universityId: e.target.value})}
                    required
                    className="w-full rounded-md border border-white/20 bg-[#050505] px-4 py-3 text-white focus:border-[#D00000] focus:ring-1 focus:ring-[#D00000] focus:outline-none"
                  >
                    <option className="bg-[#050505] text-white" value="">-- Üniversite Seçiniz --</option>
                    <option className="bg-[#050505] text-white" value="Alanya Alaaddin Keykubat Üniversitesi (ALKÜ)">Alanya Alaaddin Keykubat Üniversitesi (ALKÜ)</option>
                    <option className="bg-[#050505] text-white" value="Alanya Üniversitesi">Alanya Üniversitesi</option>
                    <option className="bg-[#050505] text-white" value="Akdeniz Üniversitesi">Akdeniz Üniversitesi</option>
                    <option className="bg-[#050505] text-white" value="Anadolu Üniversitesi">Anadolu Üniversitesi</option>
                    <option className="bg-[#050505] text-white" value="Diğer Üniversite">Diğer Üniversite</option>
                  </select>
                </motion.div>
              )}

              {/* Kişisel Bilgiler & Şifre */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <input
                    type="text"
                    placeholder="Ad *"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full rounded-md border border-white/10 bg-[#111114] px-4 py-3 text-white focus:border-[#D00000] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Soyad *"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full rounded-md border border-white/10 bg-[#111114] px-4 py-3 text-white focus:border-[#D00000] focus:outline-none"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Kullanıcı Adı (IGN) *"
                    value={formData.username}
                    onChange={(e) => {
                      setFormData({...formData, username: e.target.value});
                      checkUsername(e.target.value);
                    }}
                    className="w-full rounded-md border border-white/10 bg-[#111114] px-4 py-3 text-white focus:border-[#D00000] focus:outline-none"
                  />
                  <div className="absolute right-3 top-3">
                    {usernameStatus === 'checking' && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
                    {usernameStatus === 'available' && <Check className="w-5 h-5 text-green-500" />}
                    {usernameStatus === 'unavailable' && formData.username.length > 0 && <X className="w-5 h-5 text-red-500" />}
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="E-posta *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full rounded-md border border-white/10 bg-[#111114] px-4 py-3 text-white focus:border-[#D00000] focus:outline-none"
                  />
                </div>

                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-white/10 bg-[#0B0B0D] text-gray-400 text-sm">
                    +90
                  </span>
                  <input
                    type="tel"
                    placeholder="Telefon (İsteğe bağlı)"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="flex-1 rounded-r-md border border-white/10 bg-[#111114] px-4 py-3 text-white focus:border-[#D00000] focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="date"
                    placeholder="Doğum Tarihi *"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="w-full rounded-md border border-white/10 bg-[#111114] px-4 py-3 text-gray-300 focus:border-[#D00000] focus:outline-none"
                  />
                </div>

                {/* Şifre Alanı */}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Şifre (En az 8 karakter) *"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full rounded-md border border-white/10 bg-[#111114] px-4 py-3 text-white focus:border-[#D00000] focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Şifre Tekrar Alanı */}
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Şifre Tekrar *"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full rounded-md border border-white/10 bg-[#111114] px-4 py-3 text-white focus:border-[#D00000] focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Validation helper messages */}
              <div className="space-y-1">
                {formData.password && formData.password.length < 8 && (
                  <p className="text-xs text-amber-400">Şifre en az 8 karakter uzunluğunda olmalıdır.</p>
                )}
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-400">Girdiğiniz şifreler eşleşmiyor.</p>
                )}
              </div>

              <div className="flex justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 text-white/70 hover:text-white"
                >
                  Geri
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    !formData.userType ||
                    (formData.userType === 'Lise öğrencisiyim' && !formData.schoolId) ||
                    (formData.userType === 'Üniversite öğrencisiyim' && !formData.universityId) ||
                    !formData.firstName || 
                    !formData.lastName || 
                    formData.username.length < 3 || 
                    !formData.email ||
                    !formData.birthDate ||
                    !formData.password ||
                    formData.password.length < 8 ||
                    formData.password !== formData.confirmPassword
                  }
                  className="px-8 py-3 bg-[#D00000] text-white font-medium rounded-lg hover:bg-[#FF1F2D] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(208,0,0,0.3)] transition-all font-space"
                >
                  Devam Et
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: AMACIN VE HEDEFLERİN */}
          {step === 4 && (
            <motion.div
              key="step4"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold font-space text-white">Hedefin Ne?</h2>
                <p className="text-sm text-[#99999F] mt-1">Platformdaki amaçlarını seç (birden fazla seçebilirsin).</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {purposeOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = formData.purposes.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        const newPurposes = isSelected
                          ? formData.purposes.filter(p => p !== opt.id)
                          : [...formData.purposes, opt.id];
                        setFormData({...formData, purposes: newPurposes});
                      }}
                      className={`p-4 text-left rounded-xl border transition-all flex items-start gap-3.5 group ${
                        isSelected 
                          ? 'border-[#D00000] bg-[#D00000]/15 shadow-[0_0_15px_rgba(208,0,0,0.2)]' 
                          : 'border-white/10 bg-[#111114] hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 mt-0.5 transition-colors ${
                        isSelected ? 'bg-[#D00000] text-white shadow-sm' : 'bg-black/40 text-gray-400 group-hover:text-white'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`font-bold text-sm tracking-wide ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                            {opt.title}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#FF1F2D] shrink-0 ml-1" />}
                        </div>
                        <p className="text-xs text-[#99999F] mt-1 line-clamp-2">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-8 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 text-white/70 hover:text-white"
                >
                  Geri
                </button>
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={loading || formData.purposes.length === 0}
                  className="px-8 py-3 bg-[#D00000] text-white font-medium rounded-lg hover:bg-[#FF1F2D] disabled:opacity-50 flex items-center shadow-[0_0_20px_rgba(208,0,0,0.3)] transition-all font-space uppercase tracking-wider"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  Kayıt Ol & ATE ID Al
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: ATE PASSPORT HAZIR */}
          {step === 5 && (
            <motion.div
              key="step5"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center space-y-8"
            >
              <h2 className="text-4xl font-bold font-space text-[#FF1F2D]">ATE DÜNYASINA HOŞGELDİN!</h2>
              
              <div className="mx-auto max-w-sm rounded-2xl border border-white/20 bg-gradient-to-br from-[#111114] to-[#050505] p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D00000] rounded-full filter blur-[80px] opacity-25"></div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="font-bold text-xl text-white tracking-widest font-space">ATE PASSPORT</div>
                  <div className="text-xs text-[#FF1F2D] font-mono font-bold tracking-wider">{ateId || 'ATE-074-XXXXXX'}</div>
                </div>
                <div className="flex gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[#0B0B0D] border border-white/10 flex items-center justify-center text-white">
                    <span className="font-bold text-2xl">{formData.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg text-white">{formData.username}</div>
                    <div className="text-sm text-[#99999F]">{formData.firstName} {formData.lastName}</div>
                    <div className="text-xs text-[#D00000] mt-1 font-medium tracking-wider uppercase">
                      {formData.schoolId ? (formData.schoolId.length > 25 ? formData.schoolId.substring(0, 25) + '...' : formData.schoolId) : formData.universityId ? formData.universityId : 'ATE Espor Üyesi'}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs text-[#99999F] border-t border-white/10 pt-4 text-left">
                  <div className="flex justify-between">
                    <span>Bölge:</span>
                    <span className="text-white font-medium">{formData.location === 'alanya' ? 'Alanya / Antalya' : formData.city || 'Türkiye'}</span>
                  </div>
                  {formData.schoolId && (
                    <div className="flex justify-between">
                      <span>Okul:</span>
                      <span className="text-white font-medium truncate max-w-[200px]">{formData.schoolId}</span>
                    </div>
                  )}
                  {formData.universityId && (
                    <div className="flex justify-between">
                      <span>Üniversite:</span>
                      <span className="text-white font-medium truncate max-w-[200px]">{formData.universityId}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Katılım:</span>
                    <span className="text-white font-medium">{new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/dashboard"
                  className="px-8 py-3 bg-[#D00000] text-white font-bold rounded-lg hover:bg-[#FF1F2D] transition-colors"
                >
                  Dashboard'a Git
                </Link>
                <Link
                  href="/"
                  className="px-8 py-3 border border-white/10 hover:bg-white/5 text-white font-medium rounded-lg transition-colors"
                >
                  Ana Sayfaya Dön
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
