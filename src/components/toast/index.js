import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

export default function Toast({ showToast, list = [], unSelectAll, doDelete, openToastExtend }) {
  const { snackbar, show, button, assign_button, delete_button, middle_inline, fs_18 ,pointer_cursor} = styles;
  const [count, setCount] = useState(0)
  useEffect(() => {
    var tempCount = 0;
    list.map((item) => {
      if (item.checked === true) {
        tempCount++
      }
    })
    setCount(tempCount);
  }, [list])

  return (
    <div className={`${snackbar} ${showToast ? show : ''}`} >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${middle_inline} ${pointer_cursor}`} onClick={unSelectAll}>
        <path d="M13.3064 11.1789L9.12475 6.99964L13.3032 2.81801C13.7851 2.33774 13.7851 1.56529 13.3048 1.08341L12.9166 0.694383C12.6884 0.460648 12.3762 0.333374 12.048 0.333374C12.0464 0.333374 12.0464 0.333374 12.0464 0.333374C11.7183 0.333374 11.4101 0.462249 11.1795 0.693583L6.99952 4.87681L2.81789 0.698386C2.33842 0.218107 1.56677 0.215705 1.08489 0.695984L0.695862 1.08101C0.461326 1.31074 0.333252 1.62292 0.333252 1.95031C0.333252 2.2793 0.462127 2.58908 0.693461 2.81962L4.87669 6.99964L0.697463 11.1813C0.215584 11.6615 0.215584 12.434 0.695862 12.9175L1.08409 13.3057C1.31382 13.5394 1.6252 13.6667 1.95339 13.6667C2.27998 13.6667 2.59216 13.5362 2.8219 13.3065L7.00112 9.12407L11.1811 13.3017C11.4181 13.541 11.7335 13.6619 12.0497 13.6619C12.3626 13.6619 12.6764 13.5426 12.9158 13.3041L13.304 12.9167C13.5393 12.6885 13.6666 12.3764 13.6666 12.0482C13.6682 11.72 13.5393 11.4102 13.308 11.1789H13.3064Z" fill="white" />
      </svg> <div className={`${middle_inline} ${fs_18}`}>
        {count} Table Selected
    </div>
      <div className={`${button} ${assign_button}`} onClick={openToastExtend}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={middle_inline}>
          <path d="M11.2815 0.571477H7.24432C6.96599 0.559064 6.6886 0.611898 6.43432 0.725763C6.16005 0.837341 5.91409 1.00864 5.71432 1.22719L1.21432 5.79148C1.0049 5.98362 0.842185 6.2211 0.738608 6.48576C0.628227 6.74154 0.571289 7.01718 0.571289 7.29576C0.571289 7.57434 0.628227 7.84998 0.738608 8.10576C0.8486 8.36698 1.01043 8.60317 1.21432 8.80005L5.23861 12.85C5.64613 13.2223 6.17811 13.4286 6.73004 13.4286C7.30339 13.4411 7.85986 13.2341 8.28575 12.85L12.7729 8.28576C13.184 7.88698 13.4198 7.34127 13.4286 6.76862V2.71862C13.4158 2.15317 13.1856 1.61441 12.7858 1.21433C12.3786 0.82506 11.8442 0.596651 11.2815 0.571477ZM11.7958 6.76862C11.7983 6.83017 11.7883 6.8916 11.7662 6.9491C11.744 7.00661 11.7104 7.05895 11.6672 7.10291L7.11575 11.6672C7.07554 11.7159 7.02188 11.7517 6.96146 11.77C6.8977 11.7816 6.83237 11.7816 6.76861 11.77C6.705 11.7832 6.63936 11.7832 6.57575 11.77C6.51315 11.7485 6.45608 11.7134 6.40861 11.6672L2.38432 7.61719C2.33981 7.5763 2.30426 7.52663 2.27991 7.4713C2.25557 7.41598 2.24296 7.35621 2.24289 7.29576C2.25458 7.18385 2.30453 7.07939 2.38432 7.00005L6.92289 2.39719C7.01481 2.32323 7.12675 2.27846 7.24432 2.26862H11.4743C11.5408 2.28999 11.6021 2.32503 11.6543 2.37148C11.6987 2.41544 11.7337 2.46792 11.7572 2.52576C11.7693 2.58947 11.7693 2.65491 11.7572 2.71862L11.7958 6.76862Z" fill="#9D97FF" />
          <path d="M7.00004 5.47005C6.59425 5.47005 6.20509 5.63124 5.91816 5.91818C5.63123 6.20511 5.47004 6.59427 5.47004 7.00005C5.47004 7.40583 5.63123 7.79499 5.91816 8.08192C6.20509 8.36885 6.59425 8.53005 7.00004 8.53005C7.40174 8.51718 7.78347 8.35186 8.06766 8.06767C8.35185 7.78348 8.51717 7.40175 8.53004 7.00005C8.52668 6.59531 8.3644 6.20809 8.0782 5.92189C7.79199 5.63568 7.40478 5.47341 7.00004 5.47005Z" fill="#9D97FF" />
        </svg> <div className={middle_inline}>
          Assign Category
        </div>
      </div>
      <div className={`${button} ${delete_button}`} onClick={doDelete}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={middle_inline}>
          <path d="M6.99999 13.4286C5.72853 13.4286 4.48564 13.0515 3.42846 12.3451C2.37129 11.6388 1.54732 10.6348 1.06076 9.46009C0.574197 8.28543 0.446889 6.99285 0.694937 5.74583C0.942985 4.49881 1.55525 3.35335 2.4543 2.4543C3.35335 1.55525 4.49881 0.942985 5.74583 0.694937C6.99285 0.446889 8.28543 0.574197 9.46009 1.06076C10.6348 1.54732 11.6388 2.37129 12.3451 3.42846C13.0515 4.48564 13.4286 5.72853 13.4286 6.99999C13.4286 7.8442 13.2623 8.68014 12.9392 9.46009C12.6161 10.24 12.1426 10.9487 11.5457 11.5457C10.9487 12.1426 10.24 12.6161 9.46009 12.9392C8.68014 13.2623 7.8442 13.4286 6.99999 13.4286ZM6.99999 1.99856C6.0108 1.99856 5.04382 2.29189 4.22134 2.84145C3.39886 3.39101 2.75781 4.17213 2.37927 5.08602C2.00072 5.99991 1.90168 7.00553 2.09466 7.97572C2.28764 8.9459 2.76398 9.83707 3.46344 10.5365C4.1629 11.236 5.05407 11.7123 6.02426 11.9053C6.99444 12.0983 8.00006 11.9992 8.91395 11.6207C9.82784 11.2422 10.609 10.6011 11.1585 9.77863C11.7081 8.95615 12.0014 7.98917 12.0014 6.99999C11.998 5.67457 11.47 4.40441 10.5328 3.46719C9.59556 2.52998 8.3254 2.00195 6.99999 1.99856Z" fill="#FF9A9A" />
          <path d="M4.85284 6.04856H9.14713C9.53284 6.04856 9.85427 6.47284 9.85427 6.99999C9.85427 7.52713 9.53284 7.95141 9.14713 7.95141H4.85284C4.46713 7.95141 4.1457 7.52713 4.1457 6.99999C4.1457 6.47284 4.42856 6.04856 4.85284 6.04856Z" fill="#FF9A9A" />
        </svg>  <div className={middle_inline}>
          Delete Table
        </div>
      </div>
    </div>)
}