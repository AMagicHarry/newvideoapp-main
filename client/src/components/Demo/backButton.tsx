import Icons from '../icons';

const BackButton = ({ setMainScreen }: { setMainScreen: any }) => {
  return (
    <div
      onClick={() => {
        setMainScreen(0);
      }}
      className="skdmsa-dsad w-100 d-flex justify-content-between"
    >
      <div className="backButtonDiv">
        <button className="hkjndankad-dnsd">
          <Icons iconNumber={29} />
        </button>
        <h5 className="mksaldkamaw-jdwa">Back</h5>
      </div>
      <button
        onClick={() => {
          setMainScreen(0);
        }}
        className="kjlma0o-dwa jksdalfj-jasidm" style={{ width: 150 }}
      >
        <Icons iconNumber={30} />
        Create Interview{" "}
      </button>
    </div>
  );
};

export default BackButton