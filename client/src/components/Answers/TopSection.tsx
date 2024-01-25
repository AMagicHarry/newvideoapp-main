import SearchFilter from "../Modals/SearchFilter";
import Icons from "../icons";
import Back from "./Back";
import { useShared } from "../../hooks/useShare"

const TopSec = ({ setMainScreen, showScreen, setshowScreen, showFilter, handleFilterShow, handleFilterClose, selectedFilter, setSelectedFilter }: { flag: any, setMainScreen: any, showScreen: number, setshowScreen: any, showFilter: boolean, handleFilterShow: any, handleFilterClose: any, selectedFilter: any, setSelectedFilter: any }) => {
  const { setFlag } = useShared()
  return <>
    <div className="leftSideHeader" style={{ position: 'absolute', top: 0, width: '100%' }}>
      <Back setMainScreen={setMainScreen} setShowScreen={setshowScreen} handleFilterClose={handleFilterClose} />

      <div className="d-flex justify-content-between">
        <div className="sortButtonDiv" onClick={handleFilterShow}>
          <h5 className="mksaldkamaw-jdwa">Filter</h5>
          <h5 className="mksaldkamaw-jdwa sortButtonIcon">
            <Icons iconNumber={91} />
          </h5>
        </div>

        <button
          onClick={() => {
            const _window: any = window;
            setFlag(false);
            _window.setShowScreen = 1;
            setMainScreen(1);
          }}
          className="kjlma0o-dwa jksdalfj-jasidm" style={{ width: 150, marginLeft: 10 }}
        >
          <Icons iconNumber={30} />
          Create Interview
        </button>
      </div>
      <SearchFilter show={showFilter} handleClose={handleFilterClose} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
    </div>
  </>
}
export default TopSec