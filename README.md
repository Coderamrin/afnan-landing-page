# আফনান ফ্যাশন - Next.js Landing Page v2

## 📁 সেকশন স্ট্রাকচার

```
components/
├── sections/
│   ├── AnnouncementBar.tsx    ← স্ক্রলিং অ্যানাউন্সমেন্ট বার
│   ├── Header.tsx             ← স্টিকি হেডার
│   ├── HeroSection.tsx        ← ভিডিও + হেডলাইন + CTA
│   ├── ProductImagesSection.tsx ← প্রোডাক্ট ইমেজ অটো-স্লাইডার
│   ├── ReviewsSection.tsx     ← রিভিউ স্ক্রিনশট + টেক্সট রিভিউ
│   ├── OrderSection.tsx       ← অর্ডার ফর্ম (পণ্য/সাইজ/পরিমাণ)
│   └── FooterSection.tsx      ← WhatsApp CTA + Footer + Float button
└── ui/
│   └── ImageCarousel.tsx      ← রিইউজেবল অটো-স্লাইড ক্যারোসেল
└── FacebookPixel.tsx          ← FB Pixel lazy loader
```

## 🚀 শুরু করুন

### ১. ইনস্টল
```bash
npm install
```

### ২. Facebook Pixel সেটআপ
```bash
cp .env.local.example .env.local
# .env.local ফাইল খুলে Pixel ID দিন
```

### ৩. রান
```bash
npm run dev
# http://localhost:3000
```

### ৪. প্রোডাকশন
```bash
npm run build && npm start
```

---

## 🖼️ ছবি যোগ করার নিয়ম

`public/images/` ফোল্ডার তৈরি করে ছবি রাখুন:

```
public/images/
├── product-1.jpg   ← বোরকা ফ্রন্ট
├── product-2.jpg   ← বোরকা সাইড
├── product-3.jpg   ← হিজাব
├── product-4.jpg   ← নিকাব
├── product-5.jpg   ← ফুল সেট
├── review-1.jpg    ← রিভিউ স্ক্রিনশট ১
├── review-2.jpg    ← রিভিউ স্ক্রিনশট ২
├── review-3.jpg    ← রিভিউ স্ক্রিনশট ৩
├── review-4.jpg    ← রিভিউ স্ক্রিনশট ৪
└── review-5.jpg    ← রিভিউ স্ক্রিনশট ৫
```

---

## 🎯 পণ্যের দাম (OrderSection.tsx তে পরিবর্তন করুন)

| পণ্য | দাম |
|------|-----|
| শুধু বোরকা | ১১০০/- |
| হিজাব + নিকাব | ১২০০/- |
| ফুল সেট | ২৪০০/- |

---

## 🎠 অটো-স্লাইড সেটিং

`ImageCarousel` কম্পোনেন্টে `autoPlayInterval` (milliseconds) পরিবর্তন করুন:

```tsx
<ImageCarousel
  images={productImages}
  autoPlayInterval={3500}  // ৩.৫ সেকেন্ড
/>
```

---

## 📊 Facebook Pixel ইভেন্ট

| ইভেন্ট | কখন |
|--------|-----|
| PageView | পেইজ লোড |
| ViewContent | পণ্য বাছাই |
| InitiateCheckout | ফর্ম সাবমিট |
| Purchase | অর্ডার কনফার্ম |

---

## 🌐 Vercel ডেপ্লয়

```bash
npx vercel
# Dashboard এ NEXT_PUBLIC_FB_PIXEL_ID সেট করুন
```
