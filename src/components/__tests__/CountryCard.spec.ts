import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CountryCard from '../CountryCard.vue'

describe('CountryCard', () => {
  it('props were defined and contains iran text', () => {
    const wrapper = mount(CountryCard, {
      props: {
        data: {
          flags: {
            png: './Iran.png',
          },
          name: {
            common: 'Iran',
          },
          region: 'Asia',
          population: '85,000,000',
          capital: ['Tehran'],
        },
      },
    })

    expect(wrapper.props()).toBeDefined()
    expect(wrapper.text()).toContain('Iran')
  })
})
