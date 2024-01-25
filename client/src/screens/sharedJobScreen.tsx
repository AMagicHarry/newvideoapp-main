import { useEffect, useState } from "react"
import Welcome from "../components/sharedJob/welcome"
import JobCard from "../components/sharedJob/jobcard"

import Icons from "../components/icons"
import ShareLogin from "../components/sharedJob/loginForm"
import SignIn from "../components/sharedJob/signIn"
import { useShared } from "../hooks/useShare"

const Back = () => {
    return <div onClick={() => { }} className="d-flex w-100 ms-4">
        <div onClick={() => {
        }} className="backButtonDiv backdrop-filter">
            <button className="hkjndankad-dnsd">
                <Icons iconNumber={29} />
            </button>
            <h5 className="mksaldkamaw-jdwa">Back</h5>
        </div>
    </div>
}


const SharedJobScreen = ({ setMainScreen, setJobViewContext, setFromShareScreen, jobViewContext }: { setMainScreen: any, setJobViewContext: any, setFromShareScreen: any, jobViewContext: any }) => {
    const [shareScreen, setShareScreen] = useState(0)
    const { sharedJobData } = useShared()
    console.log("shared scren", jobViewContext)
    // useEffect(() => {
    //     setJobViewContext(sharedJobData)
    // }, [sharedJobData])

    const Back = () => {
        return <div onClick={() => { }} className="d-flex w-100 ms-4">
            <div onClick={() => {
                if (shareScreen == 1) {
                    setShareScreen(0)
                }
                if (shareScreen == 2) {
                    setShareScreen(1)
                }
                if (shareScreen == 3) {
                    setShareScreen(2)
                }
            }} className="backButtonDiv backdrop-filter">
                <button className="hkjndankad-dnsd">
                    <Icons iconNumber={29} />
                </button>
                <h5 className="mksaldkamaw-jdwa">Back</h5>
            </div>
        </div>
    }

    return (
        <div className="leftSideDiv rightSideBg pos-rel over-hdn auth-page d-flex justify-content-center align-items-center" style={{ width: "100%" }} id="parentDiv"  >

            {shareScreen == 0 ?
                <Welcome setShareScreen={setShareScreen} /> : shareScreen == 1 ?
                    <>
                        <Back />
                        <JobCard sharedJobData={jobViewContext} setShareScreen={setShareScreen} setMainScreen={setMainScreen} setFromShareScreen={setFromShareScreen} />
                    </>
                    : shareScreen == 2 ?
                        <>
                            <Back />
                            <ShareLogin setShareScreen={setShareScreen} setMainScreen={setMainScreen} setFromShareScreen={setFromShareScreen} />
                        </>
                        : shareScreen == 3 ?
                            <>
                                <Back />
                                <SignIn setShareScreen={setShareScreen} setMainScreen={setMainScreen} setFromShareScreen={setFromShareScreen} />
                            </> : null
            }

        </div>
    )
}

export default SharedJobScreen