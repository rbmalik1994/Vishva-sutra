---
applyTo: "**/*"
description: Cross-cutting security guidelines for all languages in this repo.
---

# Security Instructions

<!-- Source: Adapted from github/awesome-copilot -->

## General Security Principles

- Follow principle of least privilege
- Validate all input from untrusted sources
- Never trust client-side validation alone
- Keep security patches up to date
- Use security linters and scanners
- Conduct regular security audits
- Follow OWASP Top 10 guidelines

## Authentication & Authorization

- Use strong password hashing (bcrypt, Argon2)
- Implement multi-factor authentication
- Use secure session management
- Implement proper token expiration
- Validate authorization on every request
- Use role-based access control (RBAC)
- Never expose authentication credentials

## Data Protection

- Encrypt sensitive data at rest
- Use TLS/SSL for data in transit
- Never log sensitive information
- Implement proper data sanitization
- Use parameterized queries to prevent SQL injection
- Avoid exposing internal system details in errors
- Implement proper CORS policies

## Secret Management

- Never commit secrets to version control
- Use environment variables for configuration
- Use secret management services (Vault, AWS Secrets Manager)
- Rotate secrets regularly
- Encrypt secrets at rest
- Use different secrets for different environments
- Implement secret scanning in CI/CD

## Input Validation

- Validate all user input
- Sanitize data before use
- Use allowlists over denylists
- Validate data types and formats
- Check input length and size
- Escape output to prevent XSS
- Validate file uploads thoroughly

## Dependencies

- Keep dependencies up to date
- Use dependency scanning tools
- Review security advisories
- Remove unused dependencies
- Pin dependency versions
- Use verified and trusted packages
- Audit third-party code

## API Security

- Use API authentication (API keys, OAuth)
- Implement rate limiting
- Validate and sanitize all inputs
- Use HTTPS only
- Implement proper error handling
- Log security events
- Use API versioning

## Common Vulnerabilities

### SQL Injection
- Use parameterized queries
- Use ORM safely
- Validate input types
- Escape special characters

### Cross-Site Scripting (XSS)
- Escape output in templates
- Use Content Security Policy
- Validate and sanitize input
- Use framework security features

### Cross-Site Request Forgery (CSRF)
- Use CSRF tokens
- Validate request origin
- Use SameSite cookie attribute
- Require re-authentication for sensitive actions

### Insecure Deserialization
- Validate serialized data
- Use safe serialization formats
- Implement integrity checks
- Avoid deserializing untrusted data

## Logging & Monitoring

- Log security events
- Monitor for suspicious activity
- Implement alerting for security incidents
- Never log sensitive data
- Use centralized logging
- Implement audit trails
- Review logs regularly
