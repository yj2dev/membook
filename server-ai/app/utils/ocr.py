import pytesseract

def run():
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'
    return pytesseract.image_to_string('result.jpg',lang='kor+eng', config='-c preserve_interword_spaces=1 --psm 4')
