import CustomerHeader from "@/components/Header/CustomerHeader"
import { Outlet } from "react-router-dom"
// import CustomerHero from "@/components/Header/CustomerHero"


function CustomerHomePage() {
  return (
    <>
      <CustomerHeader />
      <Outlet/>
      {/* <CustomerHero /> */}
    </>
  )
}

export default CustomerHomePage
