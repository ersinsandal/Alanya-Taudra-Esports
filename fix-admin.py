import os

replacements = {
    'G\ufffdm\ufffd': 'Gümüş',
    'Alt\ufffdn': 'Altın',
    'Y\ufffdcelik': 'Yücelik',
    '\ufffdl\ufffdms\ufffdzl\ufffdk': 'Ölümsüzlük',
    'Z\ufffdmr\ufffdt': 'Zümrüt',
    'Ustal\ufffdk': 'Ustalık',
    '\ufffdsta': 'Üsta', # Üstadlık vs
    'T\ufffdrkiye': 'Türkiye',
    '\ufffdoN\ufffdVERS\ufffdTELER': 'ÜNİVERSİTELER',
    '\ufffdye': 'Üye',
    'Ba\ufffdYvur': 'Başvur',
    'Yar\ufffdn': 'Yarın',
    'Bug\ufffdn': 'Bugün',
    'T\ufffdm': 'Tüm',
    'T\ufffdm\ufffd': 'Tümü',
    'Giri\ufffdY': 'Giriş',
    'Olu\ufffdYtur': 'Oluştur',
    '\ufffd?': 'Ş',
    '\ufffdY': 'ş',
    '\ufffd\ufffd': 'Ç',
    '\ufffdo': 'ü',
    '\ufffdǬ': 'ü',
    '\ufffd': 'ı',
    '\ufffdi': 'i',
    '\ufffd\ufffd': 'ğ',
    '\ufffd?': 'Ş',
    'A\ufffd\ufffdk': 'Açık',
    'a\ufffd\ufffdk': 'açık',
    '\ufffdZEL': 'ÖZEL',
    '\ufffdzel': 'özel',
    'De\ufffdi\ufffd\ufffdtir': 'Değiştir',
    'e\ufffd\ufffdle\ufffd\ufffd': 'eşleş'
}

for root, dirs, files in os.walk('src/app/admin'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            original_content = content
            for old, new in replacements.items():
                content = content.replace(old, new)
            
            # Simple fallback for remaining \ufffd
            content = content.replace('\ufffd', 'ı') 
            
            if content != original_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
