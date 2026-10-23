import { useState, useEffect, useRef, useCallback } from 'react';
import { useCallSessionStore } from '../store/useCallSessionStore';

export interface UseCallTimerProps {
  ratePerMinute: number;
  isTeacher?: boolean;
}

export interface UseCallTimerReturn {
  seconds: number;
  formattedTime: string;
  coinsCount: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export const useCallTimer = ({
  ratePerMinute,
  isTeacher = false,
}: UseCallTimerProps): UseCallTimerReturn => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const updateDurationAndCoins = useCallSessionStore((s) => s.updateDurationAndCoins);

  const calculateCoins = useCallback(
    (elapsedSeconds: number): number => {
      if (elapsedSeconds <= 0) return 0;
      // Cobro/pago por minuto o fracción
      const minutesElapsed = Math.ceil(elapsedSeconds / 60);
      return minutesElapsed * ratePerMinute;
    },
    [ratePerMinute]
  );

  const startTimer = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        const currentCoins = calculateCoins(next);
        if (isTeacher) {
          updateDurationAndCoins(next, 0, currentCoins);
        } else {
          updateDurationAndCoins(next, currentCoins, 0);
        }
        return next;
      });
    }, 1000);
  }, [calculateCoins, isTeacher, updateDurationAndCoins]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setSeconds(0);
  }, [stopTimer]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Formato MM:SS
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
    const secsStr = secs < 10 ? `0${secs}` : `${secs}`;
    return `${minsStr}:${secsStr}`;
  };

  return {
    seconds,
    formattedTime: formatTime(seconds),
    coinsCount: calculateCoins(seconds),
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useCallTimer;
