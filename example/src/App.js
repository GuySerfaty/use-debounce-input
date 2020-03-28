import React, { useState, useMemo, useCallback } from 'react'
import useDebounceInput from 'use-debounce-input'

const BasicUsage = () => {
  const {
    DebounceInput,
    value,
    debounceValue,
  } = useDebounceInput({
    delay: 400,
  });

  return (
    <div>
      <DebounceInput />
      <br />
      Value: {value}
      <br />
      DebounceValue: {debounceValue}
    </div>
  )
}
const WithArray = () => {
  const items = useMemo(() => [
    { id: '111-111', name: 'Ben' },
    { id: '111-222', name: 'Guy' },
    { id: '111-333', name: 'Helit' },
  ], [])
  const {
    DebounceInput,
    value,
    debounceValue,
    filteredItems
  } = useDebounceInput({
    delay: 400,
    items,
    filterByColumns: ['id']
  });

  return (
    <div>
      <DebounceInput />
      <br />
      Value: {value}
      <br />
      DebounceValue: {debounceValue}
      <br />
      <table>
        {filteredItems.map(filteredItem => (
          <tr>
            <td>{filteredItem.id}</td>
            <td>{filteredItem.name}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}


const AsyncFilter = () => {
  const [loading, setLoading] = useState(false);
  const items = useMemo(() => [
    { id: '111-111', name: 'Ben' },
    { id: '111-222', name: 'Guy' },
    { id: '111-333', name: 'Helit' },
  ], [])

  const someAsyncSearchMaybeAjax = () => new Promise((resolve) => {
    setLoading(true);
    return setTimeout(() => resolve(new Array(Math.floor(Math.random() * 20) + 1).fill(0).map(() => items[Math.floor(Math.random() * 3) + 0])), 3000)
  }).finally((value) => setLoading(false))

  const {
    DebounceInput,
    value,
    debounceValue,
    filteredItems
  } = useDebounceInput({
    delay: 400,
    items,
    filter: async (value) => {
      const data = await someAsyncSearchMaybeAjax(value);
      return data;
    }
  });

  return (
    <div>
      <DebounceInput />
      {loading ? 'loading...' : undefined}
      <br />
      Value: {value}
      <br />
      DebounceValue: {debounceValue}
      <br />
      <table>
        {filteredItems.map(filteredItem => (
          <tr>
            <td>{filteredItem.id}</td>
            <td>{filteredItem.name}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

const App = () => {
  return (
    <div style={{ padding: 40 }}>
      <h1>Basic Usage</h1>
      <BasicUsage />
      <br />
      <h1>With List</h1>
      <WithArray />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Custom Async Filter</h1>
      <AsyncFilter />

    </div>
  )
}
export default App
