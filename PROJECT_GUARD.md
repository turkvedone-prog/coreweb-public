# 🛡️ CoreWeb Kurumsal Webs - PROJECT GUARD & GELİŞTİRME STANDARTLARI

Bu dosya, `coreweb-kurumsal-webs` monoreposunda geliştirme yapan yapay zeka (AI) ajanları ve geliştiriciler için zorunlu çalışma standartlarını ve kilitleri içerir.

> [!IMPORTANT]
> **GitHub Repo Adı Geçişi:**
> Bu repo geçmişte `coreweb-public` adıyla kullanılmıştır. GitHub üzerinde repo adı `coreweb-kurumsal-webs` olarak güncellenmiştir. Yerel klasör adı şimdilik `/coreweb-public` olabilir. Eski ad bazı Vercel project, local remote, git yönlendirmeleri, deployment log veya dokümanlarda görünebilir. Yeni standart dokümantasyon ve aktif proje adlandırmasında `coreweb-kurumsal-webs` kullanılacaktır.

---

## 1. Dallar (Branch) ve Dağıtım Standartları

* **`main` Dalı:** Üretim (production) ve stabil sürüm dalıdır. `main` dalına merge edilmeden ve doğrulanmadan hiçbir geliştirme production standardı olarak kabul edilemez.
* **`feature/monorepo-migration` Dalı:** Aktif monorepo geçişi, temizlik ve standardizasyon dalıdır. Geliştirmeler ve hata çözümleri bu dalda toplanır.
* **Vercel Takibi:** Vercel üzerindeki projelerin hangi branch'i izlediği her işlem öncesinde mutlaka kontrol edilmeli ve doğrulanmalıdır.

---

## 2. Monorepo Klasör Standardı ve Müşteri Uygulamaları

Monorepo içerisindeki dizin yerleşimi ve sorumluluk alanları şu şekildedir:

* **`apps/coreweb`:** CoreWeb ana kurumsal tanıtım ve lead yönetim web sitesi.
* **`apps/burobig`:** Burobig müşteri web sitesi uygulaması.
* **`apps/capilon`:** Capilon müşteri web sitesi uygulaması.
* **`apps/viola`:** Viola müşteri web sitesi taslak/şablon uygulaması.
* **`apps/burckaplama`:** Burç Kaplama müşteri web sitesi uygulaması.
* **`apps/{yeni-musteri}`:** Gelecekte eklenecek yeni müşteri web sitesi uygulamaları.
* **`packages/`:** Projeler arası paylaşılan ortak modüller ve kodlar (SEO, veri katmanı vb.).
* **`src/themes/`:** Eski monolit tasarımları barındıran geçiş alanıdır. **Bu klasör altında kesinlikle yeni müşteri geliştirmesi başlatılmayacaktır.**

### İdeal Müşteri Uygulama Klasör Yapısı
Her müşteri uygulaması (`apps/{musteri-slug}`) aşamalı olarak şu standart yapıya kavuşturulmalıdır:
* `src/App.jsx` - Giriş ve rota tanımları
* `src/routes/` - Uygulama rotaları
* `src/pages/` - Sayfa bileşenleri
* `src/components/` - Arayüz bileşenleri
* `src/theme/` - CSS değişkenleri ve tasarım sistemi
* `src/tenant.config.js` - Kiracı kimlik ve temel ayarları
* `src/site.config.js` - Site genel metadata ve içerik ayarları
* `src/contentAdapter.js` - Veri dönüşüm adaptörü

---

## 3. Vercel ve Firebase Veri Sözleşmesi Standartları

### Vercel Dağıtım Standardı
* Her ciddi müşteri sitesi Vercel üzerinde **bağımsız ayrı bir proje** olarak barındırılır ve yayınlanır.
* Her Vercel projesi monorepodaki ilgili `apps/{slug}` dizinini derleyecek şekilde yapılandırılır.
* **Dynamic Resolver Rolü:** Dinamik yönlendirici (`coreweb-public` projesi) üretim ortamının ana modeli değildir. Sadece önizleme (preview), demo veya standart şablon amaçlı bir destek katmanı olarak barındırılır.
* Vercel proje adları, root directory tanımları ve build komutları değiştirilmeden önce **kullanıcının yazılı onayı** zorunludur.

### Firebase Veri Sözleşmesi Standardı
* **İçerik Güncellemeleri:** Yönetim panelinden doğrudan Firestore veritabanına yazılır. Canlı sitelerde veri okuma/cache stratejisine göre deploy gerektirmeden yansır ve Vercel derlemesi (deploy) gerektirmez.
* **Kod ve Tasarım Güncellemeleri:** GitHub push ve Vercel deployment süreçlerini gerektirir.
* **Yayın Filtrelemesi:** Public müşteri siteleri yalnızca `publishStatus == "published"` olan içerikleri okumalıdır.
* **Tenant İzolasyonu:** Kiracı verileri Firestore üzerinde `tenantId`, `siteMappings` ve/veya `/tenants/{tenantId}` veri yolları kullanılarak izole edilir. Fiili veri modeli Faz 6 kapsamında kesinleştirilecektir.

---

## 4. Git Çalışma Standartları ve Yasaklar

### İsimlendirme Kuralları
* **Branch İsimleri:**
  * `feature/burobig-product-detail`
  * `fix/capilon-header`
  * `chore/coreweb-cleanup`
  * `docs/project-guard`
  * `archive/static-coreweb-site`
* **Commit Mesajları:**
  * `feat(burobig): add product detail layout`
  * `fix(capilon): resolve header mobile overflow`
  * `chore(coreweb): update workspace ignores`
  * `refactor(shared): centralize seo helpers`
  * `docs(guard): add monorepo working rules`

### Kesin Yasaklar ve Kısıtlamalar
1. 🚫 **`git add .` Kullanımı Yasaktır:** Değişiklikler hedeflenen dosyalar belirtilerek parça parça eklenmelidir.
2. 🚫 **Commit Karıştırma Yasağı:** Aynı commit içerisinde birden fazla müşterinin işi veya panel ile site monoreposuna ait işler birleştirilemez.
3. 🚫 **Arşiv/Backup Yasağı:** Arşivlenmiş eski branch'ler ve pasif dizinler üzerinde geliştirme yapılamaz. Backup zip dosyaları, eski proje kopyaları ve Finder'daki geçici arşiv klasörleri kaynak kabul edilemez.
4. 🚫 **Gereksiz Dosya Commit Yasağı:** `.vercel/`, `scratch/`, log/hata dosyaları (`eslint_errors.txt`), geçici test scriptleri ve zip yedekleri kesinlikle commit edilmemelidir.
5. 🚫 **Onaysız İşlemler:** Kullanıcının yazılı onayı olmadan hiçbir proje silinemez, klasör taşınamaz, remote URL değiştirilemez, Firebase rules deploy edilemez veya Vercel ayarı değiştirilemez.

---

## 5. Antigravity Ajan Çalışma Standartları

Bu monorepo üzerinde pair programming yapan Antigravity kod asistanları ve geliştiriciler şu yerel çalışma alanlarına uymak zorundadır:

* **Aktif Site Monorepo Çalışma Alanı:** `/Users/turkved/.gemini/antigravity/scratch/coreweb-public`
* **Aktif Panel Çalışma Alanı:** `/Users/turkved/.gemini/antigravity/scratch/CoreWeb WEB PORTAL`
* **Arşiv/Pasif Alan:** `/Users/turkved/.gemini/antigravity/scratch/CoreWeb_Web Site`

> [!IMPORTANT]
> Her yeni görev başlangıcında terminalde `pwd`, `git remote -v`, `git branch --show-current` ve `git status --short` komutları çalıştırılarak durum doğrulanmalı ve raporlanmalıdır.
