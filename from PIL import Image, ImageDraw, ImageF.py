from PIL import Image, ImageDraw, ImageFont
import io

# Create a transparent image (RGBA) 150x150
size = (150, 150)
image = Image.new("RGBA", size, (255, 255, 255, 0))
draw = ImageDraw.Draw(image)

# Load a clean, modern sans-serif font (use default if specific font is unavailable)
try:
    font = ImageFont.truetype("DejaVuSans-Bold.ttf", 42)
except IOError:
    font = ImageFont.load_default()

# Define the text and calculate positioning
text = "STMC"
text_width, text_height = draw.textsize(text, font=font)
x = (size[0] - text_width) // 2
y = (size[1] - text_height) // 2

# Draw white text with a black outline
outline_range = 1
for dx in range(-outline_range, outline_range + 1):
    for dy in range(-outline_range, outline_range + 1):
        draw.text((x + dx, y + dy), text, font=font, fill="black")
draw.text((x, y), text, font=font, fill="white")

# Save image to a BytesIO object as PNG
output = io.BytesIO()
image.save(output, format="PNG")
output.seek(0)
