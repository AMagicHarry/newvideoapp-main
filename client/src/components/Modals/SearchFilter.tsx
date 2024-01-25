import { useEffect } from "react";
import { Modal } from "react-bootstrap";
// @ts-ignore
import $ from "jquery";
import { AnswerFilter } from "../../screens/answers";

const SearchFilter = ({ show, handleClose, selectedFilter, setSelectedFilter }: { show: boolean, handleClose: any, selectedFilter: any, setSelectedFilter: any }) => {
  useEffect(() => {
    if (show) {
      // $(".modal-backdrop").css("opacity", 0);
      $(".backButtonDiv").addClass("backButtonDivOnModal z-index-1060");
      $(".kdnklms-awendwd").addClass("z-index-1060");
    } else {
      $(".backButtonDiv").removeClass("backButtonDivOnModal z-index-1060");
      $(".kdnklms-awendwd").removeClass("z-index-1060");
    }
  }, [show]);

  return (
    <Modal className="modal-primary filter-modal bg-transparent" show={show} onHide={handleClose} centered contentClassName="filters-modal-css">
      <Modal.Header>
        <div className="d-flex justify-content-start align-items-center">
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0 me-2">
            <path d="M1 2.27273H8.5H1ZM8.5 2.27273C8.5 2.97565 9.05962 3.54545 9.75 3.54545C10.4404 3.54545 11 2.97565 11 2.27273C11 1.5698 10.4404 1 9.75 1C9.05962 1 8.5 1.5698 8.5 2.27273ZM3.5 7.72727H11H3.5ZM3.5 7.72727C3.5 7.02435 2.94036 6.45455 2.25 6.45455C1.55964 6.45455 1 7.02435 1 7.72727C1 8.4302 1.55964 9 2.25 9C2.94036 9 3.5 8.4302 3.5 7.72727Z" fill="white" />
            <path d="M1 2.27273H8.5M8.5 2.27273C8.5 2.97565 9.05963 3.54545 9.75 3.54545C10.4404 3.54545 11 2.97565 11 2.27273C11 1.5698 10.4404 1 9.75 1C9.05963 1 8.5 1.5698 8.5 2.27273ZM3.5 7.72727H11M3.5 7.72727C3.5 7.02435 2.94036 6.45455 2.25 6.45455C1.55964 6.45455 1 7.02435 1 7.72727C1 8.4302 1.55964 9 2.25 9C2.94036 9 3.5 8.4302 3.5 7.72727Z" stroke="white" stroke-linecap="round" />
          </svg>
          <h4 className="text-white">Search Filters</h4>
        </div>
        <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0">
          <path fill-rule="evenodd" clipRule="evenodd" d="M2.66958 1.11595C2.24121 0.687583 1.58365 0.650726 1.20083 1.03354C0.818022 1.41635 0.85502 2.07377 1.28339 2.50214L4.85156 6.07031L1.11946 9.80242C0.690564 10.2313 0.655277 10.8897 1.04079 11.2752C1.4263 11.6607 2.08465 11.6254 2.51355 11.1965L6.24565 7.4644L9.9663 11.185C10.3947 11.6134 11.0521 11.6504 11.4349 11.2676C11.8177 10.8848 11.7809 10.2272 11.3525 9.79886L7.63184 6.07821L11.1964 2.51368C11.6251 2.08495 11.6604 1.42661 11.2749 1.0411C10.8893 0.655582 10.231 0.690858 9.80228 1.1196L6.23775 4.68412L2.66958 1.11595Z" fill="white" />
        </svg>
      </Modal.Header>
      <Modal.Body className="row text-white">
        <div className="col">
          <h6>SUBMITTED</h6>
          <h5 onClick={() => {
            setSelectedFilter(AnswerFilter.LastHour);
            handleClose();
          }} className={`filter-item ${selectedFilter === AnswerFilter.LastHour ? 'filter-item-active' : ''}`}>{AnswerFilter.LastHour}</h5>
          <h5 onClick={() => {
            setSelectedFilter(AnswerFilter.Today);
            handleClose();
          }} className={`filter-item ${selectedFilter === AnswerFilter.Today ? 'filter-item-active' : ''}`}>{AnswerFilter.Today}</h5>
          <h5 onClick={() => {
            setSelectedFilter(AnswerFilter.ThisWeek);
            handleClose();
          }} className={`filter-item ${selectedFilter === AnswerFilter.ThisWeek ? 'filter-item-active' : ''}`}>{AnswerFilter.ThisWeek}</h5>
          <h5 onClick={() => {
            setSelectedFilter(AnswerFilter.ThisMonth);
            handleClose();
          }} className={`filter-item ${selectedFilter === AnswerFilter.ThisMonth ? 'filter-item-active' : ''}`}>{AnswerFilter.ThisMonth}</h5>
          <h5 onClick={() => {
            setSelectedFilter(AnswerFilter.ThisYear);
            handleClose();
          }} className={`filter-item ${selectedFilter === AnswerFilter.ThisYear ? 'filter-item-active' : ''}`}>{AnswerFilter.ThisYear}</h5>
        </div>
        <div className="col">
          <h6>FEATURES</h6>
          <h5>Favourite</h5>
          <h5>Messaged</h5>
          <h5>Watched</h5>
          <h5>Unwatched</h5>
        </div>
        <div className="col">
          <h6>SORT BY</h6>
          <h5>Upload date</h5>
          <h5>Rating</h5>
          <h5>First Name</h5>
          <h5>Surname</h5>
        </div>
        <div className="col mt-3">
          <h6 style={{ width: '96%' }}>LOCATION</h6>
          <div className="d-flex align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)', width: 285, height: 51, marginLeft: '-12.5px', borderRadius: '15px', marginTop: 10, padding: 15 }}>
            <svg className="mt-0" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.99886 0C4.32 0 2.14062 2.17969 2.14062 4.85862C2.14062 7.43733 6.54859 13.4621 6.73627 13.7172L6.91144 13.9556C6.93192 13.9836 6.96454 14 6.99886 14C7.03371 14 7.06612 13.9836 7.08681 13.9556L7.26187 13.7172C7.44967 13.4621 11.8575 7.43733 11.8575 4.85862C11.8575 2.17969 9.67779 0 6.99886 0ZM6.99886 3.11827C7.9587 3.11827 8.73921 3.89881 8.73921 4.85862C8.73921 5.81794 7.95867 6.59897 6.99886 6.59897C6.03958 6.59897 5.25851 5.81794 5.25851 4.85862C5.25851 3.89881 6.03955 3.11827 6.99886 3.11827Z" fill="white" />
            </svg>
            <p className="ms-2" style={{ fontFamily: 'HK Grotesk', fontSize: '14px', fontWeight: 500, lineHeight: '19px', letterSpacing: '0px', textAlign: 'left' }}>
              London, UK
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SearchFilter;