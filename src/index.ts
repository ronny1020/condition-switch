/**
 * Represents a value or a function that returns a value.
 */
export type ValueOrFunction<T> = T extends Function ? () => T : T | (() => T)

/**
 * Represents a condition that can be a value or a function that returns a value.
 */
export type Condition = unknown

/**
 * Represents a value that can be a direct value or a function that returns a value.
 */
export type Value<T> = ValueOrFunction<T>

/**
 * Represents a condition with a corresponding value as an object.
 */
export type ConditionWithValueObject<T = unknown> = {
  condition: Condition
  value: Value<T>
}

/**
 * Represents a condition with a corresponding value as an array.
 */
export type ConditionWithValueArray<T = unknown> = [Condition, Value<T>]

/**
 * Represents a condition with a corresponding value, either as an object or an array.
 */
export type ConditionWithValue<T = unknown> =
  | ConditionWithValueObject<T>
  | ConditionWithValueArray<T>

/**
 * Executes a function if the given value is a function; otherwise, returns the value itself.
 * @param value - The value or function to execute.
 * @returns The result of executing the function or the value itself.
 */
function executeFunctionOrReturn<T = unknown>(value: ValueOrFunction<T>): T {
  if (value instanceof Function) {
    return value()
  }

  return value as T
}

/**
 * Performs a switch-like operation based on conditions with associated values.
 * Functions within conditions are used for performance to avoid unnecessary execution.
 * @param conditionWithValues - An array of conditions with associated values.
 * @param defaultValue - The default value to return if no conditions match.
 * @returns The value associated with the first matching condition, or the default value.
 */
export default function condSwitch<T, DefaultT extends T | undefined = T>(
  conditionWithValues: ConditionWithValue<T>[],
  defaultValue: ValueOrFunction<DefaultT>
): T | DefaultT {
  for (let i = 0; i < conditionWithValues.length; i++) {
    const group = conditionWithValues[i]
    const isArray = Array.isArray(group)
    const condition = isArray ? group[0] : group.condition

    if (condition) {
      const value = isArray ? group[1] : group.value
      return executeFunctionOrReturn(value)
    }
  }

  return executeFunctionOrReturn(defaultValue)
}
