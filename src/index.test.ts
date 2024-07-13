import { describe, test } from 'vitest'
import conditionSwitch, { ConditionWithValue } from './'

describe('conditionSwitch', () => {
  test('conditionSwitch - object condition (true)', () => {
    const conditions: ConditionWithValue<number>[] = [
      {
        condition: true,
        value: 42
      },
      {
        condition: false,
        value: 0
      }
    ]

    const result = conditionSwitch(conditions, 100)
    return result === 42
  })

  test('conditionSwitch - object condition (false)', () => {
    const conditions: ConditionWithValue<number>[] = [
      {
        condition: false,
        value: 42
      },
      {
        condition: true,
        value: 0
      }
    ]

    const result = conditionSwitch(conditions, 100)
    return result === 0
  })

  test('conditionSwitch - array condition (true)', () => {
    const conditions: ConditionWithValue<number>[] = [
      [true, 42],
      [false, 0]
    ]

    const result = conditionSwitch(conditions, 100)
    return result === 42
  })

  test('conditionSwitch - array condition (false)', () => {
    const conditions: ConditionWithValue<number>[] = [
      [false, 42],
      [true, 0]
    ]

    const result = conditionSwitch(conditions, 100)
    return result === 0
  })

  test('conditionSwitch - default value used', () => {
    const conditions: ConditionWithValue<number>[] = [
      [false, 42],
      [false, 0]
    ]

    const result = conditionSwitch(conditions, 100)
    return result === 100
  })

  test('conditionSwitch - default value as function', () => {
    const conditions: ConditionWithValue<number>[] = []

    const result = conditionSwitch(conditions, () => 100)
    return result === 100
  })

  test('conditionSwitch - condition as function', () => {
    const conditions: ConditionWithValue<number>[] = [
      [() => true, 42],
      [() => false, 0]
    ]

    const result = conditionSwitch(conditions, 100)
    return result === 42
  })

  test('conditionSwitch - function as value', () => {
    const conditions: ConditionWithValue<number>[] = [
      {
        condition: true,
        value: () => 42
      },
      {
        condition: false,
        value: () => 0
      }
    ]

    const result = conditionSwitch(conditions, 100)
    return result === 42
  })
})
