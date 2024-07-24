import { useNavigate } from 'react-router-dom'

import { AutoComplete, Input } from 'antd'

const SearchDropdown = ({ placeholder, onSearch, options, handleClick }) => {
  const navigate = useNavigate()
  const handleSearch = (newValue) => {
    if (newValue) {
      onSearch(newValue)
    }
  }

  return (
    <AutoComplete
      options={options}
      onSearch={handleSearch}
      placeholder={placeholder}
      className="w-full"
      onSelect={(e) => {
        navigate(`/product/detail/${e}`)
      }}>
      <Input.Search size="large" enterButton onSearch={handleClick} />
    </AutoComplete>
  )
}

export default SearchDropdown
