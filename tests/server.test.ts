import request from 'supertest'
import { app } from '../src/server.ts'
import { describe, test, expect, it } from 'vitest'

describe("Health Check", () => {
    it('should return OK status', async () => {
        const response = await request(app).get("/health").expect(200)

        expect(response.body.service).toBe('Habit Tracker API')
    })

})