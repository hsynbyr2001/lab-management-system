# Laboratuvar Rapor Yönetim Sistemi

---

## Giriş

Laboratuvar Rapor Yönetim Sistemi, laborantların hastalar için gerekli raporların kaydedilmesi, güncellenmesi ve yönetilmesi için bir platform sunar. Özgür ve açık kaynak kodlu Typescript ve React ile kodlandı. Redux ToolKit ile veritabanı yönetimi sağlandı ve Mantine ile arayüz oluşturuldu.

---

## İçindekiler
- [Giriş](#giriş)
- [Sistem Gereksinimleri](#sistem-gereksinimleri)
- [Projeyi Klonlamak](#projeyi-klonlamak)
- [Derleme ve Çalıştırma](#derleme-ve-çalıştırma)
- [Uygulama Özellikleri](#uygulama-özellikleri)
  - [Oluşturma](#oluşturma) 
  - [Sıralama](#sıralama)
  - [Arama](#arama)
  - [Düzenleme](#düzenleme)
  - [Silme](#silme)

## Sistem Gereksinimleri

**React ile Ayağa Kaldırma**

* Node.js: Node.js v20.18.0 veya üstü kurulu olmalı.

---

## Projeyi Klonlamak

Proje deposunu klonlamak için bu komutu kullanın:
```bash
git clone https://github.com/hsynbyr2001/lab-management-system.git
```

---

## Derleme Ve Çalıştırma

Projenin lokal ortamda derlenmesi ve çalıştırılması için Node.js kullanılmalı. Uygulamaya http://localhost:5173 adresinden erişebilirsiniz.

### `Node.js` ile derleme ve çalıştırma

1. Npm Paket Yönetim Sistemini Yükleyin

```bash
cd lab-management-system
npm install
```

2. Uygulamayı Çalıştırın

```bash
cd lab-management-system
npm run dev
```

---

## Uygulama Özellikleri
#### Oluşturma
Bu sistemde laborantlar hastalar için gerekli raporları, dosya numarası, hasta adı ve soyadı, kimlik numarası, konulan tanı ve açıklaması, rapor tarihi ve fotoğraf eki ve diğer verileri girerek oluşturur. 

#### Sıralama
Oluşturulan raporlar rapor tarihine göre yeniden eskiye veya eskiden yeniye sıralanabilir. 

#### Arama
Hasta ismi soyismi, kimlik numarası veya laborant ismi ve soyismi ile arama yaparak spesifik bir raporu bulabilir.

#### Düzenleme
Oluşturulmuş bir rapor istenildiğinde daha sonra bilgileri değiştirilerek yeni haliyle kaydedilebilir.

#### Silme
Oluşturulmuş bir rapor istenildiğinde daha sonra tamamiyle veritabanından silinebilir.

---