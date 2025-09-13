"use client";
import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Utils from "../Utils";
import { generalColors, generalStyles } from "../generalStyles";
import { ControlPoint, MoreVert, Settings, Delete } from "@mui/icons-material";
import {
  initialHabits,
  TodayHabit,
  Habit,
  useHabits,
  useTodaysHabits,
} from "./habitUtils";

const HabitsPage = () => {
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [isEditHabitOpen, setIsEditHabitOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitTime, setNewHabitTime] = useState("");
  const [editingHabitId, setEditingHabitId] = useState<number | null>(null);
  const [editingScope, setEditingScope] = useState<"all" | "today">("all");
  const [isMobile, setIsMobile] = useState(false);
  const utils = new Utils();

  const {
    habits,
    addHabit: addHabitToList,
    deleteHabit: deleteHabitFromList,
    editHabit: editHabitInList,
    reorderHabits,
    setHabits,
  } = useHabits(initialHabits);

  // Today's habits model
  const {
    todayHabits,
    sorted: sortedHabits,
    editTodayHabit,
    deleteTodayHabit,
  } = useTodaysHabits();

  const addHabit = (name: string) => {
    addHabitToList(name);
    setIsAddHabitOpen(false);
    setNewHabitName("");
  };

  const deleteHabit = (id?: number | null) => {
    const targetId = id ?? editingHabitId;
    if (targetId === null || targetId === undefined) return;
    deleteHabitFromList(targetId);
    setIsEditHabitOpen(false);
    setNewHabitName("");
    setEditingHabitId(null);
  };

  const editHabit = (name: string) => {
    if (editingHabitId === null) return;
    editHabitInList(editingHabitId, name);
    setIsEditHabitOpen(false);
    setNewHabitName("");
    setEditingHabitId(null);
  };

  // Drag and drop handler
  const onDragEnd = (result: DropResult) => reorderHabits(result);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(utils.checkIfMobile());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container
      className="flex items-center justify-center"
      sx={{ height: "90vh", display: "flex", flexDirection: "row" }}
    >
      {/* ALL HABITS */}
      <Box
        className="flex items-start justify-center mr-5"
        sx={generalStyles.Habits.Box}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="habits-list">
            {(provided) => (
              <List
                className="flex flex-col items-center justify-center"
                sx={generalStyles.Habits.List}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Typography variant="h6">Habit List</Typography>
                {habits.map((habit, index) => {
                  const id = "habit-" + index;
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(dragProvided, dragSnapshot) => (
                        <Box
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className="flex items-center justify-center mb-2"
                          sx={{
                            ...generalStyles.Habits.ListItem,
                            // override fixed width from general styles so text can wrap
                            width: "100%",
                            boxSizing: "border-box",
                            overflow: "visible",
                            boxShadow: dragSnapshot.isDragging
                              ? `0 0 10px ${generalColors.darkBlue}`
                              : generalStyles.Habits.ListItem.boxShadow,
                          }}
                        >
                          <ListItem
                            className="flex items-center justify-between"
                            secondaryAction={
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Tooltip title="Edit Habit">
                                  <IconButton
                                    edge="end"
                                    aria-label="edit-habit"
                                    onClick={() => {
                                      setNewHabitName(habit.name);
                                      setNewHabitTime("");
                                      setEditingHabitId(habit.id);
                                      setEditingScope("all");
                                      setIsEditHabitOpen(true);
                                    }}
                                  >
                                    <MoreVert />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Habit">
                                  <IconButton
                                    edge="end"
                                    aria-label="delete-habit"
                                    sx={{ ml: 1 }}
                                    onClick={() => deleteHabit(habit.id)}
                                  >
                                    <Delete />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            }
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              pr: 6, // reserve space for action icons
                            }}
                          >
                            <Typography
                              sx={{
                                flex: 1,
                                minWidth: 0,
                                textAlign: "left",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                              }}
                            >
                              {habit.name}
                            </Typography>
                          </ListItem>
                        </Box>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <Box className="flex items-center justify-center">
                  <Tooltip title="Add Habit">
                    <IconButton
                      sx={{ color: generalColors.darkBlue }}
                      aria-label="add-habit"
                      onClick={() => setIsAddHabitOpen(true)}
                    >
                      <ControlPoint />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Add Habit Modal */}
                <Dialog
                  open={isAddHabitOpen}
                  onClose={() => {
                    setIsAddHabitOpen(false);
                    setNewHabitName("");
                  }}
                  PaperProps={{ sx: { bgcolor: generalColors.black } }}
                >
                  <DialogTitle sx={{ color: "#1976d2" }}>
                    Add a New Habit
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Habit Name"
                      type="text"
                      fullWidth
                      value={newHabitName}
                      onChange={(e) => setNewHabitName(e.target.value)}
                      sx={{
                        "& .MuiInputBase-input": { color: generalColors.creme },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#1976d2" },
                          "&:hover fieldset": { borderColor: "#1976d2" },
                          "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                        "& label": { color: "grey" },
                        "& label.Mui-focused": { color: "#1976d2" },
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        setIsAddHabitOpen(false);
                        setNewHabitName("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (newHabitName.trim()) {
                          addHabit(newHabitName);
                          setNewHabitName("");
                        }
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>

                {/* Edit Habit Modal */}
                <Dialog
                  open={isEditHabitOpen}
                  onClose={() => {
                    setIsEditHabitOpen(false);
                    setNewHabitName("");
                    setEditingHabitId(null);
                  }}
                  PaperProps={{ sx: { bgcolor: generalColors.black } }}
                >
                  <DialogTitle sx={{ color: "#1976d2" }}>
                    Edit Habit
                  </DialogTitle>
                  <DialogContent>
                    {editingScope === "today" ? (
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Time"
                        type="text"
                        fullWidth
                        value={newHabitTime}
                        onChange={(e) => setNewHabitTime(e.target.value)}
                        sx={{
                          "& .MuiInputBase-input": { color: generalColors.creme },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#1976d2" },
                            "&:hover fieldset": { borderColor: "#1976d2" },
                            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                          },
                          "& label": { color: "#1976d2" },
                          "& label.Mui-focused": { color: "#1976d2" },
                        }}
                      />
                    ) : (
                      <TimePicker
                        label="Select Time"
                      >
                      </TimePicker>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        setIsEditHabitOpen(false);
                        setNewHabitName("");
                        setNewHabitTime("");
                        setEditingHabitId(null);
                        setEditingScope("all");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (editingHabitId === null) return;
                        if (editingScope === "today") {
                          if (!newHabitTime.trim()) return;
                          editTodayHabit(editingHabitId, { time: newHabitTime });
                        } else {
                          if (!newHabitName.trim()) return;
                          editHabit(newHabitName);
                        }
                        setIsEditHabitOpen(false);
                        setNewHabitName("");
                        setNewHabitTime("");
                        setEditingHabitId(null);
                        setEditingScope("all");
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Box>

      {/* TODAYS HABITS */}
      <Box
        className="flex items-start justify-center ml-5"
        sx={generalStyles.Habits.Box}
      >
        <List
          className="flex flex-col items-center justify-center"
          sx={generalStyles.Habits.List}
        >
          <Typography variant="h6">Today's Habits</Typography>
          {sortedHabits.map((habit, index) => {
            const id = "today's-habit-" + index;
            return (
              <Box
                key={id}
                className="flex items-center justify-center mb-2"
                sx={{ ...generalStyles.Habits.ListItem }}
              >
                <ListItem
                  className="flex items-center justify-between"
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="edit-today-habit"
                      onClick={() => {
                        setNewHabitName(habit.name);
                        setNewHabitTime(habit.time ?? "");
                        // set editing id to the habit id from today's habits and mark scope
                        setEditingHabitId(habit.id);
                        setEditingScope("today");
                        setIsEditHabitOpen(true);
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  }
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography sx={{ flex: 1, textAlign: "left" }}>
                    {habit.name}
                  </Typography>
                  <Typography sx={{ flex: 1, textAlign: "right" }}>
                    {habit.time}
                  </Typography>
                </ListItem>
              </Box>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

export default HabitsPage;
