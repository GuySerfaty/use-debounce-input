import React, { useState, useMemo, useCallback } from 'react'
import faker from 'faker'
import useDebounceInput, { useDebounceInput as useDebounceInputa } from 'use-debounce-input'

import { Column, Row, ListContainer, H2, VsColumn, Vs, H3 } from './styled'

const filterByColumns = ['Name', 'Username', 'a'];

const createPerson = () => {
  const firstName = faker.name.firstName(),
                  lastName = faker.name.lastName();
  return {
    a: 'aaaaaaaaaaaaaaaaaaaa',
    id: faker.random.uuid(),
    number: faker.random.number(),
    Name: faker.name.findName(firstName, lastName),
    StreetAddress: faker.address.streetAddress(),
    CityStateZip: faker.address.city() + ", " + faker.address.stateAbbr() + " " + faker.address.zipCode(),
    Country: faker.locales[faker.locale].address.default_country || "",
    Phone: faker.phone.phoneNumber(),
    Username: faker.internet.userName(firstName, lastName),
    Password: faker.internet.password(),
    Email: faker.internet.email(firstName, lastName),
    imageAvatar: faker.internet.avatar(),
  }
}

const items = new Array(1000).fill(0).map(item => createPerson());


const List = React.memo(({ items }) => (
  <ListContainer>
  {items.map(item => (
    <Row key={item.id}>
      <Column>{item.number}</Column>
      <Column>{item.Name}</Column>
      <Column>{item.Phone}</Column>
      <Column>{item.a}</Column>
      {/* <Column>{item.imageAvatar}</Column> */}
    </Row>
  ))}
</ListContainer>
))

const ValueDisplay = ({ value, debounceValue }) => (
  <div>
    <div>
      Value: {value}
    </div>
    <div>
      Debounce Value: {debounceValue}
    </div>
  </div>
)

const BasicUsage = () => {
  const {
    DebounceInput,
    value,
    debounceValue,
  } = useDebounceInput({
    delay: 400,
  });

  return (
    <VsColumn>
      <H2>Basic Usage</H2>
      <DebounceInput />
      <ValueDisplay value={value} debounceValue={debounceValue} />
    </VsColumn>
  )
}

const BasicList = React.memo(() => {
  const { DebounceInput, filteredItems, value, debounceValue } = useDebounceInput({
    items,
    delay: 400,
    // minLength: 3,
    filterByColumns,
  });
  console.log('BasicDelay400 render')
  return (
    <VsColumn>
      <H2>Basic Debounce List</H2>
      <DebounceInput type="text" delay={400} placeholder="400 Delay" name="aaa" />
      <ValueDisplay value={value} debounceValue={debounceValue} />
      <List items={filteredItems || []} />
    </VsColumn>
  )
})

const CustomFilterFunction = React.memo(() => {
  const { DebounceInput, filteredItems, value, debounceValue } = useDebounceInput({
    items,
    filterByColumns: ['number'],
    filter: (value, items, filterByColumns) => {
      return items.filter((item) => {
        return filterByColumns
          .find((column) => item[column] > value)})
    }
  });
  
  return (
    <VsColumn>
      <DebounceInput type="number" placeholder="400 Delay" name="aaa" />
      <ValueDisplay value={value} debounceValue={debounceValue} />
      <List items={filteredItems || []} />
    </VsColumn>
  )
})

const someAsyncSearch = () => new Promise((resolve) => setTimeout(() => resolve(new Array(Math.floor(Math.random() * 100) + 1).fill(0).map(item => createPerson())), 3000))

const CustomFilterAsyncFunction = React.memo(() => {
  const { DebounceInput, filteredItems, debounceValue, value } = useDebounceInput({
    items,
    delay: 400,
    filterByColumns: ['number'],
    filter: async (value) => {
      const data = await someAsyncSearch(value);
      return data;
    }
  });
  return (
    <VsColumn>
      <DebounceInput delay={400} placeholder="400 Delay" name="aaa" />
      <ValueDisplay value={value} debounceValue={debounceValue} />
      <List items={filteredItems} />
    </VsColumn>
  )
})

const App = () => {
  return (
    <div style={{ padding: 40 }}>

      <br />
      <Vs>
        <BasicUsage />
      </Vs>
      <Vs>
        <BasicList />
      </Vs>
      <Vs>
        <CustomFilterFunction />
      </Vs>
      <Vs>
        <CustomFilterAsyncFunction />
      </Vs>
    </div>
  )
}
export default App
