import { useCallback } from "react";
import { h0 } from "../common/fp";
//自定义Hook
function useNav(departDate, prevDate, nextDate, dispatch) {
  const isPrevDisabled = h0(departDate) <= h0();
  const isNextDisabled = h0(departDate) > h0() + 10 * 86000 * 1000; //假设票只能在10天内购买

  const prev = useCallback(() => {
    if (isPrevDisabled) {
      return;
    }
    dispatch(prevDate());
  }, [isPrevDisabled]);

  const next = useCallback(() => {
    if (isNextDisabled) {
      return;
    }
    dispatch(nextDate());
  }, [isNextDisabled]);

  return {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next
  };
}

export default useNav;
