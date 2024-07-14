# Condition Switch Library

This TypeScript library provides a utility function `conditionSwitch` for performing switch-like operations based on conditions with associated values.

The condSwitch function is convenient to use in arrow functions, JSX, and other situations where if or switch statements are cumbersome or not allowed.

## Installation

To install the library, you can use npm or yarn:

```bash
npm install condition-switch
# or
yarn add condition-switch
# or
pnpm add
```

## Usage

### Basic Usage

```ts
import condSwitch from 'condition-switch'

const result = condSwitch(
  [
    {
      condition: true,
      value: 42
    },
    {
      condition: false,
      value: 0
    }
  ],
  100
)
console.log(result) // Output: 42
```

### Using Functions

You can also use functions for conditions and values to delay their evaluation until they are needed.
Please use function when there is performance concern or the return type is function.

```ts
const result = conditionSwitch(
  [
    { condition: false, value: () => 1 },
    { condition: () => true, value: () => 2 },
    [false, () => 3],
    [() => true, () => 4]
  ],
  () => 0
)
console.log(result) // Output: 2

const func = conditionSwitch<() => number>(
  [
    [() => true, () => () => 42],
    [() => false, () => () => 0]
  ],
  () => () => 100
)

const result = func()
console.log(result) // Output: 2
```

```tsx
const MyComponent = () => {
  //....

  return (
    <div>
      {conditionSwitch(
        [
          {
            condition: isLoading,
            value: () => <Load />
          },
          {
            condition: isError,
            value: () => <ErrorMessage />
          }
        ],
        () => (
          <Content />
        )
      )}
    </div>
  )
}
```
