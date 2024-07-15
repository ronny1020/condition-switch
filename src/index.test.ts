import { describe, expect, test } from 'vitest'
import condSwitch from '.'

describe('condSwitch', () => {
  test('condSwitch - object condition (true)', () => {
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

    expect(result).toBe(42)
  })

  test('condSwitch - object condition (false)', () => {
    const result = condSwitch(
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

  test('condSwitch - array condition (true)', () => {
    const result = condSwitch(
      [
        [true, 42],
        [false, 0]
      ],
      100
    )

    expect(result).toBe(42)
  })

  test('condSwitch - array condition (false)', () => {
    const result = condSwitch(
      [
        [false, 42],
        [true, 0]
      ],
      100
    )

    expect(result).toBe(0)
  })

  test('condSwitch - default value used', () => {
    const result = condSwitch(
      [
        [false, 42],
        [false, 0]
      ],
      100
    )

    expect(result).toBe(100)
  })

  test('condSwitch - default value as function', () => {
    const result = condSwitch([], () => 100)

    expect(result).toBe(100)
  })

  test('condSwitch - condition as function', () => {
    const result = condSwitch(
      [
        [() => true, 42],
        [() => false, 0]
      ],
      100
    )

    expect(result).toBe(42)
  })

  test('condSwitch - function as value', () => {
    const result = condSwitch(
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
