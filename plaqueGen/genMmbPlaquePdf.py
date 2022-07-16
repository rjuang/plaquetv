
from PIL import Image, ImageFont, ImageDraw 
import pandas as pd
import math
from plaqueHelper import getCommonFont, processChineseAndKoreanText

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
# temple="WMT"

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
      bText1Font=getCommonFont(bText1)
      
    elif bText1Lang in ['zh']:
      bText1Font=chnBeneFont
    else:
      bText1Font=koreanBeneFont
    
    sText1=df.iloc[i]["sponsorText"]
    sText1Lang=df.iloc[i]["sponsorTextLang"]

    if sText1Lang in ['en', 'vi']:
      sText1Font=commonSponsorFont
    elif sText1Lang in ['zh']:
      sText1Font=chnSponsorFont
    else:
      sText1Font=koreanSponsorFont
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
      bText2Font=getCommonFont(bText2)
    elif bText2Lang in ['zh']:
      bText2Font=chnBeneFont
    else:
      bText2Font=koreanBeneFont
    
    sText2=df.iloc[i]["sponsorText"]
    sText2Lang=df.iloc[i]["sponsorTextLang"]

    if sText2Lang in ['en', 'vi']:
      sText2Font=commonSponsorFont
    elif sText2Lang in ['zh']:
      sText2Font=chnSponsorFont
    else:
      sText2Font=koreanSponsorFont
  else:
    bText2=""
    bText2Lang="en"
    bText2Font=commonBeneFont
    sText2=""
    sText2Lang="en"
    sText2Font=commonBeneFont
    
  i+=1

  if i<total:
    bText3=df.iloc[i]["beneText"]
    bText3Lang=df.iloc[i]["beneTextLang"]

    if bText3Lang in ['en', 'vi']:
      bText3Font=getCommonFont(bText3)
    elif bText3Lang in ['zh']:
      bText3Font=chnBeneFont
    else:
      bText3Font=koreanBeneFont
    
    sText3=df.iloc[i]["sponsorText"]
    sText3Lang=df.iloc[i]["sponsorTextLang"]

    if sText3Lang in ['en', 'vi']:
      sText3Font=commonSponsorFont
    elif sText3Lang in ['zh']:
      sText3Font=chnSponsorFont
    else:
      sText3Font=koreanSponsorFont
  else:
    bText3=""
    bText3Lang="en"
    bText3Font=commonBeneFont
    sText3=""
    sText3Lang="en"
    sText3Font=commonBeneFont
    
  i+=1

  if i<total:
    bText4=df.iloc[i]["beneText"]
    bText4Lang=df.iloc[i]["beneTextLang"]

    if bText4Lang in ['en', 'vi']:
      bText4Font=getCommonFont(bText4)
    elif bText4Lang in ['zh']:
      bText4Font=chnBeneFont
    else:
      bText4Font=koreanBeneFont
    
    sText4=df.iloc[i]["sponsorText"]
    sText4Lang=df.iloc[i]["sponsorTextLang"]

    if sText4Lang in ['en', 'vi']:
      sText4Font=commonSponsorFont
    elif sText4Lang in ['zh']:
      sText4Font=chnSponsorFont
    else:
      sText4Font=koreanSponsorFont
  else:
    bText4=""
    bText4Lang="en"
    bText4Font=commonBeneFont
    sText4=""
    sText4Lang="en"
    sText4Font=commonBeneFont
    
  i+=1

  template = Image.open(templatePath)
  canvas = ImageDraw.Draw(template)

  canvas.text((345, 2390), "GuanYin DA", (0, 0, 0), font=idFont, anchor='mm')
  canvas.text((1165, 2390), "GuanYin DA", (0, 0, 0), font=idFont, anchor='mm')
  canvas.text((1990, 2390), "GuanYin DA", (0, 0, 0), font=idFont, anchor='mm')
  canvas.text((2805, 2380), "GuanYin DA", (0, 0, 0), font=idFont, anchor='mm')
    
  # bot mid (390, 2060),(1215, 2060)(2035, 2060),(2850, 2055) 
  # top mid (390, 960)(1215, 960)(2035, 960), (2850, 950)
  # canvas.text((410, 2060), 'X', (0, 0, 0, 255), font=beneTextFont, anchor='mm')
  

  if bText1Lang in ['ko', 'zh']:
    bText1=processChineseAndKoreanText(bText1)

    beneTextCursor=1510-bText1Font.getsize_multiline(bText1)[1]/2
    canvas.multiline_text((390, beneTextCursor), bText1, (0, 0, 0), font=bText1Font, anchor='ml')


  if sText1Lang in ['ko', 'zh']:
    sText1=processChineseAndKoreanText(sText1)
    canvas.multiline_text((195, 1550), sText1, (0, 0, 0), font=sText1Font, anchor='mm')


  if bText2Lang in ['ko', 'zh']:
    bText2=processChineseAndKoreanText(bText2)

    beneTextCursor=1510-bText2Font.getsize_multiline(bText2)[1]/2
    canvas.multiline_text((1215, beneTextCursor), bText2, (0, 0, 0), font=bText2Font, anchor='ml')


  if sText2Lang in ['ko', 'zh']:
    sText2=processChineseAndKoreanText(sText2)
    canvas.multiline_text((1020, 1550), sText2, (0, 0, 0), font=sText2Font, anchor='mm')

  if bText3Lang in ['ko', 'zh']:
    bText3=processChineseAndKoreanText(bText3)

    beneTextCursor=1510-bText3Font.getsize_multiline(bText3)[1]/2
    canvas.multiline_text((2035, beneTextCursor), bText3, (0, 0, 0), font=bText3Font, anchor='ml')


  if sText3Lang in ['ko', 'zh']:
    sText3=processChineseAndKoreanText(sText3)
    canvas.multiline_text((1845, 1550), sText3, (0, 0, 0), font=sText3Font, anchor='mm')


  if bText4Lang in ['ko', 'zh']:
    bText4=processChineseAndKoreanText(bText4)

    beneTextCursor=1503-bText4Font.getsize_multiline(bText4)[1]/2
    canvas.multiline_text((2850, beneTextCursor), bText4, (0, 0, 0), font=bText4Font, anchor='ml')


  if sText4Lang in ['ko', 'zh']:
    sText4=processChineseAndKoreanText(sText4)
    canvas.multiline_text((2655, 1550), sText4, (0, 0, 0), font=sText4Font, anchor='mm')

  text_layer = Image.new("RGBA", (2550, 3300), (255, 255, 255, 0))
  textCanvas = ImageDraw.Draw(text_layer)

  # bot mid (340, 2090), (1160, 2100),(1975, 2100)
  # top mid (340, 980)
  # textCanvas.text((980, 1370), 'X', (0, 0, 0, 255), font=commonBeneFont, anchor='mm')

  if bText1Lang in ['en', 'vi']:
    beneTextCursor=1535-bText1Font.getsize(bText1)[0]/2
    textCanvas.text((beneTextCursor, 2795), bText1, (0, 0, 0, 255), font=bText1Font, anchor='lm')

  if sText1Lang in ['en', 'vi']:
    sponsorTextCursor=1750-sText1Font.getsize(sText1)[0]/2
    textCanvas.text((sponsorTextCursor, 3020), sText1, (0, 0, 0, 255), font=sText1Font)

  if bText2Lang in ['en', 'vi']:
    beneTextX=1535-bText2Font.getsize(bText2)[0]/2
    beneTextY=2030-bText2Font.getsize(bText2)[1]/2
    textCanvas.text((beneTextX, beneTextY), bText2, (0, 0, 0, 255), font=bText2Font, anchor='lm')

  if sText2Lang in ['en', 'vi']:
    sponsorTextCursor=1750-sText2Font.getsize(sText2)[0]/2
    textCanvas.text((sponsorTextCursor, 2195), sText2, (0, 0, 0, 255), font=sText2Font)

  if bText3Lang in ['en', 'vi']:
    beneTextX=1535-bText3Font.getsize(bText3)[0]/2
    beneTextY=1210-bText3Font.getsize(bText3)[1]/2
    textCanvas.text((beneTextX, beneTextY), bText3, (0, 0, 0, 255), font=bText3Font, anchor='ll')

  if sText3Lang in ['en', 'vi']:
    sponsorTextCursor=1750-sText3Font.getsize(sText3)[0]/2
    textCanvas.text((sponsorTextCursor, 1370), sText3, (0, 0, 0, 255), font=sText3Font)

  if bText4Lang in ['en', 'vi']:
    beneTextCursor=1535-bText4Font.getsize(bText4)[0]/2
    textCanvas.text((beneTextCursor, 340), bText4, (0, 0, 0, 255), font=bText4Font, anchor='lm')

  if sText4Lang in ['en', 'vi']:
    sponsorTextCursor=1750-sText4Font.getsize(sText4)[0]/2
    textCanvas.text((sponsorTextCursor, 565), sText4, (0, 0, 0, 255), font=sText4Font)


  rotated_text_layer = text_layer.rotate(270.0, expand=1)

  out = Image.alpha_composite(template, rotated_text_layer)

  pdfImage=out.convert('L')
  pdfImage.save("{}_{}.pdf".format(temple, page))
  
  page+=1