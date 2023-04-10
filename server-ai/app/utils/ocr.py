import pytesseract
from PIL import Image

def ocr(args):
    print('args >> ', args)
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'
    return pytesseract.image_to_string('result.jpeg',lang='kor+eng', config='-c preserve_interword_spaces=1 --psm 4')
    # res = pytesseract.image_to_string(Image.open("c:/result.jpeg"), lang="kor+eng", config="-c preserve_interword_spaces=1 --psm 4")
    #
    # return 0

