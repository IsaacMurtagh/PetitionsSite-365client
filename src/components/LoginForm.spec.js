import { mount } from '@vue/test-utils'
import Login from './LoginForm.vue'

describe('Login', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(Login)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})