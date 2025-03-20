import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool(process.env.DATABASE_URL);

async function addSchool(req, res) {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
    }

    const trimmedName = name.trim();
    const trimmedAddress = address.trim();

    const checkQuery = `SELECT id FROM schools WHERE name = ?`;
    const [existingSchool] = await pool.execute(checkQuery, [trimmedName]);

    if (existingSchool.length > 0) {
        return res.status(409).json({ error: 'School with this name already exists' }); 
    }

    const insertQuery = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
    const values = [trimmedName, trimmedAddress, latitude, longitude];

    const [result] = await pool.execute(insertQuery, values);

    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });

} 

catch (err) {
    console.error('Database error:', err.message); 
    res.status(500).json({ error: 'Internal Server Error' });
}

}

async function listSchool(req, res) {
  try {
    let { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Latitude and longitude must be valid numbers" });
    }

    const query = "SELECT id, name, address, latitude, longitude FROM schools";
    const [schools] = await pool.execute(query);

        const toRadians = (deg) => deg * (Math.PI / 180);
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; 
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const sortedSchools = schools
        .map((school) => ({
            ...school,
            distance: parseFloat(calculateDistance(latitude, longitude, school.latitude, school.longitude).toFixed(2)),
        }))
        .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
} 

catch (err) {
    console.error("Error fetching schools:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
}

}

export { addSchool, listSchool };
