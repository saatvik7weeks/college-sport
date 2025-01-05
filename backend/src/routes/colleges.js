const router = require('express').Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /colleges:
 *   get:
 *     summary: Get all colleges with optional filters
 *     tags: [Colleges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: City ID to filter colleges
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: State ID to filter colleges
 *     responses:
 *       200:
 *         description: List of colleges
 *       401:
 *         description: Unauthorized
 *
 * /college_data/{id}:
 *   get:
 *     summary: Get college placement data
 *     tags: [Colleges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: College ID
 *     responses:
 *       200:
 *         description: College placement data
 *       401:
 *         description: Unauthorized
 *
 * /college_courses/{id}:
 *   get:
 *     summary: Get college courses
 *     tags: [Colleges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: College ID
 *     responses:
 *       200:
 *         description: List of college courses
 *       401:
 *         description: Unauthorized
 */

// Get all colleges with optional city/state filters
router.get('/colleges', auth, async (req, res) => {
  try {
    const { city, state } = req.query;
    let query = `
      SELECT c.*, ct.name as city_name, s.name as state_name 
      FROM colleges c
      LEFT JOIN cities ct ON c.city_id = ct.id
      LEFT JOIN states s ON c.state_id = s.id
      WHERE 1=1
    `;
    const params = [];

    if (city) {
      query += ' AND ct.id = ?';
      params.push(city);
    }
    if (state) {
      query += ' AND s.id = ?';
      params.push(state);
    }

    query += ' ORDER BY c.score DESC';

    const [colleges] = await db.query(query, params);
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get college placement data
router.get('/college_data/:id', auth, async (req, res) => {
  try {
    // Get average section data
    const [avgSection] = await db.query(`
      SELECT 
        year,
        AVG(highest_placement) as highest_placement,
        AVG(average_placement) as average_placement,
        AVG(median_placement) as median_placement,
        AVG(placement_rate) as placement_rate
      FROM college_placement
      WHERE college_id = ? AND 
        highest_placement IS NOT NULL AND highest_placement != 0 AND
        average_placement IS NOT NULL AND average_placement != 0 AND
        median_placement IS NOT NULL AND median_placement != 0 AND
        placement_rate IS NOT NULL AND placement_rate != 0
      GROUP BY year
      ORDER BY year DESC
    `, [req.params.id]);

    // Get placement section data with trend
    const [placementSection] = await db.query(`
      SELECT 
        cp1.*,
        CASE 
          WHEN cp1.placement_rate > COALESCE(cp2.placement_rate, 0) THEN 'UP'
          ELSE 'DOWN'
        END as placement_trend
      FROM college_placement cp1
      LEFT JOIN college_placement cp2 
        ON cp1.college_id = cp2.college_id 
        AND cp2.year = cp1.year - 1
      WHERE cp1.college_id = ? AND
        cp1.placement_rate IS NOT NULL AND cp1.placement_rate != 0
      ORDER BY cp1.year DESC
    `, [req.params.id]);

    res.json({
      avg_section: avgSection,
      placement_section: placementSection
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get college courses
router.get('/college_courses/:id', auth, async (req, res) => {
  try {
    const [courses] = await db.query(
      'SELECT * FROM college_wise_course WHERE college_id = ? ORDER BY course_fee DESC',
      [req.params.id]
    );
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 