Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('c:\Games\work\vambadiye_vanth_vela\ma_ai\src\assets\logo-image.png')
$bmp_orig = New-Object System.Drawing.Bitmap($img)
$img.Dispose()

# Make white (and near-white if possible, but MakeTransparent is exact) transparent
$bmp_orig.MakeTransparent([System.Drawing.Color]::White)

# Also let's just make sure we crop if necessary, or just pad it
$size = [math]::Max($bmp_orig.Width, $bmp_orig.Height)
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::Transparent)
$x = ($size - $bmp_orig.Width) / 2
$y = ($size - $bmp_orig.Height) / 2
$g.DrawImage($bmp_orig, $x, $y, $bmp_orig.Width, $bmp_orig.Height)

$g.Dispose()
$bmp_orig.Dispose()
$bmp.Save('c:\Games\work\vambadiye_vanth_vela\ma_ai\public\logo.png', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
