import re
from collections import Counter

STOP_WORDS = {
    '的', '了', '在', '是', '與', '和', '與', '或', '及', '有', '我', '你', '他',
    '她', '它', '這', '那', '也', '就', '於', '及', '而', '但', '為', '要', '能',
    '可以', '請', '您好', '謝謝', '感謝', '您'
}

SENTENCE_SPLIT_PATTERN = re.compile(r'(?<=[。！？!?])\s*')


def split_sentences(text: str) -> list[str]:
    text = text.strip()
    if not text:
        return []

    sentences = [sentence.strip() for sentence in SENTENCE_SPLIT_PATTERN.split(text) if sentence.strip()]
    if not sentences:
        sentences = [text]
    return sentences


def normalize_words(text: str) -> list[str]:
    words = re.findall(r'\w+', text.lower())
    return [word for word in words if word not in STOP_WORDS]


def summarize_text(text: str, max_sentences: int = 3) -> str:
    sentences = split_sentences(text)
    if len(sentences) <= max_sentences:
        return text

    words = normalize_words(text)
    if not words:
        return ' '.join(sentences[:max_sentences])

    frequencies = Counter(words)
    sentence_scores = {}

    for sentence in sentences:
        sentence_words = normalize_words(sentence)
        if not sentence_words:
            continue
        score = sum(frequencies[word] for word in sentence_words)
        sentence_scores[sentence] = score / len(sentence_words)

    ranked = sorted(sentence_scores, key=sentence_scores.get, reverse=True)
    chosen = ranked[:max_sentences]
    return ' '.join(chosen)


def summarize_email(subject: str, body: str) -> str:
    summary = summarize_text(body, max_sentences=3)
    if not summary:
        summary = '無法擷取摘要，請查看原始郵件內容。'

    return f'主旨：{subject}\n摘要：{summary}'
