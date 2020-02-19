it('raw is based on type alias declaration node', () => {
  expect(
    ctx.extract(`
      export { A }
      /**
       * foobar
       */
      type A = {}
  `)
  ).toMatchInlineSnapshot(`
    Object {
      "modules": Array [
        Object {
          "kind": "module",
          "location": Object {
            "absoluteFilePath": "/a.ts",
          },
          "mainExport": null,
          "name": "a",
          "namedExports": Array [
            Object {
              "isTerm": false,
              "isType": true,
              "kind": "export",
              "name": "A",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").A",
              },
            },
          ],
        },
      ],
      "typeIndex": Object {
        "(\\"/a\\").A": Object {
          "kind": "alias",
          "name": "A",
          "raw": Object {
            "nodeFullText": "/**
     * foobar
     */
    type A = {};",
            "nodeText": "type A = {};",
            "typeText": "A",
          },
          "type": Object {
            "kind": "object",
            "props": Array [],
            "raw": Object {
              "nodeFullText": "/**
     * foobar
     */
    type A = {};",
              "nodeText": "type A = {};",
              "typeText": "A",
            },
          },
        },
      },
    }
  `)
})

it('exported type alias of number is added to type index', () => {
  expect(
    ctx.extract(`
      export type A = 1
    `)
  ).toMatchInlineSnapshot(`
    Object {
      "modules": Array [
        Object {
          "kind": "module",
          "location": Object {
            "absoluteFilePath": "/a.ts",
          },
          "mainExport": null,
          "name": "a",
          "namedExports": Array [
            Object {
              "isTerm": false,
              "isType": true,
              "kind": "export",
              "name": "A",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").A",
              },
            },
          ],
        },
      ],
      "typeIndex": Object {
        "(\\"/a\\").A": Object {
          "kind": "alias",
          "name": "A",
          "raw": Object {
            "nodeFullText": "",
            "nodeText": "",
            "typeText": "1",
          },
          "type": Object {
            "base": "number",
            "kind": "literal",
            "name": "1",
          },
        },
      },
    }
  `)
})

it('exported type alias of number via typeof is added to type index', () => {
  expect(
    ctx.extract(`
      const a = 1
      export type A = typeof a
    `)
  ).toMatchInlineSnapshot(`
Object {
  "modules": Array [
    Object {
      "kind": "module",
      "location": Object {
        "absoluteFilePath": "/a.ts",
      },
      "mainExport": null,
      "name": "a",
      "namedExports": Array [
        Object {
          "isTerm": false,
          "isType": true,
          "kind": "export",
          "name": "A",
          "type": Object {
            "kind": "typeIndexRef",
            "link": "(\\"/a\\").A",
          },
        },
      ],
    },
  ],
  "typeIndex": Object {
    "(\\"/a\\").A": Object {
      "kind": "alias",
      "name": "A",
      "raw": Object {
        "nodeFullText": "",
        "nodeText": "",
        "typeText": "1",
      },
      "type": Object {
        "base": "number",
        "kind": "literal",
        "name": "1",
      },
    },
  },
}
`)
})

it('exported type alias of number acts same as if via typeof', () => {
  expect(
    ctx.extract(`
      const a = 1
      export type A = typeof a
    `)
  ).toEqual(
    ctx.extract(`
      export type A = 1
    `)
  )
})
