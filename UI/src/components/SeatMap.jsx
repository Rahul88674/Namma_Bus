// const SteeringWheelIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-400">
//     <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
//     <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
//     <path d="M12 6.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//     <path d="M7.5 14.5L9.8 13.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//     <path d="M16.5 14.5L14.2 13.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//   </svg>
// );

// const SeatRect = ({ seat, isSelected, isLoading, onClick, fare }) => {
//   const isBooked = seat.status === 'BOOKED';
//   const isLockedByOther = seat.status === 'LOCKED' && !isSelected;
//   const isDisabled = isBooked || isLockedByOther || isLoading;

//   let classes = 'border-emerald-400 bg-white hover:border-emerald-500';
//   let labelText = `₹${fare}`;
//   let labelClasses = 'text-slate-500';

//   if (isBooked) {
//     classes = 'bg-slate-100 border-slate-200 cursor-not-allowed';
//     labelText = 'Sold';
//     labelClasses = 'text-slate-400';
//   } else if (isLockedByOther) {
//     classes = 'bg-yellow-50 border-yellow-300 cursor-not-allowed';
//     labelText = 'Held';
//     labelClasses = 'text-yellow-600';
//   } else if (isSelected) {
//     classes = 'bg-orange-500 border-orange-500';
//     labelClasses = 'text-white';
//   } else if (isLoading) {
//     classes = 'border-slate-300 opacity-60 cursor-wait';
//   }

//   return (
//     <button
//       type="button"
//       disabled={isDisabled}
//       onClick={() => onClick(seat)}
//       className={`w-16 h-24 rounded-md border-2 flex flex-col items-center justify-end pb-2 transition-colors ${classes}`}
//     >
//       <span className={`text-[11px] font-medium ${labelClasses}`}>{labelText}</span>
//     </button>
//   );
// };

// // Each row = [single seat] [aisle gap] [double seat pair]
// // const DeckPanel = ({ title, seats, selectedSeats, lockingSeatId, onSeatClick, fare, showWheel }) => {
// //   const rows = [];
// //   for (let i = 0; i < seats.length; i += 3) {
// //     rows.push(seats.slice(i, i + 3));
// //   }

// //   return (
// //     <div className="bg-white rounded-2xl shadow-sm p-6 flex-1">
// //       <div className="flex items-center justify-between mb-5">
// //         <h3 className="font-semibold text-slate-800">{title}</h3>
// //         {showWheel && (
// //           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
// //             <SteeringWheelIcon />
// //           </div>
// //         )}
// //       </div>
// //       <div className="flex flex-col gap-4">
// //         {rows.map((row, idx) => {
// //           const [single, doubleA, doubleB] = row;
// //           return (
// //             <div key={idx} className="flex items-center gap-3">
// //               {single && (
// //                 <SeatRect
// //                   seat={single}
// //                   fare={fare}
// //                   isSelected={selectedSeats.includes(single.id)}
// //                   isLoading={lockingSeatId === single.id}
// //                   onClick={onSeatClick}
// //                 />
// //               )}

// //               {/* aisle / walking gap */}
// //               <div className="w-10"></div>

// //               <div className="flex gap-1">
// //                 {doubleA && (
// //                   <SeatRect
// //                     seat={doubleA}
// //                     fare={fare}
// //                     isSelected={selectedSeats.includes(doubleA.id)}
// //                     isLoading={lockingSeatId === doubleA.id}
// //                     onClick={onSeatClick}
// //                   />
// //                 )}
// //                 {doubleB && (
// //                   <SeatRect
// //                     seat={doubleB}
// //                     fare={fare}
// //                     isSelected={selectedSeats.includes(doubleB.id)}
// //                     isLoading={lockingSeatId === doubleB.id}
// //                     onClick={onSeatClick}
// //                   />
// //                 )}
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };
// const DeckPanel = ({ title, seats, selectedSeats, lockingSeatId, onSeatClick, fare, showWheel }) => {
//   const rows = [];
//   for (let i = 0; i < seats.length; i += 3) {
//     rows.push(seats.slice(i, i + 3));
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-sm p-5 w-fit">
//       <div className="flex items-center justify-between gap-6 mb-5">
//         <h3 className="font-semibold text-slate-800">{title}</h3>
//         {showWheel && (
//           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
//             <SteeringWheelIcon />
//           </div>
//         )}
//       </div>
//       <div className="flex flex-col gap-3">
//         {rows.map((row, idx) => {
//           const [single, doubleA, doubleB] = row;
//           return (
//             <div key={idx} className="flex items-center gap-3">
//               {single && (
//                 <SeatRect
//                   seat={single}
//                   fare={fare}
//                   isSelected={selectedSeats.includes(single.id)}
//                   isLoading={lockingSeatId === single.id}
//                   onClick={onSeatClick}
//                 />
//               )}

//               <div className="w-8"></div>

//               <div className="flex gap-1">
//                 {doubleA && (
//                   <SeatRect
//                     seat={doubleA}
//                     fare={fare}
//                     isSelected={selectedSeats.includes(doubleA.id)}
//                     isLoading={lockingSeatId === doubleA.id}
//                     onClick={onSeatClick}
//                   />
//                 )}
//                 {doubleB && (
//                   <SeatRect
//                     seat={doubleB}
//                     fare={fare}
//                     isSelected={selectedSeats.includes(doubleB.id)}
//                     isLoading={lockingSeatId === doubleB.id}
//                     onClick={onSeatClick}
//                   />
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // const SeatMap = ({ seats, selectedSeats, lockingSeatId, onSeatClick, fare }) => {
// //   const lowerSeats = seats.filter((s) => s.deck === 'LOWER');
// //   const upperSeats = seats.filter((s) => s.deck === 'UPPER');

// //   return (
// //     <div>
// //       <div className="flex flex-col md:flex-row gap-4">
// //         {lowerSeats.length > 0 && (
// //           <DeckPanel
// //             title="Lower Deck"
// //             seats={lowerSeats}
// //             selectedSeats={selectedSeats}
// //             lockingSeatId={lockingSeatId}
// //             onSeatClick={onSeatClick}
// //             fare={fare}
// //             showWheel
// //           />
// //         )}
// //         {upperSeats.length > 0 && (
// //           <DeckPanel
// //             title="Upper Deck"
// //             seats={upperSeats}
// //             selectedSeats={selectedSeats}
// //             lockingSeatId={lockingSeatId}
// //             onSeatClick={onSeatClick}
// //             fare={fare}
// //           />
// //         )}
// //       </div>

// //       <div className="flex gap-5 mt-5 text-sm text-slate-600">
// //         <span className="flex items-center gap-2">
// //           <span className="w-4 h-5 rounded border-2 border-emerald-400 bg-white"></span> Available
// //         </span>
// //         <span className="flex items-center gap-2">
// //           <span className="w-4 h-5 rounded bg-orange-500"></span> Selected
// //         </span>
// //         <span className="flex items-center gap-2">
// //           <span className="w-4 h-5 rounded bg-slate-100 border-2 border-slate-200"></span> Sold
// //         </span>
// //         <span className="flex items-center gap-2">
// //           <span className="w-4 h-5 rounded bg-yellow-50 border-2 border-yellow-300"></span> Held
// //         </span>
// //       </div>
// //     </div>
// //   );
// // };
// const SeatMap = ({ seats, selectedSeats, lockingSeatId, onSeatClick, fare }) => {
//   const lowerSeats = seats.filter((s) => s.deck === 'LOWER');
//   const upperSeats = seats.filter((s) => s.deck === 'UPPER');

//   return (
//     <div>
//       <div className="flex flex-wrap gap-6">
//         {lowerSeats.length > 0 && (
//           <DeckPanel
//             title="Lower Deck"
//             seats={lowerSeats}
//             selectedSeats={selectedSeats}
//             lockingSeatId={lockingSeatId}
//             onSeatClick={onSeatClick}
//             fare={fare}
//             showWheel
//           />
//         )}
//         {upperSeats.length > 0 && (
//           <DeckPanel
//             title="Upper Deck"
//             seats={upperSeats}
//             selectedSeats={selectedSeats}
//             lockingSeatId={lockingSeatId}
//             onSeatClick={onSeatClick}
//             fare={fare}
//           />
//         )}
//       </div>

//       <div className="flex gap-5 mt-5 text-sm text-slate-600">
//         <span className="flex items-center gap-2">
//           <span className="w-4 h-5 rounded border-2 border-emerald-400 bg-white"></span> Available
//         </span>
//         <span className="flex items-center gap-2">
//           <span className="w-4 h-5 rounded bg-orange-500"></span> Selected
//         </span>
//         <span className="flex items-center gap-2">
//           <span className="w-4 h-5 rounded bg-slate-100 border-2 border-slate-200"></span> Sold
//         </span>
//         <span className="flex items-center gap-2">
//           <span className="w-4 h-5 rounded bg-yellow-50 border-2 border-yellow-300"></span> Held
//         </span>
//       </div>
//     </div>
//   );
// };

// export default SeatMap;
const SteeringWheelIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-400">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 6.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7.5 14.5L9.8 13.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16.5 14.5L14.2 13.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Sleeper berth icon - tall capsule outline
const SleeperSeatIcon = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="3" width="12" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

// Regular seater chair icon
const SeaterSeatIcon = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6 4v9a2 2 0 002 2h8a2 2 0 002-2V4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path d="M6 13v5a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M18 13v5a1 1 0 01-1 1h-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8 19v2M16 19v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const SeatRect = ({ seat, isSelected, isLoading, onClick, fare, isSleeper }) => {
  const isBooked = seat.status === 'BOOKED';
  const isLockedByOther = seat.status === 'LOCKED' && !isSelected;
  const isDisabled = isBooked || isLockedByOther || isLoading;

  let classes = 'border-emerald-400 bg-white hover:border-emerald-500 text-emerald-600';
  let labelText = `₹${fare}`;
  let labelClasses = 'text-slate-500';

  if (isBooked) {
    classes = 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed';
    labelText = 'Sold';
    labelClasses = 'text-slate-400';
  } else if (isLockedByOther) {
    classes = 'bg-yellow-50 border-yellow-300 text-yellow-500 cursor-not-allowed';
    labelText = 'Held';
    labelClasses = 'text-yellow-600';
  } else if (isSelected) {
    classes = 'bg-orange-500 border-orange-500 text-white';
    labelClasses = 'text-white';
  } else if (isLoading) {
    classes = 'border-slate-300 text-slate-300 opacity-60 cursor-wait';
  }

  const Icon = isSleeper ? SleeperSeatIcon : SeaterSeatIcon;
  const sizeClasses = isSleeper ? 'w-16 h-24' : 'w-14 h-16';

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => onClick(seat)}
      className={`${sizeClasses} rounded-md border-2 flex flex-col items-center justify-center gap-1.5 transition-colors ${classes}`}
    >
      <Icon className={isSelected ? 'text-white' : isBooked ? 'text-slate-300' : isLockedByOther ? 'text-yellow-500' : 'text-emerald-500'} />
      <span className={`text-[10px] font-medium ${labelClasses}`}>{labelText}</span>
    </button>
  );
};

// Sleeper layout: each row = 1 single + gap + 2 double
const SleeperDeckPanel = ({ title, seats, selectedSeats, lockingSeatId, onSeatClick, fare, showWheel }) => {
  const rows = [];
  for (let i = 0; i < seats.length; i += 3) {
    rows.push(seats.slice(i, i + 3));
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 w-fit">
      <div className="flex items-center justify-between gap-6 mb-5">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        {showWheel && (
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <SteeringWheelIcon />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((row, idx) => {
          const [single, doubleA, doubleB] = row;
          return (
            <div key={idx} className="flex items-center gap-3">
              {single && (
                <SeatRect seat={single} fare={fare} isSleeper
                  isSelected={selectedSeats.includes(single.id)}
                  isLoading={lockingSeatId === single.id}
                  onClick={onSeatClick}
                />
              )}
              <div className="w-8"></div>
              <div className="flex gap-1">
                {doubleA && (
                  <SeatRect seat={doubleA} fare={fare} isSleeper
                    isSelected={selectedSeats.includes(doubleA.id)}
                    isLoading={lockingSeatId === doubleA.id}
                    onClick={onSeatClick}
                  />
                )}
                {doubleB && (
                  <SeatRect seat={doubleB} fare={fare} isSleeper
                    isSelected={selectedSeats.includes(doubleB.id)}
                    isLoading={lockingSeatId === doubleB.id}
                    onClick={onSeatClick}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Seater layout: each row = 2 seats left + aisle + 2 seats right (4 per row)
const SeaterDeckPanel = ({ title, seats, selectedSeats, lockingSeatId, onSeatClick, fare, showWheel }) => {
  const rows = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 w-fit">
      <div className="flex items-center justify-between gap-6 mb-5">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        {showWheel && (
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <SteeringWheelIcon />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((row, idx) => {
          const [leftA, leftB, rightA, rightB] = row;
          return (
            <div key={idx} className="flex items-center gap-3">
              <div className="flex gap-1">
                {leftA && (
                  <SeatRect seat={leftA} fare={fare}
                    isSelected={selectedSeats.includes(leftA.id)}
                    isLoading={lockingSeatId === leftA.id}
                    onClick={onSeatClick}
                  />
                )}
                {leftB && (
                  <SeatRect seat={leftB} fare={fare}
                    isSelected={selectedSeats.includes(leftB.id)}
                    isLoading={lockingSeatId === leftB.id}
                    onClick={onSeatClick}
                  />
                )}
              </div>

              <div className="w-8"></div>

              <div className="flex gap-1">
                {rightA && (
                  <SeatRect seat={rightA} fare={fare}
                    isSelected={selectedSeats.includes(rightA.id)}
                    isLoading={lockingSeatId === rightA.id}
                    onClick={onSeatClick}
                  />
                )}
                {rightB && (
                  <SeatRect seat={rightB} fare={fare}
                    isSelected={selectedSeats.includes(rightB.id)}
                    isLoading={lockingSeatId === rightB.id}
                    onClick={onSeatClick}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SeatMap = ({ seats, selectedSeats, lockingSeatId, onSeatClick, fare, busType }) => {
  const isSleeper = busType === 'AC_SLEEPER' || busType === 'NON_AC_SLEEPER';
  const DeckPanel = isSleeper ? SleeperDeckPanel : SeaterDeckPanel;

  const lowerSeats = seats.filter((s) => s.deck === 'LOWER');
  const upperSeats = seats.filter((s) => s.deck === 'UPPER');

  return (
    <div>
      <div className="flex flex-wrap gap-6">
        {lowerSeats.length > 0 && (
          <DeckPanel
            title={upperSeats.length > 0 ? 'Lower Deck' : 'Seats'}
            seats={lowerSeats}
            selectedSeats={selectedSeats}
            lockingSeatId={lockingSeatId}
            onSeatClick={onSeatClick}
            fare={fare}
            showWheel
          />
        )}
        {upperSeats.length > 0 && (
          <DeckPanel
            title="Upper Deck"
            seats={upperSeats}
            selectedSeats={selectedSeats}
            lockingSeatId={lockingSeatId}
            onSeatClick={onSeatClick}
            fare={fare}
          />
        )}
      </div>

      <div className="flex gap-5 mt-5 text-sm text-slate-600">
        <span className="flex items-center gap-2">
          <span className="w-4 h-5 rounded border-2 border-emerald-400 bg-white"></span> Available
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-5 rounded bg-orange-500"></span> Selected
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-5 rounded bg-slate-100 border-2 border-slate-200"></span> Sold
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-5 rounded bg-yellow-50 border-2 border-yellow-300"></span> Held
        </span>
      </div>
    </div>
  );
};

export default SeatMap;