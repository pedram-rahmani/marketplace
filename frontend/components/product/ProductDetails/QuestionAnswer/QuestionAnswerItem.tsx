import LikeDislike from "@/components/feedback/LikeDislike/LikeDislike";

export default function QuestionAnswerItem({
  question,
  visibleAnswers,
  onShowMore,
}) {
  return (
    <div className="p-6 text-base rounded-lg bg-my-gray1/40 dark:bg-my-blue5 shadow mb-4">
      <div className="flex items-center gap-x-2 mb-2">
        <svg viewBox="0 0 24 24" className="text-my-blue1 w-5 h-5">
          <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
        <p className="text-my-Txt2 dark:text-my-Txt1">
          {question.text}
        </p>
      </div>

      <div className="flex flex-col mt-4 mr-auto lg:mr-0 last:[&>div]:border-none">
        {/* Ensure answers is an array before using slice */}
        {(question.answers || []).slice(0, visibleAnswers).map((answer) => (
          <div
            key={answer.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mx-6 pr-1 pt-3 pb-6 text-base mb-4 border-b-2 border-b-my-gray4/10 dark:border-b-my-dark3/60"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <span className="flex items-center justify-center text-[0.5rem] leading-3 rounded-full px-2 py-2.5 bg-my-purple1 text-my-Txt1">
                  پاسخ
                </span>
                <p className="text-my-Txt2 dark:text-my-Txt1/90 text-sm">
                  {answer.text}
                </p>
              </div>
              <div className="flex gap-x-1 mr-10 mt-1 text-xs">
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                {answer.name}
              </div>
            </div>

            <LikeDislike info={answer} type="answer" />
          </div>
        ))}

        {visibleAnswers < question.answers?.length && (
          <button
            className="flex items-center gap-x-1 mt-4 mx-auto text-xs tracking-tighter text-my-blue2 dark:text-sky-400 hover:text-my-blue1 dark:hover:text-sky-300 transition-colors"
            onClick={onShowMore}
          >
            نمایش پاسخ های دیگر
            <svg viewBox="0 0 24 24" className="size-4">
              <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
