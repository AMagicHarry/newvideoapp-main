import Icons from "../icons"

const Back = ({ setMainScreen, setShowScreen, handleFilterClose }: { setMainScreen: any, setShowScreen: any, handleFilterClose?: any }) => {
  return <div onClick={() => { }} className="skdmsa-dsad justify-content-start">
    <div onClick={() => {
        setMainScreen(2);
        setShowScreen(0);
        if(typeof handleFilterClose === 'function') {
          handleFilterClose();
        }
      }} className="backButtonDiv backdrop-filter">
      <button className="hkjndankad-dnsd">
        <Icons iconNumber={29} />
      </button>
      <h5 className="mksaldkamaw-jdwa">Back</h5>
    </div>
    {/* <div className="headerTitleDiv">
      <div><Icons iconNumber={31} /></div>
      <h5 className="mksaldkamaw-jdwa">Cleaner Job in Central</h5>
    </div> */}
  </div>
}

export default Back;