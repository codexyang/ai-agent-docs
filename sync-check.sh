#!/bin/bash

echo ""
echo "======================================"
echo " Pegasustour VIP Sync Check v1.12"
echo "======================================"

echo ""
echo "=== ChatGPT Skill ==="

if [ -f ~/Desktop/"AI 助理"/ChatGPT-skill.md ]; then
  grep -E "v1.12|穩定|Chatbase|Pegasus booking" \
  ~/Desktop/"AI 助理"/ChatGPT-skill.md
else
  echo "ChatGPT-skill.md not found"
fi

echo ""
echo "=== Project Path ==="

cd ~/pegasus-booking || {
  echo "Project folder not found"
  exit
}

pwd

echo ""
echo "=== Git Status ==="
git status --short

echo ""
echo "=== Key Files ==="

for file in \
app/page.tsx \
app/layout.tsx \
app/booking/page.tsx \
app/payment/page.tsx \
app/member/page.tsx \
app/admin/page.tsx \
app/driver/page.tsx \
app/dispatch/page.tsx
do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ Missing: $file"
  fi
done

echo ""
echo "=== localhost Status ==="

PORT_3000=$(lsof -i :3000 | grep LISTEN)

if [ -n "$PORT_3000" ]; then
  echo "✅ localhost:3000 running"
else
  echo "❌ localhost:3000 not running"
fi

echo ""
echo "=== Current Stable Version ==="
echo "Pegasus booking 1.0"
echo "Stable Version: v1.12"

echo ""
echo "=== Sync Summary ==="
echo "Read-only sync check completed."
echo "No file modified."
