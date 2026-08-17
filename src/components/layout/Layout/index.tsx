import { Outlet } from "react-router"

// Components
import Header from "../Header"
import Footer from "../Footer"
import PageWrapper from "@/utils/PageWrapper"

function Layout() {

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <Header />
      <main className="p-6 flex-1">
        <PageWrapper>
          <div className="m-auto w-full h-full xl:w-[90%] 2xl:w-[80%]">
            <Outlet />
          </div>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
