import styles from './fourthSection.module.scss';
import Carousel from 'react-elastic-carousel';
import ElasticCarousel from 'react-elastic-carousel';
import Icon from 'react-icons-kit';
import { arrow_left } from 'react-icons-kit/ikons/arrow_left';
import { arrow_right } from 'react-icons-kit/ikons/arrow_right';

const reviews = [
  {
    img: 'Designer.png',
    frontView: (
      <div>
        우리동네에서 <br />
        인기있는 관광지가 <br />
        궁금했는데 <br />
        좋아요와 위치기반으로 <br />
        간편하게 볼 수 있어요.
      </div>
    ),
    backView: (
      <div>
        <img src="Designer.png" alt="디자이너" />
        <span>
          김코딩
          <br /> 2021 / 12 / 10
        </span>
      </div>
    )
  },
  {
    img: 'Fitness.png',
    frontView: (
      <div>
        해시태그로 원하는 곳을 <br />
        쉽고 빠르게 찾을 수 있어서 좋아요!
      </div>
    ),
    backView: (
      <div>
        <img src="Fitness.png" alt="디자이너" />
        <span>
          최코딩
          <br /> 2021 / 12 / 13
        </span>
      </div>
    )
  },
  {
    img: 'kite.png',
    frontView: (
      <div>
        새로운 동네로의 이사나 출장도 설레어요!
        <br />
        산책하는 재미가 생겼어요!!
      </div>
    ),
    backView: (
      <div>
        <img src="kite.png" alt="디자이너" />
        <span>
          정코딩
          <br /> 2021 / 12 / 15
        </span>
      </div>
    )
  }
];
const Reviews = () => {
  const responsive = [
    { width: 400, itemsToShow: 1 },
    { width: 600, itemsToShow: 2 },
    { width: 800, itemsToShow: 3 }
  ];

  const myArrow = ({ type, onClick }: { type: string; onClick: () => void }) => {
    const pointer = type === 'PREV' ? <Icon size={'60'} icon={arrow_left} /> : <Icon size={'60'} icon={arrow_right} />;

    return <div onClick={onClick}>{pointer}</div>;
  };

  return (
    <article className={styles.fourthSection_reviews}>
      {/* <ElasticCarousel isRTL={false} breakPoints={responsive} renderArrow={myArrow} pagination={false}>
        <div>
          {reviews.map(review => (
            <div key={review.img}>
              <img src={`imges/${review.img}`} />
              <div>{review.frontView}</div>
              <div>{review.backView}</div>
            </div>
          ))}
        </div>
      </ElasticCarousel> */}
    </article>
  );
};

export default Reviews;
