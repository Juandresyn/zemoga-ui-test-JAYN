import { currentViewMode, viewModes } from '../stores'
import { VIEW_MODE_KEY } from '../types'

export const handleViewModeChange = (newMode) => {
  if (newMode) {
    localStorage.setItem(VIEW_MODE_KEY, newMode);
    currentViewMode.value = newMode
  }

  const mode = localStorage.getItem(VIEW_MODE_KEY);

  if (!mode) {
    localStorage.setItem(VIEW_MODE_KEY, viewModes[0]);

    return;
  }

  currentViewMode.value = localStorage.getItem(VIEW_MODE_KEY);
}
