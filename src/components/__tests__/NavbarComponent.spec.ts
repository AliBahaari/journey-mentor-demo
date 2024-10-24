import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import NavbarComponent from '../NavbarComponent.vue'

describe('NavbarComponent', () => {
  it('contains the slogan text', () => {
    const wrapper = mount(NavbarComponent)
    expect(wrapper.text()).toContain('Where in the world?')
  })
})
