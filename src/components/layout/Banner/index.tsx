import ffdLogo from "@/assets/icons/ffd/ffd.png"

function Banner() {

  return (
    <header className="w-full bg-primary text-center px-6 py-7">
      <img src={ffdLogo} alt="Franklin Fire Department logo" className="w-28 h-28 object-contain mx-auto mb-2.5" />
      <h1 className="text-2xl font-bold text-white tracking-wide mx-auto max-w-2xl md:text-3xl">
        <span>Latest Fire and Explosion Hazard Product Recalls from the
          <a 
            href="https://www.cpsc.gov/" 
            target="_blank"
            className="ml-2 hover:text-white/80 underline" 
            rel="noopener noreferrer">U.S. Consumer Product Safety Commission</a>
          </span>
      </h1>
      <p className="mt-1.5 text-white/80">Franklin Fire Department</p>
      <hr className="w-12 h-0.5 mt-3.5 mx-auto rounded-full border-0 bg-white/80" />
    </header>
  )
}

export default Banner
