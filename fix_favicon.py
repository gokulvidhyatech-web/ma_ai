import sys
sys.path.insert(0, r'C:\Games\work\vambadiye_vanth_vela\ma_ai\.tmp-logo')
import png

def fix_logo(input_path, output_path):
    w, h, px = png.decode(input_path)
    out = bytearray(px)
    
    # 1. Remove white background if any
    for i in range(w * h):
        o = i * 4
        r, g, b, a = out[o:o+4]
        if a > 0 and r > 240 and g > 240 and b > 240:
            out[o+3] = 0 # Make near-white transparent
            
    # 2. Find bounding box of non-transparent
    min_x, max_x = w, 0
    min_y, max_y = h, 0
    for y in range(h):
        for x in range(w):
            o = (y * w + x) * 4
            a = out[o+3]
            if a > 20: # Not fully transparent
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    if min_x > max_x: # Empty image?
        return
        
    crop_w = max_x - min_x + 1
    crop_h = max_y - min_y + 1
    
    # 3. Create square
    size = max(crop_w, crop_h)
    # Add a little padding to the square so it doesn't touch the edges completely? 
    # Actually, they said "dont resize the logo it should look as it is", meaning no squish.
    # We will just pad to square.
    
    square_px = bytearray(size * size * 4)
    off_x = (size - crop_w) // 2
    off_y = (size - crop_h) // 2
    
    for y in range(crop_h):
        for x in range(crop_w):
            src_o = ((min_y + y) * w + (min_x + x)) * 4
            dst_o = ((off_y + y) * size + (off_x + x)) * 4
            square_px[dst_o:dst_o+4] = out[src_o:src_o+4]
            
    png.encode(output_path, size, size, square_px)
    print(f"Saved {size}x{size} square logo to {output_path}")

fix_logo(r'C:\Games\work\vambadiye_vanth_vela\ma_ai\src\assets\logo-image.png', r'C:\Games\work\vambadiye_vanth_vela\ma_ai\public\logo.png')
