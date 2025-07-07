export default async function handler(request, response) {
  const API_URL = 'https://www.course-api.com/react-tours-project';

  try {
    const apiResponse = await fetch(API_URL);

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return response.status(apiResponse.status).send(errorText);
    }

    const data = await apiResponse.json();

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    response.status(200).json(data);
  } catch (error) {
    console.error('Erro na função serverless:', error);
    response.status(500).json({ error: 'Falha ao buscar tours da API externa através do proxy.' });
  }
}
