## 🚀 Cara Deploy

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "Update: Full Simulation - character, NPC, building, road, audio, dialog"
git branch -M main
git remote add origin https://github.com/username/3d-delta-henna.git
git push -u origin main
```

### 2. Deploy ke Vercel
```bash
vercel login
vercel --prod
```

### 3. Update berikutnya
Ulangi commit dan jalankan `vercel --prod`.
