
from PIL import Image, ImageFont, ImageDraw 
import pandas as pd

commonBeneFont = ImageFont.truetype('NotoSans-Regular.ttf', 90)
commonSmallBeneFont=ImageFont.truetype('NotoSans-Regular.ttf', 75)
commonXSmallBeneFont=ImageFont.truetype('NotoSans-Regular.ttf', 60)
commonXXSmallBeneFont=ImageFont.truetype('NotoSans-Regular.ttf', 50)
commonSponsorFont = ImageFont.truetype('NotoSans-Regular.ttf', 70)
chnBeneFont=ImageFont.truetype('NotoSansSC-Regular.otf', 95)
chnSponsorFont=ImageFont.truetype('NotoSansSC-Regular.otf', 70)
koreanBeneFont=ImageFont.truetype('NotoSansKR-Regular.otf', 105)
koreanSponsorFont=ImageFont.truetype('NotoSansKR-Regular.otf', 80)
idFont = ImageFont.truetype('NotoSans-Regular.ttf', 30)

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

df=pd.read_csv("publicTest.csv")

def genPlaque(id, beneText,beneTextLang, 
              sponsorText, sponsorTextLang,
              plaqueType):
  fileName=str.format("PlaqueID_{0:03}", id)

  if beneTextLang in ['en', 'vi']:
    beneTextFont=getCommonFont(beneText)
    
  elif beneTextLang in ['zh']:
    beneTextFont=chnBeneFont
  else:
    beneTextFont=koreanBeneFont

  if sponsorTextLang in ['en', 'vi']:
    sponsorTextFont=commonSponsorFont
  elif sponsorTextLang in ['zh']:
    sponsorTextFont=chnSponsorFont
  else:
    sponsorTextFont=koreanSponsorFont

  if plaqueType=="mmb":
    templatePath="mmb_blank.png"
  elif plaqueType=="rebirth":
    templatePath="rebirth_blank.png"
    
  template = Image.open(templatePath)
  canvas = ImageDraw.Draw(template)

  canvas.text((350, 2375), fileName, (0, 0, 0), font=idFont, anchor='mm')

  if beneTextLang in ['ko', 'zh']:
    beneText=processChineseAndKoreanText(beneText)
    # beneTextCursor=1550-beneTextFont.getsize_multiline(beneText)[1]/2
    canvas.multiline_text((430, 1550), beneText, (0, 0, 0), font=beneTextFont, anchor='mm')

  if sponsorTextLang in ['ko', 'zh']:
    sponsorText=processChineseAndKoreanText(sponsorText)
    canvas.multiline_text((225, 1650), sponsorText, (0, 0, 0), font=sponsorTextFont, anchor='mm')

  text_layer = Image.new("RGBA", (2550, 834), (255, 255, 255, 0))
  textCanvas = ImageDraw.Draw(text_layer)

  if beneTextLang in ['en', 'vi']:
    # beneTextCursor=1550-beneTextFont.getsize(beneText)[0]/2
    textCanvas.text((1550, 400), beneText, (0, 0, 0, 255), font=beneTextFont, anchor='mm')

  # if len(sponsorText)<=12:
  #   sponsortextCursor=1550
  # elif len(sponsorText)<=18:
  #   sponsortextCursor=1350
  # elif len(sponsorText)<=23:
  #   sponsortextCursor=1150
  # else:
  #   sponsortextCursor=950
  
  # if sponsorTextLang=='en':
  #   textCanvas.text((sponsortextCursor, 565), sponsorText, (0, 0, 0, 255), font=sponsorTextFont, anchor='mm')
  # elif sponsorTextLang=='vi':
  #   textCanvas.text((sponsortextCursor, 550), sponsorText, (0, 0, 0, 255), font=sponsorTextFont, anchor='mm')
  if sponsorTextLang in ['en', 'vi']:
    textCanvas.text((1650, 605), sponsorText, (0, 0, 0, 255), font=sponsorTextFont, anchor='mm')

  rotated_text_layer = text_layer.rotate(270.0, expand=1)

  out = Image.alpha_composite(template, rotated_text_layer)
  preview=out.reduce(7)


  outFile=fileName+".png"
  previewFile=fileName+"-preview.png"
  out.save("plaques/"+outFile)
  preview.save("plaques/"+previewFile)
  return {
        "id": outFile.split('.')[0],
        "file": "https://plaquetv.blob.core.windows.net/plaques/"+outFile,
        "previewFile": "https://plaquetv.blob.core.windows.net/plaques/"+previewFile, 
        "benefiary": beneText,
        "requester": sponsorText,
        "requestDate": "",
        "expiryDate": "",
        "type": plaqueType,
        "searchable": True    
  }

plaques=[]
for index, row in df.iterrows():
  sponsorText=row["sponsorText"]
  if pd.isna(sponsorText):
    sponsorText=""

  p=genPlaque(index,
        row["beneText"], 
        row["beneTextLang"], 
        sponsorText, 
        row["sponsorTextLang"],
        row["plaqueType"])
  plaques.append(p)

io=open("plaques.json", "w")
import json
json.dump(plaques,io)
io.close()