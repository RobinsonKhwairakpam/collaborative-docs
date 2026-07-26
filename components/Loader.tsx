import Image from 'next/image'

const Loader = () => {
  return (
    <div className="loader flex flex-col items-center justify-center gap-3">
      <div className="relative flex items-center justify-center">
        <div className="absolute size-10 rounded-full bg-pink-400/20 animate-ping" />
        <Image 
          src="/assets/icons/loader.svg"
          alt="loader"
          width={36}
          height={36}
          className="animate-spin relative z-10"
        />
      </div>
      <span className="text-pink-600 font-semibold tracking-wide text-sm">Loading...</span>
    </div>
  )
}

export default Loader