const axios = require('axios');

exports.handler = async (event) => {
    const letras = parseInt(event.queryStringParameters.letras);

    if (!letras || isNaN(letras)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Parâmetro 'letras' inválido ou ausente." })
        };
    }

    try {
        const response = await axios.post(
            'https://www.invertexto.com/ajax/words.php',
            new URLSearchParams({
                type: '',
                num_words: '1',
                num_letters: letras.toString(),
                starts_with: '',
                ends_with: ''
            }),
            {
                headers: {
                    'Origin': 'https://www.invertexto.com',
                    'Referer': 'https://www.invertexto.com/gerador-palavras-aleatorias',
                    'User-Agent': 'Mozilla/5.0',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro ao buscar dados da Invertexto." })
        };
    }
};
