import { describe, it, expect } from 'vitest'
import { signInSchema, userRegisterSchema, operatorRegisterSchema } from '@/lib/zod'

describe('signInSchema', () => {
    it('should validate a correct email and password', () => {
        const result = signInSchema.safeParse({
            email: 'test@example.com',
            password: 'password123',
        })
        expect(result.success).toBe(true)
    })

    it('should reject an invalid email', () => {
        const result = signInSchema.safeParse({
            email: 'invalid-email',
            password: 'password123',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Invalid email')
        }
    })

    it('should reject a password shorter than 8 characters', () => {
        const result = signInSchema.safeParse({
            email: 'test@example.com',
            password: 'short',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Password must be more than 8 characters')
        }
    })

    it('should reject a password longer than 32 characters', () => {
        const result = signInSchema.safeParse({
            email: 'test@example.com',
            password: 'a'.repeat(33),
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Password must be less than 32 characters')
        }
    })
})

describe('userRegisterSchema', () => {
    it('should validate a complete user registration', () => {
        const result = userRegisterSchema.safeParse({
            email: 'mario.rossi@example.com',
            password: 'Password123!',
            name: 'Mario',
            surname: 'Rossi',
        })
        expect(result.success).toBe(true)
    })

    it('should reject a name that is too short', () => {
        const result = userRegisterSchema.safeParse({
            email: 'test@example.com',
            password: 'password123',
            name: 'A',
            surname: 'Rossi',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Name is too short')
        }
    })

    it('should reject a surname that is too short', () => {
        const result = userRegisterSchema.safeParse({
            email: 'test@example.com',
            password: 'password123',
            name: 'Mario',
            surname: 'A',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Surname is too short')
        }
    })
})

describe('operatorRegisterSchema', () => {
    it('should validate a complete operator registration', () => {
        const result = operatorRegisterSchema.safeParse({
            email: 'operatore@smartwaste.it',
            password: 'Password123!',
            name: 'Operatore SmartWaste',
        })
        expect(result.success).toBe(true)
    })

    it('should not require surname for operators', () => {
        const result = operatorRegisterSchema.safeParse({
            email: 'operatore@smartwaste.it',
            password: 'Password123!',
            name: 'Operatore',
        })
        expect(result.success).toBe(true)
    })
})
