import { mount } from '@vue/test-utils'
import Login from '@/components/LoginComponent.vue'
import { describe, expect, it } from "vitest";
import { fn } from 'jest-mock'

describe('Login.vue', () => {
  it('calls signIn when Sign in button is clicked', async () => {
    const signInMock = fn()
    const wrapper = mount(Login, {
      methods: { signIn: signInMock }
    })
    await wrapper.find('button').trigger('click')
    expect(signInMock).toHaveBeenCalled()
  })
})