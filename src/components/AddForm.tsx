import React, { useState } from 'react'
import { EventProps } from '../types'
import {
  Container,
  Box,
  Button,
  TextField,
  Modal,
  IconButton,
  Stack
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { NumericFormat } from 'react-number-format'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export function AddForm() {
  const style = getStyle()
  const currentDate = new Date()

  const [open, setOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<EventProps>({
    date: currentDate,
    links: [''],
    time: { door: currentDate, start: currentDate }
  })
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const addLink = () => {
    if (!newEvent.links) {
      newEvent.links = []
    }

    newEvent.links.push('')
    setNewEvent({ ...newEvent })
  }

  const removeLink = (key: number) => {
    if (newEvent.links && newEvent.links.length > 1) {
      newEvent.links.splice(key, 1)
      setNewEvent({ ...newEvent })
    }
  }

  const submit = () => {
    console.log(newEvent)
  }

  return (
    <Container>
      <Button onClick={handleOpen}>Add Event</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.rootBox}>
          <Stack spacing={2}>
            <TextField
              sx={style.form}
              color={
                newEvent.name && newEvent.name?.length > 0 ? 'success' : 'error'
              }
              error={!newEvent.name}
              required
              label={'Name'}
              value={newEvent.name}
              onChange={(event) =>
                setNewEvent({ ...newEvent, name: event.currentTarget.value })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Date"
                inputFormat="MM/DD/YYYY"
                value={newEvent.date}
                disablePast
                onChange={(date) =>
                  setNewEvent({ ...newEvent, date: date ?? undefined })
                }
                renderInput={(params) => (
                  <TextField {...params} sx={style.form} required />
                )}
              />
              <TimePicker
                label="Door"
                ampm={false}
                value={newEvent.time?.door}
                onChange={(door) =>
                  setNewEvent({
                    ...newEvent,
                    time: { ...newEvent.time, door: door ?? undefined }
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} sx={style.form} required />
                )}
              />
              <TimePicker
                label="Start"
                ampm={false}
                value={newEvent.time?.start}
                onChange={(start) =>
                  setNewEvent({
                    ...newEvent,
                    time: { ...newEvent.time, start: start ?? undefined }
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} sx={style.form} />
                )}
              />
            </LocalizationProvider>

            <NumericFormat
              customInput={TextField}
              thousandSeparator={true}
              allowNegative={false}
              value={newEvent.price?.vvk ?? 0}
              decimalScale={2}
              onValueChange={(value) =>
                setNewEvent({
                  ...newEvent,
                  price: { ...newEvent.price, vvk: value.floatValue }
                })
              }
              sx={style.form}
              label={'VVK'}
              InputProps={{
                endAdornment: <span>€</span>
              }}
            />
            <NumericFormat
              customInput={TextField}
              thousandSeparator={true}
              allowNegative={false}
              value={newEvent.price?.ak ?? 0}
              decimalScale={2}
              onValueChange={(value) =>
                setNewEvent({
                  ...newEvent,
                  price: { ...newEvent.price, ak: value.floatValue }
                })
              }
              sx={style.form}
              label={'AK'}
              InputProps={{
                endAdornment: <span>€</span>
              }}
            />
            <TextField
              sx={style.form}
              multiline
              rows={6}
              color={
                newEvent.description && newEvent.description?.length > 0
                  ? 'success'
                  : 'error'
              }
              error={!newEvent.description}
              required
              label={'Description'}
              value={newEvent.description}
              onChange={(event) =>
                setNewEvent({
                  ...newEvent,
                  description: event.currentTarget.value
                })
              }
            />
            {!!newEvent.links &&
              newEvent.links?.map((link, key) => {
                return (
                  <Box sx={style.linkBox} key={key}>
                    <TextField
                      sx={{ ...style.form, ...style.linkForm }}
                      label={`Link${key}`}
                      value={link}
                      onChange={(event) => {
                        if (newEvent.links) {
                          newEvent.links[key] = event.currentTarget.value
                          setNewEvent({
                            ...newEvent
                          })
                        }
                      }}
                    />
                    {!!newEvent.links && newEvent.links?.length > 1 && (
                      <IconButton onClick={() => removeLink(key)}>
                        <DeleteIcon titleAccess={'Remove Link'} />
                      </IconButton>
                    )}
                    {!!newEvent.links && newEvent.links.length - 1 === key && (
                      <IconButton onClick={addLink}>
                        <AddIcon titleAccess={'Add Link'} />
                      </IconButton>
                    )}
                  </Box>
                )
              })}
            <Button
              onClick={submit}
              disabled={
                !newEvent.name ||
                !newEvent.description ||
                !newEvent.date ||
                newEvent.time?.door === undefined
              }
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  )
}

function getStyle() {
  return {
    rootBox: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4
    },
    linkBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    linkForm: {
      flex: '1'
    },
    form: {
      my: 1
    }
  }
}
