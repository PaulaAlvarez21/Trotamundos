import express from 'express';
import cors from 'cors';
import { tripsService } from './modules/trips-reservations/trips.service';
import { ingestionService } from './modules/ingestion/application/ingestion.service';
import { sharingService } from './modules/sharing/sharing.service';
import { assistantService } from './modules/assistant/assistant.service';
import { analyticsService } from './modules/analytics/analytics.service';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'trotamundos-api' });
});

// Auth mock (RF-11)
app.post('/auth/login', (req, res) => {
  const { email } = req.body;
  res.json({ 
    token: 'mock-jwt-token', 
    user: { id: 'user-1', email: email || 'test@test.com', name: 'Usuario Test' } 
  });
});

// Trips (RF-01)
app.get('/trips', (req, res) => {
  const userId = 'user-1'; // Mock user
  const trips = tripsService.getTripsWithReservations(userId);
  res.json(trips);
});

app.get('/trips/:id', (req, res) => {
  const trip = tripsService.getTripById(req.params.id);
  if (!trip) return res.status(404).json({ error: 'Not found' });
  res.json(trip);
});

// Crear reserva manual (RF-02)
app.post('/reservations/manual', (req, res) => {
  const userId = 'user-1';
  const reservation = tripsService.createManualReservation(userId, req.body);
  res.json(reservation);
});

// Ingesta - correos (RF-03, RF-07)
app.post('/ingest/emails', async (req, res) => {
  const userId = 'user-1';
  const created = await ingestionService.processEmails(userId);
  res.json({ processed: created.length, reservations: created });
});

// Ingesta - proveedores (RF-04)
app.post('/ingest/providers', async (req, res) => {
  const results = await ingestionService.pollProviders();
  res.json({ updated: results.length, results });
});

app.get('/ingest/status', (req, res) => {
  res.json({ reservations: ingestionService.getReservations() });
});

// Compartir itinerario (RF-10)
app.post('/share/:tripId', (req, res) => {
  const userId = 'user-1';
  const share = sharingService.createShare(req.params.tripId, userId);
  res.json({ 
    shareUrl: `http://localhost:3000/share/${share.token}`,
    token: share.token,
    expiresAt: share.expiresAt 
  });
});

app.get('/share/public/:token', (req, res) => {
  const trip = sharingService.getSharedTrip(req.params.token);
  if (!trip) return res.status(404).json({ error: 'Share not found or expired' });
  res.json(trip);
});

// Asistente virtual (RF-06, RF-08)
app.post('/assistant/chat', async (req, res) => {
  const userId = 'user-1';
  const { message, sessionId } = req.body;
  const response = await assistantService.processMessage(userId, message, sessionId);
  res.json(response);
});

// Analítica (RF-09)
app.get('/analytics/events', (req, res) => {
  const events = analyticsService.getRecentEvents(20);
  res.json(events);
});

app.get('/analytics/stats', (req, res) => {
  const stats = analyticsService.getStats();
  res.json(stats);
});

// Ciclo de vida - archivar viajes completados (RF-05)
app.post('/trips/check-archive', (req, res) => {
  tripsService.checkAndArchiveCompletedTrips();
  res.json({ message: 'Checked for completed trips' });
});

app.listen(PORT, () => {
  console.log(`🚀 Trotamundos API running on http://localhost:${PORT}`);
  console.log('Simulando: correos, proveedores, agencia, NLU (rule-based)');
});
