
from PIL import Image, ImageFont, ImageDraw 
import pandas as pd

commonBeneFont = ImageFont.truetype('NotoSans-Regular.ttf', 90)
commonSmallBeneFont = ImageFont.truetype('NotoSans-Regular.ttf', 60)
commonSponsorFont = ImageFont.truetype('NotoSans-Regular.ttf', 70)
tradChnBeneFont=ImageFont.truetype('NotoSansTC-Regular.otf', 95)
tradChnSponsorFont=ImageFont.truetype('NotoSansTC-Regular.otf', 70)
simpChnBeneFont=ImageFont.truetype('NotoSansSC-Regular.otf', 95)
simpChnSponsorFont=ImageFont.truetype('NotoSansSC-Regular.otf', 70)
koreanBeneFont=ImageFont.truetype('NotoSansKR-Regular.otf', 105)
koreanSponsorFont=ImageFont.truetype('NotoSansKR-Regular.otf', 80)

df=pd.read_csv("20220528 - ChanQi DA Plaques - LOG.csv")
df=df[df[['Sponsor', 'Plaque #1', 'Beneficiary #1']].isna().any(axis=1)==False]
df['Plaque#1 ID']=df.index*2+1
df['Plaque#2 ID']=df.index*2+2

index=74
row=df.iloc[index]
    
beneText=row["Beneficiary #1"]
beneText=u'袁明記外公'
beneText=u'袁明'
beneTextLang='zh'
beneTextFont=simpChnBeneFont
# beneTextFont=englishBeneFont
sponsorText=row["Sponsor"]
sponsorTextLang='vi'
sponsorTextFont=commonBeneFont

if beneTextLang in ['zh', 'zh-Hant', 'ko']:
  beneText='\n'.join(beneText)

if sponsorTextLang in ['zh', 'zh-Hant', 'ko']:
  sponsorText='\n'.join(sponsorText)

templatePath="mmb_blank.png"

template = Image.open(templatePath)
canvas = ImageDraw.Draw(template)

print(beneTextFont.getsize_multiline(beneText))
p=1550-beneTextFont.getsize_multiline(beneText)[1]/2
canvas.multiline_text((380, p), beneText, (0, 0, 0), font=beneTextFont, anchor='ml')

# canvas.multiline_text((185, 1550), sponsorText, (0, 0, 0), font=sponsorTextFont, anchor='mm')


text_layer = Image.new("RGBA", (2550, 834), (255, 255, 255, 0))
textCanvas = ImageDraw.Draw(text_layer)

print(beneTextFont.getsize(beneText))
p=1550-beneTextFont.getsize(beneText)[0]/2
# textCanvas.text((p, 350), beneText, (0, 0, 0, 255), font=beneTextFont, anchor='lm')

if len(sponsorText)<=12:
  q=1550
elif len(sponsorText)<=18:
  q=1350
elif len(sponsorText)<=23:
  q=1150
else:
  q=950

# textCanvas.text((q, 565), sponsorText, (0, 0, 0, 255), font=sponsorTextFont, anchor='mm')

rotated_text_layer = text_layer.rotate(270.0, expand=1)

out = Image.alpha_composite(template, rotated_text_layer)
out.save("out.png")