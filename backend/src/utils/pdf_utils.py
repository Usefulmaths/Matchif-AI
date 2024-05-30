from pathlib import Path
import fitz


def extract_text_from_pdf(file_path: Path) -> str:
    document = fitz.open(file_path)
    text = ""
    for page in document:
        text += page.get_text()
    return text
