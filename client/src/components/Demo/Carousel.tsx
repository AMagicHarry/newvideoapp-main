import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//@ts-ignore
import Icons from '../icons';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import VideoForm from './Video';

const RightButtons = ({ setMainScreen }: { setMainScreen?: any }) => {
  const isTab = useMediaQuery({ query: '(max-width: 1180px)' });


  return <div className={`kljadjfkl-jaem ${isTab ? "adaslkhdfjksj-ajenw" : ""}`} style={{ left: '15px', position: 'relative' }}>
    <button className='no-shadow circleButtons' onClick={() => {
      setMainScreen(0)
    }}>
      <Icons iconNumber={isTab ? 70 : 68} />
      Favourite
    </button>
    <button className='no-shadow circleButtons' onClick={() => {
      setMainScreen(0)
    }}>
      <Icons iconNumber={isTab ? 71 : 69} />
      Forward
    </button>
    <button className='no-shadow circleButtons' onClick={() => {
      setMainScreen(0)
    }}>
      <Icons iconNumber={isTab ? 72 : 48} />
      Message
    </button>
    <button className='no-shadow circleButtons' onClick={() => {
      setMainScreen(0)
    }}>
      <Icons iconNumber={isTab ? 73 : 49} />
      Delete
    </button>
  </div>
}

const Carousel = ({ selectedInterview, setMainScreen, paginate = 1 }: { selectedInterview?: any, setMainScreen?: any, paginate?: any }) => {
  const [favourite, setFavourite] = useState(selectedInterview?.favourite || false);

  return (
    <div className='wh-100 kjsdfl-asjdm' style={{ position: 'absolute' }}>
      <VideoForm selectedInterview={selectedInterview} favourite={favourite} paginate={paginate} />
      <RightButtons setMainScreen={setMainScreen} />
    </div>
  )
};

export default Carousel;