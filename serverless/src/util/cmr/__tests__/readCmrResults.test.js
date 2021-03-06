import { readCmrResults } from '../readCmrResults'

describe('readCmrResults', () => {
  describe('when the status code is not 200', () => {
    test('returns an empty array', () => {
      const response = readCmrResults('search/collextions.json', {
        data: {
          errors: ['Record not found.']
        },
        status: 404
      })

      expect(response).toEqual([])
    })
  })

  describe('when the extension is umm', () => {
    test('the response exists in the items key', () => {
      const response = readCmrResults('search/collections.umm_json', {
        data: {
          items: [{
            id: 'umm-concept-id',
            title: 'Aenean lacinia bibendum nulla sed consectetur.'
          }]
        },
        status: 200
      })

      expect(response).toEqual([{
        id: 'umm-concept-id',
        title: 'Aenean lacinia bibendum nulla sed consectetur.'
      }])
    })
  })

  describe('when the extension is json', () => {
    describe('when the path includes collections', () => {
      test('the response exists in the feed key', () => {
        const response = readCmrResults('search/collections.json', {
          data: {
            feed: {
              entry: [{
                id: 'concept-id',
                title: 'Aenean lacinia bibendum nulla sed consectetur.'
              }]
            }
          },
          status: 200
        })

        expect(response).toEqual([{
          id: 'concept-id',
          title: 'Aenean lacinia bibendum nulla sed consectetur.'
        }])
      })
    })

    describe('when the path includes granules', () => {
      test('the response exists in the feed key', () => {
        const response = readCmrResults('search/granules.json', {
          data: {
            feed: {
              entry: [{
                id: 'concept-id',
                title: 'Aenean lacinia bibendum nulla sed consectetur.'
              }]
            }
          },
          status: 200
        })

        expect(response).toEqual([{
          id: 'concept-id',
          title: 'Aenean lacinia bibendum nulla sed consectetur.'
        }])
      })
    })
  })
})
