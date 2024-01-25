import Icons from '../icons';

const BottomMenu = ({ setMainScreen }: { setMainScreen: any }) => {
  return <div className='kdnklms-awendwd'>
    <div onClick={() => {
      setMainScreen(0)
    }} className={`khjn0-jandw`}>
      <Icons iconNumber={53} />
      <h5>Questions</h5>
    </div>
    <div onClick={() => {
      setMainScreen(0)
    }} className={`khjn0-jandw`}>
      <Icons iconNumber={54} />
      <h5 className=''>Answers</h5>
    </div>
    <div
      onClick={() => {
        setMainScreen(0)
      }} className={`khjn0-jandw`}>
      <Icons iconNumber={55} />
      <h5>Messages</h5>
    </div>
  </div>
}

export default BottomMenu;