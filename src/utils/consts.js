import { nanoid } from "nanoid";

export const STATUS = {
  COMPLETED: "completed",
  ACTIVE: "active"
};
export const BUTTON_TEXT = {
  PENDING: "Accept",
  ACCEPTED: "Release",
  RELEASED: "Cancel"
};

export const BUTTON_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  RELEASED: "released"
};
export const TABS = {
  HTML: "HTML",
  JPEG: "JPEG"
};

export const tabsList = ["JPEG", "HTML"];

export const accessFields = [
  { id: nanoid(), name: "Production Access Link", checked: true },
  { id: nanoid(), name: "Client Access Link", checked: true },
  { id: nanoid(), name: "Media / Buyer", checked: false }
];
