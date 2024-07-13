import { describe, expect, test } from 'vitest'
import conditionSwitch from '.'

describe('conditionSwitch', () => {
  test('conditionSwitch - object condition (true)', () => {
    const result = conditionSwitch(
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

    expect(result).toBe(42)
  })

  test('conditionSwitch - object condition (false)', () => {
    const result = conditionSwitch(
      [
        {
          condition: false,
          value: 42
        },
        {
          condition: true,
          value: 0
        }
      ],
      100
    )

    expect(result).toBe(0)
  })

  test('conditionSwitch - array condition (true)', () => {
    const result = conditionSwitch(
      [
        [true, 42],
        [false, 0]
      ],
      100
    )

    expect(result).toBe(42)
  })

  test('conditionSwitch - array condition (false)', () => {
    const result = conditionSwitch(
      [
        [false, 42],
        [true, 0]
      ],
      100
    )

    expect(result).toBe(0)
  })

  test('conditionSwitch - default value used', () => {
    const result = conditionSwitch(
      [
        [false, 42],
        [false, 0]
      ],
      100
    )

    expect(result).toBe(100)
  })

  test('conditionSwitch - default value as function', () => {
    const result = conditionSwitch([], () => 100)

    expect(result).toBe(100)
  })

  test('conditionSwitch - condition as function', () => {
    const result = conditionSwitch(
      [
        [() => true, 42],
        [() => false, 0]
      ],
      100
    )

    expect(result).toBe(42)
  })

  test('conditionSwitch - function as value', () => {
    const result = conditionSwitch(
      [
        {
          condition: true,
          value: () => 42
        },
        {
          condition: false,
          value: () => 0
        }
      ],
      100
    )

    expect(result).toBe(42)
  })
})
