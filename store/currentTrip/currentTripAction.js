export const setNewCurrentTrip = ({trip}) => ({
  type: 'NEW_CURRENT',
  payload:{trip}
});

export const setExistedTrip = ({trip,step}) => ({
  type: 'CURRENT',
  payload:{trip,step}
});

export const resetLoc = () => ({
  type: 'RESET_LOC',
});

export const nextLoc = () => ({
  type: 'NEXT_LOC',
});

export const lastLoc = () => ({
  type: 'LAST_LOC',
});