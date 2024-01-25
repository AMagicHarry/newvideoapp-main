import { useFullscreen } from "../../hooks/useFullscreen";
import SearchFilter from "../Modals/SearchFilter";
import Icons from "../icons";
import { useMediaQuery } from 'react-responsive'

const BackMenu = ({
  showScreen,
  setShowScreen,
  showRightMenu,
  setShowRightMenu,
}: {
  showScreen: number;
  setShowScreen: any;
  showRightMenu?: any;
  setShowRightMenu?: any;
}) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1013px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' })
  const { fullscreen, setFullscreen } = useFullscreen();

  return (
    <div className={`leftSideHeader ${showScreen == 5 && isMobile ? "jdafk-aewkmw" : ""}`} style={{ position: 'absolute', top: 0, width: '100%' }}>
      <div
        onClick={() => {
          if (showScreen == 1) {
            setShowScreen(0);
          } else if (showScreen == 2) {
            setShowScreen(1);
          } else if (showScreen == 3) {
            setShowScreen(2);
          } else if (showScreen == 4) {
            setShowScreen(3);
          } else if (showScreen == 5) {
            setShowScreen(4);
          } else if (showScreen == 6) {
            setShowScreen(5);
          } else if (showScreen == 7) {
            setShowScreen(0);
          }
        }}
        className="backButtonDiv backdrop-filter"
      >
        <button className="hkjndankad-dnsd">
          <Icons iconNumber={29} />
        </button>
        <h5 className="mksaldkamaw-jdwa">Back</h5>
      </div>
      <div className="d-flex justify-content-between">
        {/* {true ? (
          <button className="njkljmdasp-dawm" onClick={() => {
            setFullscreen(!fullscreen);
          }}>
            <span style={{ fontSize: fullscreen ? 30 : 20, fontWeight: 400, marginRight: 5 }}>{fullscreen ? '-' : '+'}</span>
            Full Screen
          </button>
        ) : (
          <></>
        )} */}
        <div className="sortButtonDiv" onClick={() => { }}>
          <h5 className="mksaldkamaw-jdwa">Filter</h5>
          <h5 className="mksaldkamaw-jdwa sortButtonIcon">
            <Icons iconNumber={91} />
          </h5>
        </div>

        {
          isTabletOrMobile && showScreen == 6 ?
            <button
              onClick={() => {
                setShowRightMenu(!showRightMenu)
              }}
              className={`kjlma0o-dwa ${showRightMenu ? "sdsds" : ""}`}
            >
              <Icons iconNumber={61} />
              Options{" "}
            </button>
            : <button
              onClick={() => {
                setShowScreen(1);
              }}
              className="kjlma0o-dwa jksdalfj-jasidm" style={{ width: 150, marginLeft: 10 }}
            >
              <Icons iconNumber={30} />
              Create Interview
            </button>
        }
      </div>
      <SearchFilter show={false} handleClose={''} selectedFilter={''} setSelectedFilter={''} />
    </div>
  );
};
export default BackMenu