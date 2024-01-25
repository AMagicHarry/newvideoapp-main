import Icons from "../icons";

const BackButton = ({
    showScreen,
    setshowScreen,
  }: {
    showScreen: number;
    setshowScreen: any;
  }) => {
    return (
      <div
        onClick={() => {
          if (showScreen == 1) {
            setshowScreen(0);
          } else if (showScreen == 2) {
            setshowScreen(1);
          } else if (showScreen == 3 ) {
            setshowScreen(0);
          } else if (showScreen == 4 ) {
            setshowScreen(2);
          } else if (showScreen == 5 ) {
            setshowScreen(4);
          } else if (showScreen == 6 ) {
            setshowScreen(5);
          } else if (showScreen == 7 ) {
            setshowScreen(6);
          }
        }}
        className="skdmsa-dsad"
      >
        <div className="backButtonDiv">
          <button className="hkjndankad-dnsd">
            <Icons iconNumber={29} />
          </button>
          <h5 className="mksaldkamaw-jdwa">Back</h5>
        </div>
      </div>
    );
  };

export default BackButton