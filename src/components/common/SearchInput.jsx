import { useEffect } from 'react'

import { useDebounced } from '@/hooks/useDebounces'

import { Space } from 'antd'
import Search from 'antd/es/input/Search'

export default function SearchInput({ keyword, onChange, onSearch, placeholder, loading }) {
  let keywordSearch = useDebounced(keyword, 300)

  useEffect(() => {
    if (keywordSearch) onSearch(keyword)
  }, [keywordSearch])

  return (
    <div>
      <Space direction="vertical" style={{ width: 300 }} size="large">
        <Search
          enterButton
          loading={loading}
          placeholder={placeholder ? placeholder : 'Tìm kiếm...'}
          name="search"
          onChange={(e) => onChange(e.target.value)}
        />
      </Space>
    </div>
  )
}
