export {}

declare global {
  interface CustomJwtSessionClaims {
    firstName?: string
    primaryEmail?: string
    metadata: {
      onboardingComplete?: boolean
    }
  }
}