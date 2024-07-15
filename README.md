# Condition Switch Library

This TypeScript library provides a utility function `condSwitch` for performing switch-like operations based on conditions with associated values.

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

#### Using `ConditionWithValueObject`

A `ConditionWithValueObject` is an object with two properties: `condition` and `value`. This format is particularly useful when you want to make your code more readable and self-documenting.

```ts
import conditionSwitch, { ConditionWithValueObject } from 'condition-switch'

const conditions: ConditionWithValueObject<string>[] = [
  { condition: false, value: 'Condition 1' },
  { condition: true, value: 'Condition 2' }
]

const result = conditionSwitch(conditions, 'Default Value')
console.log(result) // Output: "Condition 2"
```

#### Using `ConditionWithValueArray`

A `ConditionWithValueArray` is a tuple where the first element is the condition and the second element is the value. This format can be more concise and is useful when you want to keep your code compact.

```ts
import conditionSwitch, { ConditionWithValueArray } from 'condition-switch'

const conditions: ConditionWithValueArray<string>[] = [
  [false, 'Condition 1'],
  [true, 'Condition 2']
]

const result = conditionSwitch(conditions, 'Default Value')
console.log(result) // Output: "Condition 2"
```

### Using Functions

You can also use functions for conditions and values to delay their evaluation until they are needed.
Please use function when there is performance concern or the return type is function.

```ts
const result = condSwitch(
  [
    { condition: false, value: () => 1 },
    { condition: () => true, value: () => 2 },
    [false, () => 3],
    [() => true, () => 4]
  ],
  () => 0
)
console.log(result) // Output: 2

const func = condSwitch<() => number>(
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
      {condSwitch(
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
