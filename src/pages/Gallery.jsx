import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './Page.module.scss'

function Gallery () {
  const { t } = useTranslation()
  const images = [
    'https://dwc.kg/wp-content/uploads/2023/10/scale_1200-1-optimized.jpeg',
    'https://www.travelkyrgyzstan.kg/wp-content/uploads/2021/07/sary-chelek_1.jpg',
    'https://mykgstan.com/uploads/images/00/00/14/2015/03/06/7b9fdb.jpg',
    'https://static.wixstatic.com/media/22f040_7b21e626798c4894a353626dd525c830~mv2.jpeg/v1/fill/w_560,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/22f040_7b21e626798c4894a353626dd525c830~mv2.jpeg',
    'https://24.kg/thumbnails/253f7/dc0b1/229915_w_h500_1632990976_r.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjXUwtbVJBfy6nLJN2aRRGTdgFvIhkItbmAg&s',
    'https://wikiway.com/upload/hl-photo/ec3/19a/ozero-sary-chelek_26.jpg',
    'https://map.kg/uploads/posts/2024-01/p1010613.webp',
    'https://www.travelkyrgyzstan.kg/wp-content/uploads/2021/07/sary-chelek_1.jpg',
    'https://tropki.ru/images/excursions/ddb8dba6-ccbb-11ee-a49a-ea809bd85e3a/bishkek-uikend-v-serdtse-kyrgyzstana-otdyh-v-gorah-i-den-na-ozere-sary-chelek.jpg',
    'https://i.ytimg.com/vi/2WuKlpuAPdU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD4Yy99E9jTl6wrPICfEJR3lLv7HQ',
    'https://www.centralasia-travel.com/uploads/gallery/1010/sari-chelek-27.jpg'
  ]

  return (
    <div className={styles.page}>
      <div>
        <h2 className='text-3xl font-medium'>{t('photos')}</h2>
        <p className='text-2xl font-medium mt-5'>{t('pictures')}</p>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          spaceBetween={30}
          slidesPerView={1}
          className={styles.swiper}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src} alt={`Gallery ${index}`} className={styles.img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Gallery
