# Conditional Switch 🚦

[![npm version](https://badge.fury.io/js/condition-switch.svg)](https://badge.fury.io/js/condition-switch)

A flexible and powerful TypeScript utility for conditional rendering and logic, inspired by functional programming patterns. `condSwitch` allows you to write clean, declarative, and expressive conditional logic, especially in scenarios where traditional `if/else` or `switch` statements can be verbose or cumbersome.

## Table of Contents

- [🚀 Features](#-features)
- [📦 Installation](#-installation)
- [💡 Usage](#-usage)
- [🤖 API](#-api)
- [✨ Use Cases](#-use-cases)
- [🏆 Best Practices](#-best-practices)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

## 🚀 Features

- **Declarative Style**: Write more readable and maintainable code.
- **Lazy Evaluation**: Conditions and values can be functions, delaying their execution until needed, which can be a performance boost.
- **Type-Safe**: Written in TypeScript to ensure type safety.
- **Flexible**: Supports both object and array-based condition-value pairs.
- **Default Value**: Provides a fallback default value.

## 📦 Installation

```bash
npm install condition-switch
# or
yarn add condition-switch
# or
pnpm add condition-switch
```

## 💡 Usage

### Basic Usage

`condSwitch` takes an array of condition-value pairs and a default value. It returns the value of the first condition that evaluates to `true`.

#### 1. Array of Objects (`{ condition, value }`)

```ts
import condSwitch from 'condition-switch'

const result = condSwitch(
  [
    { condition: false, value: 'Not this one' },
    { condition: true, value: 'This is it!' }
  ],
  'Default value'
)

console.log(result) // "This is it!"
```

#### 2. Array of Tuples (`[condition, value]`)

```ts
import condSwitch from 'condition-switch'

const result = condSwitch(
  [
    [false, 'Not this one'],
    [true, 'This is it!']
  ],
  'Default value'
)

console.log(result) // "This is it!"
```

### ⚡️ Lazy Evaluation with Functions

For performance-critical sections, you can use functions for conditions and values. This ensures that they are only executed when necessary.

```ts
import condSwitch from 'condition-switch'

const expensiveCalculation = () => {
  console.log('Performing expensive calculation...')
  return 42
}

const result = condSwitch(
  [
    [() => false, 'Not this one'],
    [() => true, expensiveCalculation]
  ],
  'Default value'
)

console.log(result)
// "Performing expensive calculation..."
// 42
```

## 🤖 API

### `condSwitch<T, DefaultT>(conditionWithValues, defaultValue)`

- **`conditionWithValues` (`ConditionWithValue<T>[]`):** An array of condition-value pairs.
  - `ConditionWithValue<T>` can be:
    - `{ condition: unknown, value: T | (() => T) }`
    - `[unknown, T | (() => T)]`
- **`defaultValue` (`DefaultT | (() => DefaultT)`):** The value to return if no conditions are met. Can also be a function for lazy evaluation.

### Type Aliases

- **`Condition` (`unknown`):** Any value that can be evaluated for truthiness.
- **`Value<T>` (`T | (() => T)`):** A value or a function that returns a value.

## ✨ Use Cases

### React

```tsx
import condSwitch from 'condition-switch'

const MyComponent = ({ isLoading, isError, data }) => {
  return (
    <div>
      {condSwitch(
        [
          { condition: isLoading, value: () => <LoadingSpinner /> },
          { condition: isError, value: () => <ErrorMessage /> },
          { condition: data, value: () => <Content data={data} /> }
        ],
        () => (
          <NoDataMessage />
        )
      )}
    </div>
  )
}
```

### Vanilla JavaScript

```js
import condSwitch from 'condition-switch'

const getGreeting = (hour) => {
  return condSwitch(
    [
      [hour < 12, 'Good morning'],
      [hour < 18, 'Good afternoon']
    ],
    'Good evening'
  )
}

console.log(getGreeting(10)) // "Good morning"
```

## 🏆 Best Practices

- **Use functions for expensive operations:** For values that are computationally expensive to generate, use a function to delay the execution until the condition is met.
- **Keep conditions simple:** For readability, it's best to keep the conditions as simple as possible. If you have complex logic, consider extracting it into a separate function.
- **Use the object format for clarity:** When you have many conditions, using the `{ condition, value }` format can make your code more self-documenting.

## 🗺️ Roadmap

- [ ] Add support for more complex conditions (e.g., pattern matching).
- [ ] Explore optimizations for performance.
- [ ] Add more examples and use cases to the documentation.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-repo/issues).

## 📜 License

This project is [MIT](./LICENSE) licensed.
