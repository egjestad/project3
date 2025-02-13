import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CalculatorComponent from '../../components/CalculatorComponent.vue'

describe('CalculatorView', () => {
  it('should update displayValue when a number is clicked', async () => {
    const wrapper = mount(CalculatorComponent)
    wrapper.vm.handleNumberClick('1')
    expect(wrapper.vm.displayValue).toBe('1')
  })

  it('should update displayValue when an operator is clicked', async () => {
    const wrapper = mount(CalculatorComponent)
    wrapper.vm.handleNumberClick('1')
    wrapper.vm.handleOperatorClick('+')
    expect(wrapper.vm.displayValue).toBe('1+')
  })

  it('should calculate the result when "=" is clicked', async () => {
    const wrapper = mount(CalculatorComponent)
    wrapper.vm.handleNumberClick('1')
    wrapper.vm.handleOperatorClick('+')
    wrapper.vm.handleNumberClick('1')
    wrapper.vm.handleClick('=')
    expect(wrapper.vm.displayValue).toBe('2')
  })

  it('should clear the displayValue when "C" is clicked', async () => {
    const wrapper = mount(CalculatorComponent)
    wrapper.vm.handleNumberClick('1')
    wrapper.vm.handleOperatorClick('+')
    wrapper.vm.handleNumberClick('1')
    wrapper.vm.handleClick('=')
    wrapper.vm.handleClear()
    expect(wrapper.vm.displayValue).toBe('')
  })

  it('should log calculation when "=" is clicked', async () => {
    const wrapper = mount(CalculatorComponent)
    wrapper.vm.handleNumberClick('1')
    wrapper.vm.handleOperatorClick('+')
    wrapper.vm.handleNumberClick('1')
    wrapper.vm.handleClick('=')
    expect(wrapper.vm.log).toEqual(['1+1 = 2'])
  })

  it('should handle division by zero', async () => {
    const wrapper = mount(CalculatorComponent)
    wrapper.vm.handleNumberClick('1')
    wrapper.vm.handleOperatorClick('/')
    wrapper.vm.handleNumberClick('0')
    wrapper.vm.handleClick('=')
    expect(wrapper.vm.displayValue).toBe('Invalid input')
  })

  it('should call the calculate method correctly', async () => {
    const wrapper = mount(CalculatorComponent)
    wrapper.vm.displayValue = '1+1'
    wrapper.vm.calculate()
    expect(wrapper.vm.displayValue).toBe('2')
  })
})
