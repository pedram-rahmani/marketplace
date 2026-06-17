// "use client";

// import { useState, useContext } from "react";

// import useClickOutside from "@/store/hooks/useClickOutside";
// import ActionMenu from "@/components/ui/ActionMenu/ActionMenu";
// import AuthContext from "@/context/AuthContext";
// import RatingStars from "@/components/ui/RatingStars/RatingStars";
// import LikeDislike from "@/components/feedback/LikeDislike/LikeDislike";

// export default function CommentItem({ comment }) {
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const modalRef = useClickOutside(() => setActiveDropdown(null));
//   const { isLoggedIn, userInfos } = useContext(AuthContext);

//   const toggleDropdown = (id) =>
//     setActiveDropdown((prev) => (prev === id ? null : id));

//   const handleSelectOption = (option) => {
//     console.log(`Selected: ${option} for comment ${activeDropdown}`);
//     setActiveDropdown(null);
//   };

//   return (
//     <article className="p-6 text-base rounded-lg bg-my-gray1/40 dark:bg-my-blue5 shadow mb-4">
//       <div className="flex justify-between items-center mb-2">
//         <div className="flex flex-col xs:flex-row items-center gap-x-2">
//           <div className="flex gap-x-1 items-center mr-2 text-sm text-my-Txt2 dark:text-my-Txt1 font-semibold">
//             <div className="w-6 h-6 rounded-full overflow-hidden">
//               <img
//                 src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
//                 alt={comment.name}
//               />
//             </div>
//             <span>{comment.name}</span>
//           </div>
//           <div className="text-sm text-my-Txt2 dark:text-my-Txt1">
//             <time dateTime={comment.created_at} title={comment.created_at}>
//               {comment.created_at}
//             </time>
//           </div>
//         </div>

//         <div className="relative dropdown-container" ref={modalRef}>
//           {isLoggedIn &&
//           (userInfos?.role === "admin" || userInfos?.role === "co-admin") ? (
//             <>
//               <button
//                 className="flex items-center p-1 text-center bg-my-light3/70 dark:bg-my-blue4 rounded-lg hover:bg-my-dark1/10  dark:hover:bg-my-blue3/80 duration-200 cursor-pointer"
//                 onClick={() => toggleDropdown(comment.id)}
//               >
//                 <svg viewBox="0 0 24 24">
//                   <path d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
//                 </svg>
//               </button>

//               {activeDropdown === comment.id && (
//                 <ActionMenu
//                   onSelect={handleSelectOption}
//                   options={["ویرایش", "حذف", "گزارش"]}
//                 />
//               )}
//             </>
//           ) : (
//             <button
//               onClick={() => handleSelectOption("گزارش")}
//               className="flex items-center hover:text-my-red1/70 dark:hover:text-my-yellow/70 transition-colors duration-200"
//               title="گزارش این نظر"
//             >
//               <svg viewBox="0 0 16 16" className="size-5">
//                 <path d="M1.5 1h13l.5.5v10l-.5.5H7.707l-2.853 2.854L4 14.5V12H1.5l-.5-.5v-10l.5-.5z" />
//                 <path d="M7.5 3h1v4.3h-1V3z" />
//                 <circle cx="8" cy="9.6" r="0.5" />
//               </svg>
//             </button>
//           )}
//         </div>
//       </div>

//       <RatingStars rating={comment.rate} />

//       <p className="text-my-Txt2/80 dark:text-my-Txt1/70 text-sm">
//         {comment.text}
//       </p>

//       <div className="flex mt-4 mr-auto lg:mr-0 items-center justify-end">
//       <LikeDislike info={comment} type="comment" />
//       </div>
//     </article>
//   );
// }
