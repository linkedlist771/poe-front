from PIL import Image
import os

# Load the uploaded image
image_path = 'claude-ai-icon.png'
image = Image.open(image_path)

# Define sizes for the icons
sizes = {
    "apple-touch-icon.png": (180, 180),
    "favicon.ico": [(16, 16), (32, 32), (48, 48)],  # ico can have multiple sizes
    "favicon-16x16.png": (16, 16),
    "favicon-32x32.png": (32, 32)
}

# Create a directory to save the icons
output_dir = 'icons'
os.makedirs(output_dir, exist_ok=True)

# Save apple-touch-icon.png
image_resized = image.resize(sizes["apple-touch-icon.png"], Image.LANCZOS)
image_resized.save(os.path.join(output_dir, "apple-touch-icon.png"))

# Save favicon.ico
image_resized_16 = image.resize(sizes["favicon.ico"][0], Image.LANCZOS)
image_resized_32 = image.resize(sizes["favicon.ico"][1], Image.LANCZOS)
image_resized_48 = image.resize(sizes["favicon.ico"][2], Image.LANCZOS)
image_resized_16.save(os.path.join(output_dir, "favicon-16x16.png"))
image_resized_32.save(os.path.join(output_dir, "favicon-32x32.png"))
image_resized_48.save(os.path.join(output_dir, "favicon-48x48.png"))

# Save all sizes to favicon.ico
favicon_path = os.path.join(output_dir, "favicon.ico")
image_resized_16.save(favicon_path, format='ICO', sizes=sizes["favicon.ico"])

# Return the paths to the saved icons
output_files = os.listdir(output_dir)
output_files_paths = [os.path.join(output_dir, file) for file in output_files]
