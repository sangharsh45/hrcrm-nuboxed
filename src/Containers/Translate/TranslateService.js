const API_KEY = 'AIzaSyAQdQZU6zRL9w32DH2_9al-kkXnK38fnJY'; // Replace with your actual API key

const translateText = async (text, targetLanguage) => {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
    }),
  });

  console.log(response)

  const data = await response.json();
  if (data && data.data && data.data.translations && data.data.translations.length > 0) {
    return data.data.translations[0].translatedText;
  } else {
    throw new Error('Translation failed');
  }
};

const getSupportedLanguages = async () => {
  const url = `https://translation.googleapis.com/language/translate/v2/languages?key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  if (data && data.data && data.data.languages && data.data.languages.length > 0) {
    return data.data.languages;
  } else {
    throw new Error('Failed to fetch supported languages');
  }
};

export { translateText, getSupportedLanguages };