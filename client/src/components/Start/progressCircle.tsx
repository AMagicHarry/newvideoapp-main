import { useEffect } from "react";
import Icons from "../icons";

interface BekeyProgressbarOptions {
  animate: boolean;
  animateText: boolean;
}

declare global {
  interface JQuery {
    bekeyProgressbar(options?: BekeyProgressbarOptions): void;
  }
}

const ProgressCircle = ({ setScreen, jobViewContext, recorded, setRecorded, className = '' }: { setScreen: any, jobViewContext: any, recorded: any, setRecorded: any, className?: any }) => {

  function calculateProgress(max: number, current: number) {
    current = Math.min(Math.max(current, 1), max);
    const progress = (current / max) * 100;
    return Math.floor(progress);
  }

  useEffect(() => {
    (function ($) {
      $.fn.bekeyProgressbar = function (options: BekeyProgressbarOptions = {
        animate: true,
        animateText: true
      }): void {
        const $this = $(this);

        const $progressBar = $this;
        const $progressCount = $progressBar.find('.ProgressBar-percentage--count');
        const $circle = $progressBar.find('.ProgressBar-circle');
        const percentageProgress = parseInt($progressBar.attr('data-progress') || '0', 10);
        const percentageRemaining = 100 - percentageProgress;
        const percentageText = parseInt($progressBar.attr('data-progress') || '0', 10);

        const radius = parseInt($circle.attr('r') || '0', 10);
        const diameter = radius * 2;
        const circumference = Math.round(Math.PI * diameter);

        const percentage = (circumference * percentageRemaining) / 100;

        $circle.css({
          'stroke-dasharray': circumference,
          'stroke-dashoffset': percentage
        });

        if (options.animate === true) {
          $circle.css({
            'stroke-dashoffset': circumference
          }).animate({
            'stroke-dashoffset': percentage
          }, 3000);
        }

        if (options.animateText === true) {
          $({ Counter: 0 })
            .animate({
              Counter: percentageText
            }, {
              duration: 3000,
              step: function () {
                $progressCount.html(`
                  ${Math.ceil(this.Counter) + '%'}
                  <h6>${recorded?.length || 1} OF ${jobViewContext?.questions?.length || 3}</h6>
                `);
              }
            });
        } else {
          $progressCount.text(percentageText + '%');
        }
      };
    })(jQuery);

    $(document).ready(function () {
      $('.ProgressBar--animateAll').bekeyProgressbar();
    });
  }, [])

  return (
    <div className="ProgressBar ProgressBar--animateAll" data-progress={calculateProgress(jobViewContext?.questions?.length || 3, recorded?.length || 1)}>
      <svg className="ProgressBar-contentCircle">
        <circle transform="rotate(-77, 90, 90)" className="ProgressBar-background" cx="90" cy="90" r="77" />
        <circle transform="rotate(-77, 90, 90)" className="ProgressBar-circle" cx="90" cy="90" r="77" />
      </svg>
      <span className="ProgressBar-percentage ProgressBar-percentage--count" style={{ paddingLeft: 10 }}></span>
      <div className="knl-masdkw" style={{ marginLeft: -132, marginTop: 5 }}>
        <Icons iconNumber={23} />
      </div>
    </div>
  );
};

export default ProgressCircle;