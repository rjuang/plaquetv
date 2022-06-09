from PIL import Image, ImageFont, ImageDraw 

template = Image.open("rebirth_blank.png")

# font = ImageFont.truetype('Roboto-Black.ttf', 80)
font=ImageFont.truetype('NotoSansTC-Regular.otf', 80)
requesterFont = ImageFont.truetype('Roboto-Black.ttf', 60)
idFont = ImageFont.truetype('Roboto-Black.ttf', 30)
# font=ImageFont.load_default()

benefaciaryText = "Mianyu Dong"
# benefaciaryText = u"董 綿 豫"
requesterText="Ray Xu"
plaqueId="ChanQi"

canvas = ImageDraw.Draw(template)
canvas.text((417, 2400), plaqueId, (0, 0, 0), font=idFont, anchor='mm')
# canvas.text((417,1450), benefaciaryText, (0, 0, 0), font=font, direction='ttb', anchor='mm')
# out.text((230, 1750), requesterText, (0, 0, 0), font=requesterFont, direction='ttb', anchor='mm')

# def drawEnglishText(canvas, benefaciaryText, font, requesterText, requesterFont):
text_layer = Image.new("RGBA", (2550, 834), (255, 255, 255, 0))
textCanvas = ImageDraw.Draw(text_layer)
textCanvas.text((1450, 417), benefaciaryText, (0, 0, 0, 255), font=font, anchor='mm')
textCanvas.text((1750, 600), requesterText, (0, 0, 0, 255), font=requesterFont, anchor='mm')

rotated_text_layer = text_layer.rotate(270.0, expand=1)
out = Image.alpha_composite(template, rotated_text_layer)


# drawEnglishText(template, benefaciaryText, font, requesterText ,requesterFont)


out.save("out.png")
out.save("../public/rebirth_2205005.png")