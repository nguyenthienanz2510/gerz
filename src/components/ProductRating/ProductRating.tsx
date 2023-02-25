import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faNoStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ProductRating({ rating }: { rating: number }) {
  const handleRatingWidth = (order: number) => {
    if (rating >= order) {
      return '100%'
    } else if (rating < order && order - rating < 1) {
      return (rating - Math.floor(rating)) * 100 + '%'
    } else {
      return '0%'
    }
  }
  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className='relative'>
              <div
                className='absolute top-0 left-0 h-full overflow-hidden'
                style={{ width: handleRatingWidth(index + 1) }}
              >
                <FontAwesomeIcon icon={faStar} size={'1x'} color={'#FFCC00'} />
              </div>
              <FontAwesomeIcon icon={faNoStar} size={'1x'} color={'#FFCC00'} />
            </div>
          )
        })}
    </div>
  )
}
