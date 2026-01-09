---
applyTo: "**/*.rs"
description: Rust coding standards and conventions.
---

# Rust Instructions

<!-- Source: Adapted from github/awesome-copilot -->

## Code Style

### Naming Conventions
- Use `snake_case` for variables, functions, and modules
- Use `PascalCase` for types, traits, and enums
- Use `SCREAMING_SNAKE_CASE` for constants
- Use descriptive names that convey intent
- Avoid single-letter names except in short closures

### Formatting
- Use `rustfmt` for consistent formatting
- Maximum line length: 100 characters
- Let `rustfmt` handle indentation and line wrapping
- Group imports by: std, external crates, local modules
- One statement per line

### Code Organization
- Keep modules focused and cohesive
- Use `mod.rs` or single-file modules appropriately
- Organize by feature, not by type
- Keep public API surface minimal
- Use workspace for multi-crate projects

## Rust Best Practices

### Ownership and Borrowing
- Prefer borrowing over cloning when possible
- Use references (`&T`) for read-only access
- Use mutable references (`&mut T`) sparingly
- Avoid unnecessary `clone()` calls
- Understand lifetime annotations

### Error Handling
- Use `Result<T, E>` for fallible operations
- Use `Option<T>` for optional values
- Implement custom error types with `thiserror`
- Use `?` operator for error propagation
- Avoid `unwrap()` in production code; prefer `expect()` with messages

### Type Safety
- Leverage the type system for correctness
- Use newtypes for domain-specific types
- Implement traits for common operations
- Use enums for state machines
- Prefer compile-time guarantees over runtime checks

### Performance
- Use iterators instead of loops when possible
- Understand zero-cost abstractions
- Profile before optimizing
- Use `Vec` with capacity hints
- Consider `&str` vs `String` carefully

## Memory Management

### Smart Pointers
- Use `Box<T>` for heap allocation
- Use `Rc<T>` for shared ownership (single-threaded)
- Use `Arc<T>` for shared ownership (multi-threaded)
- Use `RefCell<T>` for interior mutability
- Understand `Cow<T>` for copy-on-write

### Lifetimes
- Understand lifetime elision rules
- Use explicit lifetimes when needed
- Avoid lifetime complexity when possible
- Use `'static` sparingly
- Document complex lifetime relationships

## Concurrency

### Thread Safety
- Use `Send` and `Sync` traits correctly
- Use `Mutex<T>` or `RwLock<T>` for shared state
- Prefer message passing with channels
- Use `async/await` for I/O-bound tasks
- Avoid deadlocks with proper lock ordering

### Async Rust
- Use `async fn` for asynchronous functions
- Use `.await` for async operations
- Choose appropriate runtime (tokio, async-std)
- Understand `Pin` and `Unpin`
- Handle cancellation properly

## Testing

### Unit Tests
- Write tests in same file with `#[cfg(test)]`
- Use descriptive test names
- Test edge cases and error paths
- Use `assert!`, `assert_eq!`, `assert_ne!`
- Mock dependencies with traits

### Integration Tests
- Place in `tests/` directory
- Test public API only
- Use test fixtures appropriately
- Keep tests independent
- Run with `cargo test`

### Property Testing
- Use `proptest` or `quickcheck`
- Test invariants and properties
- Generate random test cases
- Find edge cases automatically

## Documentation

### Doc Comments
- Use `///` for item documentation
- Use `//!` for module documentation
- Provide examples in doc comments
- Run doc tests with `cargo test`
- Use markdown formatting

### Examples
```rust
/// Calculates the sum of two numbers.
///
/// # Examples
///
/// ```
/// let result = add(2, 3);
/// assert_eq!(result, 5);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

## Security

### Safe Rust
- Minimize use of `unsafe` code
- Document safety invariants for `unsafe`
- Use `#![forbid(unsafe_code)]` when possible
- Validate all `unsafe` blocks carefully
- Prefer safe alternatives

### Input Validation
- Validate all external input
- Use strong types for validation
- Implement proper error handling
- Sanitize before use
- Use serde for deserialization with validation

## Project Structure

```
project/
├── src/
│   ├── main.rs or lib.rs
│   ├── models/
│   ├── services/
│   └── utils/
├── tests/
├── benches/
├── examples/
├── Cargo.toml
└── README.md
```

## Code Examples

### Error Handling
```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),
    
    #[error("Not found: {0}")]
    NotFound(String),
    
    #[error("Validation error: {0}")]
    Validation(String),
}

pub type Result<T> = std::result::Result<T, AppError>;

pub fn find_user(id: i64) -> Result<User> {
    let user = database::get_user(id)?;
    user.ok_or_else(|| AppError::NotFound(format!("User {}", id)))
}
```

### Async Pattern
```rust
use tokio;

#[tokio::main]
async fn main() -> Result<()> {
    let tasks = vec![
        fetch_data("url1"),
        fetch_data("url2"),
        fetch_data("url3"),
    ];
    
    let results = futures::future::join_all(tasks).await;
    
    for result in results {
        match result {
            Ok(data) => println!("Got: {}", data),
            Err(e) => eprintln!("Error: {}", e),
        }
    }
    
    Ok(())
}

async fn fetch_data(url: &str) -> Result<String> {
    let response = reqwest::get(url).await?;
    let body = response.text().await?;
    Ok(body)
}
```

### Builder Pattern
```rust
#[derive(Default)]
pub struct Config {
    host: String,
    port: u16,
    timeout: u64,
}

pub struct ConfigBuilder {
    config: Config,
}

impl ConfigBuilder {
    pub fn new() -> Self {
        Self {
            config: Config::default(),
        }
    }
    
    pub fn host(mut self, host: impl Into<String>) -> Self {
        self.config.host = host.into();
        self
    }
    
    pub fn port(mut self, port: u16) -> Self {
        self.config.port = port;
        self
    }
    
    pub fn build(self) -> Config {
        self.config
    }
}
```

## Linting

- Run `clippy` regularly: `cargo clippy`
- Fix all warnings before committing
- Use `#[allow]` sparingly and document why
- Enable additional lints in `Cargo.toml`
- Use `cargo fmt` before committing
