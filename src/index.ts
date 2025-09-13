/**
 * @template T
 * Represents a value or a function that returns a value.
 * Using a generic type `T` allows for type-safe handling of various return types.
 */
export type ValueOrFunction<T> = T extends Function ? () => T : T | (() => T)

/**
 * Represents a condition to be evaluated.
 * It can be of any type, and its truthiness will be checked.
 * For example, a boolean `true`, a non-empty string, or a number other than 0 would be considered a truthy condition.
 */
export type Condition = unknown

/**
 * @template T
 * Represents a value that can be a direct value or a function that returns a value.
 */
export type Value<T> = ValueOrFunction<T>

/**
 * @template T
 * Represents a condition with a corresponding value, structured as an object.
 * This format is useful for more self-documenting code.
 */
export type ConditionWithValueObject<T = unknown> = {
  condition: Condition
  value: Value<T>
}

/**
 * @template T
 * Represents a condition with a corresponding value, structured as an array (tuple).
 * This format is more concise.
 */
export type ConditionWithValueArray<T = unknown> = [Condition, Value<T>]

/**
 * @template T
 * Represents a condition with a corresponding value, which can be either an object or an array.
 */
export type ConditionWithValue<T = unknown> =
  | ConditionWithValueObject<T>
  | ConditionWithValueArray<T>

/**
 * @template T
 * Executes a function if the given value is a function; otherwise, returns the value itself.
 * This is a helper function to handle lazy evaluation.
 * @param value The value or function to execute.
 * @returns The result of the function execution or the value itself.
 */
function executeFunctionOrReturn<T = unknown>(value: ValueOrFunction<T>): T {
  if (value instanceof Function) {
    return value()
  }

  return value as T
}

/**
 * @template T, DefaultT
 * Performs a switch-like operation based on a series of conditions.
 * It iterates through an array of condition-value pairs and returns the value of the first truthy condition.
 * If no conditions are met, it returns a default value.
 *
 * This function is particularly useful for scenarios where you need to use an expression-based conditional,
 * such as in JSX/TSX, arrow functions, or other functional programming patterns.
 *
 * @param conditionWithValues An array of condition-value pairs.
 * @param defaultValue The default value to return if no conditions are met.
 * @returns The value from the first matching condition, or the default value.
 *
 * @example
 * ```ts
 * import condSwitch from 'condition-switch';
 *
 * const result = condSwitch(
 *   [
 *     { condition: false, value: 'Not this one' },
 *     { condition: true, value: 'This is it!' },
 *   ],
 *   'Default value'
 * );
 *
 * console.log(result); // "This is it!"
 * ```
 *
 * @example
 * ```tsx
 * // React example
 * const MyComponent = ({ isLoading, isError, data }) => {
 *   return (
 *     <div>
 *       {condSwitch(
 *         [
 *           { condition: isLoading, value: () => <LoadingSpinner /> },
 *           { condition: isError, value: () => <ErrorMessage /> },
 *         ],
 *         () => <Content data={data} />
 *       )}
 *     </div>
 *   );
 * };
 * ```
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
