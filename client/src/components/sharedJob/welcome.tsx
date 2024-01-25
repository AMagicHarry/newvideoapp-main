
import Icons from "../icons"
import SimpleCheckBox from "../simpleCheck"


const Welcome = ({ setShareScreen, }: { setShareScreen: any }) => {
    return (
        <div className={` welcome-parent `} style={{ marginTop: "100px", marginBottom: "140px" }} >
            <div className="welcome-container">
                <div className="welcome-title  ">
                    Welcome to your Video Interview...
                </div>
                <div>
                    <div className="kadfmsod-wem p-3 welcome-checks mt-2 ">
                        <div >
                            {" "}
                            <Icons iconNumber={15} />
                        </div>
                        <h5>
                            There are <span>3 Questions</span> in total. You’ll have a
                            maximum of 30 seconds for each answer.
                        </h5>
                    </div>
                    <div className="kadfmsod-wem p-3  welcome-checks mt-2">
                        <div>
                            {" "}
                            <Icons iconNumber={15} />
                        </div>
                        <h5>
                            Be sure to check your <span>Camera Position</span> &{" "}
                            <span>Lighting</span> is stable before recording.
                        </h5>
                    </div>
                    <div className="kadfmsod-wem p-3  welcome-checks mt-2">
                        <div>
                            {" "}
                            <Icons iconNumber={15} />
                        </div>
                        <h5>
                            If you run out of things to say, just click the {" "}
                            <span>Stop</span> button to end your answer at any time.
                        </h5>
                    </div>
                    <div className="createVideoInterviewBtnDiv ml-0">
                        <button className="btn no-shadow asjdsajde ml-0" onClick={() => {
                            //   setMainScreen(0);
                            setShareScreen(1)
                            //   setShowScreen(0);
                        }}>Get Started</button>
                    </div>
                </div>
            </div>

        </div>



    )
}


export default Welcome

//     < div onClick = {() => {
//     setisAgree(!isAgree)
// }} className = "checkboxGreen" >
//         <Icons iconNumber={isAgree ? 2 : 76} />
//         <h5>
//             <span>{span}</span>
//             {title}
//         </h5>
//     </div >