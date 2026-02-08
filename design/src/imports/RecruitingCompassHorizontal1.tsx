import svgPaths from "./svg-w5tvrtol9t";

function Group1() {
  return (
    <div className="relative size-full" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70.7107 70.7107">
        <g id="Group">
          <path d={svgPaths.p266d6a72} id="Vector" stroke="var(--stroke-0, #C4A46B)" strokeWidth="2.5" />
          <g id="Group_2">
            <path d={svgPaths.p400e670} fill="var(--fill-0, #2D5A27)" id="Vector_2" />
            <path d={svgPaths.p116ddb80} id="Vector_3" stroke="var(--stroke-0, #F5F5F0)" strokeWidth="1.5" />
            <path d={svgPaths.p1b1c5c00} id="Vector_4" stroke="var(--stroke-0, #F5F5F0)" strokeWidth="1.5" />
            <path d={svgPaths.p3f3a1180} fill="var(--fill-0, #F5F5F0)" id="Vector_5" />
            <path d={svgPaths.p1242c200} fill="var(--fill-0, #F5F5F0)" id="Vector_6" />
          </g>
          <path d="M0.355342 35.3553H70.3553" id="Vector_7" stroke="var(--stroke-0, #F5F5F0)" strokeWidth="1.5" />
          <path d="M32.3553 45.3553H38.3553" id="Vector_8" stroke="var(--stroke-0, #F5F5F0)" strokeWidth="1.5" />
          <path d="M32.3553 51.3553H38.3553" id="Vector_9" stroke="var(--stroke-0, #F5F5F0)" strokeWidth="1.5" />
          <path d="M32.3553 57.3553H38.3553" id="Vector_10" stroke="var(--stroke-0, #F5F5F0)" strokeWidth="1.5" />
          <path d="M32.3553 63.3553H38.3553" id="Vector_11" stroke="var(--stroke-0, #F5F5F0)" strokeWidth="1.5" />
          <path d={svgPaths.p3c0a2680} fill="var(--fill-0, #C4A46B)" id="Vector_12" />
          <path d={svgPaths.p1097baa0} fill="var(--fill-0, #8B6914)" id="Vector_13" stroke="var(--stroke-0, #F5F5F0)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[-1.2%_79.76%_-1.2%_-0.24%]" data-name="Group">
      <div className="absolute flex inset-[-1.2%_79.76%_-1.2%_-0.24%] items-center justify-center">
        <div className="flex-none rotate-10 size-[70.711px]">
          <Group1 />
        </div>
      </div>
    </div>
  );
}

export default function RecruitingCompassHorizontal() {
  return (
    <div className="relative size-full" data-name="recruiting-compass-horizontal 1">
      <Group />
      <p className="absolute font-['Poppins:Bold',sans-serif] inset-[17.5%_52.5%_-42.5%_22.5%] leading-[normal] not-italic text-[#2d5a27] text-[24px]">the recruiting compass</p>
      <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal inset-[53.75%_52.5%_-78.75%_22.5%] leading-[normal] text-[#6b4423] text-[13px]">find your path • make your move</p>
    </div>
  );
}