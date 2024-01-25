import React, { useEffect, useState } from "react";
import Icons from '../components/icons';
import RightLayout from '../components/rightLayout';
import BeginForm from '../components/Start/beginForm';
import RecordForm from '../components/Start/recordForm';
import NextForm from '../components/Start/nextForm';
import ProgressForm from '../components/Start/progress';
import FinishForm from '../components/Start/finish';
import LinearBackground from "../components/LinearBackground";
import TopMenu from "../components/Start/TopMenu";
import { useFullscreen } from "../hooks/useFullscreen";
import RecordFormParent from "../components/Start/recordFormParent";
import SharedJobScreen from "./sharedJobScreen";
import { useNavigate, useRoutes } from "react-router-dom";

// function GetScreen(screen: number, setScreen: any, jobViewContext: any, recorded: any, setRecorded: any, setMainScreen: any) {
//   switch (screen) {
//     case 0: return <BeginForm className={`d-none m-0 flip-child flip-child-0`} setScreen={setScreen} jobViewContext={jobViewContext} recorded={recorded} setMainScreen={setMainScreen} />
//     case 1: return <RecordForm className={`d-none m-0 flip-child flip-child-1`} setScreen={setScreen} jobViewContext={jobViewContext} recorded={recorded} setRecorded={setRecorded} />
//     case 2: return <FinishForm className={`d-none m-0 flip-child flip-child-2`} setScreen={setScreen} jobViewContext={jobViewContext} recorded={recorded} setRecorded={setRecorded} />
//     case 3: return <ProgressForm className={`d-none m-0 flip-child flip-child-3`} setScreen={setScreen} jobViewContext={jobViewContext} recorded={recorded} setRecorded={setRecorded} />
//     case 4: return <NextForm className={`d-none m-0 flip-child flip-child-4`} setScreen={setScreen} />
//   }
// }

function renderScreen(screen: number, setScreen: any, jobViewContext: any, recorded: any, setRecorded: any, setMainScreen: any, fromShareScreen: any, setJobViewContext: any, setFromShareScreen: any) {
  return (
    <>
      <BeginForm className={`m-0 flip-child flip-child-0 hover-anim`} setScreen={setScreen} jobViewContext={jobViewContext} recorded={recorded} setMainScreen={setMainScreen} setJobViewContext={setJobViewContext} setFromShareScreen={setFromShareScreen} />
      <RecordFormParent className={`d-none m-0 flip-child flip-child-1`} fromShareScreen={fromShareScreen} setScreen={setScreen} jobViewContext={jobViewContext} recorded={recorded} setRecorded={setRecorded} />
      <FinishForm className={`d-none m-0 flip-child flip-child-2`} setScreen={setScreen} jobViewContext={jobViewContext} recorded={recorded} setRecorded={setRecorded} />
      <ProgressForm className={`d-none m-0 flip-child flip-child-3`} setScreen={setScreen} jobViewContext={jobViewContext} recorded={recorded} setRecorded={setRecorded} />
      <NextForm className={`d-none m-0 flip-child flip-child-4`} setScreen={setScreen} />
    </>
  )
}

function Next({ jobViewContext, setMainScreen, fromShareScreen, setJobViewContext, setFromShareScreen }: { jobViewContext: any, setMainScreen: any, fromShareScreen: any, setJobViewContext: any, setFromShareScreen: any }) {
  const [screen, setScreen] = useState(0);
  const [firstRender, setFirstRender] = useState(false);
  const [recorded, setRecorded] = useState([]);
  const { fullscreen } = useFullscreen();



  useEffect(() => {
    if (fromShareScreen) {
      console.log("fromShareScreen", fromShareScreen)
      setScreen(1)
    }
  }, [fromShareScreen])



  useEffect(() => {
    if (screen >= 0 || screen <= 4) {
      const previousNode = document.querySelector('.flip-element .flip-child:is(:not(.d-none))');
      const previousScreenClass = previousNode?.classList.toString().split(' ').find(c => c.includes('flip-child-'));
      const previousScreen: any = previousScreenClass?.split('-')[previousScreenClass?.split('-')?.length - 1];

      if (parseInt(previousScreen) !== screen) {
        Array.from(document.querySelectorAll('.flip-element .flip-child')).map(item => {
          const nodeScreenClass = item?.classList.toString().split(' ').find(c => c.includes('flip-child-'));
          const nodeScreen: any = nodeScreenClass?.split('-')[nodeScreenClass?.split('-')?.length - 1];
          if (parseInt(nodeScreen) !== parseInt(previousScreen)) {
            item.classList.add('d-none');
            item.classList.remove('hover-anim');
            item.classList.remove('hover-anim-180');
          }
        });
        document.querySelector(`.flip-element`)?.classList.add('notransition');
        document.querySelector(`.flip-element`)?.classList.remove('flipped');
        document.querySelector(`.flip-child-${parseInt(previousScreen)}`)?.classList.add('notransition');
        document.querySelector(`.flip-child-${parseInt(previousScreen)}`)?.classList.remove('t-180');
        document.querySelector(`.flip-child-${parseInt(previousScreen)}`)?.classList.remove('hover-anim');
        document.querySelector(`.flip-child-${parseInt(previousScreen)}`)?.classList.remove('hover-anim-180');
        document.querySelector(`.flip-child-${screen}`)?.classList.add('notransition');
        document.querySelector(`.flip-child-${screen}`)?.classList.add('t-180');
        setTimeout(() => {
          document.querySelector(`.flip-element`)?.classList.remove('notransition');
          document.querySelector(`.flip-child-${parseInt(previousScreen)}`)?.classList.remove('notransition');
          document.querySelector(`.flip-child-${screen}`)?.classList.remove('notransition');
          setTimeout(() => {
            document.querySelector(`.flip-element`)?.classList.add('flipped');
            document.querySelector(`.flip-child-${screen}`)?.classList.remove('d-none');
            setTimeout(() => {
              document.querySelector(`.flip-child-${parseInt(previousScreen)}`)?.classList.add('d-none');
              setTimeout(() => {
                if (document.querySelector(`.flip-child-${screen}`)?.classList.contains('t-180')) {
                  document.querySelector(`.flip-child-${screen}`)?.classList.add('hover-anim');
                } else {
                  document.querySelector(`.flip-child-${screen}`)?.classList.add('hover-anim');
                }
                document.querySelector(`.flip-element`)?.classList.add('notransition');
                document.querySelector(`.flip-element`)?.classList.remove('flipped');
              }, 1000);
            }, 500);
          }, 100);
        }, 100);
      }
    }
  }, [screen]);

  return (
    <LinearBackground style={{ width: '100%' }}>
      <div className="pageContainer" style={{ padding: 25 }}>
        <div className="leftSideDiv rightSideBg pos-rel bg-transparent" style={fullscreen ? { width: '100%' } : {}}>
          <TopMenu fromShareScreen={fromShareScreen} />
          {/* <div style={{ position: 'absolute' }}>
          {GetScreen(screen, setScreen, jobViewContext, recorded, setRecorded, setMainScreen)}
        </div> */}
          <div style={{ perspective: 1000, position: 'absolute' }}>
            <div className={`flip-element`} style={{ height: 520, width: 320 }}>
              {renderScreen(screen, setScreen, jobViewContext, recorded, setRecorded, setMainScreen, fromShareScreen, setJobViewContext, setFromShareScreen)}
            </div>
          </div>
        </div>
        <RightLayout screen={screen} style={fullscreen ? { display: 'none', borderRadius: 33 } : { borderRadius: 33 }} />
      </div>
    </LinearBackground>
  );
}

export default Next