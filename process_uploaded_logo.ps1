Add-Type -AssemblyName System.Drawing

$input_path = 'c:\Users\ADMIN\.gemini\antigravity-ide\brain\4e6f5db5-32cd-443c-bc27-74bfea24cbe1\.user_uploaded\media_1791296311013.png'
$output_path = 'c:\Games\work\vambadiye_vanth_vela\ma_ai\public\logo.png'

$img = [System.Drawing.Image]::FromFile($input_path)
$bmp = New-Object System.Drawing.Bitmap($img)
$img.Dispose()

$w = $bmp.Width
$h = $bmp.Height

# Get background color from top-left corner
$bg = $bmp.GetPixel(0, 0)

$min_x = $w
$max_x = 0
$min_y = $h
$max_y = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $bmp.GetPixel($x, $y)
        
        # Calculate distance to background color
        $dist = [math]::Sqrt([math]::Pow($c.R - $bg.R, 2) + [math]::Pow($c.G - $bg.G, 2) + [math]::Pow($c.B - $bg.B, 2))
        
        $alpha = 255
        if ($dist -lt 15) {
            $alpha = 0
        } elseif ($dist -lt 50) {
            # Smooth transition for anti-aliasing
            $alpha = [math]::Floor((($dist - 15) / 35.0) * 255.0)
        }
        
        if ($alpha -lt 255) {
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        }
        
        if ($alpha -gt 10) {
            if ($x -lt $min_x) { $min_x = $x }
            if ($x -gt $max_x) { $max_x = $x }
            if ($y -lt $min_y) { $min_y = $y }
            if ($y -gt $max_y) { $max_y = $y }
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
    
    # Draw tightly cropped logo into center of square
    $destRect = New-Object System.Drawing.Rectangle((($size - $crop_w) / 2), (($size - $crop_h) / 2), $crop_w, $crop_h)
    $srcRect = New-Object System.Drawing.Rectangle($min_x, $min_y, $crop_w, $crop_h)
    
    $g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    $out_bmp.Save($output_path, [System.Drawing.Imaging.ImageFormat]::Png)
    $out_bmp.Dispose()
}

$bmp.Dispose()
