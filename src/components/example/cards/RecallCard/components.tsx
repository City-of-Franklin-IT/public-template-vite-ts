// Types
import type * as AppTypes from '@/context/App/AppTypes'

type ImagesProps = {
  visible: boolean
  images: AppTypes.RecallImageInterface[]
  title: string
}

export const Images = ({ visible, images, title }: ImagesProps) => {
  if(!visible) return null

  return (
    <div className="flex flex-wrap gap-2">
      {images.map((image, index) => (
        <Image
          key={`${image.URL}-${index}`}
          image={image}
          title={title} />
      ))}
    </div>
  )
}

const Image = ({ image, title }: { image: AppTypes.RecallImageInterface, title: string }) => (
  <a
    href={image.URL}
    target="_blank"
    rel="noreferrer"
    title={image.Caption}>
    <img
      src={image.URL}
      alt={image.Caption || title}
      className="w-16 h-16 object-cover rounded-lg border border-base-content/10 hover:opacity-80 transition-opacity" />
  </a>
)