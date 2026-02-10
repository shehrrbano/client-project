@echo off
set "PATH=C:\Program Files\Git\cmd;%PATH%"
git status
git add .
git commit -m "chore: push latest changes to github"
git push origin main
echo === FINAL PUSH DONE ===
