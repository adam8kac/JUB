import { Router } from 'express';
import type { Request, Response } from 'express';
import { CVService } from '../services/cv.service.js';

const router = Router();
const cvService = new CVService();

/**
 * @swagger
 * /api/save/{uid}:
 *   post:
 *     summary: Save a new CV
 *     tags: [CV]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CVData'
 *     responses:
 *       201:
 *         description: CV saved
 *       409:
 *         description: CV already exists
 */
router.post('/save/:uid', async (req: Request, res: Response) => {
  try {
    const uid = req.params['uid'] as string;
    await cvService.saveCV(uid, req.body);
    res.status(201).json({ message: 'CV saved' });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to save CV';
    const status = msg.includes('already exists') ? 409 : 500;
    res.status(status).json({ error: msg });
  }
});

/**
 * @swagger
 * /api/cv/{uid}:
 *   patch:
 *     summary: Update CV data
 *     tags: [CV]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CVData'
 *     responses:
 *       200:
 *         description: CV updated
 *       404:
 *         description: CV not found
 */
router.patch('/cv/:uid', async (req: Request, res: Response) => {
  try {
    const uid = req.params['uid'] as string;
    await cvService.updateCV(uid, req.body);
    res.json({ message: 'CV updated' });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to update CV';
    const status = msg.includes('not found') ? 404 : 500;
    res.status(status).json({ error: msg });
  }
});

/**
 * @swagger
 * /api/cv/{uid}:
 *   delete:
 *     summary: Delete a CV
 *     tags: [CV]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: CV deleted
 *       404:
 *         description: CV not found
 */
router.delete('/cv/:uid', async (req: Request, res: Response) => {
  try {
    const uid = req.params['uid'] as string;
    await cvService.deleteCV(uid);
    res.status(204).send();
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to delete CV';
    const status = msg.includes('not found') ? 404 : 500;
    res.status(status).json({ error: msg });
  }
});

/**
 * @swagger
 * /api/cv/{uid}:
 *   get:
 *     summary: Get CV data as JSON
 *     tags: [CV]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CV data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CVData'
 *       404:
 *         description: CV not found
 */
router.get('/cv/:uid', async (req: Request, res: Response) => {
  try {
    const uid = req.params['uid'] as string;
    const data = await cvService.getCVData(uid);
    res.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch CV';
    res.status(404).json({ error: msg });
  }
});

/**
 * @swagger
 * /api/cv/{uid}/pdf:
 *   get:
 *     summary: Download CV as PDF
 *     tags: [CV]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Failed to generate PDF
 */
router.get('/cv/:uid/pdf', async (req: Request, res: Response) => {
  try {
    const uid = req.params['uid'] as string;
    const pdf = await cvService.getGeneratedCV(uid);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=cv.pdf',
    });
    res.send(pdf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate CV' });
  }
});

export default router;
