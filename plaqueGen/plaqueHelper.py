from PIL import Image, ImageFont, ImageDraw 

commonBeneFont = ImageFont.truetype('NotoSans-Regular.ttf', 90)
commonSmallBeneFont=ImageFont.truetype('NotoSans-Regular.ttf', 75)
commonXSmallBeneFont=ImageFont.truetype('NotoSans-Regular.ttf', 60)
commonXXSmallBeneFont=ImageFont.truetype('NotoSans-Regular.ttf', 50)

def getCommonFont(text):
    textFont=commonBeneFont
    if textFont.getsize(text)[0]>1100:
        textFont=commonSmallBeneFont

    if textFont.getsize(text)[0]>1100:
        textFont=commonXSmallBeneFont

    if textFont.getsize(text)[0]>1100:
        textFont=commonXXSmallBeneFont

    return textFont

def processChineseAndKoreanText(text):
    text=text.replace("(", " ").replace(")", "")
    text='\n'.join(text)
    return text