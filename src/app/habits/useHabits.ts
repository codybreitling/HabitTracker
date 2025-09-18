"use client";
import { useState, useMemo } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import dayjs, { Dayjs } from "dayjs";
import Utils from "../Utils";

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
    name: "Extra Extra Extra Extra Extra Long Text Test",
  },
  { id: 7, name: "Test" },
  { id: 8, name: "Test" },
  { id: 9, name: "Test" },
  { id: 10, name: "Test" },
];

export const useHabits = (initial: Habit[] = []) => {
  const [habits, setHabits] = useState<Habit[]>(initial);
  const [todayHabits, setTodayHabits] = useState<TodayHabit[]>(mockHabitsToday);

  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [isEditHabitOpen, setIsEditHabitOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitTime, setNewHabitTime] = useState<Dayjs | null>(null);
  const [editingHabitId, setEditingHabitId] = useState<number | null>(null);
  const [todayOrAll, setTodayOrAll] = useState<"all" | "today">("all");

  const utils = new Utils();

  const addHabit = (name: string) => {
    setHabits((prev) => [...prev, { id: prev.length + 1, name }]);
    setIsAddHabitOpen(false);
    setNewHabitName("");
  };

  const deleteHabit = (id?: number | null) => {
    const targetId = id ?? editingHabitId;
    if (targetId === null || targetId === undefined) return;
    setHabits((prev) => prev.filter((h) => h.id !== targetId));
    setIsEditHabitOpen(false);
    setNewHabitName("");
    setEditingHabitId(null);
  };

  const editHabit = (id: number, name: string) => {
    if (editingHabitId === null) return;
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, name } : h)));
    setIsEditHabitOpen(false);
    setNewHabitName("");
    setEditingHabitId(null);
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

  const todaysHabitsSorted = useMemo(() => {
    return [...todayHabits].sort(
      (a, b) => utils.parseTimeToMinutes(a.time) - utils.parseTimeToMinutes(b.time)
    );
  }, [todayHabits]);

  const changeHabitTime = (habitId: number, newTime: string): TodayHabit => {
    const habit = todayHabits.find((h) => h.id === habitId);
    if (!habit) throw new Error("Habit not found");
    setTodayHabits((prev) => {
      return prev.map((h) => (h.id === habitId ? { ...h, time: newTime } : h));
    });
    return { ...habit, time: newTime };
  };

  return {
    habits,
    addHabit,
    deleteHabit,
    editHabit,
    reorderHabits,
    setHabits,
    isAddHabitOpen,
    setIsAddHabitOpen,
    isEditHabitOpen,
    setIsEditHabitOpen,
    newHabitName,
    setNewHabitName,
    newHabitTime,
    setNewHabitTime,
    editingHabitId,
    setEditingHabitId,
    todayOrAll,
    setTodayOrAll,
    todaysHabitsSorted,
    changeHabitTime,
  } as const;
};