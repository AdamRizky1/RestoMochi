#!/usr/bin/env sh

# Hentikan script jika ada error
set -e

# Buat folder build 'dist' terbaru
npm run build

# Masuk ke folder hasil build
cd dist

# Bypass proses Jekyll di GitHub Pages
touch .nojekyll

git init
git add -A
git commit -m 'Deploy RestoMochi website'

# Mengirimkan folder dist ke branch gh-pages di GitHub kamu
git push -f https://github.com/AdamRizky1/RestoMochi.git main:gh-pages

cd -
