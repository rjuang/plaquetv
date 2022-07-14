
from PIL import Image, ImageFont, ImageDraw 
import pandas as pd
import math

commonBeneFont = ImageFont.truetype('NotoSans-Regular.ttf', 90)
commonSmallBeneFont = ImageFont.truetype('NotoSans-Regular.ttf', 60)
commonSponsorFont = ImageFont.truetype('NotoSans-Regular.ttf', 70)
chnBeneFont=ImageFont.truetype('NotoSansSC-Regular.otf', 95)
chnSponsorFont=ImageFont.truetype('NotoSansSC-Regular.otf', 70)
koreanBeneFont=ImageFont.truetype('NotoSansKR-Regular.otf', 105)
koreanSponsorFont=ImageFont.truetype('NotoSansKR-Regular.otf', 80)
idFont = ImageFont.truetype('NotoSans-Regular.ttf', 30)

plaqueSpacing=825


templatePath="mmb.png"
temple="GF"

df=pd.read_json("plaques.json")
df=df[df['plaqueType']=='mmb'][df['plaqueLocation']==temple]



total=len(df)
i=0
page=0
while page<math.ceil(total/4):
  if i<total:
    bText1=df.iloc[i]["beneText"]
    bText1Lang=df.iloc[i]["beneTextLang"]

    if bText1Lang in ['en', 'vi']:
      bText1Font=commonBeneFont
    elif bText1Lang in ['zh']:
      bText1Font=chnBeneFont
    else:
      bText1Font=koreanBeneFont
    
    sText1=df.iloc[i]["sponsorText"]
    sText1Lang=df.iloc[i]["beneTextLang"]

    if sText1Lang in ['en', 'vi']:
      sText1Font=commonBeneFont
    elif sText1Lang in ['zh']:
      sText1Font=chnBeneFont
    else:
      sText1Font=koreanBeneFont
  else:
    bText1=""
    bText1Lang="en"
    bText1Font=commonBeneFont
    sText1=""
    sText1Lang="en"
    sText1Font=commonBeneFont

  i=i+1

  if i<total:
    bText2=df.iloc[i]["beneText"]
    bText2Lang=df.iloc[i]["beneTextLang"]

    if bText2Lang in ['en', 'vi']:
      bText2Font=commonBeneFont
    elif bText2Lang in ['zh']:
      bText2Font=chnBeneFont
    else:
      bText2Font=koreanBeneFont
    
    sText2=df.iloc[i]["sponsorText"]
    sText2Lang=df.iloc[i]["beneTextLang"]

    if sText2Lang in ['en', 'vi']:
      sText2Font=commonBeneFont
    elif sText2Lang in ['zh']:
      sText2Font=chnBeneFont
    else:
      sText2Font=koreanBeneFont
  else:
    bText2=""
    bText2Lang="en"
    bText2Font=commonBeneFont
    sText2=""
    sText2Lang="en"
    sText2Font=commonBeneFont
    
  i+=1


  template = Image.open(templatePath)
  canvas = ImageDraw.Draw(template)

  canvas.text((350, 2385), "GuanYin DA", (0, 0, 0), font=idFont, anchor='mm')
  canvas.text((350+plaqueSpacing, 2385), "GuanYin DA", (0, 0, 0), font=idFont, anchor='mm')
  canvas.text((350+2*plaqueSpacing, 2385), "GuanYin DA", (0, 0, 0), font=idFont, anchor='mm')
  canvas.text((350+3*plaqueSpacing, 2385), "GuanYin DA", (0, 0, 0), font=idFont, anchor='mm')
    
  # bot mid (410, 2060), 
  # top mid 
  # canvas.text((410, 2060), 'X', (0, 0, 0, 255), font=beneTextFont, anchor='mm')

  if bText2Lang in ['ko', 'zh']:
    bText2='\n'.join(bText2)

    beneTextCursor=1550-bText2Font.getsize_multiline(bText2)[1]/2
    canvas.multiline_text((390, beneTextCursor), bText2, (0, 0, 0), font=bText2Font, anchor='ml')


  if sText2Lang in ['ko', 'zh']:
    sText2='\n'.join(sText2)
    canvas.multiline_text((195, 1550), sText2, (0, 0, 0), font=sText2Font, anchor='mm')

  text_layer = Image.new("RGBA", (2550, 3300), (255, 255, 255, 0))
  textCanvas = ImageDraw.Draw(text_layer)

  # bot mid (340, 2090), (1160, 2100),(1975, 2100)
  # top mid (340, 980)
  # textCanvas.text((1550, 1370), 'X', (0, 0, 0, 255), font=beneTextFont, anchor='mm')

  if bText1Lang in ['en', 'vi']:
    beneTextCursor=1535-bText1Font.getsize(bText1)[0]/2
    textCanvas.text((beneTextCursor, 340), bText1, (0, 0, 0, 255), font=bText1Font, anchor='lm')
    textCanvas.text((beneTextCursor, 1160), bText1, (0, 0, 0, 255), font=bText1Font, anchor='lm')
    textCanvas.text((beneTextCursor, 1975), bText1, (0, 0, 0, 255), font=bText1Font, anchor='lm')


  if len(sText1)<=12:
    sponsortextCursor=1550
  elif len(sText1)<=18:
    sponsortextCursor=1350
  elif len(sText1)<=23:
    sponsortextCursor=1150
  else:
    sponsortextCursor=950

  if sText1Lang=='en':
    textCanvas.text((sponsortextCursor, 555), sText1, (0, 0, 0, 255), font=sText1Font, anchor='mm')
    textCanvas.text((sponsortextCursor, 555+plaqueSpacing), sText1, (0, 0, 0, 255), font=sText1Font, anchor='mm')
    textCanvas.text((sponsortextCursor, 555+plaqueSpacing*2), sText1, (0, 0, 0, 255), font=sText1Font, anchor='mm')

  rotated_text_layer = text_layer.rotate(270.0, expand=1)

  out = Image.alpha_composite(template, rotated_text_layer)
  # out.save("out.png")

  pdfImage=out.convert('L')
  pdfImage.save("{}_{}.pdf".format(temple, page))
  
  page+=1