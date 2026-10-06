Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile('c:\Games\work\vambadiye_vanth_vela\ma_ai\src\assets\Ma_footer_logo_200x160.png')
$bmp = New-Object System.Drawing.Bitmap($img)
$img.Dispose()

$w = $bmp.Width
$h = $bmp.Height

$min_x = $w
$max_x = 0
$min_y = $h
$max_y = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -gt 0) {
            $mx = [math]::Max($c.R, [math]::Max($c.G, $c.B))
            $mn = [math]::Min($c.R, [math]::Min($c.G, $c.B))
            $sat = 0
            if ($mx -gt 0) {
                $sat = ($mx - $mn) / $mx
            }
            
            # If saturation < 0.2, it's the neutral text
            if ($sat -lt 0.20) {
                $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
            } else {
                # It's the colorful mark
                if ($x -lt $min_x) { $min_x = $x }
                if ($x -gt $max_x) { $max_x = $x }
                if ($y -lt $min_y) { $min_y = $y }
                if ($y -gt $max_y) { $max_y = $y }
            }
        }
    }
}

if ($min_x -le $max_x -and $min_y -le $max_y) {
    $crop_w = $max_x - $min_x + 1
    $crop_h = $max_y - $min_y + 1
    
    $size = [math]::Max($crop_w, $crop_h)
    
    $out_bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($out_bmp)
    $g.Clear([System.Drawing.Color]::Transparent)
    
    $destRect = New-Object System.Drawing.Rectangle((($size - $crop_w) / 2), (($size - $crop_h) / 2), $crop_w, $crop_h)
    $srcRect = New-Object System.Drawing.Rectangle($min_x, $min_y, $crop_w, $crop_h)
    
    $g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    $out_bmp.Save('c:\Games\work\vambadiye_vanth_vela\ma_ai\public\logo.png', [System.Drawing.Imaging.ImageFormat]::Png)
    $out_bmp.Dispose()
}

$bmp.Dispose()
