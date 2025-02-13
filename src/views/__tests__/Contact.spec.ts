import { describe, it, expect, beforeEach, vi, Mocked } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactForm from '../../views/ContactView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '../../store/userStore'
import axios from 'axios'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

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
    global.alert = vi.fn()
  })

  it('should have the correct initial state', () => {
    const contactForm = wrapper.getComponent(ContactForm).vm
    const button = wrapper.find('button#submit').element as HTMLButtonElement
    expect(wrapper.getComponent(ContactForm).vm.contact).toEqual({
      name: '',
      email: '',
      message: '',
    })

    expect(contactForm.contact.name).toBe('')
    expect(contactForm.contact.email).toBe('')
    expect(contactForm.contact.message).toBe('')
    expect(contactForm.statusMessage).toBe('')
    expect(contactForm.isFormValid).toBe(false)
    expect(button.disabled).toBe(true)
  })

  it('the form should be valid', async () => {
    const button = wrapper.find('button#submit').element as HTMLButtonElement

    await wrapper.find('#nameInput').setValue('Jane Doe')
    await wrapper.find('#emailInput').setValue('jane@example.com')
    await wrapper.find('#messageInput').setValue('Hello')

    expect(wrapper.getComponent(ContactForm).vm.isFormValid).toBe(true)
    expect(button.disabled).toBe(false)
  })

  it('should show message on successful form submission and clear it after timeout', async () => {
    global.alert = vi.fn()

    mockedAxios.post.mockResolvedValue({ status: 201 })

    await wrapper.find('#nameInput').setValue('Jane Doe')
    await wrapper.find('#emailInput').setValue('jane@example.com')
    await wrapper.find('#messageInput').setValue('Hello')
    await wrapper.find('button#submit').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(ContactForm).vm.statusMessage).toBe(
      'Success: Form submitted successfully!',
    )

    await new Promise((resolve) => setTimeout(resolve, 2500))

    expect(wrapper.getComponent(ContactForm).vm.statusMessage).toBe('')
  })

  it('should update store with name and email changes', async () => {
    await wrapper.find('#nameInput').setValue('Jane Doe')
    await wrapper.find('#emailInput').setValue('jane@example.com')

    mockUseUserStore.updateName('Jane Doe')
    mockUseUserStore.updateEmail('jane@example.com')

    expect(mockUseUserStore.name).toBe('Jane Doe')
    expect(mockUseUserStore.email).toBe('jane@example.com')
  })

  it('should show error for invalid email format', async () => {
    const invalidEmails = [
      'plainaddress',
      'missing@domain',
      '@missingusername.com',
      'missingdot@com',
      ' mail@fdsf.cvd',
    ]

    const button = wrapper.find('button#submit').element as HTMLButtonElement
    for (const invalidEmail of invalidEmails) {
      await wrapper.find('#nameInput').setValue('Jane Doe')
      await wrapper.find('#emailInput').setValue(invalidEmail)
      await wrapper.find('#messageInput').setValue('Hello')

      expect(wrapper.getComponent(ContactForm).vm.isFormValid).toBe(false)
      expect(button.disabled).toBe(true)
    }
  })

  it('should handle form submission failure', async () => {
    global.alert = vi.fn()

    mockedAxios.post.mockRejectedValue({ status: 500 })

    await wrapper.find('#nameInput').setValue('Jane Doe')
    await wrapper.find('#emailInput').setValue('jane@example.com')
    await wrapper.find('#messageInput').setValue('Hello')
    await wrapper.find('button#submit').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(ContactForm).vm.statusMessage).toBe(
      'Error: Could not reach the backend!',
    )
  })
  it('should reset the form after successful submission', async () => {
    mockedAxios.post.mockResolvedValue({ status: 201 })

    await wrapper.find('#nameInput').setValue('Jane Doe')
    await wrapper.find('#emailInput').setValue('jane@example.com')
    await wrapper.find('#messageInput').setValue('Hello')
    await wrapper.find('button#submit').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.getComponent(ContactForm).vm.contact).toEqual({
      name: '',
      email: '',
      message: '',
    })

    expect(mockUseUserStore.name).toBe('')
    expect(mockUseUserStore.email).toBe('')
  })

  it('should invalidate name with numbers or special characters', async () => {
    const invalidNames = ['123', 'JohnDoe123', 'John@Doe', 'John.Doe']

    for (const invalidName of invalidNames) {
      await wrapper.find('#nameInput').setValue(invalidName)
      await wrapper.find('#emailInput').setValue('jane@example.com')
      await wrapper.find('#messageInput').setValue('Hello')

      expect(wrapper.getComponent(ContactForm).vm.isFormValid).toBe(false)
    }
  })

  it('should validate name with only letters and spaces', async () => {
    const validNames = ['John', 'Jane Doe', 'John Doe']

    for (const validName of validNames) {
      await wrapper.find('#nameInput').setValue(validName)
      await wrapper.find('#emailInput').setValue('jane@example.com')
      await wrapper.find('#messageInput').setValue('Hello')

      expect(wrapper.getComponent(ContactForm).vm.isFormValid).toBe(true)
    }
  })
})
