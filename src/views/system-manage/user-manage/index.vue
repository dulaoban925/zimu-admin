<template>
  <div class="menu-manage">
    <zm-table
      :table-props="tableProps"
      @size-change="handleSizeChange"
      @filter-reset="handleFilterReset"
      @filter-search="handleFilterSearch"
    >
      <zm-table-column prop="date" label="Date" width="180" filterable />
      <zm-table-column prop="name" label="Name" width="180" filterable />
      <zm-table-column prop="address" label="Address" />
    </zm-table>
  </div>
</template>

<script setup lang="ts">
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const tableProps = {
  data: tableData
}

function handleSizeChange(val: number) {
  console.log('handleSizeChange', val)
}

const handleFilterReset = () => {
  console.log('handleFilterReset')
}

const handleFilterSearch = (val: any) => {
  console.log('handleSizeChange', val)
}
</script>

<style scoped></style>
