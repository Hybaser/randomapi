import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import randomRoutes from './routes/randomRoutes';
import swaggerSpec from './config/swagger';

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', randomRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default app;