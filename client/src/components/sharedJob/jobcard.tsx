import { useAuth } from "../../hooks/useAuth"
import { useShared } from "../../hooks/useShare"
import CheckFormBox from "../CheckBoxForm"
import Icons from "../icons"



const JobCard = ({ setShareScreen, setMainScreen, setFromShareScreen, sharedJobData }: { setShareScreen: any, setMainScreen: any, setFromShareScreen: any, sharedJobData: any }) => {

    // const { sharedJobData }: { sharedJobData: any } = useShared()
    const { isLoggedIn } = useAuth()

    console.log("shared job data card", sharedJobData)

    return (
        <div className={`kjjfds-janwkea1 kjjfds-janwkea2 white-form height-none`} style={{ marginTop: "100px", marginBottom: "140px" }}>
            <div className='wave-box'>
                <div className='wave'></div>
            </div>
            <div className="kafms-kfsamfer">
                <div className="skfalk-smdsefds">
                    <div className="kdjnfakdsfm-jsamre">
                        <img src={require("../../images/i5.png")} />
                    </div>
                    <div className="kjdflkads-mdskf">
                        <h3>{sharedJobData?.job_title}</h3>
                        <h5>
                            <Icons iconNumber={16} /> {sharedJobData?.job_recruiter || sharedJobData?.interviewer.company_name}
                        </h5>
                        <h6>
                            <Icons iconNumber={17} /> {sharedJobData?.interviewer.location}
                        </h6>
                    </div>
                </div>
                <div className="njfk-amew">
                    {sharedJobData?.questions?.map((data: any, index: any) => (
                        <CheckFormBox questions={data} noAction={true} />
                    ))}
                </div>
                <div className="kdjsa-ajwnkelds afkfjnkas-edsm">
                    <div className="continueBtnDiv snasdj-sawdne">
                        <button className="btn" onClick={() => {
                            console.log('isloggedin', isLoggedIn())
                            if (isLoggedIn()) {
                                console.log('inside isloggedin')
                                setMainScreen(3)
                                setFromShareScreen(true)

                            }
                            else {
                                console.log("not loggedin case")
                                setShareScreen(2)
                            }
                        }}>
                            Begin
                            <div className="kdksa-ajwmd ">
                                <Icons iconNumber={7} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="ldkjfal0-fdsnfe">
                <Icons iconNumber={62} />
            </div>
        </div>)
}

export default JobCard