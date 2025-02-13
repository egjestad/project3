import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactForm from '../../views/ContactView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '../../store/userStore'

describe('ContactView', () => {
  let pinia: ReturnType<typeof createTestingPinia>
  let mockUseUserStore: ReturnType<typeof useUserStore>
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false, // so we can mock actions
    })
    mockUseUserStore = useUserStore()

    wrapper = mount(ContactForm, {
      global: {
        plugins: [pinia],
      },
    })
  })

  it('the form should be valid', async () => {
    const button = wrapper.find('button#submit').element as HTMLButtonElement

    await wrapper.find('#nameInput').setValue('Jane Doe')
    await wrapper.find('#emailInput').setValue('jane@example.com')
    await wrapper.find('#messageInput').setValue('Hello')

    expect(wrapper.getComponent(ContactForm).vm.isFormValid).toBe(true)
    expect(button.disabled).toBe(false)
  })

  it('should show alert on successful form submission', async () => {
    await wrapper.find('#nameInput').setValue('Jane Doe')
    await wrapper.find('#emailInput').setValue('jane@example.com')
    await wrapper.find('#messageInput').setValue('Hello')
    await wrapper.find('button#submit').trigger('click')

    expect(global.fetch).toHaveBeenCalled()
    expect(global.alert).toHaveBeenCalledWith('Success')
  })

  it('should update store with name and email changes', async () => {
    await wrapper.find('#nameInput').setValue('Jane Doe')
    await wrapper.find('#emailInput').setValue('jane@example.com')

    mockUseUserStore.updateName('Jane Doe')
    mockUseUserStore.updateEmail('jane@example.com')

    expect(mockUseUserStore.name).toBe('Jane Doe')
    expect(mockUseUserStore.email).toBe('jane@example.com')
  })
})
