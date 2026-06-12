import base64

from bs4 import BeautifulSoup


def clean_text(text: str) -> str:
    if not text:
        return ''

    return ' '.join(text.split()).strip()


def decode_body(data: str) -> str:
    decoded = base64.urlsafe_b64decode(data.encode('utf-8'))
    return decoded.decode('utf-8', errors='ignore')


def extract_body(payload: dict) -> str:
    if not payload:
        return ''

    if 'parts' in payload:
        for part in payload['parts']:
            mime_type = part.get('mimeType', '')
            body_data = part.get('body', {}).get('data')
            if not body_data:
                continue

            decoded = decode_body(body_data)
            if mime_type == 'text/plain':
                return clean_text(decoded)

            if mime_type == 'text/html':
                soup = BeautifulSoup(decoded, 'html.parser')
                return clean_text(soup.get_text(separator=' '))

    body_data = payload.get('body', {}).get('data')
    if body_data:
        return clean_text(decode_body(body_data))

    return ''


def parse_message(message: dict) -> dict:
    payload = message.get('payload', {})
    headers = payload.get('headers', [])
    parsed = {
        'id': message.get('id'),
        'threadId': message.get('threadId'),
        'subject': '',
        'from': '',
        'to': '',
        'body': extract_body(payload)
    }

    for header in headers:
        name = header.get('name', '').lower()
        value = header.get('value', '')
        if name == 'subject':
            parsed['subject'] = value
        elif name == 'from':
            parsed['from'] = value
        elif name == 'to':
            parsed['to'] = value

    return parsed


def fetch_recent_messages(service, max_results: int = 10, query: str = '') -> list:
    response = service.users().messages().list(
        userId='me',
        q=query,
        maxResults=max_results
    ).execute()

    messages = response.get('messages', [])
    results = []

    for message_meta in messages:
        message = service.users().messages().get(
            userId='me',
            id=message_meta['id'],
            format='full'
        ).execute()
        results.append(parse_message(message))

    return results
