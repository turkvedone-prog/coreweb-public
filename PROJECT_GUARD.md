# 🛡️ CoreWeb Public Site - PROJECT GUARD & GELİŞTİRME STANDARTLARI

Bu dosya, `coreweb-public` reposunda geliştirme yapan yapay zeka (AI) ajanları ve geliştiriciler için zorunlu çalışma standartlarını ve kilitleri içerir.

---

## 1. Aktif Public Site Geliştirme Hattı

| Proje / Rol | Repository | Çalışma Branch'i | Vercel Projesi | Canlı Domainler |
| :--- | :--- | :--- | :--- | :--- |
| **Kamu Sitesi & Çözümleyici** | `coreweb-public` | `dynamic-resolver` | `coreweb-public` | `www.coreweb.tr`, `coreweb.tr`, `*.coreweb.tr` |

---

## 2. Kullanılmayacak Branch ve Proje Uyarıları (YASAKLI ALANLAR)

Aşağıdaki branch'ler ve Vercel projeleri arşiv/backup referanslarıdır. Üzerlerinde geliştirme yapılmaz veya canlıya deploy edilemez:
* 🚫 **`main` branch:** Eski/statik CoreWeb site referansıdır; aktif public resolver geliştirme branch'i değildir!
* 🚫 **`archive/static-coreweb-site` branch:** Arşivlenmiş statik site sürümüdür.
* 🚫 **`archive-coreweb-official-do-not-use`** Vercel Projesi.
* 🚫 **`archive-burobig-web-do-not-use`** Vercel Projesi.
* 🚫 **`archive-capilon-web-do-not-use`** Vercel Projesi.

---

## 3. Public Site Geliştirme ve Yönlendirme Kuralı

* **Merkezi Dinamik Çözümleyici (Resolver):** Standart müşteri siteleri tek bir `coreweb-public` `dynamic-resolver` uygulaması üzerinden dinamik olarak çalışır.
* **Proje Ayrıştırma Yasağı:** Her yeni müşteri için ayrı bir Vercel veya GitHub projesi açılmaz.
* **Veritabanı Tabanlı Çözümleme:** Domain ➔ `tenantId` eşleşmesi Firestore üzerindeki `siteMappings` koleksiyonu aracılığıyla dynamic resolver tarafından runtime'da çözümlenir.
* **Hazırlık Adresi Standardı:** Müşterilerin hazırlık/demo sitesi yönlendirmeleri `${tenantSlug}.coreweb.tr` subdomain standardı üzerinden sağlanır.
* **Canlı Alan Adları (Custom Domain):** Müşteri özel alan adları (custom domain) doğrudan `coreweb-public` Vercel projesine yönlendirilir ve dynamic resolver tarafından çözülür.

---

## 4. Çalışma Alanı Güvenlik Kilidi (Zorunlu Başlangıç Adımı)

Geliştiriciler ve AI kodlama ajanları, herhangi bir kod yazmadan veya commit atmadan önce terminalde şu komutları koşturmalı ve çıktısını doğrulamalıdır:
```bash
pwd
git remote -v
git branch --show-current
```

### Güvenlik İhlali Davranışı:
Eğer bağlı bulunan branch veya repo yukarıdaki **"Aktif Public Site Geliştirme Hattı"** tablosuyla eşleşmiyorsa ve özellikle branch **`dynamic-resolver`** değilse:
1. **İŞLEMİ DERHAL DURDURUN.**
2. Kaynak kod üzerinde hiçbir değişiklik yapmayın.
3. Commit atmayın, push yapmayın veya build/deploy komutu çalıştırmayın.
4. Durumu derhal raporlayarak işlemi sonlandırın.

---

## 5. Deploy ve Push Uyarısı

> [!WARNING]
> `dynamic-resolver` branch'ine yapılacak doğrudan push/merge işlemleri Vercel üzerinde `coreweb-public` canlı production deployment sürecini tetikleyebilir.
> Bu nedenle, yalnızca açıkça onaylanmış ve test edilmiş fazlarda commit/push yapılmalı; izinsiz hiçbir kod canlıya sürülmemelidir.
