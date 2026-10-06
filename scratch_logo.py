from PIL import Image
import numpy as np

def make_transparent_and_square(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Define "dark" as RGB all < 30
    r, g, b, a = data.T
    dark_areas = (r < 30) & (g < 30) & (b < 30)
    data[..., :-1][dark_areas.T] = (0, 0, 0)
    data[..., -1][dark_areas.T] = 0
    
    transparent_img = Image.fromarray(data)
    
    # Get bounding box of non-transparent pixels
    bbox = transparent_img.getbbox()
    if bbox:
        transparent_img = transparent_img.crop(bbox)
        
    # Pad to square
    w, h = transparent_img.size
    size = max(w, h)
    new_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    new_img.paste(transparent_img, ((size - w) // 2, (size - h) // 2))
    
    new_img.save(output_path, "PNG")

make_transparent_and_square("c:/Games/work/vambadiye_vanth_vela/ma_ai/src/assets/Ma_footer_logo_200x160.png", "c:/Games/work/vambadiye_vanth_vela/ma_ai/public/logo.png")
