import express from 'express'

const app = express();

app.get('/health', (req, res) => {
    res.status(200).json({
        "status": 'OK',
        "timestamp": new Date().toISOString(),
        "service": 'Workout Tracker API',
    })
})

// Specific Imports (Named Imports)
export { app }

// Default Imports
export default app;