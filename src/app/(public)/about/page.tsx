import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Hakkımızda | ATE Digital Arena',
  description: 'Alanya Taudra E-Sports organizasyonunun hikayesi, vizyonu ve misyonu.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-space text-4xl md:text-5xl font-bold text-[#F7F7F7] mb-4">
            ALANYA TAUDRA E-SPORTS
          </h1>
          <p className="text-lg text-[#99999F] max-w-2xl mx-auto">
            Alanya'nın ilk ve en büyük espor ekosistemi. Bölgenin yeteneklerini global arenaya taşımak için buradayız.
          </p>
          <div className="w-16 h-1 bg-[#D00000] mx-auto mt-8" />
        </div>

        {/* Hikayemiz */}
        <section className="mb-20">
          <h2 className="font-space text-2xl font-bold text-[#F7F7F7] mb-6">ATE Hikayesi</h2>
          <div className="prose prose-invert max-w-none text-[#99999F] space-y-4 leading-relaxed">
            <p>
              "Taudra" ismi, köklerini Alanya'nın tarihi ve coğrafi zenginliklerinden alır. Toros Dağları'nın heybeti ve antik Syedra kentinin mirasının birleşimi, organizasyonumuzun sarsılmaz temelini oluşturur.
            </p>
            <p>
              Biz sadece bir espor takımı değil, bir aileyiz. "They played, we ATE" sloganıyla çıktığımız bu yolda, rakiplerimizin oyun oynadığı yerde biz zafere doyuyoruz. Amacımız, Alanya'dan başlayan bu serüveni tüm Türkiye'ye ve ardından dünya sahnelerine taşımaktır.
            </p>
          </div>
        </section>

        {/* Vizyon & Misyon */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#111114] p-8 rounded-lg border border-[rgba(255,255,255,0.08)]">
            <h3 className="font-space text-xl font-bold text-[#F7F7F7] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D00000] rounded-full" />
              Vizyonumuz
            </h3>
            <p className="text-[#99999F]">
              Espor dünyasında sürdürülebilir başarılar elde eden, oyuncu gelişimine odaklanan ve sektörde standartları belirleyen global bir marka olmak. Genç yetenekleri keşfedip onları dünya standartlarında oyuncular haline getirmek.
            </p>
          </div>
          
          <div className="bg-[#111114] p-8 rounded-lg border border-[rgba(255,255,255,0.08)]">
            <h3 className="font-space text-xl font-bold text-[#F7F7F7] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D00000] rounded-full" />
              Misyonumuz
            </h3>
            <p className="text-[#99999F]">
              Profesyonel espor kültürünü yaygınlaştırmak, adil oyun anlayışını desteklemek ve ekosisteme değer katan organizasyonlar düzenlemek. Dijital arenada bölgemizi en iyi şekilde temsil ederek gençlere ilham kaynağı olmak.
            </p>
          </div>
        </div>

        {/* Organizasyon */}
        <section className="mb-20">
          <h2 className="font-space text-2xl font-bold text-[#F7F7F7] mb-6">Organizasyon Yapısı</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 bg-[#0B0B0D] border border-[rgba(255,255,255,0.04)] rounded-lg text-center">
              <h4 className="font-bold text-[#F7F7F7] mb-2">Yönetim</h4>
              <p className="text-sm text-[#99999F]">Strateji ve Operasyon</p>
            </div>
            <div className="p-6 bg-[#0B0B0D] border border-[rgba(255,255,255,0.04)] rounded-lg text-center">
              <h4 className="font-bold text-[#F7F7F7] mb-2">Takımlar & Akademi</h4>
              <p className="text-sm text-[#99999F]">Oyuncu Gelişimi</p>
            </div>
            <div className="p-6 bg-[#0B0B0D] border border-[rgba(255,255,255,0.04)] rounded-lg text-center">
              <h4 className="font-bold text-[#F7F7F7] mb-2">İçerik & Medya</h4>
              <p className="text-sm text-[#99999F]">Yayın ve İletişim</p>
            </div>
          </div>
        </section>

        {/* Neden ATE? */}
        <section>
          <h2 className="font-space text-2xl font-bold text-[#F7F7F7] mb-6">Neden ATE?</h2>
          <ul className="space-y-4 text-[#99999F]">
            <li className="flex items-start gap-3">
              <span className="text-[#D00000] font-bold mt-1">01.</span>
              <span><strong>Profesyonel Yaklaşım:</strong> Sadece oyun değil, kariyer yönetimi, mental koçluk ve fiziksel sağlık destekleri sunuyoruz.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D00000] font-bold mt-1">02.</span>
              <span><strong>Güçlü Ekosistem:</strong> Okul temsilciliklerinden akademiye, içerik üreticilerinden yayıncılara kadar geniş bir ağ.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D00000] font-bold mt-1">03.</span>
              <span><strong>Yerelden Globale:</strong> Alanya'nın gücünü arkamıza alarak, uluslararası başarılar hedefliyoruz.</span>
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
