# ============================================
# deploy-next-ssr.ps1
# 一键构建并部署 Next.js SSR 项目到 Linux 服务器（使用 nohup 启动）
# ============================================

# === 基本配置 ===
$REMOTE_USER = "root"                     # SSH 用户
$REMOTE_PATH = "/data/blog-app"           # 服务器项目目录
$PRIVATE_KEY = "~/.ssh/id_rsa"            # SSH 私钥
$ZIP_NAME = "next-build.zip"              # 压缩包名称

# === Step 0: 检查 SERVER_LIST ===
if (-not $Global:SERVER_LIST -or $Global:SERVER_LIST.Count -eq 0) {
    Write-Host "❌ 未检测到全局变量 SERVER_LIST` " -ForegroundColor Red
    Write-Host ""
    Write-Host "请先在 PowerShell 全局配置文件中添加，例如：" -ForegroundColor Yellow
    Write-Host 'notepad $PROFILE'
    Write-Host ""
    Write-Host "示例内容：" -ForegroundColor Cyan
    Write-Host '$Global:SERVER_LIST = @('
    Write-Host '    @{ Name = "生产服务器"; IP = "8.8.8.8" },'
    Write-Host '    @{ Name = "测试服务器"; IP = "127.0.0.1" }'
    Write-Host ')' -ForegroundColor Cyan
    exit 1
}

# === Step 1: 选择目标服务器 ===
Write-Host "可部署的服务器列表：" -ForegroundColor Cyan
for ($i = 0; $i -lt $Global:SERVER_LIST.Count; $i++) {
    $server = $Global:SERVER_LIST[$i]
    Write-Host "[$i] $($server.Name) ($($server.IP))"
}

$choice = Read-Host "请输入要部署的编号 (默认 0)"
if ([string]::IsNullOrWhiteSpace($choice)) {
    $choice = 0
}

if ($choice -notmatch '^\d+$' -or [int]$choice -ge $Global:SERVER_LIST.Count) {
    Write-Host "❌ 无效的选择" -ForegroundColor Red
    exit 1
}

$server = $Global:SERVER_LIST[$choice]
$REMOTE_HOST = $server.IP
Write-Host "🚀 即将部署到：$($server.Name) ($REMOTE_HOST)" -ForegroundColor Green

# === Step 2: 构建 Next.js SSR 项目 ===
Write-Host "==> 构建 Next.js 项目..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败" -ForegroundColor Red
    exit 1
}
Write-Host "✅ 构建完成" -ForegroundColor Green

# === Step 3: 打包仅必要文件 (.next + public) ===
Write-Host "==> 打包构建产物..." -ForegroundColor Cyan
if (Test-Path $ZIP_NAME) { Remove-Item $ZIP_NAME -Force }
Compress-Archive -Path ".next", "public" -DestinationPath $ZIP_NAME -Force

# === Step 4: 上传到服务器 ===
Write-Host "==> 上传压缩包到服务器..." -ForegroundColor Cyan
$uploadCmd = "scp -i $PRIVATE_KEY -o StrictHostKeyChecking=no $ZIP_NAME ${REMOTE_USER}@${REMOTE_HOST}:/tmp/"
Invoke-Expression $uploadCmd

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 上传失败" -ForegroundColor Red
    exit 1
}
Write-Host "✅ 上传成功" -ForegroundColor Green

# === Step 5: 远程部署并启动 ===
Write-Host "==> 远程解压并启动..." -ForegroundColor Cyan

$deployCmd = @"
set -e
cd $REMOTE_PATH
echo '🧹 清理旧构建...'
rm -rf .next public || true
unzip -o /tmp/$ZIP_NAME -d $REMOTE_PATH
rm -f /tmp/$ZIP_NAME

echo '🔁 重启 Next.js 服务...'
fuser -k 3000/tcp || true
nohup pnpm run start > app.log 2>&1 &

echo '✅ 部署完成！服务已在后台启动。'
"@

ssh -i $PRIVATE_KEY -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST "$deployCmd"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 部署失败" -ForegroundColor Red
    exit 1
}

# === Step 6: 清理本地临时文件 ===
Remove-Item $ZIP_NAME -Force
Write-Host "🧹 本地清理完成" -ForegroundColor Gray
Write-Host "🎉 部署完成并已在服务器启动 Next SSR 服务" -ForegroundColor Green
