import dotenv from 'dotenv';
import { createApp, setupStaticOrVite } from './app.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app = createApp();

await setupStaticOrVite(app);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Ono Pocket] Foundation Server running on http://0.0.0.0:${PORT}`);
});
