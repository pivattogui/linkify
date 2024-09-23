import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

interface ShortenRequest {
    url: string;
}

// Rota para encurtar uma URL
app.post('/shorten', async (req: Request, res: Response) => {
    const { url }: ShortenRequest = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    // get the first 8 characters of the hash
    const shortId = uuidv4().substring(0, 8);

    try {
        const newUrl = await prisma.url.create({
            data: {
                shortId,
                originalUrl: url,
            },
        });
        res.json({
            originalUrl: url,
            shortUrl: `${req.headers.host}/${newUrl.shortId}`
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating short URL' });
    }
});

// Rota para redirecionar a URL curta
app.get('/:shortId', async (req: Request, res: Response) => {
    const { shortId } = req.params;

    try {
        const urlEntry = await prisma.url.findUnique({
            where: { shortId },
        });

        if (!urlEntry) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.redirect(urlEntry.originalUrl);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving URL' });
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
