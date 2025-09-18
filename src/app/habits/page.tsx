"use client";
import {
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useMediaQuery } from "@mui/system";
import { TimePicker } from "@mui/x-date-pickers";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { ControlPoint, MoreVert, Delete } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { useHabits, initialHabits } from "./useHabits";
import { generalStyles, generalColors } from "../generalStyles";
import { strings } from "../strings";

const HabitDialog = ({
  open,
  mode,
  name,
  time,
  onClose,
  onConfirm,
  setName,
  setTime,
  todayOrAll,
}: {
  open: boolean;
  mode: "add" | "edit";
  name: string;
  time: Dayjs | null;
  onClose: () => void;
  onConfirm: () => void;
  setName: (val: string) => void;
  setTime: (val: Dayjs | null) => void;
  todayOrAll: "today" | "all";
}) => (
  <Dialog open={open} onClose={onClose} PaperProps={{ sx: { bgcolor: generalColors.creme } }}>
    <DialogTitle sx={{ color: "#1976d2" }}>
      {mode === "add" ? "Add a New Habit" : "Edit Habit"}
    </DialogTitle>
    <DialogContent>
      {todayOrAll === "today" ? (
        <TimePicker label="Habit Time" value={time} onChange={setTime} sx={{ mt: 2 }} />
      ) : (
        <TextField
          autoFocus
          margin="dense"
          label="Habit Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2 }}
        />
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>{strings.cancel}</Button>
      <Button onClick={onConfirm} variant="contained" color="primary">
        {mode === "add" ? "Add" : "Confirm"}
      </Button>
    </DialogActions>
  </Dialog>
);

const HabitsPage = () => {
  const {
    habits,
    addHabit,
    deleteHabit,
    editHabit,
    reorderHabits,
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
  } = useHabits(initialHabits);

  const isMobile = useMediaQuery("(max-width:768px)");

  const onDragEnd = (result: DropResult) => reorderHabits(result);

  const resetDialogState = () => {
    setIsAddHabitOpen(false);
    setIsEditHabitOpen(false);
    setEditingHabitId(null);
  };

  return (
    <Container
      className="flex items-center justify-center"
      sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: "90vh" }}
    >
      {/* Habit List */}
      <Box
        className="flex items-start justify-center mr-5"
        sx={{ ...generalStyles.Habits.Box, mr: isMobile ? 0 : 5, mt: isMobile ? 2 : 0 }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="habits-list">
            {(provided) => (
              <List
                className="flex flex-col items-center justify-center"
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={generalStyles.Habits.List}
              >
                <Typography variant="h6">{strings.habitList}</Typography>
                {habits.map((habit, index) => (
                  <Draggable key={habit.id} draggableId={habit.id.toString()} index={index}>
                    {(dragProvided, dragSnapshot) => (
                      <Box
                        className="flex items-center justify-center mb-2"
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        sx={{
                          ...generalStyles.Habits.ListItem,
                          width: "100%",
                          boxShadow: dragSnapshot.isDragging
                            ? `0 0 10px ${generalColors.darkBlue}`
                            : generalStyles.Habits.ListItem.boxShadow,
                        }}
                      >
                        <ListItem
                          className="flex items-center justify-between"
                          secondaryAction={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Tooltip title="Edit Habit">
                                <IconButton
                                  onClick={() => {
                                    setNewHabitName(habit.name);
                                    setNewHabitTime(null);
                                    setEditingHabitId(habit.id);
                                    setTodayOrAll("all");
                                    setIsEditHabitOpen(true);
                                  }}
                                >
                                  <MoreVert />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Habit">
                                <IconButton onClick={() => deleteHabit(habit.id)} sx={{ ml: 1 }}>
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          }
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              textAlign: "left",
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                            }}
                          >
                            {habit.name}
                          </Typography>
                          {/* spacer */}
                          <Typography sx={{ flex: 1, textAlign: "right" }}></Typography>
                        </ListItem>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Box className="flex items-center justify-center">
                  <Tooltip title="Add Habit">
                    <IconButton onClick={() => setIsAddHabitOpen(true)} sx={{ color: generalColors.darkBlue }}>
                      <ControlPoint />
                    </IconButton>
                  </Tooltip>
                </Box>
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Box>

      {/* Today's Habits */}
      <Box
        className="flex items-start justify-center ml-5"
        sx={{ ...generalStyles.Habits.Box, ml: isMobile ? 0 : 5, mt: isMobile ? 2 : 0 }}
      >
        <List className="flex flex-col items-center justify-center" sx={generalStyles.Habits.List}>
          <Typography variant="h6">{strings.todaysHabits}</Typography>
          {todaysHabitsSorted.map((habit) => (
            <Box
              key={habit.id}
              className="flex items-center justify-center mb-2"
              sx={{ ...generalStyles.Habits.ListItem, width: "100%" }}
            >
              <ListItem
                className="flex items-center justify-between"
                secondaryAction={
                  <IconButton
                    onClick={() => {
                      setNewHabitName(habit.name);
                      setNewHabitTime(habit.time ? dayjs(habit.time, "HH:mm") : null);
                      setEditingHabitId(habit.id);
                      setTodayOrAll("today");
                      setIsEditHabitOpen(true);
                    }}
                  >
                    <MoreVert />
                  </IconButton>
                }
              >
                <Typography
                  sx={{
                    flex: 1,
                    textAlign: "left",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {habit.name}
                </Typography>
                <Typography sx={{ flex: 1, textAlign: "right" }}>{habit.time}</Typography>
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>

      {/* Add/Edit Dialogs */}
      <HabitDialog
        open={isAddHabitOpen}
        mode="add"
        name={newHabitName}
        time={null}
        onClose={resetDialogState}
        onConfirm={() => {
          if (newHabitName.trim()) {
            addHabit(newHabitName);
            resetDialogState();
          }
        }}
        setName={setNewHabitName}
        setTime={setNewHabitTime}
        todayOrAll="all"
      />

      <HabitDialog
        open={isEditHabitOpen}
        mode="edit"
        name={newHabitName}
        time={newHabitTime}
        onClose={resetDialogState}
        onConfirm={() => {
          if (editingHabitId === null) return;
          if (todayOrAll === "today") {
            if (newHabitTime) changeHabitTime(editingHabitId, newHabitTime.format("h:mm A"));
          } else {
            if (newHabitName.trim()) editHabit(editingHabitId, newHabitName);
          }
          resetDialogState();
        }}
        setName={setNewHabitName}
        setTime={setNewHabitTime}
        todayOrAll={todayOrAll}
      />
    </Container>
  );
};

export default HabitsPage;
