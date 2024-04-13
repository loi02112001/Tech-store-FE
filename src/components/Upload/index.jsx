import { useRef } from "react"

import DefaultImages from "@/assets/icons/DefaultImage"

export default function Upload(props) {
  const { image, setImage, setFile, onImageSelected } = props
  const inputRef = useRef(null)

  const handleClickImages = () => {
    inputRef.current.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(URL.createObjectURL(file))
    setFile(file)
    onImageSelected()
    inputRef.current.value = ""
  }

  return (
    <div onClick={handleClickImages} className="rounded overflow-hidden">
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      {image ? <img src={image} className="w-[200px] h-[133px]" /> : <DefaultImages />}
    </div>
  )
}
