from setuptools import setup, find_packages

setup(
    name='gmail_ai_assistant',
    version='1.0.0',
    packages=find_packages(),
    install_requires=[
        'google-auth',
        'google-auth-oauthlib',
        'google-auth-httplib2',
        'google-api-python-client',
        'beautifulsoup4',
        'openpyxl',
        'reportlab',
        'requests',
        'Flask',
        'schedule'
    ],
    entry_points={
        'console_scripts': [
            'gmail-ai=gmail_ai:main'
        ]
    },
    author='Big Brother',
    description='Gmail AI Assistant',
    python_requires='>=3.10'
)
