---
applyTo: "**/*"
description: Cross-cutting performance guidelines for all languages in this repo.
---

# Performance Instructions

<!-- Source: Adapted from github/awesome-copilot -->

## General Performance Principles

- Profile before optimizing
- Focus on bottlenecks
- Measure performance improvements
- Consider trade-offs (speed vs. memory)
- Optimize for common case
- Use appropriate data structures
- Avoid premature optimization

## Database Performance

- Use indexes for frequently queried columns
- Avoid N+1 query problems
- Use query pagination for large datasets
- Implement connection pooling
- Use database-specific optimizations
- Cache query results when appropriate
- Use bulk operations for multiple records
- Monitor slow queries
- Use database query analyzers

## Caching Strategies

- Implement multi-level caching
- Cache expensive computations
- Use appropriate cache invalidation
- Set proper TTL values
- Cache at right granularity
- Use cache-aside pattern
- Monitor cache hit rates
- Consider distributed caching for scale

## API Performance

- Implement response compression
- Use pagination for large responses
- Implement request batching
- Use efficient serialization formats
- Cache API responses
- Implement rate limiting
- Use CDN for static assets
- Minimize payload size

## Frontend Performance

- Minimize bundle size
- Implement code splitting
- Lazy load components and routes
- Optimize images and assets
- Use browser caching
- Minimize re-renders
- Debounce/throttle expensive operations
- Use virtual scrolling for large lists

## Backend Performance

- Use asynchronous operations for I/O
- Implement background job processing
- Use connection pooling
- Optimize algorithm complexity
- Profile CPU and memory usage
- Use efficient data structures
- Minimize blocking operations
- Implement proper error handling

## Memory Management

- Avoid memory leaks
- Clean up resources properly
- Use streaming for large data
- Implement proper garbage collection
- Monitor memory usage
- Use object pooling when appropriate
- Avoid creating unnecessary objects
- Profile memory allocations

## Network Performance

- Minimize number of requests
- Use HTTP/2 or HTTP/3
- Implement request multiplexing
- Compress data in transit
- Use efficient protocols
- Implement retry logic with backoff
- Use connection keep-alive
- Monitor network latency

## Monitoring & Metrics

- Track response times
- Monitor resource utilization
- Set up performance budgets
- Use Application Performance Monitoring (APM)
- Track error rates
- Monitor database performance
- Set up alerts for degradation
- Conduct regular performance testing
- Use real user monitoring (RUM)

## Load Testing

- Test under realistic load
- Identify breaking points
- Test different scenarios
- Use appropriate load testing tools
- Monitor system during tests
- Test scalability limits
- Simulate concurrent users
- Test with production-like data
