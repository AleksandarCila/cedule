
import { useState } from 'react';

// Context States
import { ModalState } from "../../../context/ModalContext";
import { CalendarState } from '../../../context/CalendarContext'

// Components
import { Divider, useTheme } from '@mui/material'
import DayViewHeader from './DayViewHeader'
import WeekViewDayEvents from '../WeekViewComponents/WeekViewDayEvents'
import TimeStamp from '../WeekViewComponents/TimeStamp'

// Utility
import { timeStamps } from "../../../utility/constants"
import { addHours, isWeekend } from 'date-fns';

const DayEventSlotElement = props => {
    const { day, hourInd, handleOpenAddEventModal } = props;

    // States
    const {
        dispatch
    } = CalendarState();
    const [hover, setHover] = useState(false);
    const isWeekendDay = isWeekend(day);

    // Drag handlers
    const dragEnter = (event) => {
        setHover(true);
        event.stopPropagation();
        event.preventDefault();
    };

    const dragExit = (event) => {
        setHover(false);
        event.stopPropagation();
        event.preventDefault();
    };

    const onDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    const handleDrop = async event => {
        event.stopPropagation()
        event.preventDefault()
        setHover(false);
        let data;

        try {
            data = JSON.parse(event.dataTransfer.getData('data'));
        } catch (e) {
            return;
        }

        // Do something with the data
        const newDate = day
        dispatch({
            type: "CHANGE_EVENT_DATE",
            event: data,
            newDate: newDate,
            startTime: hourInd,
        })
        await fetch("/api/events/updateEvent", {
            method: "POST",
            body: [JSON.stringify({ ...data, eventDate: addHours(newDate, 6), eventStartTime: hourInd })],
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    // Hooks
    const theme = useTheme();

    return (
        <div style={{
            padding: 2,
            // borderRight: ((ind + 1) % 7) != 0 ? `1px solid ${theme.palette.grey['300']}` : "",
            borderBottom: `1px solid ${theme.palette.grey['300']}`,
            width: "100%", height: "100%",
            backgroundColor: (hover ? theme.palette.primary.main : isWeekendDay ? theme.palette.grey['200'] : "#fff"),
        }}
            onDragEnter={dragEnter}
            onDragStart={(e) => { e.preventDefault() }}
            onDragLeave={dragExit}
            onDragOver={onDragOver}
            onDrop={handleDrop}
            onClick={() => handleOpenAddEventModal(hourInd, day)}
        >
        </div >)

}

const DayView = (props) => {
    // States
    const { state: { calendarState } } = CalendarState();
    const {
        dispatch: dispatchModal
    } = ModalState();

    // Hooks
    const theme = useTheme();

    // Functions
    const handleOpenModal = (type, props = {}) => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: type,
            modalProps: props,
        })
    }
    return (
        <>
            <Divider />
            <DayViewHeader />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto", overflowY: "scroll", }}>
                <div style={{
                    borderTop: `1px solid ${theme.palette.grey['300']}`,
                    display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto"
                }}>{
                        timeStamps.map((hour, hourInd) => {
                            return (
                                <TimeStamp key={hourInd} hour={hour} hourInd={hourInd} />
                            )
                        })}
                </div>

                <div style={{
                    borderTop: `1px solid ${theme.palette.grey['300']}`,
                    position: 'relative',
                    display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridAutoColumns: "auto", gridAutoRows: "auto"
                }}>
                    <WeekViewDayEvents day={calendarState.selectedDate} />
                    {timeStamps && timeStamps.map((hour, hourInd) => {
                        return (
                            <DayEventSlotElement key={hourInd} hourInd={hourInd} day={calendarState.selectedDate}
                                handleOpenAddEventModal={(time, day) => { handleOpenModal("NEW_EVENT", { time: time, day: day }) }}

                            />
                        )
                    })}
                </div>

            </div>
        </ >
    )
}

export default DayView;