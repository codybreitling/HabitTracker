"use client";
import { useState, useMemo } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import dayjs from "dayjs";

export type TodayHabit = { id: number; name: string; time: string };
export type Habit = { id: number; name: string };

export const mockHabitsToday: TodayHabit[] = [
  { id: 1, name: "Drink Water", time: "08:00 AM" },
  { id: 2, name: "Exercise", time: "09:00 AM" },
  { id: 3, name: "Read a Book", time: "10:00 AM" },
  { id: 4, name: "Meditate", time: "11:00 AM" },
  { id: 5, name: "Sleep Early", time: "12:00 PM" },
  { id: 6, name: "Extra Extra Extra Extra Extra Long Text Test", time: "01:00 PM" },
  { id: 7, name: "Test", time: "02:00 PM" },
  { id: 8, name: "Test", time: "03:00 PM" },
  { id: 9, name: "Test", time: "04:00 PM" },
  { id: 10, name: "Test", time: "05:00 PM" },
];

export const initialHabits: Habit[] = [
  { id: 1, name: "Drink Water" },
  { id: 2, name: "Exercise" },
  { id: 3, name: "Read a Book" },
  { id: 4, name: "Meditate" },
  { id: 5, name: "Sleep Early" },
  {
    id: 6,
    name: "Extra Extra Extra Extra Extra Long Text Test Test Test Test Test tEst Test",
  },
  { id: 7, name: "Test" },
  { id: 8, name: "Test" },
  { id: 9, name: "Test" },
  { id: 10, name: "Test" },
];

export const parseTimeToMinutes = (t: string) => {
  const [timePart, modifier] = t.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

export const sortHabitsByTime = (items: TodayHabit[]) =>
  [...items].sort(
    (a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time)
  );

export const useHabits = (initial: Habit[] = []) => {
  const [habits, setHabits] = useState<Habit[]>(initial);

  const addHabit = (name: string) => {
    setHabits((prev) => [...prev, { id: prev.length + 1, name }]);
  };

  const deleteHabit = (id: number) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const editHabit = (id: number, name: string) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, name } : h)));
  };

  const reorderHabits = (result: DropResult) => {
    if (!result.destination) return;
    const destIndex = result.destination.index;
    setHabits((prev) => {
      const newHabits = Array.from(prev);
      const [moved] = newHabits.splice(result.source.index, 1);
      newHabits.splice(destIndex, 0, moved);
      return newHabits;
    });
  };

  return {
    habits,
    addHabit,
    deleteHabit,
    editHabit,
    reorderHabits,
    setHabits,
  } as const;
};

export const useTodaysHabits = () => {
  const [todayHabits, setTodayHabits] = useState<TodayHabit[]>(mockHabitsToday);

  const parseTimeToMinutes = (t: string) => {
    const [timePart, modifier] = t.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const sorted = useMemo(() => {
    return [...todayHabits].sort(
      (a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time)
    );
  }, [todayHabits]);

  const changeHabitTime = (habitId: number, newTime: string): TodayHabit => {
    console.log("Changing habit time", habitId, newTime);
    const habit = mockHabitsToday.find((h) => h.id === habitId);
    if (!habit) throw new Error("Habit not found");
    setTodayHabits((prev) => {
      return prev.map((h) => (h.id === habitId ? { ...h, time: newTime } : h));
    });
    return { ...habit, time: newTime };
  };

  const addTodayHabit = (habit: TodayHabit) =>
    setTodayHabits((prev) => [...prev, habit]);
  const deleteTodayHabit = (id: number) =>
    setTodayHabits((prev) => prev.filter((h) => h.id !== id));
  const editTodayHabit = (id: number, updates: Partial<TodayHabit>) =>
    setTodayHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );

  return {
    todayHabits,
    sorted,
    addTodayHabit,
    deleteTodayHabit,
    editTodayHabit,
    setTodayHabits,
  } as const;
};
