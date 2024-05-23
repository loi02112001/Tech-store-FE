function SearchInputHeader() {
  return (
    <div className="relative w-1/3 m-auto">
      <input
        type="text"
        placeholder="Bạn cần tìm gì?"
        className="w-full py-2 px-4 border rounded-xl focus:outline-none"
      />
      <button
        type="submit"
        className="absolute w-9 rounded-tr rounded-br shadow-none p-0 border-0 right-2 inset-y-0"
        id="btn-search">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-full block fill-white m-auto">
          <path
            d="M10.9999 19C15.4182 19 18.9999 15.4183 18.9999 11C18.9999 6.58172 15.4182 3 10.9999 3C6.5816 3 2.99988 6.58172 2.99988 11C2.99988 15.4183 6.5816 19 10.9999 19Z"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
          <path
            d="M20.9999 21L16.6499 16.65"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
        </svg>
      </button>
    </div>
  )
}

export default SearchInputHeader
