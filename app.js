const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const letras = parseInt(req.query.letras);

    if (!letras || isNaN(letras)) {
        return res.status(400).json({ error: "Parâmetro 'letras' inválido ou ausente." });
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
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados da Invertexto.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});