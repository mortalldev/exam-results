# Exam Calculator App

Ushbu loyiha React + TypeScript + Vite yordamida yaratilgan, imtihon va talaba ballarini hisoblaydigan interaktiv dasturdir. UI uchun [shadcn/ui](https://ui.shadcn.com/), styling uchun [TailwindCSS](https://tailwindcss.com/) va tweaks uchun [tweakcn](https://tweakcn.com/) ishlatilgan.  

App tezkor, modular va kengaytiriladigan arxitekturaga ega.

---

## Texnologiyalar

- **React 18 + TypeScript** – asosiy frontend framework va type safety
- **Vite** – tezkor bundler va dev server
- **TailwindCSS** – utility-first CSS
- **shadcn/ui** – tayyor komponentlar va UI library
- **tweakcn** – component styling tweaks
- **ESLint & Prettier** – code linting va formatting

---

## Folder Structure
├─ node_modules/          # NPM paketlari
├─ public/                # Static fayllar (favicon, index.html)
├─ src/                   # Asosiy kod
│  ├─ components/         # UI komponentlar
│  │  ├─ ui/              # Shadcn yoki tweakcn komponentlari
│  │  ├─ AddColumnDialog.tsx   # Imtihon jadvaliga ustun qo‘shish dialogi
│  │  ├─ ExamTable.tsx         # Talabalar jadvali komponenti
│  │  ├─ ThemeProvider.tsx     # Theme kontekst provider
│  │  └─ ThemeToggle.tsx       # Dark/Light mode toggle
│  ├─ hooks/              # Custom hooks
│  │  ├─ useExamCalculation.ts # Talaba ballarini hisoblash hook
│  │  ├─ useExamReducer.ts     # Exam state reducer hook
│  │  └─ useExcelExport.ts     # Excel export hook
│  ├─ lib/                # Library / helper kodlar
│  │  └─ utils.ts         # Utility funksiyalar (math, formatting)
│  ├─ types/              # TypeScript tiplari
│  │  └─ index.ts         # Student, Column, va boshqa tiplar
│  ├─ App.tsx             # Root komponent
│  ├─ index.css           # Tailwind va global CSS
│  └─ main.tsx            # React entry point
