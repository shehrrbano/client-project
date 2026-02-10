@echo off
set "PATH=C:\Program Files\Git\cmd;%PATH%"
git add server/package.json server/package-lock.json server/config/db.js server/seed.js client/src/pages/Home.jsx
git commit -m "fix(backend): add restartable in-memory mongo fallback"
git push origin main
echo === PUSH DONE ===
